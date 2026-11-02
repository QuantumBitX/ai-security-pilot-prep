"""Record narration for course videos with Kokoro-82M (British voice) and write per-video AAC files plus a timing manifest.

  node tools/narration.js                      # refresh build/narration.json first
  python3 -I tools/tts/render.py [--mods 0,1.1] [--vids v1-1-1] [--workers 2] [--max-minutes 110] [--dry]

Output: audio/<vid>-<hash>.m4a and audio/manifest.json  { videos: { vid: { hash, file, dur, t: [[scene, seg, start, end], ...] } } }
Segments are cached (int16 .npy) by phoneme string, so edits only re-record the sentences that changed."""
import argparse, hashlib, json, os, re, sys, time
from multiprocessing import get_context
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, HERE)
import synth
from g2p import G2P

MODEL, VOICE, SPEED = 'kokoro-fp32.onnx', 'bf_emma', 0.92
ENGINE = 'kokoro82m-fp32-s092-v2'          # must match ENGINE in tools/narr-lib.js (it feeds the narration hash)
CACHE = os.environ.get('TTS_CACHE', os.path.join(ROOT, '.tts-cache'))
OUT = os.path.join(ROOT, 'audio')
MANIFEST = os.path.join(OUT, 'manifest.json')
SR = synth.SR
LEAD, SCENE_GAP, TAIL = 0.35, 1.0, 0.9

def seg_gap(prev_text):
    t = prev_text.rstrip().rstrip('"”’)')
    if t.endswith(('.', '?', '!')): return 0.45
    if t.endswith((';', ':', '—')): return 0.32
    return 0.24

def key_for(ps):
    return hashlib.sha1(f'{MODEL}|{VOICE}|{SPEED}|{ps}'.encode()).hexdigest()[:20]

def cache_path(key):
    return os.path.join(CACHE, key[:2], key + '.npy')

_k = None
def _init():
    global _k
    _k = synth.Kokoro(VOICE, threads=1, model=MODEL)

def _work(job):
    key, ps = job
    path = cache_path(key)
    if os.path.exists(path): return key, 0.0, 0.0
    t0 = time.time()
    pcm = synth.to_int16(_k(ps, SPEED))
    os.makedirs(os.path.dirname(path), exist_ok=True)
    tmp = path[:-4] + f'.{os.getpid()}.tmp.npy'
    np.save(tmp, pcm); os.replace(tmp, path)
    return key, pcm.size / SR, time.time() - t0

def load_manifest():
    try: return json.load(open(MANIFEST, encoding='utf-8'))
    except FileNotFoundError: return {'engine': ENGINE, 'voice': VOICE, 'videos': {}}

def save_manifest(m):
    tmp = MANIFEST + '.tmp'
    json.dump(m, open(tmp, 'w', encoding='utf-8'), indent=0, separators=(',', ':'))
    os.replace(tmp, MANIFEST)

def assemble(v, seg_keys, tmpdir):
    """Concatenate cached segments with natural gaps; return (pcm, timeline)."""
    parts = [np.zeros(int(LEAD * SR), np.int16)]; t = LEAD; tl = []
    def gap(s):
        nonlocal t
        n = int(round(s * SR)); parts.append(np.zeros(n, np.int16)); t += n / SR
    prev = None
    for si, sc in enumerate(v['scenes']):
        if si: gap(SCENE_GAP)
        for gi, seg in enumerate(sc['segs']):
            if gi: gap(seg_gap(prev))
            key = seg_keys[(si, gi)]
            pcm = np.load(cache_path(key)) if key else np.zeros(int(1.5 * SR), np.int16)
            start = t; parts.append(pcm); t += pcm.size / SR
            tl.append([si, gi, round(start, 3), round(t, 3)])
            prev = seg['spoken'] or '.'
    gap(TAIL)
    return np.concatenate(parts), tl

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--mods', default=''); ap.add_argument('--vids', default='')
    ap.add_argument('--workers', type=int, default=2); ap.add_argument('--max-minutes', type=float, default=110)
    ap.add_argument('--dry', action='store_true')
    a = ap.parse_args()
    lib = open(os.path.join(ROOT, 'tools', 'narr-lib.js'), encoding='utf-8').read()
    if f"ENGINE = '{ENGINE}'" not in lib or f"VOICE = '{VOICE}'" not in lib:
        sys.exit('ENGINE/VOICE in tools/narr-lib.js do not match render.py')
    vids = json.load(open(os.path.join(ROOT, 'build', 'narration.json'), encoding='utf-8'))
    mods = {m for m in a.mods.split(',') if m}; only = {v for v in a.vids.split(',') if v}
    if mods: vids = [v for v in vids if v['mod'] in mods]
    if only: vids = [v for v in vids if v['vid'] in only]
    os.makedirs(OUT, exist_ok=True); os.makedirs(CACHE, exist_ok=True)
    man = load_manifest(); man['engine'] = ENGINE; man['voice'] = VOICE
    todo = [v for v in vids if not (man['videos'].get(v['vid'], {}).get('hash') == v['hash'] and os.path.exists(os.path.join(OUT, man['videos'][v['vid']]['file'])))]
    g2p = G2P(); jobs, seen, plan = [], set(), []
    longest = 0
    for v in todo:
        seg_keys = {}
        for si, sc in enumerate(v['scenes']):
            for gi, seg in enumerate(sc['segs']):
                ps = g2p(seg['spoken']) if seg['spoken'] else ''
                longest = max(longest, len(ps))
                k = key_for(ps) if ps else None
                seg_keys[(si, gi)] = k
                if k and k not in seen and not os.path.exists(cache_path(k)): seen.add(k); jobs.append((k, ps))
        plan.append((v, seg_keys))
    if g2p.unknown: print('Unknown words spelled out:', sorted(g2p.unknown)[:40], flush=True)
    chars = {k: len(ps) for k, ps in jobs}; total_chars = sum(chars.values())
    print(f'{len(vids)} videos selected, {len(todo)} to record, {len(jobs)} new segments ({total_chars} phonemes, longest {longest})', flush=True)
    if a.dry or not todo: return
    tmpdir = os.path.join(ROOT, 'build', 'tts-tmp'); os.makedirs(tmpdir, exist_ok=True)
    t0 = time.time(); done_chars = 0; audio_s = 0.0; nxt = 0; stopped = False

    def flush_ready():
        nonlocal nxt
        while nxt < len(plan):
            v, seg_keys = plan[nxt]
            if any(k and not os.path.exists(cache_path(k)) for k in seg_keys.values()): return
            pcm, tl = assemble(v, seg_keys, tmpdir)
            name = f"{v['vid']}-{v['hash']}.m4a"; wav = os.path.join(tmpdir, v['vid'] + '.wav')
            synth.write_wav(wav, pcm); synth.encode_m4a(wav, os.path.join(OUT, name)); os.remove(wav)
            old = man['videos'].get(v['vid'])
            if old and old.get('file') != name and os.path.exists(os.path.join(OUT, old['file'])): os.remove(os.path.join(OUT, old['file']))
            man['videos'][v['vid']] = {'hash': v['hash'], 'file': name, 'dur': round(pcm.size / SR, 3), 't': tl}
            save_manifest(man)
            el = time.time() - t0
            print(f"[{el/60:5.1f} min] {v['vid']:10s} {pcm.size/SR/60:4.1f} min audio · {nxt+1}/{len(plan)} videos", flush=True)
            nxt += 1

    ctx = get_context('fork')
    pool = ctx.Pool(max(1, a.workers), initializer=_init)
    try:
        for i, (key, dur, el) in enumerate(pool.imap(_work, jobs, chunksize=1)):
            done_chars += chars[key]; audio_s += dur
            if i % 25 == 0 or i == len(jobs) - 1:
                wall = time.time() - t0; eta = wall / max(1, done_chars) * (total_chars - done_chars)
                print(f'  segments {i+1}/{len(jobs)} · {audio_s/60:.1f} min audio in {wall/60:.1f} min ({audio_s/max(wall,1e-6):.2f}x realtime) · ETA {eta/60:.0f} min', flush=True)
            flush_ready()
            if (time.time() - t0) / 60 > a.max_minutes:
                print('Time limit reached; stopping cleanly (cached segments are kept).', flush=True); stopped = True; break
    finally:
        pool.terminate(); pool.join()
    flush_ready()
    print(f"Done{' (partial)' if stopped else ''}: {nxt}/{len(plan)} videos recorded in {(time.time()-t0)/60:.1f} min.", flush=True)

if __name__ == '__main__':
    main()

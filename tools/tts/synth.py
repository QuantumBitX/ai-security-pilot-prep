"""Kokoro-82M (ONNX) synthesis with a British voice. Data files live in TTS_DATA (default: tts-data/ at the repository root):
config.json (vocab), kokoro-fp32.onnx (or kokoro-q8.onnx) and voices/<name>.bin (510 x 256 float32 style vectors)."""
import json, os, re, subprocess, wave
import numpy as np
import onnxruntime as ort

DATA = os.environ.get('TTS_DATA', os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), 'tts-data'))
SR = 24000
MAX_PHONEMES = 400  # longer inputs are split at sentence or clause boundaries (the model degrades past ~400)

class Kokoro:
    def __init__(self, voice='bf_emma', threads=None, model='kokoro-fp32.onnx'):
        self.vocab = json.load(open(os.path.join(DATA, 'config.json'), encoding='utf-8'))['vocab']
        so = ort.SessionOptions()
        if threads:
            so.intra_op_num_threads = threads
            so.inter_op_num_threads = 1
        so.graph_optimization_level = ort.GraphOptimizationLevel.ORT_ENABLE_ALL
        self.sess = ort.InferenceSession(os.path.join(DATA, model), so, providers=['CPUExecutionProvider'])
        self.inp = [i.name for i in self.sess.get_inputs()]  # fp32 export: tokens/style/speed; q8 export: input_ids/style/speed
        self.voice = np.fromfile(os.path.join(DATA, 'voices', voice + '.bin'), dtype=np.float32).reshape(-1, 256)

    def ids(self, ps):
        bad = sorted({c for c in ps if c not in self.vocab})
        if bad: raise ValueError(f'phonemes outside the vocabulary: {bad} in {ps!r}')
        return [self.vocab[c] for c in ps]

    @staticmethod
    def chunks(ps, limit=MAX_PHONEMES):
        """Split a long phoneme string at sentence ends, then clause marks, then spaces."""
        if len(ps) <= limit: return [ps]
        for pat in (r'(?<=[.!?])\s+', r'(?<=[;:—])\s+', r'(?<=,)\s+'):
            pieces = re.split(pat, ps)
            if len(pieces) > 1: break
        out, cur = [], ''
        for p in pieces:
            if cur and len(cur) + 1 + len(p) > limit: out.append(cur); cur = p
            else: cur = (cur + ' ' + p).strip()
        if cur: out.append(cur)
        res = []
        for p in out:
            if len(p) <= limit: res.append(p); continue
            sub = Kokoro.chunks(p, limit) if len(re.split(r'(?<=[.!?;:—,])\s+', p)) > 1 else None
            if sub and len(sub) > 1: res.extend(sub); continue
            while len(p) > limit:
                cut = p.rfind(' ', 0, limit); cut = cut if cut > 0 else limit
                res.append(p[:cut]); p = p[cut:].strip()
            if p: res.append(p)
        return res

    def run(self, ps, speed=1.0):
        ids = self.ids(ps)
        style = self.voice[min(len(ids), self.voice.shape[0] - 1)][None, :].astype(np.float32)
        feed = {self.inp[0]: np.array([[0, *ids, 0]], dtype=np.int64), 'style': style, 'speed': np.array([speed], dtype=np.float32)}
        return self.sess.run(None, feed)[0].reshape(-1).astype(np.float32)

    def __call__(self, ps, speed=1.0, joint_gap=0.16):
        parts = []
        for i, ch in enumerate(self.chunks(ps)):
            if i: parts.append(np.zeros(int(joint_gap * SR), dtype=np.float32))
            parts.append(trim(self.run(ch, speed)))
        return np.concatenate(parts) if parts else np.zeros(0, dtype=np.float32)

def trim(wav, thresh=0.006, head=0.03, tail=0.07):
    """Trim leading and trailing near-silence, keeping short pads so soft onsets and word-final consonants survive."""
    if wav.size == 0: return wav
    idx = np.where(np.abs(wav) > thresh)[0]
    if idx.size == 0: return wav[:0]
    return wav[max(0, idx[0] - int(head * SR)): min(wav.size, idx[-1] + int(tail * SR))]

def to_int16(wav):
    return (np.clip(wav, -1, 1) * 32767).astype(np.int16)

def write_wav(path, pcm16):
    with wave.open(path, 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm16.astype('<i2').tobytes())

# Spoken-word loudness: Kokoro output sits near -19.7 LUFS; +3.7 dB lands near -16 LUFS, with a look-ahead limiter at -1 dBFS.
LOUDNESS = 'volume=3.7dB,alimiter=limit=0.891:attack=3:release=60:level=false'

def encode_m4a(wav_path, out_path, bitrate='48k', af=LOUDNESS):
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', wav_path, '-af', af, '-ac', '1', '-ar', str(SR), '-c:a', 'aac', '-b:a', bitrate,
                    '-movflags', '+faststart', out_path], check=True)

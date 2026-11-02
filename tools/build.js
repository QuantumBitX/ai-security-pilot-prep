/* Build: validate content, estimate seat time, normalise KP to the outline, emit the publishable site. */
const fs = require('fs'), path = require('path'), vm = require('vm'), crypto = require('crypto');
const ROOT = path.resolve(__dirname, '..'), SRC = path.join(ROOT, 'src'), CONTENT = path.join(ROOT, 'content');
/* OUT=docs builds the standalone site (index.html is the full page) into docs/ for GitHub Pages or any static host; the default dist/ also holds the claude.ai artifact fragment. */
const STATIC = !!process.env.OUT, DIST = STATIC ? path.resolve(ROOT, process.env.OUT) : path.join(ROOT, 'dist');
const sandbox = { window: {} }; vm.runInNewContext(fs.readFileSync(path.join(SRC, 'outline.js'), 'utf8'), sandbox);
const O = sandbox.window.OUTLINE;
const MOD = { '0': { id: '0', title: O.intro.title, kp: O.intro.kp, domain: 0, bullets: [] }, F: { id: 'F', title: O.final.title, kp: O.final.kp, domain: 'F', bullets: [] } };
O.domains.forEach(d => d.modules.forEach(m => { MOD[m.id] = Object.assign({}, m, { domain: d.n }); }));
const TEMPLATES = ['title', 'bullets', 'compare', 'flow', 'cycle', 'timeline', 'chat', 'code', 'stat', 'layers', 'matrix', 'neural', 'conv', 'attention', 'tokens', 'vector', 'chart', 'shield', 'summary', 'quiz', 'svg'];
const BLOCKS = ['text', 'callout', 'video', 'diagram', 'flip', 'accordion', 'tabs', 'steps', 'table', 'scenario', 'check', 'match'];
const errors = [], warns = [];
/* Recorded narration: audio/manifest.json (from tools/tts/render.py) maps video id -> { hash, file, dur, t }. A recording is used
   only when its hash matches the current narration text, so edited videos fall back to device voices until re-recorded. */
const { narrationHash } = require('./narr-lib');
const AUDIO = path.join(ROOT, 'audio'); let AMAN = { videos: {} };
try { AMAN = JSON.parse(fs.readFileSync(path.join(AUDIO, 'manifest.json'), 'utf8')); } catch (e) { }
const AUSED = new Map(), AMISS = []; let AVIDS = 0, ASECS = 0; // dist name -> source file
const pubName = f => f.replace(/\.m4a$/, '.mp4'); // artifacts serve .mp4 but not .m4a; same MP4/AAC bytes
const err = (m, s) => errors.push(`[${m}] ${s}`), warn = (m, s) => warns.push(`[${m}] ${s}`);

function speakWords(say) { return String(say || '').split('|').map(s => s.trim()).filter(Boolean).map(s => s.replace(/\{([^}~]+)~([^}]+)\}/g, '$2').split(/\s+/).filter(Boolean).length); }
const ICN = (() => { const sb = { window: {} }; vm.runInNewContext(fs.readFileSync(path.join(SRC, 'icons.js'), 'utf8'), sb); return new Set(Object.keys(sb.window.ICONS)); })();
function iconsIn(o, acc) { if (Array.isArray(o)) o.forEach(x => iconsIn(x, acc)); else if (o && typeof o === 'object') for (const [k, v] of Object.entries(o)) { if ((k === 'icon' || k === 'targetIcon') && typeof v === 'string') acc.push(v); else if (v && typeof v === 'object') iconsIn(v, acc); } return acc; }
function segCount(sc) { return String(sc.say || '').split('|').map(s => s.trim()).filter(Boolean).length; }
function videoSeconds(v) { let t = 0; v.scenes.forEach(sc => { const w = speakWords(sc.say || (sc.t === 'quiz' ? sc.q : '')); (w.length ? w : [0]).forEach(x => t += Math.max(1.8, x / 2.55) + 0.35); if (sc.t === 'quiz') t += 20; }); return t; }
const words = s => String(s || '').replace(/[*`#\[\]()]/g, ' ').split(/\s+/).filter(Boolean).length;

const files = fs.readdirSync(CONTENT).filter(f => /^m[\w-]*\.js$/.test(f)).sort();
const QSTAT = {};
const META = {}, BANK = {}, GLOSS = [], COVER = {}; const seenVid = new Set(), seenQ = new Set();
let report = [];
fs.mkdirSync(path.join(DIST, 'data'), { recursive: true });

for (const f of files) {
  const fp = path.join(CONTENT, f); delete require.cache[require.resolve(fp)];
  let c; try { c = require(fp); } catch (e) { err(f, 'Failed to load: ' + e.message); continue; }
  const m = MOD[c.id]; if (!m) { err(f, 'Unknown module id ' + c.id); continue; }
  const id = c.id; const tag = 'm' + id;
  if (!Array.isArray(c.sections) || !c.sections.length) { err(tag, 'No sections'); continue; }
  let vidN = 0, videoSec = 0, cN = 0; const vlist = [];
  const secEst = c.sections.map((s, si) => {
    if (!s.id) s.id = 's' + (si + 1);
    if (s.id !== 's' + (si + 1)) warn(tag, `Section ${si + 1} id is ${s.id}`);
    if (!s.title) err(tag, `Section ${s.id} has no title`);
    (s.covers || []).forEach(b => { if (m.bullets.length && (b < 1 || b > m.bullets.length)) err(tag, `${s.id} covers unknown bullet ${b}`); });
    let rw = 0, inter = 0, vs = 0;
    (s.blocks || []).forEach((b, bi) => {
      const where = `${s.id} block ${bi + 1} (${b.type})`;
      if (!BLOCKS.includes(b.type)) { err(tag, `${where}: unknown block type`); return; }
      if (b.type === 'text' || b.type === 'callout') { if (!b.md) err(tag, `${where}: empty`); rw += words(b.md); }
      if (b.type === 'accordion' || b.type === 'tabs' || b.type === 'steps') { (b.items || []).forEach(it => { if (!Array.isArray(it) || it.length < 2) err(tag, `${where}: item must be [title, body]`); rw += words(it[1]); inter += 0.3; }); }
      if (b.type === 'flip') { (b.cards || []).forEach(cd => { if (!Array.isArray(cd) || cd.length < 2) err(tag, `${where}: card must be [front, back]`); rw += words(cd[1]); inter += 0.35; }); }
      if (b.type === 'table') { (b.rows || []).forEach(r => { if (r.length !== b.head.length) err(tag, `${where}: row has ${r.length} cells, header has ${b.head.length}`); r.forEach(x => rw += words(x)); }); }
      if (b.type === 'match') { if (!b.pairs || b.pairs.length < 3) err(tag, `${where}: needs at least 3 pairs`); (b.pairs || []).forEach(p => rw += words(p[0]) + words(p[1])); inter += 0.4 * (b.pairs || []).length; }
      if (b.type === 'scenario') { rw += words(b.md); inter += 1.2; }
      if (b.type === 'scenario' || b.type === 'check') {
        const q = b.q; if (!q) { if (b.type === 'check') err(tag, `${where}: missing q`); }
        else { cN++; q.id = q.id || `${id}-c${String(cN).padStart(2, '0')}`; checkQ(tag, where, q, m); inter += 1.2; }
      }
      if (b.type === 'diagram') { if (!b.scene || !TEMPLATES.includes(b.scene.t)) err(tag, `${where}: bad scene`); inter += 0.5; }
      if (b.type === 'video') {
        vidN++;
        if (!b.id) b.id = `v${id.replace('.', '-')}-${vidN}`;
        if (seenVid.has(b.id)) err(tag, `${where}: duplicate video id ${b.id}`); seenVid.add(b.id);
        if (!b.title) err(tag, `${where}: video has no title`);
        b.domain = m.domain; b.code = `${id === '0' ? 'INTRO' : id === 'F' ? 'FINAL' : id} · V${vidN}`;
        AVIDS++; delete b.audio;
        const am = AMAN.videos && AMAN.videos[b.id];
        if (am && am.hash === narrationHash(b) && (fs.existsSync(path.join(AUDIO, am.file)) || fs.existsSync(path.join(DIST, 'audio', pubName(am.file))))) { b.audio = { src: 'audio/' + pubName(am.file), dur: am.dur, t: am.t }; AUSED.set(pubName(am.file), am.file); ASECS += am.dur; }
        else AMISS.push(b.id + (am ? ' (text changed)' : ''));
        (b.scenes || []).forEach((sc, k) => {
          const w2 = `${where} scene ${k + 1} (${sc.t})`;
          if (!TEMPLATES.includes(sc.t)) { err(tag, `${w2}: unknown template`); return; }
          if (sc.t === 'quiz') { if (!sc.q || !Array.isArray(sc.o) || sc.a == null || sc.a >= sc.o.length) err(tag, `${w2}: quiz needs q, o[], a`); return; }
          const n = segCount(sc); if (!n) err(tag, `${w2}: no narration`);
          if (sc.t === 'flow') { if (!sc.nodes || !sc.nodes.length) err(tag, `${w2}: no nodes`); const ids = new Set((sc.nodes || []).map(x => x.id)); (sc.zones || []).forEach(z => { if (!z.id) err(tag, `${w2}: zone without id`); else ids.add(z.id); if (z.x < 40 || z.y < 160 || z.x + z.w > 1560 || z.y + z.h > 880) warn(tag, `${w2}: zone ${z.id} runs off the stage`); }); (sc.edges || []).forEach(e => { if (!ids.has(e.from) || !ids.has(e.to)) err(tag, `${w2}: edge ${e.from}->${e.to} references a missing node`); }); const eids = new Set((sc.edges || []).map(e => e.id || e.from + '-' + e.to)); (sc.steps || []).forEach((st, si2) => ['show', 'hide', 'hi', 'flow'].forEach(key => { const v = st[key]; (Array.isArray(v) ? v : String(v || '').split(/[\s,]+/).filter(Boolean)).forEach(x => { if (!ids.has(x) && !eids.has(x)) err(tag, `${w2}: step ${si2} ${key} references unknown id "${x}"`); }); })); if (sc.steps && sc.steps.length !== n) warn(tag, `${w2}: ${sc.steps.length} steps vs ${n} narration segments`); (sc.nodes || []).forEach(nd => { if (nd.x < 100 || nd.x > 1500 || nd.y < 190 || nd.y > 860) warn(tag, `${w2}: node ${nd.id} at ${nd.x},${nd.y} is near the edge`); }); }
          if (['bullets', 'summary'].includes(sc.t) && sc.items && n !== sc.items.length + (sc.t === 'bullets' ? 1 : 1) && n !== 1) warn(tag, `${w2}: ${n} segments for ${sc.items.length} items (expected ${sc.items.length + 1})`);
          if (sc.t === 'compare' && sc.rows && n !== sc.rows.length + 1 && n !== 1) warn(tag, `${w2}: ${n} segments for ${sc.rows.length} rows (expected ${sc.rows.length + 1})`);
          if (sc.t === 'cycle' && sc.stages && n < sc.stages.length + 1) warn(tag, `${w2}: ${n} segments for ${sc.stages.length} stages (expected ≥ ${sc.stages.length + 1})`);
          if (sc.t === 'timeline' && sc.events && n !== sc.events.length + 1 && n !== 1) warn(tag, `${w2}: ${n} segments for ${sc.events.length} events`);
          if (sc.t === 'layers' && sc.layers && n < sc.layers.length + 1) warn(tag, `${w2}: ${n} segments for ${sc.layers.length} layers`);
          if (['neural', 'conv', 'attention', 'tokens', 'vector'].includes(sc.t) && sc.steps && sc.steps.length !== n) warn(tag, `${w2}: ${sc.steps.length} steps vs ${n} segments`);
          if (sc.t === 'chart' && sc.steps && sc.steps.length !== n) warn(tag, `${w2}: ${sc.steps.length} steps vs ${n} segments`);
          if (sc.t === 'code' && sc.hl && sc.hl.length !== n) warn(tag, `${w2}: ${sc.hl.length} highlights vs ${n} segments`);
          if (sc.t === 'code') String(sc.code || '').split('\n').forEach((ln, li) => { if (ln.length > (sc.notes ? 50 : 88)) warn(tag, `${w2}: code line ${li + 1} is ${ln.length} chars`); });
          if (sc.t === 'shield' && sc.attacks && n !== sc.attacks.length + 1) warn(tag, `${w2}: ${n} segments for ${sc.attacks.length} attacks`);
          if (sc.t === 'matrix' && sc.items && sc.items.length && n !== sc.items.length + 1 && n !== 1) warn(tag, `${w2}: ${n} segments for ${sc.items.length} items`);
          if (Array.isArray(sc.notes) && sc.notes.length > n) warn(tag, `${w2}: ${sc.notes.length} notes for ${n} segments`);
          iconsIn(sc, []).forEach(ic => { if (!ICN.has(ic)) err(tag, `${w2}: unknown icon "${ic}"`); });
          if (sc.t === 'chat' && !sc.show && sc.msgs && n !== sc.msgs.length) warn(tag, `${w2}: ${n} segments for ${sc.msgs.length} messages (or give show[])`);
        });
        const secs = videoSeconds(b); vs += secs; videoSec += secs;
        vlist.push({ id: b.id, t: b.title, s: s.id, d: Math.round(b.audio ? b.audio.dur : secs) });
      }
    });
    return { id: s.id, title: s.title, est: rw / 150 + inter + vs * 1.15 / 60, read: rw, inter, vmin: vs / 60, covers: s.covers || [] };
  });
  const quiz = (c.quiz || []).map((q, i) => Object.assign({}, q, { id: `${id}-q${String(i + 1).padStart(2, '0')}` }));
  const exam = (c.exam || []).map((q, i) => Object.assign({}, q, { id: `${id}-x${String(i + 1).padStart(2, '0')}` }));
  quiz.forEach((q, i) => checkQ(tag, `quiz ${i + 1}`, q, m)); exam.forEach((q, i) => checkQ(tag, `exam ${i + 1}`, q, m));
  if (quiz.length < 8 && id !== 'F') warn(tag, `only ${quiz.length} knowledge-check questions`);
  // coverage
  const cov = {}; m.bullets.forEach((_, i) => cov[i + 1] = { s: [], q: 0 });
  secEst.forEach(s => s.covers.forEach(b => { if (cov[b]) cov[b].s.push(s.id); }));
  quiz.concat(exam).forEach(q => { if (q.b && cov[q.b]) cov[q.b].q++; });
  Object.keys(cov).forEach(b => { if (!cov[b].s.length) warn(tag, `outline topic ${id}.${b} is not covered by any section`); if (!cov[b].q) warn(tag, `outline topic ${id}.${b} has no questions`); });
  COVER[id] = cov;
  // KP normalisation
  const quizEst = quiz.length * 1.3; const total = secEst.reduce((a, s) => a + s.est, 0) + quizEst; const fct = m.kp / total;
  let kps = secEst.map(s => Math.max(3, Math.round(s.est * fct))); let quizKP = m.kp - kps.reduce((a, b) => a + b, 0);
  if (quizKP < 3) { const over = 3 - quizKP; kps[kps.indexOf(Math.max(...kps))] -= over; quizKP = 3; }
  const out = { id, domain: m.domain, title: m.title, intro: c.intro || '', objectives: c.objectives || [], sections: c.sections.map((s, i) => Object.assign({}, s, { kp: kps[i], min: Math.round(secEst[i].est) })), quiz, exam, quizKP };
  const file = `m${id.replace('.', '-')}.json`;
  fs.writeFileSync(path.join(DIST, 'data', file), JSON.stringify(out));
  BANK[id] = { quiz, exam };
  (c.glossary || []).forEach(g => { if (!Array.isArray(g) || g.length < 2) err(tag, 'bad glossary entry'); else GLOSS.push({ t: g[0], d: g[1], m: id }); });
  META[id] = { file, title: m.title, secs: out.sections.map(s => ({ id: s.id, title: s.title, kp: s.kp })), quizKP, quizN: quiz.length, examN: exam.length, videos: vidN, videoMin: Math.round(videoSec / 60), vlist };
  const qs0 = QSTAT[tag] || { n: 0, longest: 0, shortest: 0, ratio: 0 };
  report.push({ short: qs0.n ? Math.round(100 * qs0.shortest / qs0.n) + '%' : '-', long: qs0.n ? Math.round(100 * qs0.longest / qs0.n) + '%' : '-', lr: qs0.n ? (qs0.ratio / qs0.n).toFixed(2) : '-', id, kp: m.kp, est: Math.round(total), factor: fct.toFixed(2), videos: vidN, videoMin: (videoSec / 60).toFixed(1), readWords: secEst.reduce((a, s) => a + s.read, 0), quiz: quiz.length, exam: exam.length, checks: cN, gloss: (c.glossary || []).length });
}
/* Answer-length tell: the correct option should not stand out as the longest. */
function lenStat(tag, where, q) {
  if (!Array.isArray(q.o) || q.a == null || q.a >= q.o.length) return;
  const L = q.o.map(x => String(x).length); const c = L[q.a]; const others = L.filter((_, i) => i !== q.a);
  const avg = others.reduce((a, b) => a + b, 0) / Math.max(1, others.length); const r = c / Math.max(1, avg);
  const longest = c > Math.max(...others); const shortest = c < Math.min(...others);
  const st = QSTAT[tag] = QSTAT[tag] || { n: 0, longest: 0, shortest: 0, ratio: 0, flagged: [] };
  st.n++; if (longest) st.longest++; if (shortest) st.shortest++; st.ratio += r;
  if (longest && r >= 1.3) st.flagged.push(`${where} ×${r.toFixed(2)}: ${String(q.q).slice(0, 70)}`);
}
function checkQ(tag, where, q, m) {
  lenStat(tag, where, q);
  if (!q.q) err(tag, `${where}: no stem`);
  if (!Array.isArray(q.o) || q.o.length < 3) err(tag, `${where}: needs at least 3 options`);
  else if (q.o.length !== 4) warn(tag, `${where}: ${q.o.length} options (exam uses 4)`);
  if (q.a == null || q.a < 0 || !q.o || q.a >= q.o.length) err(tag, `${where}: answer index out of range`);
  if (!q.why) err(tag, `${where}: no explanation`);
  if (q.b != null && m.bullets.length && (q.b < 1 || q.b > m.bullets.length)) err(tag, `${where}: unknown outline topic ${q.b}`);
  if (q.id) { if (seenQ.has(q.id)) err(tag, `${where}: duplicate question id ${q.id}`); seenQ.add(q.id); }
  if (q.o && new Set(q.o).size !== q.o.length) err(tag, `${where}: duplicate options`);
  if (q.o && /all of the above|none of the above|both a and b/i.test(q.o.join('|'))) warn(tag, `${where}: uses an "all/none of the above" style option`);
}

/* Dedicated mock exam pools: content/mock/mockN.js exports { questions: [{ m: '3.2', q, o, a, why }] } → data/mocks.json.
   The app uses a pool only when it covers every domain's share of 160; otherwise it falls back to module questions. */
const MOCKS = {}, MOCKREP = [];
const MOCKDIR = path.join(CONTENT, 'mock');
if (fs.existsSync(MOCKDIR)) for (const f of fs.readdirSync(MOCKDIR).filter(f => /^mock\d+\.js$/.test(f)).sort()) {
  const fp = path.join(MOCKDIR, f); delete require.cache[require.resolve(fp)];
  let c; try { c = require(fp); } catch (e) { err(f, 'Failed to load: ' + e.message); continue; }
  const n = +f.match(/\d+/)[0]; const tag = 'mock' + n; const out = []; const byDom = {};
  (c.questions || []).forEach((q, i) => {
    const m = MOD[q.m]; const where = `q${i + 1}`;
    if (!m || !(m.domain >= 1)) { err(tag, `${where}: unknown or non-domain module ${q.m}`); return; }
    q.id = `${tag}-${String(i + 1).padStart(3, '0')}`; checkQ(tag, where, q, m);
    out.push(Object.assign({ mod: q.m, dom: m.domain }, q)); byDom[m.domain] = (byDom[m.domain] || 0) + 1;
  });
  const per = O.domains.map(d => Math.round(160 * d.weight / 100)); per[per.indexOf(Math.max(...per))] += 160 - per.reduce((a, b) => a + b, 0);
  O.domains.forEach((d, i) => { if ((byDom[d.n] || 0) < per[i]) warn(tag, `Domain ${d.n}: ${byDom[d.n] || 0} of ${per[i]} questions`); });
  MOCKS[n] = out; const st = QSTAT[tag] || { n: 0, longest: 0, shortest: 0, ratio: 0 };
  MOCKREP.push(`${tag}: ${out.length} questions (${O.domains.map(d => 'D' + d.n + ' ' + (byDom[d.n] || 0) + '/' + per[O.domains.indexOf(d)]).join(', ')}) · long ${st.n ? Math.round(100 * st.longest / st.n) : 0}% · short ${st.n ? Math.round(100 * st.shortest / st.n) : 0}% · ratio ${st.n ? (st.ratio / st.n).toFixed(2) : '-'}`);
}
fs.writeFileSync(path.join(DIST, 'data', 'mocks.json'), JSON.stringify(MOCKS));

/* Mirror exactly the referenced recordings into dist/audio (plus the preferences sample) and drop stale ones. */
const DA = path.join(DIST, 'audio'); fs.mkdirSync(DA, { recursive: true });
const SAMPLE = fs.existsSync(path.join(AUDIO, 'voice-sample.m4a')) || fs.existsSync(path.join(DA, 'voice-sample.mp4')) ? 'voice-sample.mp4' : null; if (SAMPLE) AUSED.set(SAMPLE, 'voice-sample.m4a');
for (const [f, srcName] of AUSED) { const src = path.join(AUDIO, srcName), dst = path.join(DA, f); if (!fs.existsSync(src)) continue; /* recording already published in the output folder */ if (!fs.existsSync(dst) || fs.statSync(dst).size !== fs.statSync(src).size || fs.statSync(dst).mtimeMs < fs.statSync(src).mtimeMs) fs.copyFileSync(src, dst); }
for (const f of fs.readdirSync(DA)) if (!AUSED.has(f)) fs.unlinkSync(path.join(DA, f));
fs.writeFileSync(path.join(DIST, 'data', 'qbank.json'), JSON.stringify(BANK));
/* The same term can be defined in more than one module: keep the first definition and list the other modules. */
{ const seen = {}; const merged = []; for (const g of GLOSS) { const k = g.t.toLowerCase(); if (seen[k]) { (seen[k].also = seen[k].also || []).push(g.m); continue; } seen[k] = g; merged.push(g); } GLOSS.length = 0; GLOSS.push(...merged); }
fs.writeFileSync(path.join(DIST, 'data', 'glossary.json'), JSON.stringify(GLOSS));
const js = ['outline.js', 'icons.js', 'video.js', 'lesson.js', 'quiz.js'].map(f => fs.readFileSync(path.join(SRC, f), 'utf8')).join('\n');
const appJs = fs.readFileSync(path.join(SRC, 'app.js'), 'utf8');
const v = crypto.createHash('sha1').update(JSON.stringify(META) + js + appJs + JSON.stringify(BANK) + JSON.stringify(MOCKS) + [...AUSED.keys()].sort().join()).digest('hex').slice(0, 10);
const build = { v, built: new Date().toISOString(), modules: META, coverage: COVER, audio: { recorded: AVIDS - AMISS.length, total: AVIDS, sample: SAMPLE ? 'audio/' + SAMPLE : null } };
const bundle = js + '\nwindow.BUILD = ' + JSON.stringify(build) + ';\n' + appJs;
for (const f of ['outline.js', 'icons.js', 'video.js', 'lesson.js', 'quiz.js', 'app.js']) { try { new vm.Script(fs.readFileSync(path.join(SRC, f), 'utf8'), { filename: f }); } catch (e) { err('build', `${f} does not parse: ${e.message}`); } }
const css = fs.readFileSync(path.join(SRC, 'styles.css'), 'utf8');
const page = fs.readFileSync(path.join(SRC, 'index.html'), 'utf8').replace('/*@CSS*/', () => css).replace('/*@JS*/', () => bundle.replace(/<\/script/gi, '<\\/script'));
if (!STATIC) fs.writeFileSync(path.join(DIST, 'index.html'), page);
const reset = ':root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}';
fs.writeFileSync(path.join(DIST, STATIC ? 'index.html' : 'local.html'), `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>${reset}</style></head><body>${page}</body></html>`);

console.log('\nMODULE  KP   est  factor  videos  vmin  words  quiz exam checks gloss  long% short%  ratio');
report.forEach(r => console.log(`${r.id.padEnd(6)} ${String(r.kp).padStart(4)} ${String(r.est).padStart(5)}   ${r.factor}  ${String(r.videos).padStart(5)} ${String(r.videoMin).padStart(6)} ${String(r.readWords).padStart(6)} ${String(r.quiz).padStart(5)} ${String(r.exam).padStart(4)} ${String(r.checks).padStart(5)} ${String(r.gloss).padStart(5)} ${String(r.long).padStart(6)} ${String(r.short).padStart(6)}  ${String(r.lr).padStart(5)}`));
if (process.env.QLEN) Object.entries(QSTAT).forEach(([t, st]) => { const only = process.env.QLEN === '1' || process.env.QLEN.split(',').includes(t.slice(1)); if (only && st.flagged.length) { console.log(`\n${t}: ${st.flagged.length} question(s) where the answer is the longest by 30%+`); st.flagged.forEach(f => console.log('  - ' + f)); } });
if (MOCKREP.length) console.log('\n' + MOCKREP.join('\n'));
console.log(`\nPage ${(page.length / 1024).toFixed(0)} KB · ${Object.keys(META).length} modules · ${GLOSS.length} glossary terms · ${Object.values(BANK).reduce((a, b) => a + b.quiz.length + b.exam.length, 0)} questions`);
console.log(`Narration: ${AVIDS - AMISS.length}/${AVIDS} videos recorded (${(ASECS / 60).toFixed(0)} min, ${([...AUSED.keys()].reduce((a, f) => a + fs.statSync(path.join(DA, f)).size, 0) / 1048576).toFixed(1)} MB)${AMISS.length ? ' · not recorded: ' + (AMISS.length > 8 ? AMISS.slice(0, 8).join(', ') + ` and ${AMISS.length - 8} more` : AMISS.join(', ')) : ''}`);
if (warns.length) { console.log(`\n${warns.length} warning(s):`); warns.forEach(w => console.log('  ! ' + w)); }
if (errors.length) { console.log(`\n${errors.length} error(s):`); errors.forEach(e => console.log('  ✗ ' + e)); process.exitCode = 1; } else console.log('\nBuild OK');

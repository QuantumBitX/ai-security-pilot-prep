/* Dump every video's narration (as the player will speak it) to build/narration.json.
   Usage: node tools/narration.js [moduleId ...]   (default: all modules) */
const fs = require('fs'), path = require('path');
const { videoSegments, narrationHash } = require('./narr-lib');
const CONTENT = path.join(__dirname, '..', 'content');
const OUT = path.join(__dirname, '..', 'build');
const only = process.argv.slice(2);
const files = fs.readdirSync(CONTENT).filter(f => /^m[\w-]*\.js$/.test(f)).sort();
const out = [];
for (const f of files) {
  const c = require(path.join(CONTENT, f));
  if (only.length && !only.includes(c.id)) continue;
  let vidN = 0;
  (c.sections || []).forEach(s => (s.blocks || []).forEach(b => {
    if (b.type !== 'video') return;
    vidN++;
    const id = b.id || `v${String(c.id).replace('.', '-')}-${vidN}`;
    out.push({ mod: c.id, vid: id, title: b.title, hash: narrationHash(b), scenes: videoSegments(b) });
  }));
}
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, 'narration.json'), JSON.stringify(out, null, 1));
const segs = out.reduce((a, v) => a + v.scenes.reduce((b, s) => b + s.segs.length, 0), 0);
const words = out.reduce((a, v) => a + v.scenes.reduce((b, s) => b + s.segs.reduce((c, g) => c + (g.spoken.match(/\S+/g) || []).length, 0), 0), 0);
console.log(`${out.length} videos · ${segs} segments · ${words} words → build/narration.json`);

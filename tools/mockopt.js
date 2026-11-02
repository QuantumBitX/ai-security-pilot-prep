/* Mock pool helper.
   node tools/mockopt.js stats mock1            → list answer-length outliers (by question number) and totals per module
   node tools/mockopt.js patch mock1 patch.json → apply {"12": {"set": {"0": "text"}}, "40": {"q": "...", "why": "..."}} and rewrite the file
   Files live in content/mock/mockN.js and export { questions: [{ m, q, o, a, why }] }. */
const fs = require('fs'), path = require('path');
const [, , cmd, name, patchFile] = process.argv;
const fp = path.join(__dirname, '..', 'content', 'mock', name + '.js');
const load = () => { delete require.cache[require.resolve(fp)]; return require(fp); };
const len = s => String(s).length;
function stat(q) {
  const L = q.o.map(len), c = L[q.a], others = L.filter((_, i) => i !== q.a);
  return { L, longest: c > Math.max(...others), shortest: c < Math.min(...others), r: c / (others.reduce((a, b) => a + b, 0) / others.length) };
}
const esc = s => "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
function write(c, header) {
  const lines = c.questions.map(q => `  { m: ${esc(q.m)}, q: ${esc(q.q)},\n    o: [${q.o.map(esc).join(', ')}], a: ${q.a},\n    why: ${esc(q.why)} }`);
  fs.writeFileSync(fp, `${header}\nmodule.exports = { questions: [\n${lines.join(',\n')}\n] };\n`);
}
const c = load();
if (cmd === 'stats') {
  let lo = 0, sh = 0, rs = 0; const per = {};
  c.questions.forEach((q, i) => {
    const s = stat(q); per[q.m] = (per[q.m] || 0) + 1; if (s.longest) lo++; if (s.shortest) sh++; rs += s.r;
    if (s.shortest || s.r > 1.12) console.log(String(i + 1).padStart(3), q.m.padEnd(4), s.r.toFixed(2), s.longest ? 'LONG ' : '     ', s.shortest ? 'SHORT' : '     ', '|', s.L.join(','));
  });
  const n = c.questions.length; console.log(`\n${n} questions · long ${Math.round(100 * lo / n)}% · short ${Math.round(100 * sh / n)}% · mean ratio ${(rs / n).toFixed(2)}`);
  console.log(Object.keys(per).sort((a, b) => parseFloat(a) - parseFloat(b)).map(k => k + ':' + per[k]).join(' '));
} else if (cmd === 'patch') {
  const header = fs.readFileSync(fp, 'utf8').split('\n')[0];
  const p = JSON.parse(fs.readFileSync(patchFile, 'utf8')); let n = 0;
  for (const [k, v] of Object.entries(p)) {
    const q = c.questions[+k - 1]; if (!q) { console.log('no question', k); continue; }
    if (v.set) for (const [i, t] of Object.entries(v.set)) q.o[+i] = t;
    if (v.o) q.o = v.o; if (v.q) q.q = v.q; if (v.why) q.why = v.why; n++;
  }
  write(c, header); console.log(`${n} patched`);
} else if (cmd === 'fmt') { write(c, fs.readFileSync(fp, 'utf8').split('\n')[0]); console.log('formatted'); }
else console.log('usage: node tools/mockopt.js stats|patch|fmt mockN [patch.json]');

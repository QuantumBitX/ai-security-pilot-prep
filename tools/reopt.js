/* Apply option rewrites. Usage: node tools/reopt.js 1.2 patch.json
   patch: { "<key>": { "o": [...4 options...], "a"?: n, "why"?: "..." } } with keys as printed by qdump. */
const fs = require('fs'); const { load, lit, stat } = require('./qlib');
const [id, pf] = process.argv.slice(2); const patch = JSON.parse(fs.readFileSync(pf, 'utf8'));
const qs = load(id); let ok = 0, bad = 0;
for (const [key, p] of Object.entries(patch)) {
  const e = qs.find(x => x.key === key); if (!e) { console.log('✗ no question ' + key); bad++; continue; }
  if (p.set) { p.o = e.q.o.slice(); Object.entries(p.set).forEach(([i, t]) => { p.o[+i] = t; }); }
  if (!Array.isArray(p.o) || p.o.length !== e.q.o.length) { console.log('✗ ' + key + ': option count'); bad++; continue; }
  const a = p.a != null ? p.a : e.q.a;
  let src = fs.readFileSync(e.file, 'utf8');
  const oldO = 'o: [' + e.q.o.map(lit).join(', ') + ']';
  const i = src.indexOf(oldO); if (i < 0) { console.log('✗ ' + key + ': options not found verbatim in ' + e.file); bad++; continue; }
  if (src.indexOf(oldO, i + 1) >= 0) { console.log('✗ ' + key + ': options appear twice'); bad++; continue; }
  let rep = 'o: [' + p.o.map(lit).join(', ') + ']';
  src = src.slice(0, i) + rep + src.slice(i + oldO.length);
  if (p.a != null && p.a !== e.q.a) { const j = src.indexOf('a: ' + e.q.a, i + rep.length); if (j < 0 || j - (i + rep.length) > 12) { console.log('✗ ' + key + ': answer index not adjacent'); bad++; continue; } src = src.slice(0, j) + 'a: ' + a + src.slice(j + ('a: ' + e.q.a).length); }
  if (p.why) { const ow = 'why: ' + lit(e.q.why); const k = src.indexOf(ow, i); if (k < 0) { console.log('✗ ' + key + ': why not found'); bad++; continue; } src = src.slice(0, k) + 'why: ' + lit(p.why) + src.slice(k + ow.length); }
  fs.writeFileSync(e.file, src); ok++;
  const s = stat({ o: p.o, a }); console.log(`✓ ${key}  ratio ${s.r.toFixed(2)}${s.longest ? ' (longest)' : ''}`);
}
console.log(`${ok} applied, ${bad} failed`);

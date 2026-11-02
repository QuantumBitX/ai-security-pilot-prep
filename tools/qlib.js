/* Shared helpers: enumerate a module's questions with stable keys, and locate them in source. */
const fs = require('fs'), path = require('path');
const CONTENT = path.join(__dirname, '..', 'content');
function load(id) {
  const base = 'm' + id.replace('.', '-');
  const file = path.join(CONTENT, base + '.js');
  Object.keys(require.cache).forEach(k => { if (k.startsWith(CONTENT)) delete require.cache[k]; });
  const c = require(file); const out = []; const seen = {};
  c.sections.forEach((s, si) => s.blocks.forEach(b => { if ((b.type === 'check' || b.type === 'scenario') && b.q) { const k0 = 's' + (si + 1) + ' ' + b.type; seen[k0] = (seen[k0] || 0) + 1; const sf = path.join(CONTENT, base, 's' + (si + 1) + '.js'); out.push({ key: k0 + '#' + seen[k0], file: fs.existsSync(sf) ? sf : file, q: b.q }); } }));
  (c.quiz || []).forEach((q, i) => out.push({ key: 'quiz ' + (i + 1), file, q }));
  (c.exam || []).forEach((q, i) => out.push({ key: 'exam ' + (i + 1), file, q }));
  return out;
}
const lit = s => "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
function stat(q) { const L = q.o.map(x => x.length); const c0 = L[q.a]; const others = L.filter((_, i) => i !== q.a); const avg = others.reduce((a, b) => a + b, 0) / others.length; return { r: c0 / avg, longest: c0 > Math.max(...others) }; }
module.exports = { load, lit, stat };

/* Dump a module's questions with option lengths. Usage: node tools/qdump.js 1.2 [all] */
const { load, stat } = require('./qlib');
const id = process.argv[2]; const all = process.argv[3] === 'all'; let n = 0; const qs = load(id);
qs.forEach(({ key, q }) => { const { r, longest } = stat(q); if (!all && !(longest && r >= 1.3)) return; n++;
  console.log(`\n## ${key} ×${r.toFixed(2)}\nQ: ${q.q}`); q.o.forEach((o, i) => console.log(`${i === q.a ? '*' : ' '} [${o.length}] ${o}`)); });
console.error(`${n} of ${qs.length} shown`);

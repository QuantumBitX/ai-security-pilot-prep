/* List icon names used in content that the icon set doesn't define. Usage: node tools/iconcheck.js */
const fs = require('fs'), path = require('path');
const src = fs.readFileSync(path.join(__dirname, '..', 'src', 'icons.js'), 'utf8');
const have = new Set((src.match(/^\s*['"]?([a-z0-9]+)['"]?\s*:/gm) || []).map(x => x.trim().replace(/[:'"]/g, '')));
const dir = path.join(__dirname, '..', 'content'); const bad = [];
(function walk(d) { fs.readdirSync(d).forEach(f => { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) return walk(p); if (!p.endsWith('.js')) return;
  const s = fs.readFileSync(p, 'utf8'); for (const m of s.matchAll(/icon:\s*'([a-z0-9]+)'/g)) if (!have.has(m[1])) bad.push(path.relative(dir, p) + ': ' + m[1]); }); })(dir);
console.log(bad.length ? bad.join('\n') : 'all icons defined');

/* Serve dist/ (or the folder in SERVE_DIR, e.g. docs) on 127.0.0.1:8765 for the duration of one command, then stop.
   Usage: node tools/serve.js <command> [args...]      e.g. node tools/serve.js node /path/to/chk.js
   To browse the built site: SERVE_DIR=docs node tools/serve.js sleep 3600, then open http://127.0.0.1:8765/ */
const http = require('http'), fs = require('fs'), path = require('path'), { spawn } = require('child_process');
const DIST = path.resolve(__dirname, '..', process.env.SERVE_DIR || 'dist'), PORT = +process.env.PORT || 8765;
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.m4a': 'audio/mp4', '.mp4': 'video/mp4', '.css': 'text/css; charset=utf-8', '.png': 'image/png' };
const srv = http.createServer((req, res) => {
  const u = decodeURIComponent(req.url.split('?')[0]); const fp = path.join(DIST, u === '/' ? 'index.html' : u);
  if (!fp.startsWith(DIST) || !fs.existsSync(fp) || fs.statSync(fp).isDirectory()) { res.writeHead(404); return res.end('not found'); }
  const size = fs.statSync(fp).size, type = TYPES[path.extname(fp)] || 'application/octet-stream', m = /bytes=(\d*)-(\d*)/.exec(req.headers.range || '');
  if (m) { const s = m[1] ? +m[1] : size - +m[2], e = m[1] && m[2] ? Math.min(+m[2], size - 1) : size - 1; res.writeHead(206, { 'Content-Type': type, 'Content-Range': `bytes ${s}-${e}/${size}`, 'Accept-Ranges': 'bytes', 'Content-Length': e - s + 1 }); return fs.createReadStream(fp, { start: s, end: e }).pipe(res); }
  res.writeHead(200, { 'Content-Type': type, 'Content-Length': size, 'Accept-Ranges': 'bytes' }); fs.createReadStream(fp).pipe(res);
});
srv.listen(PORT, '127.0.0.1', () => {
  const [cmd, ...args] = process.argv.slice(2);
  if (!cmd) { console.log(`Serving dist on http://127.0.0.1:${PORT} (Ctrl+C to stop)`); return; }
  const ch = spawn(cmd, args, { stdio: 'inherit' });
  ch.on('exit', code => { srv.close(); process.exit(code == null ? 1 : code); });
});

/* End-to-end check of recorded narration in Chromium: playback, caption/beat sync, scene jumps, speed, mute, quiz pause and
   resume, seeking, end of video, and the fallback when the audio file is missing.
   Usage: node tools/audio-test.js [sectionHash ...]   (default: every section in module 0 that has a recorded video)
   Starts its own static server for dist/ (with HTTP range support) and stops it when done. */
const http = require('http'), fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const DIST = path.join(__dirname, '..', 'dist');
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.json': 'application/json', '.m4a': 'audio/mp4', '.mp4': 'video/mp4', '.css': 'text/css' };

function serve(opts) {
  const srv = http.createServer((req, res) => {
    const u = decodeURIComponent(req.url.split('?')[0]); const fp = path.join(DIST, u === '/' ? 'index.html' : u);
    if (!fp.startsWith(DIST) || !fs.existsSync(fp) || fs.statSync(fp).isDirectory()) { res.writeHead(404); return res.end('not found'); }
    if (opts.noAudio && /\.(m4a|mp4)$/.test(fp)) { res.writeHead(404); return res.end('gone'); }
    const size = fs.statSync(fp).size; const type = TYPES[path.extname(fp)] || 'application/octet-stream';
    const m = /bytes=(\d*)-(\d*)/.exec(req.headers.range || '');
    if (m && !opts.noRange) {
      const start = m[1] ? +m[1] : size - +m[2]; const end = m[1] && m[2] ? Math.min(+m[2], size - 1) : size - 1;
      res.writeHead(206, { 'Content-Type': type, 'Content-Range': `bytes ${start}-${end}/${size}`, 'Accept-Ranges': 'bytes', 'Content-Length': end - start + 1 });
      return fs.createReadStream(fp, { start, end }).pipe(res);
    }
    res.writeHead(200, Object.assign({ 'Content-Type': type, 'Content-Length': size }, opts.noRange ? {} : { 'Accept-Ranges': 'bytes' }));
    fs.createReadStream(fp).pipe(res);
  });
  return new Promise(r => srv.listen(0, '127.0.0.1', () => r(srv)));
}
const sleep = ms => new Promise(r => setTimeout(r, ms));
let fails = 0; const ok = (c, msg) => { console.log((c ? '  ✓ ' : '  ✗ ') + msg); if (!c) fails++; };

async function state(page, i) {
  return page.evaluate(i => {
    const p = VIDEO.Player.all()[i]; const a = p.audio; const f = p.flat;
    let exp = 0; if (a) { while (exp < f.length - 1 && a.currentTime >= f[exp + 1].start) exp++; }
    return { mode: p.audioMode, t: a ? a.currentTime : null, paused: a ? a.paused : null, rate: a ? a.playbackRate : null, muted: a ? a.muted : null,
      k: p._k, exp, si: p.si, gi: p.gi, cap: p.capEl.textContent, want: p.scenes[p.si].segs[p.gi].display, playing: p.playing,
      quiz: !p.quizEl.hidden, ended: p.ended, total: p.total, scenes: p.scenes.map(s => ({ t: s.sc.t, start: s.start })), frac: p.maxFrac };
  }, i);
}

async function run(hash, opts) {
  const srv = await serve(opts); const port = srv.address().port;
  const browser = await chromium.launch(); const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = []; page.on('pageerror', e => errors.push(e.message)); page.on('console', m => { if (m.type() === 'error' && !/ERR_TUNNEL_CONNECTION_FAILED|fonts\.g/.test(m.text())) errors.push(m.text()); }); // the test box blocks Google Fonts
  try {
    await page.goto(`http://127.0.0.1:${port}/index.html#${hash}`); await page.waitForSelector('.vp', { timeout: 15000 });
    const idx = await page.evaluate(() => VIDEO.Player.all().findIndex(p => p.au));
    if (idx < 0) { ok(!!opts.noAudio || false, `${hash}: no recorded video on this page`); return; }
    const vp = page.locator('.vp').nth(idx); await vp.scrollIntoViewIfNeeded();
    await vp.locator('.vp-pbtn').click(); await sleep(2500);
    let s = await state(page, idx);
    if (opts.noAudio) {
      ok(!s.mode, 'missing audio: player falls back from recorded mode');
      ok(s.playing, 'missing audio: video keeps playing on captions');
      ok(await vp.locator('.vp-toast').isVisible(), 'missing audio: a toast explains the fallback');
      return;
    }
    ok(s.mode && !s.paused && s.t > 1, `plays recorded narration (t=${s.t && s.t.toFixed(2)}s of ${s.total.toFixed(1)}s)`);
    await sleep(6000); s = await state(page, idx);
    ok(s.k === s.exp, `segment follows the audio clock (k=${s.k}, expected ${s.exp} at ${s.t.toFixed(2)}s)`);
    ok(s.cap === s.want, 'caption matches the current segment');
    // next scene
    const before = s.si; await vp.locator('.vp-next').click(); await sleep(700); s = await state(page, idx);
    const sc = s.scenes[s.si];
    ok(s.si === before + 1 && Math.abs(s.t - sc.start) < 0.9, `next scene jumps the audio (scene ${s.si}, t=${s.t.toFixed(2)} vs ${sc.start.toFixed(2)})`);
    // speed and mute
    await vp.locator('.vp-rate').click(); await sleep(200); s = await state(page, idx); ok(Math.abs(s.rate - 1.15) < 0.01, `speed button sets playbackRate (${s.rate})`);
    await vp.locator('.vp-rate').click(); await vp.locator('.vp-rate').click(); await vp.locator('.vp-rate').click(); await vp.locator('.vp-rate').click(); await sleep(200);
    s = await state(page, idx); ok(Math.abs(s.rate - 1) < 0.01, `speed cycles back to 1× (${s.rate})`);
    await vp.locator('.vp-snd').click(); await sleep(150); s = await state(page, idx); ok(s.muted === true, 'narration off mutes the audio');
    await vp.locator('.vp-snd').click(); await sleep(150); s = await state(page, idx); ok(s.muted === false, 'narration on unmutes');
    // pause / resume
    await vp.locator('.vp-play').click(); await sleep(400); const t1 = (await state(page, idx)).t; await sleep(800); s = await state(page, idx);
    ok(s.paused && Math.abs(s.t - t1) < 0.05, 'pause stops the audio');
    await vp.locator('.vp-play').click(); await sleep(900); s = await state(page, idx); ok(!s.paused && s.t > t1 + 0.4, 'play resumes from the same point');
    // seek bar to 50%
    const bar = vp.locator('.vp-bar'); const bb = await bar.boundingBox(); await page.mouse.click(bb.x + bb.width * 0.5, bb.y + bb.height / 2); await sleep(500);
    s = await state(page, idx); ok(Math.abs(s.t - s.total * 0.5) < 25 && s.k === s.exp, `seek bar moves the audio (t=${s.t.toFixed(1)} of ${s.total.toFixed(1)})`);
    // quiz scene
    const qi = s.scenes.findIndex(x => x.t === 'quiz');
    if (qi >= 0) {
      await page.evaluate(([i, qi]) => VIDEO.Player.all()[i].jump(qi, 0), [idx, qi]);
      let waited = 0; do { await sleep(500); waited += 500; s = await state(page, idx); } while (!s.quiz && waited < 40000);
      ok(s.quiz && s.paused, `quiz appears after its question and pauses the audio (${(waited / 1000).toFixed(1)}s)`);
      await vp.locator('.vp-qo button').first().click(); await vp.locator('.vp-cont').click(); await sleep(900); s = await state(page, idx);
      if (qi < s.scenes.length - 1) ok(!s.paused && s.si === qi + 1 && s.t >= s.scenes[qi + 1].start - 0.2, `continue resumes at the next scene (scene ${s.si}, t=${s.t.toFixed(2)})`);
      else ok(s.ended, 'quiz at the end finishes the video');
    } else console.log('  · no quiz scene in this video');
    // end of video
    if (!s.ended) {
      const last = s.scenes.length - 1; await page.evaluate(([i, l]) => VIDEO.Player.all()[i].jump(l, 0), [idx, last]);
      if (!(await state(page, idx)).playing) await vp.locator('.vp-play').click();
      let waited = 0; do { await sleep(500); waited += 500; s = await state(page, idx); } while (!s.ended && waited < 60000);
      ok(s.ended && (await vp.locator('.vp-end').isVisible()), `video ends cleanly (${(waited / 1000).toFixed(1)}s)`);
      await vp.locator('.vp-replay').click(); await sleep(1500); s = await state(page, idx);
      ok(!s.paused && s.si === 0 && s.t < 3, 'replay starts from the beginning');
    }
    ok(!errors.length, 'no page errors' + (errors.length ? ': ' + errors.slice(0, 3).join(' | ') : ''));
  } finally { await browser.close(); srv.close(); }
}

(async () => {
  const hashes = process.argv.slice(2).filter(a => !a.startsWith('--'));
  const list = hashes.length ? hashes : ['m-0-s1'];
  for (const h of list) { console.log(`\n${h}`); await run(h, {}); }
  console.log(`\n${list[0]} without HTTP range support`); await run(list[0], { noRange: true });
  console.log(`\n${list[0]} with the audio file missing`); await run(list[0], { noAudio: true });
  console.log(fails ? `\n${fails} check(s) failed` : '\nAll audio checks passed'); process.exitCode = fails ? 1 : 0;
})();

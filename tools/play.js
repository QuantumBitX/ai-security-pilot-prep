/* Plays the first video on a page in caption-only mode and captures frames. node tools/play.js <hash> <outprefix> <seconds> [w] [h] [videoIndex] */
const { chromium } = require('playwright');
(async () => {
  const [hash, out, secs = '20', w = '1280', h = '900', vi = '0'] = process.argv.slice(2);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: +w, height: +h } });
  const logs = []; page.on('console', m => { if (m.type() === 'error' && !/ERR_TUNNEL/.test(m.text())) logs.push(m.text()); }); page.on('pageerror', e => logs.push('pageerror: ' + e.message));
  await page.addInitScript(() => { localStorage.setItem('aisec-pilot-v1', JSON.stringify({ v: 1, prefs: { narration: false, captions: true, rate: 1.5, voice: '', text: 'm' } })); });
  await page.goto('http://127.0.0.1:8765/local.html#' + hash); await page.waitForTimeout(800);
  const vp = (await page.$$('.vp'))[+vi]; if (!vp) { console.log('no video'); process.exit(1); }
  await vp.scrollIntoViewIfNeeded(); await (await vp.$('.vp-pbtn')).click();
  const frames = []; const n = Math.max(1, Math.floor(+secs / 2));
  for (let i = 0; i < n; i++) {
    await page.waitForTimeout(2000);
    const info = await vp.evaluate(el => ({ cap: el.querySelector('.vp-cap').textContent, time: el.querySelector('.vp-time').textContent, quiz: !el.querySelector('.vp-quiz').hidden, end: !el.querySelector('.vp-end').hidden }));
    frames.push(info);
    if (i % 3 === 0 || info.quiz || info.end) await vp.screenshot({ path: `${out}-${String(i).padStart(2, '0')}.png` });
    if (info.quiz) { const b = await vp.$('.vp-qo button'); await b.click(); await page.waitForTimeout(400); await vp.screenshot({ path: `${out}-${String(i).padStart(2, '0')}q.png` }); await (await vp.$('.vp-cont')).click(); }
    if (info.end) break;
  }
  frames.forEach((f, i) => console.log(`${String(i * 2 + 2).padStart(3)}s  ${f.time.padEnd(12)} ${f.quiz ? '[QUIZ] ' : ''}${f.end ? '[END] ' : ''}${f.cap.slice(0, 90)}`));
  const st = await page.evaluate(() => JSON.parse(localStorage.getItem('aisec-pilot-v1')).vid);
  console.log('saved video progress:', JSON.stringify(st));
  console.log(logs.length ? 'ERRORS:\n' + logs.join('\n') : 'no console errors');
  await browser.close();
})();

/* Screenshot + console check. Usage: node tools/shot.js <hash> <out.png> [w] [h] [dark] [waitMs] [js-to-run-before-shot] */
const { chromium } = require('playwright');
(async () => {
  const [hash = '', out = 'shot.png', w = '1280', h = '900', dark = '', wait = '600', pre = ''] = process.argv.slice(2);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, colorScheme: dark === 'dark' ? 'dark' : 'light' });
  const logs = [];
  page.on('console', m => { if (['error', 'warning'].includes(m.type())) logs.push(m.type() + ': ' + m.text()); });
  page.on('pageerror', e => logs.push('pageerror: ' + e.message));
  await page.addInitScript(() => { try { const s = JSON.parse(localStorage.getItem('aisec-pilot-v1') || 'null'); if (!s) localStorage.setItem('aisec-pilot-v1', JSON.stringify({ v: 1, prefs: { narration: false, captions: true, rate: 1, voice: '', text: 'm' } })); } catch (e) { } });
  await page.goto('http://127.0.0.1:8765/local.html' + (hash ? '#' + hash : ''), { waitUntil: 'load' });
  await page.waitForTimeout(+wait);
  if (pre) { await page.evaluate(pre).catch(e => logs.push('pre error: ' + e.message)); await page.waitForTimeout(+wait); }
  await page.screenshot({ path: out, fullPage: false });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1 ? `horizontal overflow: ${document.documentElement.scrollWidth} > ${window.innerWidth}` : '');
  if (overflow) logs.push(overflow);
  console.log(logs.length ? logs.join('\n') : 'no console errors');
  await browser.close();
})();

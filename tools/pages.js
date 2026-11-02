/* Phone + desktop screenshots of key pages. */
const { chromium } = require('playwright');
const S = process.argv[2];
(async () => {
  const browser = await chromium.launch();
  const shots = [['home', 390, 844, 'light'], ['m-1-1', 390, 844, 'light'], ['m-1-1-s1', 390, 844, 'dark'], ['m-1-1-s4', 1280, 860, 'light'], ['quiz-1-1', 390, 844, 'light'], ['plan', 390, 844, 'light'], ['blueprint', 1280, 860, 'dark'], ['tests', 390, 844, 'light']];
  const logs = [];
  for (const [h, w, ht, scheme] of shots) {
    const page = await browser.newPage({ viewport: { width: w, height: ht }, colorScheme: scheme });
    page.on('console', m => { if (m.type() === 'error' && !/ERR_TUNNEL/.test(m.text())) logs.push(h + ': ' + m.text()); }); page.on('pageerror', e => logs.push(h + ' pageerror: ' + e.message));
    await page.addInitScript(() => { localStorage.setItem('aisec-pilot-v1', JSON.stringify({ v: 1, target: '2026-12-18', prefs: { narration: false, captions: true, rate: 1, voice: '', text: 'm' }, sec: { '0/s1': 1, '0/s2': 1, '1.1/s1': 1 }, quiz: { '0': { best: 88, last: 88, n: 1, at: 1 } }, qh: { '0-q01': [1, 1, 1, 1], '0-q02': [0, 1, 0, 1] }, log: {} })); });
    await page.goto('http://127.0.0.1:8765/local.html#' + h); await page.waitForTimeout(900);
    if (h === 'quiz-1-1') { await page.click('.go'); await page.waitForTimeout(300); await page.click('.q-opt'); await page.waitForTimeout(300); }
    const ov = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (ov > 1) logs.push(`${h} @${w}: horizontal overflow ${ov}px`);
    await page.screenshot({ path: `${S}/pg-${h}-${w}.png`, fullPage: false });
    await page.close();
  }
  console.log(logs.join('\n') || 'no errors, no overflow');
  await browser.close();
})();

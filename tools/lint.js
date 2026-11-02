/* Layout lint for video scenes: renders every scene (final beat) via dist/scenes.html and reports
   visible text that leaves the stage, collides with other text, or overflows the box it sits in.
   Usage: node tools/lint.js m1-2 [m1-3 ...]   (local server must be serving dist on :8765) */
const { chromium } = require('playwright');
(async () => {
  let mods = process.argv.slice(2); if (!mods.length) mods = require("fs").readdirSync(require("path").join(__dirname, "..", "content")).filter(f => /^m[0-9F].*\.js$/.test(f)).map(f => f.replace(/\.js$/, "")); /* no arguments: lint every module */
  const browser = await chromium.launch(); const page = await browser.newPage({ viewport: { width: 1800, height: 1000 } });
  let total = 0;
  for (const m of mods) {
    await page.goto(`http://127.0.0.1:8765/scenes.html?m=${m}&cols=3`);
    await page.waitForSelector('body[data-ready="1"]', { timeout: 30000 }); await page.waitForTimeout(300);
    const issues = await page.evaluate(() => {
      const out = [];
      const visible = el => { for (let e = el; e && e.tagName !== 'svg'; e = e.parentNode) { const cs = getComputedStyle(e); if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) < 0.05) return false; } return true; };
      let video = '';
      document.querySelectorAll('#out > *').forEach(node => {
        if (node.tagName === 'H2') { video = node.textContent; return; }
        node.querySelectorAll('.cell').forEach((cell, si) => {
          const svg = cell.querySelector('svg.vs'); if (!svg) return; const R = svg.getBoundingClientRect(); const k = 1600 / R.width;
          const box = e => { const r = e.getBoundingClientRect(); return { x: (r.left - R.left) * k, y: (r.top - R.top) * k, w: r.width * k, h: r.height * k }; };
          const clipOf = t => { const a = t.closest('[clip-path]'); if (!a) return null; const id = (a.getAttribute('clip-path').match(/#([^)]+)/) || [])[1]; const r = id && svg.querySelector('#' + CSS.escape(id) + ' rect'); return r ? box(r) : null; };
          const clampTo = (b, c) => { if (!c) return b; const x = Math.max(b.x, c.x), y = Math.max(b.y, c.y), x2 = Math.min(b.x + b.w, c.x + c.w), y2 = Math.min(b.y + b.h, c.y + c.h); return x2 > x && y2 > y ? { x, y, w: x2 - x, h: y2 - y } : null; };
          const texts = Array.from(svg.querySelectorAll('text')).filter(t => t.textContent.trim() && visible(t)).map(t => ({ t, b: clampTo(box(t), clipOf(t)), s: t.textContent.trim().slice(0, 40) })).filter(o => o.b);
          const where = `${video.split(' — ')[0]} scene ${si + 1}`;
          texts.forEach(({ b, s }) => { if (b.x < 6 || b.y < 6 || b.x + b.w > 1594 || b.y + b.h > 894) out.push(`${where}: off-stage "${s}" (${Math.round(b.x)},${Math.round(b.y)} ${Math.round(b.w)}×${Math.round(b.h)})`); });
          for (let i = 0; i < texts.length; i++) for (let j = i + 1; j < texts.length; j++) {
            const a = texts[i].b, c = texts[j].b; const ix = Math.min(a.x + a.w, c.x + c.w) - Math.max(a.x, c.x), iy = Math.min(a.y + a.h, c.y + c.h) - Math.max(a.y, c.y);
            if (ix > 4 && iy > 4) { const area = ix * iy, small = Math.min(a.w * a.h, c.w * c.h); if (area > 0.05 * small && area > 80) out.push(`${where}: overlap "${texts[i].s}" × "${texts[j].s}"`); }
          }
          const title = texts.find(o => o.t.getAttribute('font-size') === '54');
          if (title) Array.from(svg.querySelectorAll('rect')).filter(r => r.getAttribute('fill') !== 'none' && visible(r)).forEach(r => { const rb = clampTo(box(r), clipOf(r)); if (!rb || rb.w > 1500 || rb.w < 30) return; const a = title.b; const ix = Math.min(a.x + a.w, rb.x + rb.w) - Math.max(a.x, rb.x), iy = Math.min(a.y + a.h, rb.y + rb.h) - Math.max(a.y, rb.y); if (ix > 4 && iy > 4) out.push(`${where}: a box overlaps the title (${Math.round(rb.x)},${Math.round(rb.y)})`); });
          texts.forEach(({ t, b, s }) => {
            const rects = Array.from(t.parentNode.children).filter(r => r.tagName === 'rect' && r.getAttribute('fill') !== 'none' && visible(r));
            rects.forEach(r => { const rb = box(r); const cx = b.x + b.w / 2, cy = b.y + b.h / 2; if (rb.w < 40 || rb.h < 30) return;
              if (cx > rb.x && cx < rb.x + rb.w && cy > rb.y && cy < rb.y + rb.h) { const over = Math.max(rb.x - b.x, b.x + b.w - (rb.x + rb.w), rb.y - b.y, b.y + b.h - (rb.y + rb.h)); if (over > 3) out.push(`${where}: "${s}" overflows its box by ${Math.round(over)}`); } });
          });
        });
      });
      return out;
    });
    total += issues.length; console.log(`${m}: ${issues.length ? issues.length + ' issue(s)' : 'clean'}`); issues.forEach(i => console.log('  ' + i));
  }
  await browser.close(); process.exit(total ? 2 : 0);
})();

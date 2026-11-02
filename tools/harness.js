/* Writes dist/scenes.html: renders every video scene of a module (final frame) in a grid for visual QA,
   and node tools/harness.js shot <module> <out.png> screenshots it. */
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..'), SRC = path.join(ROOT, 'src'), DIST = path.join(ROOT, 'dist');
const css = fs.readFileSync(path.join(SRC, 'styles.css'), 'utf8');
const js = ['icons.js', 'video.js'].map(f => fs.readFileSync(path.join(SRC, f), 'utf8')).join('\n');
const html = `<!doctype html><html><head><meta charset="utf-8"><style>${css}
body{background:#05080f;color:#ccd;font:13px system-ui;margin:0;padding:12px}
.grid{display:grid;grid-template-columns:repeat(var(--cols,3),1fr);gap:10px}
.cell{background:#0E1527;border-radius:8px;overflow:hidden}body.lt .cell{background:#fff}.cell svg{display:block;width:100%;height:auto}
.cap{padding:4px 8px;font:11px ui-monospace,monospace;color:#2a7}
h2{font:600 14px system-ui;color:inherit;margin:14px 0 6px}</style></head><body><div id="out"></div>
<script>${js}</script>
<script>
(async()=>{
  const q=new URLSearchParams(location.search); const m=q.get('m'); const only=q.get('v'); const beat=q.get('b'); const th=q.get('theme')||'light'; window.VIDEO.setTheme(th); if(th==='light'){ document.body.style.background='#E4E8ED'; document.body.style.color='#1F2328'; }
  document.documentElement.style.setProperty('--cols', q.get('cols')||3);
  const data=await (await fetch('data/'+m+'.json')).json();
  const out=document.getElementById('out'); let vi=0;
  for(const s of data.sections){ for(const b of s.blocks){ if(b.type!=='video' && b.type!=='diagram') continue; vi++; if(only && String(vi)!==only) continue;
    const h=document.createElement('h2'); h.textContent=(b.code||'diagram')+' — '+(b.title||b.caption||''); out.appendChild(h);
    const grid=document.createElement('div'); grid.className='grid'; out.appendChild(grid);
    const scenes=b.type==='video'?b.scenes:[b.scene];
    scenes.forEach((sc,i)=>{ const c=document.createElement('div'); c.className='cell'; grid.appendChild(c);
      let scene=sc; if(beat!=null){ const segs=String(sc.say||'').split('|').filter(x=>x.trim()); const k=Math.min(+beat, segs.length-1); scene=Object.assign({},sc,{say:segs.slice(0,k+1).join('|')}); }
      window.VIDEO.renderStatic(c, scene, b.domain!=null?b.domain:data.domain, sc.title);
      const cap=document.createElement('div'); cap.className='cap'; cap.textContent=(i+1)+'. '+sc.t+(sc.title?' · '+sc.title:''); c.appendChild(cap); });
  }}
  document.body.dataset.ready='1';
})().catch(e=>{document.body.textContent='ERR '+e.message; document.body.dataset.ready='1';});
</script></body></html>`;
fs.writeFileSync(path.join(DIST, 'scenes.html'), html);
if (process.argv[2] === 'shot') {
  const { chromium } = require('playwright');
  (async () => {
    const [, , , mod, out, cols = '3', v = '', b = '', th = 'light'] = process.argv;
    const browser = await chromium.launch(); const page = await browser.newPage({ viewport: { width: 1800, height: 1000 } });
    const logs = []; page.on('console', m => { if (m.type() === 'error') logs.push(m.text()); }); page.on('pageerror', e => logs.push('pageerror: ' + e.message));
    await page.goto(`http://127.0.0.1:8765/scenes.html?m=${mod}&cols=${cols}${v ? '&v=' + v : ''}${b !== '' ? '&b=' + b : ''}&theme=${th}`);
    await page.waitForSelector('body[data-ready="1"]', { timeout: 20000 }); await page.waitForTimeout(400);
    await page.screenshot({ path: out, fullPage: true });
    console.log(logs.filter(l => !/ERR_TUNNEL|fonts/.test(l)).join('\n') || 'no errors');
    await browser.close();
  })();
}

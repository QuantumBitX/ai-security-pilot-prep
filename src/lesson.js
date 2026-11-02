/* Lesson rendering: module overview, section pages and interactive blocks. */
(function () {
  'use strict';
  const L = {};
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
  function inline(s) {
    return esc(s)
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>')
      .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  }
  function md(src) {
    if (!src) return '';
    const lines = String(src).replace(/\r/g, '').replace(/^\n+|\s+$/g, '').split('\n');
    const out = []; let para = [], list = null;
    const flushP = () => { if (para.length) { out.push('<p>' + inline(para.join(' ')) + '</p>'); para = []; } };
    const flushL = () => { if (list) { out.push(`<${list.t}>` + list.items.map(i => '<li>' + inline(i) + '</li>').join('') + `</${list.t}>`); list = null; } };
    let tbl = null;
    const cells = l => l.replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim());
    const flushT = () => { if (tbl) { const [h, ...rows] = tbl.filter(r => !/^\|?\s*:?-{2,}/.test(r)); out.push(`<div class="tbl"><table><thead><tr>${cells(h).map(c => `<th scope="col">${inline(c)}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${cells(r).map(c => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`); tbl = null; } };
    for (const raw of lines) {
      const ln = raw.trim();
      if (ln.startsWith('|')) { flushP(); flushL(); (tbl = tbl || []).push(ln); continue; } else flushT();
      if (!ln) { flushP(); flushL(); continue; }
      let m;
      if ((m = ln.match(/^###\s+(.*)/))) { flushP(); flushL(); out.push('<h3>' + inline(m[1]) + '</h3>'); continue; }
      if ((m = ln.match(/^[-•]\s+(.*)/))) { flushP(); if (!list || list.t !== 'ul') { flushL(); list = { t: 'ul', items: [] }; } list.items.push(m[1]); continue; }
      if ((m = ln.match(/^\d+[.)]\s+(.*)/))) { flushP(); if (!list || list.t !== 'ol') { flushL(); list = { t: 'ol', items: [] }; } list.items.push(m[1]); continue; }
      if (list) { list.items[list.items.length - 1] += ' ' + ln; continue; }
      para.push(ln);
    }
    flushP(); flushL(); flushT();
    return out.join('');
  }
  function icon(name, cls) { return `<svg viewBox="0 0 24 24" class="${cls || ''}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${(window.ICONS && window.ICONS[name]) || ''}</svg>`; }
  function node(html) { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; }
  function shuffle(a, seed) { const r = (() => { let s = seed || Math.floor(Math.random() * 1e9); return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; })(); const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }
  L.esc = esc; L.md = md; L.inline = inline; L.icon = icon; L.node = node; L.shuffle = shuffle;

  /* One multiple-choice question with instant feedback. q: {id,q,o,a,why}. */
  L.question = function (q, opts) {
    opts = opts || {};
    const order = q.fixed ? q.o.map((_, i) => i) : shuffle(q.o.map((_, i) => i));
    const letters = 'ABCDEF';
    const el = node(`<div class="q"><div class="q-stem">${inline(q.q)}</div><div class="q-opts">${order.map((oi, k) => `<button type="button" class="q-opt" data-i="${oi}"><b>${letters[k]}</b><span>${inline(q.o[oi])}</span></button>`).join('')}</div><div class="q-fb" hidden></div></div>`);
    const fb = el.querySelector('.q-fb');
    el.querySelectorAll('.q-opt').forEach(b => b.addEventListener('click', () => {
      const i = +b.dataset.i; const ok = i === q.a;
      el.querySelectorAll('.q-opt').forEach(x => { x.disabled = true; const xi = +x.dataset.i; if (xi === q.a) x.classList.add('ok'); else if (xi === i) x.classList.add('bad'); });
      fb.hidden = false; fb.className = 'q-fb ' + (ok ? 'ok' : 'bad');
      fb.innerHTML = `<strong>${ok ? 'Correct.' : 'Not quite.'}</strong> ${inline(q.why || '')}`;
      if (opts.onAnswer) opts.onAnswer(q, ok, i);
    }));
    return el;
  };

  const CALLOUT = { exam: ['Exam tip', 'target'], key: ['Key term', 'tag'], real: ['In practice', 'building'], warn: ['Watch out', 'alert'], remember: ['Remember', 'bulb'] };
  const B = {};
  B.text = b => node(`<div class="prose">${md(b.md)}</div>`);
  B.callout = b => { const [def, ic] = CALLOUT[b.kind] || CALLOUT.exam; return node(`<aside class="callout ${b.kind || 'exam'}">${icon(ic)}<div><div class="ct">${esc(b.title || def)}</div><div class="prose">${md(b.md)}</div></div></aside>`); };
  B.video = (b, ctx) => {
    const wrap = node('<div class="vid"></div>');
    const p = new window.VIDEO.Player(wrap, b, {
      watched: ctx.state.vid[b.id] || 0,
      prefs: () => ctx.state.prefs, setPref: (k, v) => ctx.setPref(k, v),
      onProgress: f => { ctx.onVideo(b.id, f); upd(); },
      onQuiz: (sc, ok) => ctx.onVideoQuiz && ctx.onVideoQuiz(b, sc, ok)
    });
    const meta = node('<div class="vid-meta"><span class="vm-l"></span><span class="vm-r"></span></div>');
    wrap.appendChild(meta);
    const upd = () => { const f = ctx.state.vid[b.id] || 0; meta.querySelector('.vm-l').innerHTML = f >= 0.9 ? '<span class="ok">✓ Watched</span>' : f > 0 ? `${Math.round(f * 100)}% watched` : 'Not watched yet'; meta.querySelector('.vm-r').textContent = 'Tip: use full screen in landscape on a phone'; };
    upd(); ctx.players.push(p);
    return wrap;
  };
  B.diagram = (b, ctx) => { const f = node(`<figure class="diagram vt-${window.VIDEO.theme}"></figure>`); window.VIDEO.renderStatic(f, b.scene, ctx.domain, b.caption); if (b.caption) f.appendChild(node(`<figcaption>${inline(b.caption)}</figcaption>`)); return f; };
  B.flip = b => {
    const el = node(`<div>${b.title ? `<div class="blk-title">${esc(b.title)}</div>` : ''}${b.sub ? `<div class="blk-sub">${esc(b.sub)}</div>` : '<div class="blk-sub">Tap each card to check yourself.</div>'}<div class="flips"></div></div>`);
    const grid = el.querySelector('.flips');
    b.cards.forEach(([f, back]) => { const c = node(`<button type="button" class="flip" aria-pressed="false"><span class="flip-i"><span class="flip-f">${inline(f)}</span><span class="flip-b">${inline(back)}</span></span></button>`); c.addEventListener('click', () => { const on = !c.classList.contains('on'); c.classList.toggle('on', on); c.classList.add('done'); c.setAttribute('aria-pressed', on); }); grid.appendChild(c); });
    return el;
  };
  B.accordion = b => { const el = node(`<div>${b.title ? `<div class="blk-title">${esc(b.title)}</div>` : ''}<div class="acc">${b.items.map(([t, body]) => `<details><summary>${inline(t)}</summary><div class="prose">${md(body)}</div></details>`).join('')}</div></div>`); return el; };
  B.tabs = b => {
    const uid = 't' + Math.random().toString(36).slice(2, 8);
    const el = node(`<div>${b.title ? `<div class="blk-title">${esc(b.title)}</div>` : ''}<div class="tabs"><div class="tab-l" role="tablist">${b.items.map(([t], i) => `<button type="button" role="tab" id="${uid}-${i}" aria-selected="${i === 0}" aria-controls="${uid}-p${i}">${esc(t)}</button>`).join('')}</div>${b.items.map(([, body], i) => `<div class="tab-p prose" role="tabpanel" id="${uid}-p${i}" aria-labelledby="${uid}-${i}" ${i ? 'hidden' : ''}>${md(body)}</div>`).join('')}</div></div>`);
    const btns = el.querySelectorAll('[role=tab]'), panes = el.querySelectorAll('[role=tabpanel]');
    btns.forEach((bt, i) => bt.addEventListener('click', () => { btns.forEach((x, j) => x.setAttribute('aria-selected', i === j)); panes.forEach((p, j) => p.hidden = i !== j); }));
    return el;
  };
  B.steps = b => {
    const el = node(`<div>${b.title ? `<div class="blk-title">${esc(b.title)}</div>` : ''}<div class="steps"><div class="steps-n"></div><div class="steps-b"></div><div class="row between"><button type="button" class="btn ghost small st-prev">Previous</button><button type="button" class="btn small st-next">Next step</button></div></div></div>`);
    const nav = el.querySelector('.steps-n'), body = el.querySelector('.steps-b'); let cur = 0; const seen = new Set([0]);
    b.items.forEach((_, i) => { const bt = node(`<button type="button" aria-label="Step ${i + 1}">${i + 1}</button>`); bt.addEventListener('click', () => go(i)); nav.appendChild(bt); });
    const go = i => { cur = i; seen.add(i); const [t, d] = b.items[i]; body.innerHTML = `<div class="steps-h"><small>Step ${i + 1} of ${b.items.length}</small>${inline(t)}</div><div class="prose">${md(d)}</div>`; nav.querySelectorAll('button').forEach((x, j) => { x.classList.toggle('on', j === i); x.classList.toggle('seen', seen.has(j)); }); el.querySelector('.st-prev').disabled = i === 0; const nx = el.querySelector('.st-next'); nx.disabled = i === b.items.length - 1; nx.textContent = i === b.items.length - 1 ? 'Last step' : 'Next step'; };
    el.querySelector('.st-prev').addEventListener('click', () => go(Math.max(0, cur - 1)));
    el.querySelector('.st-next').addEventListener('click', () => go(Math.min(b.items.length - 1, cur + 1)));
    go(0); return el;
  };
  B.table = b => node(`<div>${b.title ? `<div class="blk-title">${esc(b.title)}</div>` : ''}<div class="tbl"><table><thead><tr>${b.head.map(x => `<th scope="col">${inline(x)}</th>`).join('')}</tr></thead><tbody>${b.rows.map(r => `<tr>${r.map(c => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div>`);
  B.scenario = (b, ctx) => {
    const el = node(`<div class="scn"><div class="eyebrow">Scenario${b.title ? ' · ' + esc(b.title) : ''}</div><div class="prose">${md(b.md)}</div></div>`);
    if (b.q) { const qq = L.question(b.q, { onAnswer: (q, ok) => ctx.onCheck(q, ok) }); qq.style.marginTop = '14px'; el.appendChild(qq); }
    return el;
  };
  B.check = (b, ctx) => { const el = node(`<div class="scn"><div class="eyebrow">Check your understanding</div></div>`); el.appendChild(L.question(b.q, { onAnswer: (q, ok) => ctx.onCheck(q, ok) })); return el; };
  B.match = b => {
    const el = node(`<div class="scn"><div class="eyebrow">Matching exercise</div>${b.title ? `<div class="blk-title">${esc(b.title)}</div>` : ''}<div class="blk-sub">${esc(b.prompt || 'Tap an item on the left, then its match on the right.')}</div><div class="match"><div class="match-cols"><div class="match-col ml"></div><div class="match-col mr"></div></div><div class="row"><button type="button" class="btn small mk">Check answers</button><button type="button" class="btn ghost small mx">Reset</button><span class="muted mres"></span></div></div></div>`);
    const ml = el.querySelector('.ml'), mr = el.querySelector('.mr'); let sel = null; const pairs = {};
    const right = shuffle(b.pairs.map((p, i) => i));
    const render = () => {
      ml.innerHTML = ''; mr.innerHTML = '';
      b.pairs.forEach(([l], i) => { const bt = node(`<button type="button" data-i="${i}">${pairs[i] != null ? `<span class="tagn">${String.fromCharCode(65 + right.indexOf(pairs[i]))}</span>` : ''}${inline(l)}</button>`); if (sel === i) bt.classList.add('sel'); if (pairs[i] != null) bt.classList.add('paired'); bt.addEventListener('click', () => { sel = sel === i ? null : i; render(); }); ml.appendChild(bt); });
      right.forEach((ri, k) => { const used = Object.values(pairs).includes(ri); const bt = node(`<button type="button" data-r="${ri}"><span class="tagn">${String.fromCharCode(65 + k)}</span>${inline(b.pairs[ri][1])}</button>`); if (used) bt.classList.add('paired'); bt.addEventListener('click', () => { if (sel == null) return; Object.keys(pairs).forEach(k2 => { if (pairs[k2] === ri) delete pairs[k2]; }); pairs[sel] = ri; sel = null; render(); }); mr.appendChild(bt); });
    };
    el.querySelector('.mk').addEventListener('click', () => { let ok = 0; ml.querySelectorAll('button').forEach(bt => { const i = +bt.dataset.i; const good = pairs[i] === i; if (good) ok++; bt.classList.add(good ? 'ok' : 'bad'); }); el.querySelector('.mres').textContent = `${ok} of ${b.pairs.length} correct${ok === b.pairs.length ? ' — well done.' : '. Wrong pairs are marked red; reset to try again.'}`; });
    el.querySelector('.mx').addEventListener('click', () => { Object.keys(pairs).forEach(k => delete pairs[k]); sel = null; el.querySelector('.mres').textContent = ''; render(); });
    render(); return el;
  };
  L.blocks = B;

  L.renderBlocks = function (host, blocks, ctx) {
    blocks.forEach(b => {
      const fn = B[b.type]; if (!fn) return;
      try { host.appendChild(fn(b, ctx)); }
      catch (e) { console.error('Block failed', b, e); host.appendChild(node(`<div class="empty">This block could not be displayed.</div>`)); }
    });
  };
  window.LESSON = L;
})();

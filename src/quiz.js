/* Knowledge checks (learning mode) and timed exams (domain tests, mock exams). */
(function () {
  'use strict';
  const L = window.LESSON; const esc = L.esc, inline = L.inline, node = L.node;
  const Q = {};
  const letters = 'ABCDEF';
  function verdict(p) { return p >= 80 ? ['ok', 'Strong. You are scoring at exam-ready level on this material.'] : p >= 70 ? ['warn', 'Close. Review the questions you missed, then retest.'] : ['bad', 'Not there yet. Revisit the sections behind the missed questions before retesting.']; }
  function fmt(s) { s = Math.max(0, Math.round(s)); const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), ss = s % 60; return (h ? h + ':' + String(m).padStart(2, '0') : m) + ':' + String(ss).padStart(2, '0'); }

  function reviewList(answers, opts) {
    const wrap = node('<div></div>');
    const bar = node(`<div class="row" style="margin-top:18px"><span class="eyebrow">Review</span><span class="top-sp"></span><button type="button" class="btn ghost small" data-f="all">All</button><button type="button" class="btn ghost small" data-f="bad">Incorrect only</button>${opts.flags ? '<button type="button" class="btn ghost small" data-f="flag">Flagged</button>' : ''}</div>`);
    const list = node('<div class="review-list"></div>');
    const draw = f => {
      list.innerHTML = '';
      answers.forEach((a, i) => {
        if (f === 'bad' && a.ok) return; if (f === 'flag' && !a.flag) return;
        const q = a.q; const you = a.chosen == null ? '<em>Not answered</em>' : inline(q.o[a.chosen]);
        const it = node(`<div class="rv-item"><div class="eyebrow">Q${i + 1}${q.mod ? ' · ' + esc(q.mod) : ''}${a.flag ? ' · flagged' : ''}</div><div class="q-stem">${inline(q.q)}</div><div class="rv-ans"><div class="you ${a.ok ? 'ok' : 'bad'}">${a.ok ? '✓' : '✗'} Your answer: ${you}</div>${a.ok ? '' : `<div>Correct answer: <strong>${inline(q.o[q.a])}</strong></div>`}</div><div class="q-fb" style="margin-top:10px">${inline(q.why || '')}</div>${opts.link && q.mod ? `<div style="margin-top:8px"><a href="#m-${q.mod.replace('.', '-')}">Revisit module ${esc(q.mod)}</a></div>` : ''}</div>`);
        list.appendChild(it);
      });
      if (!list.children.length) list.appendChild(node('<div class="empty">Nothing to show here.</div>'));
    };
    bar.querySelectorAll('button').forEach(b => b.addEventListener('click', () => draw(b.dataset.f)));
    wrap.append(bar, list); draw(opts.start || 'all');
    return wrap;
  }

  function resultView(host, cfg, res) {
    const [vk, vt] = verdict(res.pct);
    host.innerHTML = '';
    const card = node(`<div class="qcard result"><div class="eyebrow">${esc(cfg.eyebrow || '')} · Result</div><div class="big">${res.pct}%</div><div class="muted">${res.right} of ${res.total} correct${res.time ? ' · ' + fmt(res.time) + ' used' : ''}</div><div class="verdict"><span class="pill ${vk}">${vk === 'ok' ? 'Exam-ready' : vk === 'warn' ? 'Almost' : 'Keep going'}</span></div><p class="muted" style="max-width:52ch;margin:10px auto 0">${vt}</p><div class="row" style="justify-content:center;margin-top:16px"></div></div>`);
    const row = card.querySelector('.row');
    if (cfg.retry) { const b = node('<button type="button" class="btn">Try again</button>'); b.addEventListener('click', cfg.retry); row.appendChild(b); }
    if (cfg.back) row.appendChild(node(`<a class="btn ghost" href="${cfg.back[1]}">${esc(cfg.back[0])}</a>`));
    host.appendChild(card);
    if (res.byDomain) {
      const dcard = node('<div class="card" style="margin-top:14px"><h3>By domain</h3><div class="perf"></div></div>');
      const pc = dcard.querySelector('.perf');
      Object.keys(res.byDomain).sort().forEach(d => { const v = res.byDomain[d]; const p = v.total ? Math.round(v.right / v.total * 100) : 0; pc.appendChild(node(`<div class="perf-row dc${d}"><b>D${d}</b><div><div>${esc(cfg.domainName ? cfg.domainName(d) : 'Domain ' + d)}</div><div class="s">${v.right} of ${v.total}</div><div class="bar"><i style="width:${p}%"></i></div></div><div class="v">${p}%</div></div>`)); });
      host.appendChild(dcard);
    }
    host.appendChild(reviewList(res.answers, { flags: !!cfg.flags, link: true, start: res.pct === 100 ? 'all' : 'bad' }));
  }

  /* Learning-mode check: instant feedback per question. */
  Q.check = function (host, cfg) {
    const qs = cfg.questions; let i = 0; const answers = [];
    const draw = () => {
      if (i >= qs.length) return done();
      const q = qs[i]; host.innerHTML = '';
      host.appendChild(node(`<div class="quiz-top"><span class="eyebrow">${esc(cfg.eyebrow)} · ${i + 1} of ${qs.length}</span><div class="bar"><i style="width:${(i / qs.length) * 100}%"></i></div></div>`));
      const card = node('<div class="qcard"></div>');
      const nx = node(`<button type="button" class="btn" hidden>${i === qs.length - 1 ? 'See results' : 'Next question'}</button>`);
      card.appendChild(L.question(q, { onAnswer: (qq, ok, chosen) => { answers[i] = { q, ok, chosen }; cfg.onAnswer && cfg.onAnswer(q, ok); nx.hidden = false; nx.focus({ preventScroll: true }); } }));
      const row = node('<div class="row end" style="margin-top:16px"></div>'); row.appendChild(nx); card.appendChild(row);
      nx.addEventListener('click', () => { i++; draw(); host.scrollIntoView({ block: 'start' }); });
      host.appendChild(card);
    };
    const done = () => {
      const right = answers.filter(a => a && a.ok).length; const res = { right, total: qs.length, pct: Math.round(right / qs.length * 100), answers };
      cfg.onDone && cfg.onDone(res); resultView(host, cfg, res);
    };
    draw();
    return { destroy() { } };
  };

  /* Exam mode: timed, no feedback until submission, flags and navigator, resumable session. */
  Q.exam = function (host, cfg) {
    const qs = cfg.questions; const n = qs.length; const byId = {}; qs.forEach(q => byId[q.id] = q);
    let s = cfg.session && cfg.session.qids && cfg.session.qids.length === n ? cfg.session : null;
    if (!s) s = { id: cfg.id, qids: qs.map(q => q.id), ans: Array(n).fill(null), flags: Array(n).fill(0), cur: 0, left: cfg.minutes * 60, orders: qs.map(q => q.fixed ? q.o.map((_, i) => i) : L.shuffle(q.o.map((_, i) => i))), started: Date.now() };
    let timer = null, dirty = false, finished = false;
    const save = () => { if (dirty && cfg.onSave) { cfg.onSave(s); dirty = false; } };
    const tick = () => { if (document.hidden || finished) return; s.left--; dirty = true; const t = host.querySelector('.timer'); if (t) { t.textContent = fmt(s.left); t.classList.toggle('low', s.left < 600); } if (s.left % 15 === 0) save(); if (s.left <= 0) submit(true); };
    const draw = () => {
      const i = s.cur; const q = byId[s.qids[i]]; const order = s.orders[i];
      host.innerHTML = '';
      const top = node(`<div class="quiz-top"><span class="eyebrow">${esc(cfg.eyebrow)} · Question ${i + 1} of ${n}</span><span class="timer" aria-label="Time remaining">${fmt(s.left)}</span><div class="bar" style="flex-basis:100%"><i style="width:${(s.ans.filter(a => a != null).length / n) * 100}%"></i></div></div>`);
      const card = node(`<div class="qcard"><div class="q"><div class="q-stem">${inline(q.q)}</div><div class="q-opts">${order.map((oi, k) => `<button type="button" class="q-opt${s.ans[i] === oi ? ' sel' : ''}" data-i="${oi}"><b>${letters[k]}</b><span>${inline(q.o[oi])}</span></button>`).join('')}</div></div>
        <div class="row between" style="margin-top:16px"><div class="row"><button type="button" class="btn ghost small ex-prev" ${i === 0 ? 'disabled' : ''}>Previous</button><button type="button" class="btn ghost small ex-flag">${s.flags[i] ? 'Unflag' : 'Flag for review'}</button></div><button type="button" class="btn small ex-next">${i === n - 1 ? 'Review and submit' : 'Next'}</button></div></div>`);
      card.querySelectorAll('.q-opt').forEach(b => b.addEventListener('click', () => { s.ans[i] = +b.dataset.i; dirty = true; card.querySelectorAll('.q-opt').forEach(x => x.classList.toggle('sel', x === b)); updNav(); top.querySelector('.bar i').style.width = (s.ans.filter(a => a != null).length / n * 100) + '%'; }));
      card.querySelector('.ex-prev').addEventListener('click', () => { s.cur = Math.max(0, i - 1); dirty = true; draw(); });
      card.querySelector('.ex-next').addEventListener('click', () => { if (i === n - 1) confirmPanel(); else { s.cur = i + 1; dirty = true; draw(); } });
      card.querySelector('.ex-flag').addEventListener('click', () => { s.flags[i] = s.flags[i] ? 0 : 1; dirty = true; draw(); });
      const navCard = node(`<div class="card" style="margin-top:14px"><div class="row between"><h3 style="margin:0">Question navigator</h3><span class="muted" style="font-size:13px">${s.ans.filter(a => a != null).length} answered · ${s.flags.filter(Boolean).length} flagged</span></div><div class="qnav"></div><div class="row end" style="margin-top:14px"><button type="button" class="btn ghost small ex-pause">Save and exit</button><button type="button" class="btn small ex-sub">Submit exam</button></div><div class="ex-conf"></div></div>`);
      const nav = navCard.querySelector('.qnav');
      const updNav = () => { nav.innerHTML = ''; s.qids.forEach((_, j) => { const b = node(`<button type="button" aria-label="Question ${j + 1}">${j + 1}</button>`); if (s.ans[j] != null) b.classList.add('ans'); if (s.flags[j]) b.classList.add('flag'); if (j === i) b.classList.add('cur'); b.addEventListener('click', () => { s.cur = j; dirty = true; draw(); window.scrollTo({ top: 0 }); }); nav.appendChild(b); }); };
      updNav();
      navCard.querySelector('.ex-sub').addEventListener('click', confirmPanel);
      navCard.querySelector('.ex-pause').addEventListener('click', () => { dirty = true; save(); location.hash = cfg.exitHash || 'tests'; });
      host.append(top, card, navCard);
    };
    function confirmPanel() {
      const box = host.querySelector('.ex-conf'); if (!box) return;
      const un = s.ans.filter(a => a == null).length, fl = s.flags.filter(Boolean).length;
      box.innerHTML = ''; const c = node(`<div class="confirm" style="margin-top:12px"><div><strong>Submit now?</strong> ${un ? `${un} question${un > 1 ? 's are' : ' is'} unanswered. ` : ''}${fl ? `${fl} flagged for review. ` : ''}You can’t change answers after submitting.</div><div class="row"><button type="button" class="btn small c-yes">Submit exam</button><button type="button" class="btn ghost small c-no">Keep working</button></div></div>`);
      c.querySelector('.c-yes').addEventListener('click', () => submit(false)); c.querySelector('.c-no').addEventListener('click', () => { box.innerHTML = ''; });
      box.appendChild(c); c.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
    function submit(timeout) {
      if (finished) return; finished = true; clearInterval(timer);
      const answers = s.qids.map((id, j) => { const q = byId[id]; const ch = s.ans[j]; return { q, chosen: ch, ok: ch === q.a, flag: !!s.flags[j] }; });
      const right = answers.filter(a => a.ok).length; const byDomain = {};
      answers.forEach(a => { const d = String(a.q.dom || 0); byDomain[d] = byDomain[d] || { right: 0, total: 0 }; byDomain[d].total++; if (a.ok) byDomain[d].right++; });
      const res = { right, total: n, pct: Math.round(right / n * 100), answers, byDomain, time: cfg.minutes * 60 - s.left, timeout };
      cfg.onDone && cfg.onDone(res);
      resultView(host, Object.assign({}, cfg, { flags: true }), res);
      if (timeout) host.prepend(node('<div class="callout warn" style="margin-bottom:14px"><div></div><div><div class="ct">Time is up</div><div class="prose"><p>The exam was submitted automatically when the timer reached zero.</p></div></div></div>'));
    }
    draw(); timer = setInterval(tick, 1000);
    return { destroy() { clearInterval(timer); if (!finished) { dirty = true; save(); } } };
  };
  Q.fmt = fmt;
  window.QUIZ = Q;
})();

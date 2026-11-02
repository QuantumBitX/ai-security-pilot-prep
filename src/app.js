/* App shell: state, sync, routing and views. */
(function () {
  'use strict';
  const O = window.OUTLINE, BUILD = window.BUILD || { modules: {} };
  const L = window.LESSON, V = window.VIDEO, Q = window.QUIZ;
  const esc = L.esc, node = L.node, icon = L.icon, inline = L.inline, md = L.md;
  const KEY = 'aisec-pilot-v1';

  /* ---------- dates ---------- */
  const dayKey = (d = new Date()) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  const parseDay = k => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d); };
  const dayDiff = (a, b) => Math.round((parseDay(dayKey(b)) - parseDay(dayKey(a))) / 86400000);
  const fmtDay = d => d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  const fmtLong = d => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const nf = n => Number(n).toLocaleString('en-GB');
  const mins = kp => kp >= 90 ? (Math.round(kp / 6) / 10) + ' h' : kp + ' min';

  /* ---------- course model ---------- */
  const MODS = [{ id: '0', title: O.intro.title, kp: O.intro.kp, domain: 0, bullets: [] }];
  O.domains.forEach(d => d.modules.forEach(m => MODS.push(Object.assign({}, m, { domain: d.n }))));
  MODS.push({ id: 'F', title: O.final.title, kp: O.final.kp, domain: 'F', bullets: [] });
  const MOD = {}; MODS.forEach(m => { MOD[m.id] = m; });
  const DOM = {}; O.domains.forEach(d => { DOM[d.n] = d; });
  const TESTS = O.domains.map(d => ({ id: 'test-' + d.n, title: `Domain ${d.n} test`, kp: d.testKP, domain: d.n, kind: 'test' }));
  const MOCKS = O.mocks.map((m, i) => ({ id: 'mock-' + (i + 1), n: i + 1, title: m.title, kp: m.kp, items: m.items, minutes: m.minutes, kind: 'mock' }));
  const modHash = id => 'm-' + String(id).replace('.', '-');
  const secHash = (id, sid) => modHash(id) + '-' + sid;
  const bmeta = id => (BUILD.modules && BUILD.modules[id]) || null;
  const dcls = d => 'dc' + d;

  /* ---------- state ---------- */
  function fresh() { return { v: 1, updatedAt: 0, created: dayKey(), target: '', days: [1, 1, 1, 1, 1, 1, 1], prefs: { rate: 1, narration: true, captions: true, voiceSrc: 'recorded', voice: '', text: 'm', theme: 'light', vtheme: 'light', paAt: '', paAuto: true, paReveal: true, paSkip: false, paBg: false }, sec: {}, vid: {}, quiz: {}, exams: {}, qh: {}, cards: {}, log: {}, last: null, session: null }; }
  function normalize(s) { const f = fresh(); s = s && typeof s === 'object' ? s : {}; for (const k in f) if (s[k] === undefined || s[k] === null && k !== 'last' && k !== 'session') s[k] = f[k]; s.prefs = Object.assign({}, f.prefs, s.prefs || {}); return s; }
  let S = (() => { try { const raw = localStorage.getItem(KEY); if (raw) return normalize(JSON.parse(raw)); } catch (e) { } return fresh(); })();
  function saveLocal() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } }
  function commit() { S.updatedAt = Date.now(); saveLocal(); queueRemote(); }

  /* ---------- sync with the viewer's Claude account (db capability) ---------- */
  const SYNC = { ref: null, status: 'local', writing: false, again: false, timer: null, first: true };
  function merge(a, b) {
    const s = JSON.parse(JSON.stringify(a)); b = normalize(JSON.parse(JSON.stringify(b)));
    const bNewer = (b.updatedAt || 0) > (a.updatedAt || 0);
    if (bNewer) { s.prefs = Object.assign({}, a.prefs, b.prefs); s.target = b.target; s.days = b.days; s.session = b.session || null; if (b.last) s.last = b.last; }
    for (const k in b.sec) if (!s.sec[k]) s.sec[k] = b.sec[k];
    for (const k in b.vid) s.vid[k] = Math.max(s.vid[k] || 0, b.vid[k] || 0);
    ['quiz', 'exams'].forEach(gk => { for (const k in b[gk]) { const x = s[gk][k], y = b[gk][k]; if (!x) s[gk][k] = y; else s[gk][k] = Object.assign({}, (y.n || 0) > (x.n || 0) ? y : x, { best: Math.max(x.best || 0, y.best || 0) }); } });
    for (const k in b.qh) { const x = s.qh[k], y = b.qh[k]; if (!x || (y[1] || 0) > (x[1] || 0)) s.qh[k] = y; }
    for (const k in b.cards) if (!s.cards[k] || bNewer) s.cards[k] = b.cards[k];
    for (const k in b.log) s.log[k] = Math.max(s.log[k] || 0, b.log[k] || 0);
    s.updatedAt = Math.max(a.updatedAt || 0, b.updatedAt || 0);
    return { s, changed: JSON.stringify(s) !== JSON.stringify(a) };
  }
  async function initSync() {
    if (!window.claude || typeof window.claude.use !== 'function') return;
    try {
      const [db, user] = await Promise.all([window.claude.use('db'), window.claude.use('user')]);
      if (!db || !user) return;
      const uid = await user.id(); if (!uid) return;
      SYNC.ref = db.doc('data/users/' + uid + '/state');
      SYNC.ref.onSnapshot(snap => {
        const first = SYNC.first; SYNC.first = false;
        if (!snap.exists) { SYNC.status = 'synced'; syncInd(); if (first && S.updatedAt) queueRemote(true); return; }
        const remote = snap.data() || {};
        const m = merge(S, remote);
        if (m.changed) { S = m.s; saveLocal(); softRefresh(); }
        SYNC.status = 'synced'; syncInd();
        if (first && (S.updatedAt || 0) > (remote.updatedAt || 0)) queueRemote(true);
      }, () => { SYNC.status = 'local'; SYNC.ref = null; syncInd(); });
    } catch (e) { console.warn('Progress sync unavailable', e); }
  }
  function queueRemote(now) { if (!SYNC.ref) return; clearTimeout(SYNC.timer); SYNC.timer = setTimeout(pushRemote, now ? 60 : 2200); }
  async function pushRemote() {
    if (!SYNC.ref) return;
    if (SYNC.writing) { SYNC.again = true; return; }
    SYNC.writing = true;
    try { await SYNC.ref.set(JSON.parse(JSON.stringify(S))); SYNC.status = 'synced'; }
    catch (e) { if (e && (e.code === 'invalid_argument' || e.code === 'revoked' || e.code === 'not_granted')) { SYNC.ref = null; SYNC.status = 'local'; } else { SYNC.status = 'retry'; setTimeout(() => queueRemote(), 9000); } }
    SYNC.writing = false; syncInd();
    if (SYNC.again) { SYNC.again = false; queueRemote(); }
  }
  function syncText() { return SYNC.status === 'synced' ? 'Progress saved to your Claude account' : SYNC.status === 'retry' ? 'Saving… will retry shortly' : 'Progress saved in this browser'; }
  function syncInd() { document.querySelectorAll('.note-ind').forEach(e => { e.classList.toggle('synced', SYNC.status === 'synced'); e.querySelector('span').textContent = syncText(); }); }

  /* ---------- knowledge points ---------- */
  function modEarned(id) { const b = bmeta(id); if (!b) return 0; let e = 0; b.secs.forEach(s => { if (S.sec[id + '/' + s.id]) e += s.kp; }); if (S.quiz[id] && S.quiz[id].n) e += b.quizKP || 0; return Math.min(e, MOD[id].kp); }
  function unitDone(u) { return !!(S.exams[u.id] && S.exams[u.id].n); }
  function earned() { return MODS.reduce((a, m) => a + modEarned(m.id), 0) + TESTS.concat(MOCKS).reduce((a, u) => a + (unitDone(u) ? u.kp : 0), 0); }
  function domEarned(n) { const d = DOM[n]; return d.modules.reduce((a, m) => a + modEarned(m.id), 0) + (unitDone(TESTS[n - 1]) ? d.testKP : 0); }
  function domTotal(n) { const d = DOM[n]; return d.modules.reduce((a, m) => a + m.kp, 0) + d.testKP; }
  function logKP(kp) { const k = dayKey(); S.log[k] = (S.log[k] || 0) + kp; }
  function studyDay(d) { return !!S.days[(d.getDay() + 6) % 7]; }
  function goal() {
    if (!S.target) return null;
    const t = parseDay(S.target), today = parseDay(dayKey()); let days = 0;
    for (let d = new Date(today); d <= t; d.setDate(d.getDate() + 1)) if (studyDay(d)) days++;
    const doneToday = S.log[dayKey()] || 0; const rem = O.totalKP - earned(); const remStart = rem + doneToday;
    return { days, per: days > 0 ? Math.ceil(remStart / days) : remStart, today: doneToday, rem, left: dayDiff(today, t) };
  }
  function qStats(prefix) { let n = 0, r = 0; for (const k in S.qh) { if (prefix && !k.startsWith(prefix)) continue; n++; r += S.qh[k][2] ? 1 : 0; } return { n, r, pct: n ? Math.round(r / n * 100) : null }; }
  function recordQ(q, ok) { if (!q || !q.id) return; const h = S.qh[q.id] || [0, 0, 0, 0]; h[1]++; if (ok) h[0]++; h[2] = ok ? 1 : 0; h[3] = Date.now(); S.qh[q.id] = h; commit(); }

  /* ---------- course sequence ---------- */
  function sequence() {
    const out = [];
    const addMod = m => { const b = bmeta(m.id); if (b) { b.secs.forEach(s => out.push({ kind: 'sec', mod: m.id, sid: s.id, kp: s.kp, title: s.title, done: !!S.sec[m.id + '/' + s.id], route: secHash(m.id, s.id) })); out.push({ kind: 'quiz', mod: m.id, kp: b.quizKP || 0, title: 'Knowledge check', done: !!(S.quiz[m.id] && S.quiz[m.id].n), route: 'quiz-' + String(m.id).replace('.', '-') }); } else out.push({ kind: 'soon', mod: m.id, kp: m.kp, title: m.title, done: false, route: modHash(m.id) }); };
    addMod(MOD['0']);
    O.domains.forEach(d => { d.modules.forEach(m => addMod(MOD[m.id])); out.push({ kind: 'test', id: 'test-' + d.n, kp: d.testKP, title: `Domain ${d.n} test`, done: unitDone(TESTS[d.n - 1]), route: 'test-' + d.n, dom: d.n, locked: !d.modules.some(m => bmeta(m.id)) }); });
    addMod(MOD.F);
    const allDomains = O.domains.every(d => d.modules.some(m => bmeta(m.id)));
    MOCKS.forEach(m => out.push({ kind: 'mock', id: m.id, kp: m.kp, title: m.title, done: unitDone(m), route: m.id, locked: !allDomains }));
    return out;
  }
  function nextItem() {
    const seq = sequence();
    const open = x => !x.done && x.kind !== 'soon' && !x.locked;
    if (S.last && S.last.route) { const it = seq.find(x => x.route === S.last.route && open(x)); if (it) return it; }
    return seq.find(open) || null;
  }
  function itemLabel(it) { if (!it) return ''; if (it.kind === 'sec') { const b = bmeta(it.mod); const i = b.secs.findIndex(s => s.id === it.sid); return `${it.mod === '0' ? 'Introduction' : 'Module ' + it.mod} · Section ${i + 1}: ${it.title}`; } if (it.kind === 'quiz') return `Module ${it.mod} · Knowledge check`; return it.title; }

  /* ---------- data ---------- */
  const CACHE = {};
  async function getJSON(path) { if (CACHE[path]) return CACHE[path]; const r = await fetch(path + (BUILD.v ? '?v=' + BUILD.v : '')); if (!r.ok) throw new Error('Could not load ' + path + ' (HTTP ' + r.status + ')'); const j = await r.json(); CACHE[path] = j; return j; }
  const loadMod = id => { const b = bmeta(id); return b ? getJSON('data/' + b.file) : Promise.resolve(null); };
  const loadBank = () => getJSON('data/qbank.json');
  const loadGloss = () => getJSON('data/glossary.json');

  /* ---------- small UI helpers ---------- */
  function pie(f) {
    if (f >= 0.999) return '<svg class="st" viewBox="0 0 18 18" aria-label="Complete"><circle cx="9" cy="9" r="8.5" fill="var(--ok)"/><path d="M5 9.3l2.6 2.6L13 6.5" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    if (f > 0) { const a = Math.min(0.999, f) * 2 * Math.PI; const x = 9 + 6.2 * Math.sin(a), y = 9 - 6.2 * Math.cos(a); return `<svg class="st" viewBox="0 0 18 18" aria-label="In progress"><circle cx="9" cy="9" r="7.6" fill="none" stroke="var(--dc, var(--ink-3))" stroke-width="1.8"/><path d="M9 9V2.8A6.2 6.2 0 ${a > Math.PI ? 1 : 0} 1 ${x.toFixed(2)} ${y.toFixed(2)}z" fill="var(--dc, var(--ink-3))"/></svg>`; }
    return '<svg class="st" viewBox="0 0 18 18" aria-label="Not started"><circle cx="9" cy="9" r="7.6" fill="none" stroke="var(--line-2)" stroke-width="1.8"/></svg>';
  }
  function toast(msg) { const t = node(`<div class="toast-g" role="status">${esc(msg)}</div>`); document.body.appendChild(t); setTimeout(() => t.remove(), 2600); }
  /* Appearance: site theme (light, dark, or match the device) and video theme (light, dark, or same as the site). Light is the default. */
  const MQ = typeof matchMedia === 'function' ? matchMedia('(prefers-color-scheme: dark)') : null;
  function applyTheme() {
    const t = S.prefs.theme || 'light';
    if (t === 'system') document.documentElement.removeAttribute('data-theme'); else document.documentElement.setAttribute('data-theme', t);
    const siteDark = t === 'dark' || (t === 'system' && !!(MQ && MQ.matches));
    const vt = S.prefs.vtheme === 'dark' ? 'dark' : S.prefs.vtheme === 'site' ? (siteDark ? 'dark' : 'light') : 'light';
    const changed = V.theme !== vt; if (changed) V.setTheme(vt); return changed;
  }
  if (MQ && MQ.addEventListener) MQ.addEventListener('change', () => { if (S.prefs.theme === 'system' && applyTheme()) render(); });
  function setReadSize() { document.documentElement.style.setProperty('--read-size', { s: '16px', m: '18px', l: '20px' }[S.prefs.text] || '18px'); }
  const NAV = [['home', 'Course', 'home'], ['plan', 'Study plan', 'calendar'], ['tests', 'Tests', 'audit'], ['progress', 'Progress', 'chart'], ['review', 'Review cards', 'copy'], ['watch', 'Play all videos', 'play'], ['glossary', 'Glossary', 'book'], ['blueprint', 'Blueprint map', 'list'], ['prefs', 'Preferences', 'sliders']];
  const MARK = '<svg class="brand-mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 2.5l11.5 4.3v8.4c0 7-4.8 12.1-11.5 14.3C9.3 27.3 4.5 22.2 4.5 15.2V6.8z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><path d="M16 11.5L10.8 19M16 11.5L21.2 19M10.8 19h10.4" stroke="currentColor" stroke-width="1.6"/><circle cx="16" cy="11.5" r="2.8" fill="var(--d1)"/><circle cx="10.8" cy="19" r="2.3" fill="currentColor"/><circle cx="21.2" cy="19" r="2.3" fill="currentColor"/></svg>';

  /* ---------- shell ---------- */
  const app = document.getElementById('app');
  app.innerHTML = `<div class="shell">
    <header class="top"><button type="button" class="icon-btn menu-btn" aria-label="Open menu" aria-controls="side">${icon('list')}</button>
      <a class="brand" href="#home">${MARK}<span><span class="brand-name">AI Security Pilot Prep</span><span class="brand-sub">ISC2 AI Security · pilot exam</span></span></a>
      <span class="top-sp"></span><a class="btn small top-resume" href="#home">Resume</a></header>
    <aside class="side" id="side" aria-label="Course navigation"></aside><div class="scrim" hidden></div>
    <main class="main" id="main" tabindex="-1"></main></div>`;
  const main = document.getElementById('main'), side = document.getElementById('side'), scrim = app.querySelector('.scrim');
  const openSide = on => { side.classList.toggle('open', on); scrim.hidden = !on; if (on) { const c = side.querySelector('.close-btn'); c && c.focus(); } };
  app.querySelector('.menu-btn').addEventListener('click', () => openSide(true));
  scrim.addEventListener('click', () => openSide(false));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && side.classList.contains('open')) openSide(false); });

  function renderSide(route) {
    const curMod = route.mod;
    const modLink = m => { const f = m.kp ? modEarned(m.id) / m.kp : 0; const avail = !!bmeta(m.id); return `<li><a class="${curMod === m.id ? 'cur' : ''} ${dcls(m.domain)}" href="#${modHash(m.id)}">${pie(f)}<span class="code">${m.id === '0' ? 'Intro' : m.id === 'F' ? 'Final' : m.id}</span><span>${esc(m.title)}${avail ? '' : ' <span class="mono" style="font-size:10.5px;color:var(--ink-3)">· soon</span>'}</span></a></li>`; };
    side.innerHTML = `<div class="side-head"><span class="eyebrow">Menu</span><button type="button" class="icon-btn close-btn" aria-label="Close menu">${icon('x')}</button></div>
      <nav class="nav">${NAV.map(([h, t, ic]) => `<a href="#${h}" class="${route.view === h ? 'cur' : ''}">${icon(ic)}<span>${t}</span></a>`).join('')}</nav>
      <div class="eyebrow ol-title">Course outline</div>
      <ul class="ol">${modLink(MOD['0'])}</ul>
      ${O.domains.map(d => `<div class="ol-d ${dcls(d.n)}"><b>D${d.n}</b><span>${esc(d.short)} · ${d.weight}%</span></div><ul class="ol">${d.modules.map(m => modLink(MOD[m.id])).join('')}</ul>`).join('')}
      <div class="ol-d dcF"><b>FIN</b><span>Final review and mocks</span></div><ul class="ol">${modLink(MOD.F)}</ul>`;
    side.querySelector('.close-btn').addEventListener('click', () => openSide(false));
    side.querySelectorAll('a').forEach(a => a.addEventListener('click', () => openSide(false)));
    const nx = nextItem(); const rb = app.querySelector('.top-resume'); rb.href = '#' + (nx ? nx.route : 'home'); rb.textContent = nx ? 'Resume' : 'Course';
  }

  /* ---------- routing ---------- */
  let teardown = null;
  function parse(h) {
    h = (h || '').replace(/^#/, '') || 'home'; let m;
    if ((m = h.match(/^m-(0|F|\d-\d)(?:-(s\d+))?$/))) return { view: m[2] ? 'section' : 'module', mod: m[1].replace('-', '.'), sid: m[2] };
    if ((m = h.match(/^quiz-(0|F|\d-\d)$/))) return { view: 'quiz', mod: m[1].replace('-', '.') };
    if ((m = h.match(/^test-([1-6])$/))) return { view: 'test', n: +m[1] };
    if ((m = h.match(/^mock-([12])$/))) return { view: 'mock', n: +m[1] };
    if (NAV.some(n => n[0] === h)) return { view: h };
    return { view: 'home' };
  }
  let ROUTE = parse(location.hash);
  async function render() {
    if (teardown) { try { teardown(); } catch (e) { } teardown = null; }
    V.Player.destroyAll();
    ROUTE = parse(location.hash);
    applyTheme(); renderSide(ROUTE); setReadSize();
    main.innerHTML = '';
    const v = ROUTE.view;
    try {
      if (v === 'home') viewHome();
      else if (v === 'module') await viewModule(ROUTE.mod);
      else if (v === 'section') await viewSection(ROUTE.mod, ROUTE.sid);
      else if (v === 'quiz') await viewModQuiz(ROUTE.mod);
      else if (v === 'test') await viewTest(ROUTE.n);
      else if (v === 'mock') await viewMock(ROUTE.n);
      else if (v === 'plan') viewPlan();
      else if (v === 'tests') viewTests();
      else if (v === 'progress') viewProgress();
      else if (v === 'review') await viewReview();
      else if (v === 'glossary') await viewGlossary();
      else if (v === 'blueprint') viewBlueprint();
      else if (v === 'prefs') viewPrefs();
      else if (v === 'watch') await viewWatch();
    } catch (e) {
      console.error(e);
      main.innerHTML = `<div class="read"><div class="empty"><p><strong>Something went wrong loading this page.</strong></p><p>${esc(e.message || e)}</p><p><a href="#home">Back to the course</a></p></div></div>`;
    }
    if (['module', 'section', 'quiz'].includes(v)) { S.last = { route: location.hash.slice(1), at: Date.now() }; saveLocal(); }
  }
  function softRefresh() { if (['home', 'plan', 'progress', 'tests', 'blueprint', 'prefs'].includes(ROUTE.view)) render(); else renderSide(ROUTE); }
  window.addEventListener('hashchange', () => { render(); window.scrollTo(0, 0); main.focus({ preventScroll: true }); });

  /* ---------- views ---------- */
  function statTiles() {
    const e = earned(), pct = Math.round(e / O.totalKP * 100); const g = goal(); const qs = qStats('');
    const t1 = `<div class="stat"><div class="eyebrow">Course progress</div><div class="v">${pct}%</div><div class="s tnum">${nf(e)} of ${nf(O.totalKP)} KP</div><div class="bar"><i style="width:${pct}%"></i></div></div>`;
    const t2 = g ? `<div class="stat"><div class="eyebrow">Exam date</div><div class="v">${g.left >= 0 ? g.left + ' days' : 'Passed'}</div><div class="s">${fmtLong(parseDay(S.target))} · <a href="#plan">change</a></div></div>` : `<div class="stat"><div class="eyebrow">Exam date</div><div class="v">Not set</div><div class="s"><a href="#plan">Set your pilot exam date</a> to get a daily goal</div></div>`;
    const t3 = g ? `<div class="stat"><div class="eyebrow">Today’s goal</div><div class="v tnum">${Math.min(g.today, g.per)} / ${g.per}</div><div class="s">KP today · about ${g.per} min of study</div><div class="bar"><i style="width:${Math.min(100, g.per ? g.today / g.per * 100 : 100)}%;--fill:var(--ok)"></i></div></div>` : `<div class="stat"><div class="eyebrow">Today</div><div class="v tnum">${S.log[dayKey()] || 0} KP</div><div class="s">studied today</div></div>`;
    const t4 = `<div class="stat"><div class="eyebrow">Question accuracy</div><div class="v">${qs.pct == null ? '—' : qs.pct + '%'}</div><div class="s">${qs.n ? `latest answer on ${qs.n} questions` : 'Answer your first knowledge check'}</div></div>`;
    return `<div class="stats">${t1}${t2}${t3}${t4}</div>`;
  }
  function modRow(m) {
    const b = bmeta(m.id); const f = modEarned(m.id) / m.kp; const qz = S.quiz[m.id];
    const code = m.id === '0' ? 'INTRO' : m.id === 'F' ? 'FINAL' : m.id;
    const meta = b ? `${b.secs.length} sections · ${b.videos} videos · ${b.quizN} questions · ${mins(m.kp)}` : `${mins(m.kp)} · in production`;
    return `<li class="mod ${dcls(m.domain)}"><a href="#${modHash(m.id)}">${pie(f)}<div><div class="tt"><span class="code">${code}</span>${esc(m.title)}</div><div class="mm">${meta}</div></div>${qz && qz.n ? `<span class="pill ${qz.best >= 80 ? 'ok' : qz.best >= 70 ? 'warn' : 'bad'}">${qz.best}%</span>` : b ? `<span class="mm tnum">${nf(m.kp)} KP</span>` : '<span class="soon">Soon</span>'}</a></li>`;
  }
  function testRow(t) { const r = S.exams[t.id]; const locked = t.kind === 'mock' ? !O.domains.every(d => d.modules.some(m => bmeta(m.id))) : !DOM[t.domain].modules.some(m => bmeta(m.id)); if (locked && !(r && r.n)) return `<li class="mod ${dcls(t.domain || 0)}"><a href="#${t.id}">${pie(0)}<div><div class="tt"><span class="code">TEST</span>${esc(t.title)}</div><div class="mm">${t.kind === 'mock' ? 'Unlocks when every domain is published' : 'Unlocks when this domain’s modules are published'}</div></div><span class="soon">Soon</span></a></li>`; return `<li class="mod ${dcls(t.domain || 0)}"><a href="#${t.id}">${pie(r && r.n ? 1 : 0)}<div><div class="tt"><span class="code">TEST</span>${esc(t.title)}</div><div class="mm">${t.kind === 'mock' ? `${t.items} questions · ${t.minutes / 60} hours · timed` : 'Timed, mixed questions from every module in the domain'}</div></div>${r && r.n ? `<span class="pill ${r.best >= 80 ? 'ok' : r.best >= 70 ? 'warn' : 'bad'}">${r.best}%</span>` : `<span class="mm tnum">${t.kp} KP</span>`}</a></li>`; }
  function viewHome() {
    const nx = nextItem();
    const openD = nx && nx.mod && MOD[nx.mod] ? MOD[nx.mod].domain : 1;
    main.innerHTML = `<div class="wrap">
      <section class="hero"><div><div class="eyebrow">ISC2 AI Security · Pilot exam outline effective 26 Oct 2026</div><h1>AI Security Pilot Prep</h1><p>Sixty hours across the six exam domains. Each module pairs animated, narrated video lessons with interactive reading, then a scored knowledge check. Domain tests and two full 160-question mock exams close the course.</p></div>${statTiles()}</section>
      ${nx ? `<div class="resume"><div><div class="eyebrow">${S.last ? 'Continue' : 'Start here'}</div><div class="t">${esc(itemLabel(nx))}</div><div class="m">${nx.kp} KP · about ${nx.kp} minutes</div></div><a class="btn" href="#${nx.route}">${icon('play')}<span>${S.last ? 'Resume' : 'Start'}</span></a></div>` : ''}
      <div class="sec-h"><h2>Course</h2><span class="muted">3,600 knowledge points · 1 KP ≈ 1 minute</span></div>
      <div class="dom dc0" style="margin-bottom:12px"><ul class="mods" style="border-top:0">${modRow(MOD['0'])}</ul></div>
      ${O.domains.map(d => { const de = domEarned(d.n), dt = domTotal(d.n); const p = Math.round(de / dt * 100); return `<details class="dom ${dcls(d.n)}" ${d.n === openD ? 'open' : ''}><summary><span class="dom-stripe"></span><div class="dom-t"><div class="eyebrow">Domain ${d.n} · ${d.weight}% of the exam</div><h3>${esc(d.title)}</h3><div class="dom-m"><span>${d.modules.length} modules</span><span>${mins(dt)}</span><span>≈ ${Math.round(O.exam.items * d.weight / 100)} exam questions</span></div></div><div class="dom-r"><span class="pct">${p}%</span><div class="bar"><i style="width:${p}%"></i></div></div></summary><ul class="mods">${d.modules.map(m => modRow(MOD[m.id])).join('')}${testRow(TESTS[d.n - 1])}</ul></details>`; }).join('')}
      <details class="dom dcF"><summary><span class="dom-stripe"></span><div class="dom-t"><div class="eyebrow">Finish</div><h3>Final review and mock exams</h3><div class="dom-m"><span>${mins(O.final.kp + 360)}</span><span>2 × 160 questions, 3 hours each</span></div></div><div class="dom-r"></div></summary><ul class="mods">${modRow(MOD.F)}${MOCKS.map(testRow).join('')}</ul></details>
      ${(() => { const pl = playlist(); if (!pl.length) return ''; const w = pl.filter(v => (S.vid[v.id] || 0) >= 0.9).length; return `<a class="pa-promo" href="#watch"><span class="pa-pi">${icon('play')}</span><span class="pa-pt"><span class="eyebrow">Bonus</span><b>Play all videos</b><span class="muted">${pl.length} videos back to back · ${hrs(pl.reduce((a, v) => a + v.d, 0))} · ${w} watched</span></span>${icon('arrow')}</a>`; })()}
      <div class="side-cards">
        <div class="card"><h3>The exam at a glance</h3><dl class="kv"><dt>Questions</dt><dd>${O.exam.items}, ${O.exam.format.toLowerCase()}</dd><dt>Time</dt><dd>${O.exam.minutes / 60} hours · about ${Math.round(O.exam.minutes * 60 / O.exam.items)} seconds per question</dd><dt>Where</dt><dd>${esc(O.exam.centre)}</dd></dl><div class="wbars" style="margin-top:14px">${O.domains.map(d => `<div class="wbar ${dcls(d.n)}"><b>D${d.n}</b><div class="bar"><i style="width:${d.weight / 19 * 100}%"></i></div><span>${d.weight}%</span></div>`).join('')}</div></div>
        <div class="card"><h3>How this course works</h3><div class="prose" style="font-size:15px">${md(`- **Knowledge points (KP)** measure planned study time: 1 KP is roughly one minute. You earn them section by section.
- **Videos** are animated and narrated in a recorded British English voice, with captions. The colours mean the same thing everywhere: blue is data, violet is a model, amber is a person, red is an attacker and green is a control.
- **Knowledge checks** close every module and are scored, so you always know whether it stuck.
- **Your progress** is saved to your Claude account when you're signed in, so it follows you between phone and desktop.`)}</div><div class="note-ind" style="margin-top:10px"><i></i><span>${syncText()}</span></div></div>
      </div>
      <p class="muted" style="font-size:12.5px;margin-top:28px;max-width:80ch">Independent study course built from the ISC2 AI Security Pilot Exam Outline (effective 26 October 2026). Not affiliated with, endorsed by or produced by ISC2. Exam details can change, so check ISC2’s candidate information before exam day.</p>
    </div>`;
    syncInd();
  }

  function moduleHead(m, content) {
    const d = m.domain; const b = bmeta(m.id);
    const eyebrow = m.id === '0' ? 'Course introduction' : m.id === 'F' ? 'Final review' : `Domain ${d} · ${esc(DOM[d].short)} · Module ${m.id}`;
    return `<div class="crumbs"><a href="#home">Course</a><span>›</span><span>${m.id === '0' ? 'Introduction' : m.id === 'F' ? 'Final review' : 'Module ' + m.id}</span></div>
      <header class="m-head"><div class="eyebrow">${eyebrow}</div><h1>${esc(m.title)}</h1>${content && content.intro ? `<p class="lede">${inline(content.intro)}</p>` : ''}
      <div class="m-meta"><span class="pill">${nf(m.kp)} KP</span><span class="pill">${mins(m.kp)}</span>${b ? `<span class="pill">${b.videos} videos · ${b.videoMin} min</span><span class="pill">${b.quizN} check questions</span>` : '<span class="pill warn">In production</span>'}</div></header>`;
  }
  async function viewModule(id) {
    const m = MOD[id]; if (!m) { location.hash = 'home'; return; }
    const content = await loadMod(id);
    const wrap = node(`<div class="read ${dcls(m.domain)}"></div>`); main.appendChild(wrap);
    if (!content) {
      wrap.innerHTML = moduleHead(m, null) + `<div class="objectives"><h2>What this module will cover</h2><div class="cover">${m.bullets.map((bl, i) => `<div class="cover-i"><b>${m.id}.${i + 1}</b><span>${esc(bl)}</span></div>`).join('')}</div></div><div class="empty">This module is being written. It will appear here, with its videos and knowledge check, as soon as it’s published.</div>`;
      return;
    }
    const b = bmeta(id);
    const doneN = b.secs.filter(s => S.sec[id + '/' + s.id]).length; const next = b.secs.find(s => !S.sec[id + '/' + s.id]);
    const qz = S.quiz[id];
    wrap.innerHTML = moduleHead(m, content) + `
      ${content.objectives ? `<section class="objectives"><h2>By the end of this module you can</h2><ul>${content.objectives.map(o => `<li>${inline(o)}</li>`).join('')}</ul>${m.bullets.length ? `<h2 style="margin-top:14px">Exam outline coverage</h2><div class="cover">${m.bullets.map((bl, i) => `<div class="cover-i"><b>${m.id}.${i + 1}</b><span>${esc(bl)}</span></div>`).join('')}</div>` : ''}</section>` : ''}
      <div class="row between" style="margin:20px 0 8px"><h2 style="font-size:18px;font-weight:800">Sections</h2><span class="muted tnum" style="font-size:13px">${doneN} of ${b.secs.length} complete</span></div>
      <ol class="sections">${b.secs.map((s, i) => `<li><a href="#${secHash(id, s.id)}">${pie(S.sec[id + '/' + s.id] ? 1 : 0)}<div><div class="n">SECTION ${i + 1}</div><div class="tt">${esc(s.title)}</div></div><span class="mm">${s.kp} KP</span></a></li>`).join('')}
        <li><a href="#quiz-${String(id).replace('.', '-')}">${pie(qz && qz.n ? 1 : 0)}<div><div class="n">KNOWLEDGE CHECK</div><div class="tt">${b.quizN} scored questions${qz && qz.n ? ` · best ${qz.best}%` : ''}</div></div><span class="mm">${b.quizKP} KP</span></a></li></ol>
      <div class="row">${next ? `<a class="btn" href="#${secHash(id, next.id)}">${icon('play')}<span>${doneN ? 'Continue' : 'Start module'}</span></a>` : `<a class="btn" href="#quiz-${String(id).replace('.', '-')}">${qz && qz.n ? 'Retake knowledge check' : 'Take the knowledge check'}</a>`}</div>`;
  }

  async function viewSection(id, sid) {
    const m = MOD[id]; const content = await loadMod(id); if (!content) { location.hash = modHash(id); return; }
    const b = bmeta(id); const idx = content.sections.findIndex(s => s.id === sid); if (idx < 0) { location.hash = modHash(id); return; }
    const sec = content.sections[idx]; const key = id + '/' + sid; const isDone = !!S.sec[key];
    const doneN = b.secs.filter(s => S.sec[id + '/' + s.id]).length;
    const wrap = node(`<div class="read ${dcls(m.domain)}"></div>`); main.appendChild(wrap);
    wrap.innerHTML = `<div class="lesson-top"><div class="row"><a class="icon-btn" href="#${modHash(id)}" aria-label="Back to module overview">${icon('arrow').replace('<svg', '<svg style="transform:rotate(180deg)"')}</a><div class="lt"><b>${esc(m.id === '0' ? 'Introduction' : m.id === 'F' ? 'Final review' : m.id + ' ' + m.title)}</b><span>Section ${idx + 1} of ${content.sections.length} · ${sec.kp} KP</span></div></div><div class="bar"><i style="width:${doneN / b.secs.length * 100}%"></i></div></div>
      <header class="s-head"><div class="eyebrow">Section ${idx + 1} · about ${sec.kp} minutes</div><h1>${esc(sec.title)}</h1>${sec.covers && sec.covers.length && m.bullets.length ? `<div class="s-cover">${sec.covers.map(c => `<span class="pill" title="${esc(m.bullets[c - 1] || '')}">${m.id}.${c} ${esc((m.bullets[c - 1] || '').split(' (')[0].slice(0, 44))}</span>`).join('')}</div>` : ''}</header>
      <div class="blocks"></div><div class="s-foot"></div>`;
    const ctx = { get state() { return S; }, domain: m.domain, players: [], setPref: (k, v) => { S.prefs[k] = v; commit(); }, onVideo: (vid, f) => { if (f > (S.vid[vid] || 0)) { S.vid[vid] = Math.round(f * 1000) / 1000; commit(); } }, onCheck: (q, ok) => recordQ(q, ok), onVideoQuiz: () => { } };
    L.renderBlocks(wrap.querySelector('.blocks'), sec.blocks, ctx);
    const foot = wrap.querySelector('.s-foot');
    const nextSec = content.sections[idx + 1]; const nextHref = nextSec ? '#' + secHash(id, nextSec.id) : '#quiz-' + String(id).replace('.', '-');
    const prevHref = idx > 0 ? '#' + secHash(id, content.sections[idx - 1].id) : '#' + modHash(id);
    const vids = sec.blocks.filter(x => x.type === 'video');
    const drawFoot = () => {
      const unwatched = vids.filter(v => (S.vid[v.id] || 0) < 0.9).length; const done = !!S.sec[key];
      foot.innerHTML = `<a class="btn ghost" href="${prevHref}">Previous</a>${done ? `<span class="done-mark">${icon('check')} Section complete</span><a class="btn" href="${nextHref}">${nextSec ? 'Next section' : 'Knowledge check'}</a>` : `<button type="button" class="btn mark-done">Complete section and continue</button>`}${!done && unwatched ? `<div class="hint">${unwatched === 1 ? 'The video in this section hasn’t been watched to the end yet.' : unwatched + ' videos in this section haven’t been watched to the end yet.'} You can still complete the section.</div>` : ''}`;
      const btn = foot.querySelector('.mark-done');
      if (btn) btn.addEventListener('click', () => { if (!S.sec[key]) { S.sec[key] = Date.now(); logKP(sec.kp); commit(); toast(`Section complete · +${sec.kp} KP`); } location.hash = nextHref.slice(1); });
    };
    drawFoot();
    teardown = () => { ctx.players.forEach(p => p.destroy()); };
    void isDone;
  }

  async function viewModQuiz(id) {
    const m = MOD[id]; const content = await loadMod(id); if (!content) { location.hash = modHash(id); return; }
    const b = bmeta(id);
    const wrap = node(`<div class="read ${dcls(m.domain)}"></div>`); main.appendChild(wrap);
    wrap.innerHTML = `<div class="crumbs"><a href="#home">Course</a><span>›</span><a href="#${modHash(id)}">${m.id === '0' ? 'Introduction' : m.id === 'F' ? 'Final review' : 'Module ' + m.id}</a><span>›</span><span>Knowledge check</span></div><div class="host"></div>`;
    const host = wrap.querySelector('.host');
    const start = () => {
      const qs = L.shuffle(content.quiz.map(q => Object.assign({ mod: id, dom: m.domain }, q)));
      Q.check(host, { eyebrow: `Knowledge check · ${m.id === '0' ? 'Introduction' : 'Module ' + m.id}`, questions: qs, onAnswer: (q, ok) => recordQ(q, ok),
        onDone: res => { const prev = S.quiz[id]; const first = !(prev && prev.n); S.quiz[id] = { best: Math.max(prev ? prev.best : 0, res.pct), last: res.pct, n: (prev ? prev.n : 0) + 1, at: Date.now() }; if (first) logKP(b.quizKP || 0); commit(); if (first) toast(`Knowledge check complete · +${b.quizKP} KP`); },
        retry: () => start(), back: ['Back to module', '#' + modHash(id)] });
    };
    const prev = S.quiz[id];
    host.innerHTML = `<div class="qcard"><div class="eyebrow">Knowledge check</div><h1 style="font-size:28px;font-weight:800;font-stretch:86%">${esc(m.title)}</h1><p class="muted">${content.quiz.length} questions in exam style. You’ll see whether each answer is right, with an explanation, before moving on. ${prev && prev.n ? `Best so far: <strong>${prev.best}%</strong>.` : 'Aim for 80% or more.'}</p><div class="row" style="margin-top:14px"><button type="button" class="btn go">Start knowledge check</button><a class="btn ghost" href="#${modHash(id)}">Back to module</a></div></div>`;
    host.querySelector('.go').addEventListener('click', start);
  }

  function pickQuestions(bank, mods, count, seed, preferExam) {
    const r = (() => { let s = seed; return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; })();
    const sh = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
    let pool = [];
    mods.forEach(id => { const e = bank[id]; if (!e) return; const dom = MOD[id].domain; const tag = q => Object.assign({ mod: id, dom }, q); pool = pool.concat((preferExam ? e.exam : e.quiz).map(tag), (preferExam ? e.quiz : e.exam).map(tag)); });
    if (!preferExam) return sh(pool).slice(0, count);
    const exam = sh(pool.filter(q => /-x\d/.test(q.id))), rest = sh(pool.filter(q => !/-x\d/.test(q.id)));
    return exam.concat(rest).slice(0, count);
  }
  async function viewTest(n) {
    const d = DOM[n]; const t = TESTS[n - 1];
    const wrap = node(`<div class="read ${dcls(n)}"></div>`); main.appendChild(wrap);
    wrap.innerHTML = `<div class="crumbs"><a href="#home">Course</a><span>›</span><a href="#tests">Tests</a><span>›</span><span>Domain ${n} test</span></div><div class="host"></div>`;
    const host = wrap.querySelector('.host');
    const bank = await loadBank(); const mods = d.modules.map(m => m.id).filter(id => bank[id]);
    const avail = mods.reduce((a, id) => a + bank[id].quiz.length + bank[id].exam.length, 0);
    const count = Math.min(40, avail); const minutes = Math.max(5, Math.round(count * O.exam.minutes / O.exam.items));
    const resume = S.session && S.session.id === t.id ? S.session : null;
    const prev = S.exams[t.id];
    if (!avail) { host.innerHTML = `<div class="empty">The Domain ${n} test unlocks when the domain’s modules are published.</div>`; return; }
    const start = (session) => {
      let qs;
      if (session) { const all = {}; mods.forEach(id => ['quiz', 'exam'].forEach(k => bank[id][k].forEach(q => { all[q.id] = Object.assign({ mod: id, dom: n }, q); }))); qs = session.qids.map(x => all[x]).filter(Boolean); if (qs.length !== session.qids.length) session = null; }
      if (!session) qs = pickQuestions(bank, mods, count, Date.now() % 100000, false);
      const ctl = Q.exam(host, { id: t.id, eyebrow: `Domain ${n} test`, questions: qs, minutes, session, exitHash: 'tests', domainName: x => DOM[x] ? DOM[x].short : 'Domain ' + x,
        onSave: s => { S.session = s; commit(); },
        onDone: res => { res.answers.forEach(a => recordQ(a.q, a.ok)); const p = S.exams[t.id]; const first = !(p && p.n); S.exams[t.id] = { best: Math.max(p ? p.best : 0, res.pct), last: res.pct, n: (p ? p.n : 0) + 1, at: Date.now() }; S.session = null; if (first) logKP(t.kp); commit(); },
        retry: () => { S.session = null; start(null); }, back: ['All tests', '#tests'] });
      teardown = () => ctl.destroy();
    };
    host.innerHTML = `<div class="qcard"><div class="eyebrow">Domain ${n} · ${d.weight}% of the exam</div><h1 style="font-size:28px;font-weight:800;font-stretch:86%">${esc(d.title)}</h1><p class="muted">${count} questions drawn from every published module in this domain · ${minutes} minutes, the same pace as the real exam. No feedback until you submit.${avail < 20 ? ' More questions are added as modules are published.' : ''}</p>${prev && prev.n ? `<p>Best so far: <strong>${prev.best}%</strong> · last ${prev.last}%</p>` : ''}<div class="row" style="margin-top:14px">${resume ? '<button type="button" class="btn res">Resume test</button>' : ''}<button type="button" class="btn ${resume ? 'ghost' : ''} go">${resume ? 'Start over' : 'Start test'}</button></div></div>`;
    host.querySelector('.go').addEventListener('click', () => { S.session = null; start(null); });
    const rb = host.querySelector('.res'); if (rb) rb.addEventListener('click', () => start(resume));
  }
  async function viewMock(n) {
    const mk = MOCKS[n - 1];
    const wrap = node(`<div class="read dcF"></div>`); main.appendChild(wrap);
    wrap.innerHTML = `<div class="crumbs"><a href="#home">Course</a><span>›</span><a href="#tests">Tests</a><span>›</span><span>${esc(mk.title)}</span></div><div class="host"></div>`;
    const host = wrap.querySelector('.host');
    const bank = await loadBank();
    let pools = {}; try { pools = await getJSON('data/mocks.json'); } catch (e) { pools = {}; }
    const per = O.domains.map(d => Math.round(mk.items * d.weight / 100)); const diff = mk.items - per.reduce((a, b) => a + b, 0); per[per.indexOf(Math.max(...per))] += diff;
    /* A dedicated pool of fresh questions is used when it covers every domain's share; otherwise draw from module questions. */
    const pool = pools[n] || []; const poolByDom = O.domains.map(d => pool.filter(q => q.dom === d.n));
    const dedicated = poolByDom.every((p, i) => p.length >= per[i]);
    const pick = dedicated ? poolByDom.map((p, i) => p.slice(0, per[i])) : O.domains.map((d, i) => pickQuestions(bank, d.modules.map(m => m.id).filter(id => bank[id]), per[i], 1000 * n + d.n, true));
    const total = pick.reduce((a, p) => a + p.length, 0);
    const resume = S.session && S.session.id === mk.id ? S.session : null; const prev = S.exams[mk.id];
    const ready = total >= mk.items;
    const start = session => {
      let qs = [].concat(...pick);
      if (session) { const all = {}; Object.keys(bank).forEach(id => ['quiz', 'exam'].forEach(k => bank[id][k].forEach(q => { all[q.id] = Object.assign({ mod: id, dom: MOD[id].domain }, q); }))); pool.forEach(q => { all[q.id] = q; }); const s2 = session.qids.map(x => all[x]).filter(Boolean); if (s2.length === session.qids.length) qs = s2; else session = null; }
      if (!session) qs = L.shuffle(qs);
      const minutes = Math.round(qs.length * O.exam.minutes / O.exam.items);
      const ctl = Q.exam(host, { id: mk.id, eyebrow: mk.title, questions: qs, minutes, session, exitHash: 'tests', domainName: x => DOM[x] ? DOM[x].short : 'Domain ' + x,
        onSave: s => { S.session = s; commit(); },
        onDone: res => { res.answers.forEach(a => recordQ(a.q, a.ok)); const p = S.exams[mk.id]; const first = !(p && p.n); const dom = {}; Object.keys(res.byDomain).forEach(k => dom[k] = Math.round(res.byDomain[k].right / res.byDomain[k].total * 100)); S.exams[mk.id] = { best: Math.max(p ? p.best : 0, res.pct), last: res.pct, n: (p ? p.n : 0) + 1, at: Date.now(), dom, full: qs.length >= mk.items }; S.session = null; if (first && qs.length >= mk.items) logKP(mk.kp); commit(); },
        retry: () => { S.session = null; start(null); }, back: ['All tests', '#tests'] });
      teardown = () => ctl.destroy();
    };
    host.innerHTML = `<div class="qcard"><div class="eyebrow">Full exam simulation</div><h1 style="font-size:28px;font-weight:800;font-stretch:86%">${esc(mk.title)}</h1><p class="muted">${mk.items} questions weighted exactly like the pilot exam (${per.map((p, i) => 'D' + (i + 1) + ' ' + p).join(' · ')}), ${mk.minutes / 60} hours, no feedback until you submit. You can save and come back to it.${dedicated ? ' Every question is new: none appear in the modules, knowledge checks or domain tests.' : ''}</p>
      ${ready ? '' : `<div class="callout warn"><div></div><div><div class="ct">Not all domains are published yet</div><div class="prose"><p>${total} of ${mk.items} questions are available so far. You can take a shorter practice version now; the full mock unlocks when every domain is published.</p></div></div></div>`}
      ${prev && prev.n ? `<p>Best so far: <strong>${prev.best}%</strong>${prev.full ? '' : ' (shorter version)'}</p>` : ''}
      <div class="row" style="margin-top:14px">${resume ? '<button type="button" class="btn res">Resume mock</button>' : ''}${total ? `<button type="button" class="btn ${resume ? 'ghost' : ''} go">${resume ? 'Start over' : ready ? 'Start mock exam' : `Start ${total}-question version`}</button>` : ''}</div></div>`;
    const go = host.querySelector('.go'); if (go) go.addEventListener('click', () => { S.session = null; start(null); });
    const rb = host.querySelector('.res'); if (rb) rb.addEventListener('click', () => start(resume));
  }

  function viewTests() {
    const wrap = node('<div class="wrap"></div>'); main.appendChild(wrap);
    const smartN = Object.keys(S.qh).filter(k => !S.qh[k][2]).length;
    wrap.innerHTML = `<div class="sec-h" style="margin-top:0"><h2>Tests</h2><span class="muted">Every answer feeds your progress page</span></div>
      <div class="tests-grid">
        <div class="tcard"><h3>Smart practice</h3><div class="m">${smartN ? `${smartN} questions you got wrong last time, mixed with ones you haven’t seen.` : 'Questions you get wrong will collect here for another go.'}</div><div><button type="button" class="btn small smart" ${Object.keys(BUILD.modules || {}).length ? '' : 'disabled'}>Practise 15 questions</button></div></div>
        ${MOCKS.map(mk => { const r = S.exams[mk.id]; return `<div class="tcard dcF"><h3>${esc(mk.title)}</h3><div class="m">${mk.items} questions · ${mk.minutes / 60} hours · weighted like the exam</div><div class="row">${r && r.n ? `<span class="pill ${r.best >= 80 ? 'ok' : r.best >= 70 ? 'warn' : 'bad'}">Best ${r.best}%</span>` : ''}${S.session && S.session.id === mk.id ? '<span class="pill warn">In progress</span>' : ''}<a class="btn small" href="#${mk.id}">Open</a></div></div>`; }).join('')}
      </div>
      <div class="sec-h"><h2>Domain tests</h2></div><div class="tests-grid">${TESTS.map(t => { const r = S.exams[t.id]; return `<div class="tcard ${dcls(t.domain)}"><h3>${esc(t.title)}: ${esc(DOM[t.domain].short)}</h3><div class="m">${DOM[t.domain].weight}% of the exam · timed at exam pace</div><div class="row">${r && r.n ? `<span class="pill ${r.best >= 80 ? 'ok' : r.best >= 70 ? 'warn' : 'bad'}">Best ${r.best}%</span>` : ''}${S.session && S.session.id === t.id ? '<span class="pill warn">In progress</span>' : ''}<a class="btn small" href="#${t.id}">Open</a></div></div>`; }).join('')}</div>
      <div class="sec-h"><h2>Module knowledge checks</h2></div><div class="dom"><ul class="mods" style="border-top:0">${MODS.filter(m => bmeta(m.id)).map(m => { const q = S.quiz[m.id]; return `<li class="mod ${dcls(m.domain)}"><a href="#quiz-${String(m.id).replace('.', '-')}">${pie(q && q.n ? 1 : 0)}<div><div class="tt"><span class="code">${m.id === '0' ? 'INTRO' : m.id === 'F' ? 'FINAL' : m.id}</span>${esc(m.title)}</div><div class="mm">${bmeta(m.id).quizN} questions</div></div>${q && q.n ? `<span class="pill ${q.best >= 80 ? 'ok' : q.best >= 70 ? 'warn' : 'bad'}">${q.best}%</span>` : '<span class="mm">Not taken</span>'}</a></li>`; }).join('') || '<li class="empty">No modules published yet.</li>'}</ul></div>
      <div class="host" style="margin-top:20px"></div>`;
    const sb = wrap.querySelector('.smart');
    if (sb) sb.addEventListener('click', async () => {
      const bank = await loadBank(); const all = [];
      Object.keys(bank).forEach(id => ['quiz', 'exam'].forEach(k => bank[id][k].forEach(q => all.push(Object.assign({ mod: id, dom: MOD[id] ? MOD[id].domain : 0 }, q)))));
      /* Mock questions join smart practice only once they have been answered, so unseen ones stay fresh for the mocks. */
      let pools = {}; try { pools = await getJSON('data/mocks.json'); } catch (e) { pools = {}; }
      Object.keys(pools).forEach(n => pools[n].forEach(q => { if (S.qh[q.id]) all.push(q); }));
      const wrong = all.filter(q => S.qh[q.id] && !S.qh[q.id][2]); const unseen = all.filter(q => !S.qh[q.id]);
      const qs = L.shuffle(wrong).slice(0, 10).concat(L.shuffle(unseen)).slice(0, 15);
      if (!qs.length) { toast('No questions available yet'); return; }
      const host = node('<div class="read"></div>'); main.innerHTML = ''; main.appendChild(host);
      Q.check(host, { eyebrow: 'Smart practice', questions: qs, onAnswer: (q, ok) => recordQ(q, ok), retry: () => sb.click(), back: ['All tests', '#tests'] });
      window.scrollTo(0, 0);
    });
  }

  function planSchedule(limitDays) {
    const g = goal(); if (!g) return null;
    const items = sequence().filter(x => !x.done);
    const cap = Math.max(10, g.per); const out = []; let i = 0; let carry = 0;
    const t = parseDay(S.target); const d = parseDay(dayKey());
    if (g.today >= cap) d.setDate(d.getDate() + 1);
    while (i < items.length && out.length < limitDays && d <= new Date(t.getTime() + 864e5 * 60)) {
      if (studyDay(d)) { const day = { date: new Date(d), items: [], kp: 0 }; let budget = cap - (dayKey(d) === dayKey() ? g.today : 0) + carry; carry = 0; while (i < items.length && (budget > 0 || !day.items.length)) { day.items.push(items[i]); day.kp += items[i].kp; budget -= items[i].kp; i++; } carry = Math.min(0, budget); out.push(day); }
      d.setDate(d.getDate() + 1);
    }
    return { days: out, remainingItems: items.length - i };
  }
  function viewPlan() {
    const wrap = node('<div class="read"></div>'); main.appendChild(wrap);
    const g = goal(); const dn = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const sch = planSchedule(21);
    wrap.innerHTML = `<div class="sec-h" style="margin-top:0"><h2>Study plan</h2></div>
      <div class="card"><div class="field"><label for="tgt">Pilot exam date</label><input type="date" id="tgt" value="${esc(S.target)}" min="${dayKey()}"><span class="help">Your daily goal spreads the remaining knowledge points across your study days up to this date.</span></div>
      <div class="field"><label>Study days</label><div class="days">${dn.map((n, i) => `<label><input type="checkbox" data-d="${i}" ${S.days[i] ? 'checked' : ''}>${n}</label>`).join('')}</div></div></div>
      ${g ? `<div class="stats" style="margin:16px 0"><div class="stat"><div class="eyebrow">Remaining</div><div class="v tnum">${nf(g.rem)} KP</div><div class="s">about ${Math.round(g.rem / 6) / 10} hours</div></div><div class="stat"><div class="eyebrow">Study days left</div><div class="v tnum">${g.days}</div><div class="s">${g.left} calendar days</div></div><div class="stat"><div class="eyebrow">Daily goal</div><div class="v tnum">${g.per} KP</div><div class="s">≈ ${g.per} minutes a study day</div></div><div class="stat"><div class="eyebrow">Done today</div><div class="v tnum">${g.today} KP</div><div class="s">${g.today >= g.per ? 'Goal met' : (g.per - g.today) + ' KP to go'}</div></div></div>
        ${g.per > 240 ? `<div class="callout warn"><div></div><div><div class="ct">That’s a heavy pace</div><div class="prose"><p>More than four hours a day is hard to sustain. Consider adding study days or moving the date if the pilot schedule allows.</p></div></div></div>` : ''}
        <div class="sec-h"><h2>Next three weeks</h2><span class="muted">Built from where you are now</span></div>
        <div class="plan-list">${sch.days.map(day => `<div class="plan-day ${dayKey(day.date) === dayKey() ? 'today' : ''}"><div class="d">${dayKey(day.date) === dayKey() ? 'Today' : day.date.toLocaleDateString('en-GB', { weekday: 'short' })}<small>${day.date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</small></div><ul>${day.items.map(it => `<li><a href="#${it.route}">${esc(itemLabel(it))}</a>${it.kind === 'soon' ? ' <span class="pill">in production</span>' : ''}</li>`).join('')}</ul><span class="k">${day.kp} KP</span></div>`).join('') || '<div class="empty">Everything is done. Time to sit the exam.</div>'}</div>
        ${sch.remainingItems ? `<p class="muted" style="font-size:13px">${sch.remainingItems} more items follow after these three weeks.</p>` : ''}` : '<div class="empty" style="margin-top:16px">Set your pilot exam date to see a day-by-day plan.</div>'}`;
    wrap.querySelector('#tgt').addEventListener('change', e => { S.target = e.target.value; commit(); render(); });
    wrap.querySelectorAll('[data-d]').forEach(c => c.addEventListener('change', () => { S.days[+c.dataset.d] = c.checked ? 1 : 0; if (!S.days.some(Boolean)) { S.days[+c.dataset.d] = 1; c.checked = true; toast('Keep at least one study day'); } commit(); render(); }));
  }

  function viewProgress() {
    const wrap = node('<div class="wrap"></div>'); main.appendChild(wrap);
    const days = []; for (let i = 20; i >= 0; i--) { const d = new Date(); d.setDate(d.getDate() - i); days.push([dayKey(d), S.log[dayKey(d)] || 0, d]); }
    const mx = Math.max(30, ...days.map(x => x[1]));
    const streak = (() => { let n = 0; for (let i = days.length - 1; i >= 0; i--) { if (days[i][1] > 0) n++; else if (i === days.length - 1) continue; else break; } return n; })();
    const modStats = MODS.filter(m => bmeta(m.id)).map(m => ({ m, s: qStats(m.id + '-'), q: S.quiz[m.id] }));
    const weak = modStats.filter(x => x.s.n >= 3).sort((a, b) => a.s.pct - b.s.pct).slice(0, 4);
    wrap.innerHTML = `<div class="sec-h" style="margin-top:0"><h2>Progress</h2><span class="note-ind"><i></i><span>${syncText()}</span></span></div>
      ${statTiles()}
      <div class="side-cards" style="margin-top:16px">
        <div class="card"><h3>By domain</h3>${O.domains.map(d => { const e = domEarned(d.n), t = domTotal(d.n), p = Math.round(e / t * 100); const qs = d.modules.map(m => qStats(m.id + '-')).reduce((a, s) => ({ n: a.n + s.n, r: a.r + s.r }), { n: 0, r: 0 }); const acc = qs.n ? Math.round(qs.r / qs.n * 100) : null; return `<div class="perf-row ${dcls(d.n)}"><b>D${d.n}</b><div><div>${esc(d.short)} <span class="s">· ${d.weight}% of exam</span></div><div class="s">${p}% studied · ${acc == null ? 'no questions yet' : acc + '% accuracy on ' + qs.n + ' questions'}</div><div class="bar"><i style="width:${p}%"></i></div></div><div class="v">${acc == null ? '—' : acc + '%'}</div></div>`; }).join('')}</div>
        <div class="card"><h3>Last three weeks</h3><div class="spark" aria-label="Knowledge points per day">${days.map(([k, v]) => `<i class="${v ? '' : 'z'}" style="height:${Math.max(3, v / mx * 100)}%" title="${k}: ${v} KP"></i>`).join('')}</div><div class="row between muted" style="font-size:12px;margin-top:6px"><span>${fmtDay(days[0][2])}</span><span>Today</span></div><p style="margin:14px 0 0">${streak ? `<strong>${streak}-day streak.</strong> ` : ''}${nf(days.reduce((a, x) => a + x[1], 0))} KP in the last 21 days.</p>
          <h3 style="margin-top:18px">Focus next</h3>${weak.length ? `<ul style="margin:0;padding-left:18px">${weak.map(x => `<li><a href="#${modHash(x.m.id)}">${x.m.id} ${esc(x.m.title)}</a> · ${x.s.pct}% on ${x.s.n} questions</li>`).join('')}</ul>` : '<p class="muted" style="margin:0">Answer a few knowledge checks and your weakest modules will show here.</p>'}</div>
      </div>
      <div class="sec-h"><h2>Module scores</h2></div>
      <div class="tbl"><table><thead><tr><th>Module</th><th>Studied</th><th>Check best</th><th>Accuracy</th></tr></thead><tbody>${modStats.map(x => `<tr><td><a href="#${modHash(x.m.id)}">${x.m.id === '0' ? 'Intro' : x.m.id === 'F' ? 'Final' : x.m.id}</a> ${esc(x.m.title)}</td><td class="tnum">${Math.round(modEarned(x.m.id) / x.m.kp * 100)}%</td><td class="tnum">${x.q && x.q.n ? x.q.best + '%' : '—'}</td><td class="tnum">${x.s.pct == null ? '—' : x.s.pct + '% (' + x.s.n + ')'}</td></tr>`).join('') || '<tr><td colspan="4">No modules published yet.</td></tr>'}</tbody></table></div>
      ${TESTS.concat(MOCKS).some(t => S.exams[t.id]) ? `<div class="sec-h"><h2>Tests taken</h2></div><div class="tbl"><table><thead><tr><th>Test</th><th>Attempts</th><th>Best</th><th>Last</th></tr></thead><tbody>${TESTS.concat(MOCKS).filter(t => S.exams[t.id]).map(t => { const r = S.exams[t.id]; return `<tr><td>${esc(t.title)}</td><td class="tnum">${r.n}</td><td class="tnum">${r.best}%</td><td class="tnum">${r.last}%</td></tr>`; }).join('')}</tbody></table></div>` : ''}`;
    syncInd();
  }

  async function viewReview() {
    const wrap = node('<div class="read"></div>'); main.appendChild(wrap);
    const gl = await loadGloss();
    if (!gl.length) { wrap.innerHTML = '<div class="empty">Review cards appear as modules are published.</div>'; return; }
    const today = dayKey(); const ivl = [0, 1, 3, 7, 16, 35];
    const keyOf = t => t.t.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 60);
    const due = gl.filter(t => { const c = S.cards[keyOf(t)]; return !c || c[1] <= today; });
    const learned = gl.filter(t => { const c = S.cards[keyOf(t)]; return c && c[0] >= 3; }).length;
    const queue = L.shuffle(due.filter(t => S.cards[keyOf(t)])).concat(L.shuffle(due.filter(t => !S.cards[keyOf(t)])).slice(0, 15));
    let i = 0, flipped = false;
    const draw = () => {
      const t = queue[i];
      wrap.innerHTML = `<div class="sec-h" style="margin-top:0"><h2>Review cards</h2><span class="muted tnum">${gl.length} terms · ${learned} learned · ${due.length} due</span></div>` + (t ? `<div class="review-card"><div class="eyebrow" style="margin-bottom:8px">Card ${i + 1} of ${queue.length} · from ${t.m === '0' ? 'the introduction' : 'module ' + esc(t.m)}</div><div class="rcard" tabindex="0" role="button" aria-label="Show definition"><div class="term">${inline(t.t)}</div>${flipped ? `<div class="def">${inline(t.d)}</div>` : '<div class="muted" style="font-size:13px">Say the definition to yourself, then tap to check.</div>'}</div><div class="row" style="justify-content:center;margin-top:14px">${flipped ? '<button type="button" class="btn ghost again">Again</button><button type="button" class="btn ghost good">Good</button><button type="button" class="btn easy">Easy</button>' : '<button type="button" class="btn show">Show definition</button>'}</div></div>` : `<div class="empty">All caught up for today. ${learned} of ${gl.length} terms learned. Come back tomorrow for the next batch.</div>`);
      const card = wrap.querySelector('.rcard'); if (!card) return;
      const flip = () => { flipped = true; draw(); };
      card.addEventListener('click', () => { if (!flipped) flip(); }); card.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && !flipped) { e.preventDefault(); flip(); } });
      const sb = wrap.querySelector('.show'); if (sb) sb.addEventListener('click', flip);
      const grade = g => { const k = keyOf(t); const c = S.cards[k] || [0, today]; let box = g === 0 ? 1 : Math.min(5, c[0] + (g === 2 ? 2 : 1)); const d = parseDay(today); d.setDate(d.getDate() + ivl[box]); S.cards[k] = [box, dayKey(d)]; commit(); i++; flipped = false; draw(); };
      [['again', 0], ['good', 1], ['easy', 2]].forEach(([c, g]) => { const b = wrap.querySelector('.' + c); if (b) b.addEventListener('click', () => grade(g)); });
    };
    draw();
  }

  async function viewGlossary() {
    const wrap = node('<div class="read"></div>'); main.appendChild(wrap);
    const gl = (await loadGloss()).slice().sort((a, b) => a.t.localeCompare(b.t, 'en', { sensitivity: 'base' }));
    wrap.innerHTML = `<div class="sec-h" style="margin-top:0"><h2>Glossary</h2><span class="muted">${gl.length} terms</span></div><div class="field"><label for="gq" class="sr">Search the glossary</label><input type="search" id="gq" placeholder="Search terms and definitions"></div><dl class="gl-list"></dl>`;
    const list = wrap.querySelector('.gl-list');
    const draw = q => { q = (q || '').toLowerCase(); const items = gl.filter(t => !q || t.t.toLowerCase().includes(q) || t.d.toLowerCase().includes(q)); list.innerHTML = items.map(t => `<div class="gl-i"><dt>${inline(t.t)}${[t.m].concat(t.also || []).map(m => `<a href="#${modHash(m)}">${m === '0' ? 'Intro' : m}</a>`).join('')}</dt><dd>${inline(t.d)}</dd></div>`).join('') || '<div class="gl-i">No matching terms.</div>'; };
    wrap.querySelector('#gq').addEventListener('input', e => draw(e.target.value)); draw('');
  }

  function viewBlueprint() {
    const wrap = node('<div class="wrap"></div>'); main.appendChild(wrap);
    const cov = BUILD.coverage || {};
    const total = O.domains.reduce((a, d) => a + d.modules.reduce((b, m) => b + m.bullets.length, 0), 0);
    const covered = O.domains.reduce((a, d) => a + d.modules.reduce((b, m) => b + m.bullets.filter((_, i) => cov[m.id] && cov[m.id][i + 1] && cov[m.id][i + 1].s.length).length, 0), 0);
    wrap.innerHTML = `<div class="sec-h" style="margin-top:0"><h2>Blueprint map</h2><span class="muted tnum">${covered} of ${total} outline topics taught so far</span></div><p class="muted" style="max-width:70ch;margin-top:-4px">Every topic in the pilot exam outline, where it is taught, and how many practice questions test it.</p>
      ${O.domains.map(d => `<div class="bp-d ${dcls(d.n)}"><div class="sec-h"><h2 style="font-size:18px">Domain ${d.n}: ${esc(d.title)}</h2><span class="pill">${d.weight}%</span></div>${d.modules.map(m => `<div class="bp-m"><h3><a href="#${modHash(m.id)}" style="color:inherit">${m.id} ${esc(m.title)}</a></h3>${m.bullets.map((bl, i) => { const c = cov[m.id] && cov[m.id][i + 1]; const secs = c ? c.s : []; return `<div class="bp-b"><div><div>${esc(bl)}</div><div class="w">${secs.length ? 'Taught in ' + secs.map(s => `<a href="#${secHash(m.id, s)}">section ${s.slice(1)}</a>`).join(', ') : bmeta(m.id) ? 'Not mapped yet' : 'Module in production'}</div></div>${c && c.q ? `<span class="pill ok">${c.q} Q</span>` : '<span class="pill">0 Q</span>'}</div>`; }).join('')}</div>`).join('')}</div>`).join('')}`;
  }

  /* ---------- bonus: every video, back to back ---------- */
  const COURSE_ORDER = ['0'].concat(O.domains.reduce((a, d) => a.concat(d.modules.map(m => m.id)), []), ['F']);
  function playlist() { const out = []; COURSE_ORDER.forEach(id => { const b = bmeta(id); if (b && b.vlist) b.vlist.forEach(v => out.push(Object.assign({ mod: id }, v))); }); return out; }
  const clock = s => { s = Math.max(0, Math.round(s)); const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), x = s % 60; return h ? `${h}:${String(m).padStart(2, '0')}:${String(x).padStart(2, '0')}` : `${m}:${String(x).padStart(2, '0')}`; };
  const hrs = s => { const m = Math.round(s / 60); return m >= 60 ? `${Math.floor(m / 60)} h ${m % 60} min` : `${m} min`; };
  const modCode = id => id === '0' ? 'Intro' : id === 'F' ? 'Final' : id;
  async function viewWatch() {
    const PL = playlist();
    const wrap = node('<div class="wrap pa"></div>'); main.appendChild(wrap);
    if (!PL.length) { wrap.innerHTML = '<div class="empty"><p>No videos are available yet.</p></div>'; return; }
    const total = PL.reduce((a, v) => a + v.d, 0);
    const watchedN = () => PL.filter(v => (S.vid[v.id] || 0) >= 0.9).length;
    const startOpts = [['0', 'Introduction']].concat(O.domains.map(d => [String(d.n), `Domain ${d.n}: ${d.short}`]), [['F', 'Final review']]);
    let groups = ''; let lastMod = null;
    PL.forEach((v, i) => {
      if (v.mod !== lastMod) { if (lastMod !== null) groups += '</ol>'; const m = MOD[v.mod]; groups += `<div class="pa-mh ${dcls(m.domain)}"><span class="code">${modCode(v.mod)}</span>${esc(m.title)}</div><ol class="pa-ol">`; lastMod = v.mod; }
      groups += `<li><button type="button" class="pa-it" data-i="${i}"><span class="pa-n tnum">${i + 1}</span><span class="pa-t">${esc(v.t)}</span><span class="pa-d tnum">${clock(v.d)}</span><span class="pa-w" aria-hidden="true"></span></button></li>`;
    });
    groups += '</ol>';
    wrap.innerHTML = `<div class="crumbs"><a href="#home">Course</a><span>›</span><span>Bonus</span></div>
      <div class="sec-h" style="margin-top:0"><h2>Play all videos</h2><span class="muted tnum">${PL.length} videos · ${hrs(total)} · <span class="pa-wn"></span></span></div>
      <p class="muted pa-intro">Every video lesson in course order, one after another. Videos you watch here count towards your lessons as usual.</p>
      <div class="pa-grid">
        <div class="pa-main">
          <div class="pa-now"><div class="eyebrow pa-k"></div><h3 class="pa-h"></h3></div>
          <div class="pa-stage"></div>
          <div class="pa-ctl"><button type="button" class="btn ghost small pa-prev" aria-label="Previous video">${icon('arrow').replace('<svg', '<svg style="transform:rotate(180deg)"')}<span>Previous</span></button><span class="pa-pos tnum muted"></span><button type="button" class="btn ghost small pa-next" aria-label="Next video"><span>Next</span>${icon('arrow')}</button></div>
          <div class="card pa-opts">
            <div class="field" style="margin-bottom:12px"><label for="pa-from">Jump to</label><select id="pa-from"><option value="">Choose a domain…</option>${startOpts.map(([k, t]) => `<option value="${k}">${esc(t)}</option>`).join('')}<option value="unwatched">First video I haven’t watched</option></select></div>
            <div class="days"><label><input type="checkbox" id="pa-auto" ${S.prefs.paAuto !== false ? 'checked' : ''}>Play the next video automatically</label><label><input type="checkbox" id="pa-rev" ${S.prefs.paReveal !== false ? 'checked' : ''}>Show quick-check answers and keep going</label><label><input type="checkbox" id="pa-skip" ${S.prefs.paSkip ? 'checked' : ''}>Skip videos I’ve watched</label><label><input type="checkbox" id="pa-bg" ${S.prefs.paBg ? 'checked' : ''}>Listen mode: keep playing with the screen off</label></div>
            <p class="help muted" style="font-size:13px;margin:10px 0 0">Turn off “Show quick-check answers” to answer each in-video question yourself; playback then waits for you.</p>
            <div class="pa-bgnote" ${S.prefs.paBg ? '' : 'hidden'}><b>Listening in the car or on the go</b><p>Press play, then lock your phone. The narration carries on and the next video starts by itself. Your car’s or headphones’ skip buttons move between videos, and the lock screen shows what’s playing. Quick checks are read out but don’t stop playback while the screen is off.</p><p>Open the course in Chrome, rather than inside another app, for the best results. If playback stops when the phone locks, set Chrome’s battery use to <i>Unrestricted</i> in Android’s app settings.</p></div>
          </div>
        </div>
        <aside class="pa-list" aria-label="Playlist">${groups}</aside>
      </div>`;
    const $ = sel => wrap.querySelector(sel);
    const stage = $('.pa-stage'), list = $('.pa-list'), items = Array.from(wrap.querySelectorAll('.pa-it'));
    let cur = Math.max(0, PL.findIndex(v => v.id === S.prefs.paAt)); let player = null, gen = 0, upT = null;
    const isW = i => (S.vid[PL[i].id] || 0) >= 0.9;
    const marks = () => { items.forEach((b, i) => { b.classList.toggle('done', isW(i)); b.querySelector('.pa-w').innerHTML = isW(i) ? icon('check') : ''; }); $('.pa-wn').textContent = `${watchedN()} watched`; };
    const nextIdx = from => { let i = from + 1; if (S.prefs.paSkip) while (i < PL.length && isW(i)) i++; return i < PL.length ? i : -1; };
    const stopUp = () => { clearInterval(upT); upT = null; };
    const bgOn = () => !!S.prefs.paBg;
    const AEL = new Audio(); AEL.preload = 'auto'; AEL.setAttribute('playsinline', '');
    const MS = 'mediaSession' in navigator ? navigator.mediaSession : null;
    let art = null;
    try { const cv = document.createElement('canvas'); cv.width = cv.height = 512; const g = cv.getContext('2d'); g.fillStyle = '#1f2430'; g.fillRect(0, 0, 512, 512); g.strokeStyle = '#ffffff'; g.lineWidth = 22; g.lineJoin = 'round'; g.beginPath(); g.moveTo(256, 70); g.lineTo(400, 124); g.lineTo(400, 230); g.bezierCurveTo(400, 320, 340, 386, 256, 414); g.bezierCurveTo(172, 386, 112, 320, 112, 230); g.lineTo(112, 124); g.closePath(); g.stroke(); g.fillStyle = '#ffffff'; g.font = '800 92px Archivo, Arial, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('AI', 256, 246); art = cv.toDataURL('image/png'); } catch (e) { }
    const msSet = (name, fn) => { if (!MS) return; try { MS.setActionHandler(name, fn); } catch (e) { } };
    const msState = () => { if (!MS) return; try { MS.playbackState = player && player.playing ? 'playing' : 'paused'; } catch (e) { } };
    const msPos = () => { if (!MS || !MS.setPositionState || !player || !player.audio) return; const a = player.audio; if (!(a.duration > 0)) return; try { MS.setPositionState({ duration: a.duration, position: Math.min(a.currentTime, a.duration), playbackRate: a.playbackRate || 1 }); } catch (e) { } };
    AEL.addEventListener('play', msState); AEL.addEventListener('pause', msState); AEL.addEventListener('loadedmetadata', msPos); AEL.addEventListener('seeked', msPos);
    msSet('play', () => { if (!player) return; if (player.ended) { const nx = nextIdx(cur); if (nx >= 0) go(nx, true); else player.play(); } else player.play(); });
    msSet('pause', () => { stopUp(); if (player) player.pause(); });
    msSet('nexttrack', () => { const nx = nextIdx(cur); if (nx >= 0) go(nx, true); });
    msSet('previoustrack', () => { if (player && player.audio && player.audio.currentTime > 5) go(cur, true); else if (cur > 0) go(cur - 1, true); });
    async function go(i, autoplay) {
      stopUp(); const my = ++gen; cur = i; const it = PL[i];
      if (S.prefs.paAt !== it.id) { S.prefs.paAt = it.id; commit(); }
      items.forEach((b, k) => { b.classList.toggle('cur', k === i); if (k === i) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); });
      const li = items[i]; if (li) { const lt = li.offsetTop - list.offsetTop; if (lt < list.scrollTop || lt > list.scrollTop + list.clientHeight - li.offsetHeight) list.scrollTop = Math.max(0, lt - list.clientHeight / 3); }
      const m = MOD[it.mod];
      $('.pa-k').textContent = `${modCode(it.mod) === 'Intro' ? 'Introduction' : modCode(it.mod) === 'Final' ? 'Final review' : 'Module ' + it.mod} · ${m.title}`;
      $('.pa-h').innerHTML = `${esc(it.t)} <a class="pa-open" href="#${secHash(it.mod, it.s)}">Open the lesson</a>`;
      $('.pa-pos').textContent = `Video ${i + 1} of ${PL.length}`;
      $('.pa-prev').disabled = i === 0; $('.pa-next').disabled = i === PL.length - 1;
      wrap.className = `wrap pa ${dcls(m.domain)}`;
      if (MS && window.MediaMetadata) { try { MS.metadata = new MediaMetadata({ title: it.t, artist: `${modCode(it.mod) === 'Intro' ? 'Introduction' : modCode(it.mod) === 'Final' ? 'Final review' : 'Module ' + it.mod} · ${m.title}`, album: `AI Security Pilot Prep · video ${i + 1} of ${PL.length}`, artwork: art ? [{ src: art, sizes: '512x512', type: 'image/png' }] : [] }); } catch (e) { } }
      const wasFull = !!(player && player.root && player.root.classList.contains('vp-full'));
      if (player) { player.destroy(); player = null; }
      stage.innerHTML = '<div class="vid pa-load"><div class="muted">Loading…</div></div>';
      let block = null;
      try { const c = await loadMod(it.mod); const sec = c && c.sections.find(x => x.id === it.s); block = sec && sec.blocks.find(x => x.type === 'video' && x.id === it.id); } catch (e) { console.error(e); }
      if (my !== gen) return;
      if (!block) { stage.innerHTML = '<div class="empty"><p>This video couldn’t be loaded. Check your connection, then try again.</p></div>'; return; }
      stage.innerHTML = ''; const host = node('<div class="vid"></div>'); stage.appendChild(host);
      player = new V.Player(host, block, {
        watched: S.vid[it.id] || 0,
        prefs: () => S.prefs, setPref: (k, v) => { S.prefs[k] = v; commit(); },
        autoQuiz: () => S.prefs.paReveal !== false,
        audioEl: AEL, background: bgOn,
        onProgress: f => { if (f > (S.vid[it.id] || 0)) { S.vid[it.id] = Math.round(f * 1000) / 1000; commit(); marks(); } },
        onQuiz: () => { },
        onEnd: () => ended(my)
      });
      if (wasFull) player.toggleFull(true);
      if (autoplay) player.play();
      msState();
      const nx = nextIdx(i); if (nx >= 0) loadMod(PL[nx].mod).catch(() => { });
    }
    function ended(my) {
      if (my !== gen || !player) return;
      const nx = nextIdx(cur); const el = player.endEl;
      msState();
      if (nx >= 0 && document.hidden && bgOn() && S.prefs.paAuto !== false) { go(nx, true); return; }
      if (nx < 0) { el.querySelector('.vp-endm').textContent = cur === PL.length - 1 ? 'That’s the last video in the course. Well done.' : 'You’ve watched everything after this one.'; return; }
      const add = node(`<div class="pa-up"><div class="pa-upk">Up next${S.prefs.paAuto !== false ? ' in <b class="tnum">5</b> s' : ''}</div><div class="pa-upt">${esc(PL[nx].t)}</div></div>`);
      el.querySelector('.vp-endm').after(add);
      const btns = el.querySelector('.vp-endb');
      const playNow = node(`<button type="button" class="vp-btn2 pa-go">${icon('play')}<span>Play next</span></button>`);
      btns.prepend(playNow);
      playNow.addEventListener('click', () => go(nx, true));
      if (S.prefs.paAuto !== false) {
        const cancel = node('<button type="button" class="vp-btn2 vp-ghost pa-cancel">Cancel</button>'); btns.appendChild(cancel);
        let n = 5; const b = add.querySelector('b');
        upT = setInterval(() => { if (document.hidden) { if (bgOn()) go(nx, true); return; } n--; if (n <= 0) go(nx, true); else b.textContent = n; }, 1000);
        cancel.addEventListener('click', () => { stopUp(); add.querySelector('.pa-upk').textContent = 'Up next'; cancel.remove(); playNow.focus(); });
        el.querySelector('.vp-replay').addEventListener('click', stopUp);
      }
    }
    items.forEach(b => b.addEventListener('click', () => go(+b.dataset.i, true)));
    $('.pa-prev').addEventListener('click', () => cur > 0 && go(cur - 1, true));
    $('.pa-next').addEventListener('click', () => cur < PL.length - 1 && go(cur + 1, true));
    $('#pa-from').addEventListener('change', e => {
      const v = e.target.value; e.target.value = ''; if (!v) return; let i;
      if (v === 'unwatched') { i = PL.findIndex((_, k) => !isW(k)); if (i < 0) i = 0; }
      else i = PL.findIndex(x => (x.mod === '0' && v === '0') || (x.mod === 'F' && v === 'F') || String(MOD[x.mod].domain) === v && x.mod !== '0' && x.mod !== 'F');
      if (i >= 0) go(i, false);
    });
    $('#pa-auto').addEventListener('change', e => { S.prefs.paAuto = e.target.checked; commit(); if (!e.target.checked) stopUp(); });
    $('#pa-rev').addEventListener('change', e => { S.prefs.paReveal = e.target.checked; commit(); });
    $('#pa-skip').addEventListener('change', e => { S.prefs.paSkip = e.target.checked; commit(); });
    $('#pa-bg').addEventListener('change', e => { S.prefs.paBg = e.target.checked; commit(); $('.pa-bgnote').hidden = !e.target.checked; });
    teardown = () => {
      stopUp(); gen++;
      if (player) { player.destroy(); player = null; }
      try { AEL.pause(); AEL.removeAttribute('src'); AEL.load(); } catch (e) { }
      ['play', 'pause', 'nexttrack', 'previoustrack'].forEach(n => msSet(n, null));
      if (MS) { try { MS.metadata = null; MS.playbackState = 'none'; } catch (e) { } }
    };
    marks(); go(cur, false);
  }

  function viewPrefs() {
    const wrap = node('<div class="read"></div>'); main.appendChild(wrap);
    const voices = V.TTS.list(); const best = V.TTS.best(''); const AU = BUILD.audio || { recorded: 0, total: 0, sample: null };
    wrap.innerHTML = `<div class="sec-h" style="margin-top:0"><h2>Preferences</h2><span class="note-ind"><i></i><span>${syncText()}</span></span></div>
      <div class="card"><h3>Appearance</h3>
        <div class="field"><label for="theme">Site theme</label><select id="theme">${[['light', 'Light'], ['dark', 'Dark'], ['system', 'Match my device']].map(([k, t]) => `<option value="${k}" ${(S.prefs.theme || 'light') === k ? 'selected' : ''}>${t}</option>`).join('')}</select></div>
        <div class="field" style="margin-top:14px"><label for="vtheme">Video theme</label><select id="vtheme">${[['light', 'Light'], ['dark', 'Dark'], ['site', 'Same as the site']].map(([k, t]) => `<option value="${k}" ${(S.prefs.vtheme || 'light') === k ? 'selected' : ''}>${t}</option>`).join('')}</select><span class="help">Light shows dark text on a light background, like VS Code’s light theme. Dark shows light text on a dark background.</span></div></div>
      <div class="card" style="margin-top:14px"><h3>Video narration</h3>
        <div class="field"><label for="vsrc">Voice</label><select id="vsrc"><option value="recorded" ${S.prefs.voiceSrc !== 'device' ? 'selected' : ''}>Recorded British voice (recommended)</option><option value="device" ${S.prefs.voiceSrc === 'device' ? 'selected' : ''} ${voices.length ? '' : 'disabled'}>My device’s voice${voices.length ? '' : ' (not available here)'}</option></select><span class="help">Recorded narration plays in any browser, including the Claude app.${AU.total && AU.recorded < AU.total ? ` ${AU.recorded} of ${AU.total} videos are recorded so far; the others use your device’s voice where there is one, or captions.` : ''}</span></div>
        <div class="field dvoice" style="margin-top:14px" ${S.prefs.voiceSrc === 'device' ? '' : 'hidden'}><label for="voice">Device voice</label><select id="voice"><option value="">Automatic${best ? ' (' + esc(best.name) + ')' : ''}</option>${voices.map(v => `<option value="${esc(v.voiceURI)}" ${S.prefs.voice === v.voiceURI ? 'selected' : ''}>${esc(v.name)} · ${esc(v.lang)}</option>`).join('')}</select><span class="help">Voices come from your device. Natural or online voices sound best; on Android, Google voices work well.</span></div>
        <div class="row"><button type="button" class="btn ghost small test-voice">Play a sample</button></div>
        <div class="field" style="margin-top:14px"><label for="rate">Speed</label><select id="rate">${[0.85, 1, 1.15, 1.3, 1.5].map(r => `<option value="${r}" ${S.prefs.rate == r ? 'selected' : ''}>${r}×</option>`).join('')}</select></div>
        <div class="days"><label><input type="checkbox" id="narr" ${S.prefs.narration !== false ? 'checked' : ''}>Narration</label><label><input type="checkbox" id="caps" ${S.prefs.captions !== false ? 'checked' : ''}>Captions</label></div>
        <p class="muted" style="font-size:12.5px;margin:14px 0 0">The recorded voice was generated with the open-source Kokoro-82M speech model (Apache 2.0), using the misaki pronunciation dictionary (Apache 2.0).</p></div>
      <div class="card" style="margin-top:14px"><h3>Reading</h3><div class="field"><label for="tsize">Lesson text size</label><select id="tsize">${[['s', 'Small'], ['m', 'Medium'], ['l', 'Large']].map(([k, t]) => `<option value="${k}" ${S.prefs.text === k ? 'selected' : ''}>${t}</option>`).join('')}</select></div></div>
      <div class="card" style="margin-top:14px"><h3>Backup</h3><p class="muted" style="margin-top:0">${window.claude ? 'Your progress syncs with your Claude account. You can also keep a backup.' : 'Your progress is saved in this browser only. Keep a backup to move it to another device or browser.'}</p><div class="row"><button type="button" class="btn ghost small exp">Copy progress</button>${window.claude ? '' : '<button type="button" class="btn ghost small dl">Download backup file</button>'}<button type="button" class="btn ghost small imp-t">Restore from backup</button><label class="btn ghost small" style="cursor:pointer">Restore from file<input type="file" accept=".json,application/json" class="imp-f" hidden></label></div><div class="imp" hidden style="margin-top:12px"><label for="impx" class="sr">Backup text</label><textarea id="impx" placeholder="Paste backup text here"></textarea><div class="row" style="margin-top:8px"><button type="button" class="btn small imp-go">Restore</button></div></div></div>
      <div class="card" style="margin-top:14px"><h3>Reset</h3><p class="muted" style="margin-top:0">Clear all progress, scores and review cards.</p><button type="button" class="btn ghost small rst">Reset progress</button><div class="rst-c"></div></div>`;
    const q = s => wrap.querySelector(s);
    q('#theme').addEventListener('change', e => { S.prefs.theme = e.target.value; applyTheme(); commit(); });
    q('#vtheme').addEventListener('change', e => { S.prefs.vtheme = e.target.value; applyTheme(); commit(); });
    q('#vsrc').addEventListener('change', e => { S.prefs.voiceSrc = e.target.value; q('.dvoice').hidden = e.target.value !== 'device'; commit(); });
    q('#voice').addEventListener('change', e => { S.prefs.voice = e.target.value; commit(); });
    q('#rate').addEventListener('change', e => { S.prefs.rate = +e.target.value; commit(); });
    q('#narr').addEventListener('change', e => { S.prefs.narration = e.target.checked; commit(); });
    q('#caps').addEventListener('change', e => { S.prefs.captions = e.target.checked; commit(); });
    q('#tsize').addEventListener('change', e => { S.prefs.text = e.target.value; setReadSize(); commit(); });
    let sample = null;
    q('.test-voice').addEventListener('click', () => {
      V.TTS.cancel(); if (sample) { sample.pause(); sample = null; }
      if (S.prefs.voiceSrc !== 'device' && AU.sample) {
        sample = new Audio(AU.sample + (BUILD.v ? '?v=' + BUILD.v : '')); try { sample.playbackRate = S.prefs.rate || 1; } catch (e) { }
        const pr = sample.play(); if (pr && pr.catch) pr.catch(() => toast('The sample couldn’t play. Check your volume and connection.'));
        return;
      }
      V.TTS.broken = false;
      try { V.TTS.speak('This is how your video lessons will sound. Prompt injection hides instructions inside content the model reads.', { rate: S.prefs.rate || 1, voice: V.TTS.best(S.prefs.voice) }); } catch (e) { toast('Speech isn’t available in this browser'); }
    });
    q('.exp').addEventListener('click', () => { const txt = JSON.stringify(S); const done = () => toast('Progress copied'); try { navigator.clipboard.writeText(txt).then(done, () => { q('.imp').hidden = false; q('#impx').value = txt; q('#impx').select(); toast('Select and copy the text below'); }); } catch (e) { q('.imp').hidden = false; q('#impx').value = txt; q('#impx').select(); } });
    if (q('.dl')) q('.dl').addEventListener('click', () => { try { const blob = new Blob([JSON.stringify(S, null, 1)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'ai-security-progress-' + dayKey() + '.json'; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000); toast('Backup downloaded'); } catch (e) { toast('Download isn’t available here. Use Copy progress instead.'); } });
    q('.imp-f').addEventListener('change', e => { const f = e.target.files && e.target.files[0]; if (!f) return; const rd = new FileReader(); rd.onload = () => { try { const s = normalize(JSON.parse(String(rd.result))); if (!s.v) throw new Error('bad'); S = s; commit(); toast('Progress restored'); render(); } catch (err) { toast('That file isn’t a valid backup'); } }; rd.readAsText(f); });
    q('.imp-t').addEventListener('click', () => { q('.imp').hidden = !q('.imp').hidden; });
    q('.imp-go').addEventListener('click', () => { try { const s = normalize(JSON.parse(q('#impx').value)); if (!s.v) throw new Error('bad'); S = s; commit(); toast('Progress restored'); render(); } catch (e) { toast('That text isn’t a valid backup'); } });
    q('.rst').addEventListener('click', () => { const box = q('.rst-c'); box.innerHTML = '<div class="confirm"><div><strong>Reset everything?</strong> This clears progress on every device signed in to your account.</div><div class="row"><button type="button" class="btn small y">Reset progress</button><button type="button" class="btn ghost small n">Cancel</button></div></div>'; box.querySelector('.y').addEventListener('click', () => { const keep = S.prefs; S = fresh(); S.prefs = keep; commit(); toast('Progress reset'); render(); }); box.querySelector('.n').addEventListener('click', () => { box.innerHTML = ''; }); });
    syncInd();
  }

  render();
  initSync();
  window.__APP = { get state() { return S; }, render, sequence, earned };
})();

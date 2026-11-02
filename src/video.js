/* Animated explainer engine.
   A video is a list of scenes. Each scene has a visual template (t) and narration (say).
   Narration is split into segments with "|"; segment k triggers beat k of the template.
   Narration is a recorded audio file per video (video.audio: { src, dur, t: [[scene, seg, start, end], ...] }) whose clock
   drives scenes, beats and captions. Without a recording it falls back to the device's speech voices, then to timed captions.
   Captions are always shown. Pronunciation hints: {Display~spoken}. */
(function () {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const W = 1600, H = 900;
  /* Two palettes. Light (default) follows VS Code Light: dark text on an off-white stage, darker accents for contrast,
     VS Code Light+ syntax colours. Dark keeps the original briefing-screen look. Templates read C/KIND/DOM/X at render time. */
  const THEMES = {
    dark: {
      C: { bg: '#0E1527', bg2: '#111A2F', panel: '#172240', panel2: '#1E2B4B', line: '#2E3D62', text: '#EAEEF6', dim: '#A6B1C8', faint: '#67769B',
        data: '#5EA6FF', model: '#B694FF', human: '#F4C552', threat: '#FF6363', control: '#3FD69B', neutral: '#94A4C4' },
      DOM: { 0: '#9FB0D4', 1: '#7D95FF', 2: '#ECAD42', 3: '#36CBA6', 4: '#B391FF', 5: '#FF9157', 6: '#FF6FA8', F: '#9FB0D4' },
      X: { deep: '#0B1222', bgA: '#121C35', bgB: '#0A1121', dots: '#22305A', dotsOp: 0.55, grid: '#1C2846', vgrid: '#1A2644', code: '#0A1020',
        bubble: '#172240', userBubble: '#2A2517', evilBubble: '#2B1422', onAccent: '#0B1222',
        heat: [[23, 58, 52], [62, 54, 24], [74, 27, 36]], clusters: ['#24365E', '#2E2A55', '#1F4049', '#43304A', '#3A3A22'],
        syn: { comment: '#67769B', string: '#9BE3A8', number: '#F4C552', keyword: '#B694FF', key: '#5EA6FF' }, map: {} } },
    light: {
      C: { bg: '#FFFFFF', bg2: '#F6F8FA', panel: '#FFFFFF', panel2: '#EEF1F5', line: '#C9D1DA', text: '#1F2328', dim: '#4A5361', faint: '#5F6A77',
        data: '#0A5FC2', model: '#7339C6', human: '#9A5800', threat: '#C42B33', control: '#11743C', neutral: '#56616E' },
      DOM: { 0: '#5D6A82', 1: '#3D55D1', 2: '#A2620A', 3: '#0D7D62', 4: '#6C47C4', 5: '#BE4E1C', 6: '#B92A68', F: '#5D6A82' },
      X: { deep: '#FFFFFF', bgA: '#FFFFFF', bgB: '#F2F4F7', dots: '#E6EAEF', dotsOp: 0, grid: '#E1E6EC', vgrid: '#E6EAEF', code: '#FFFFFF',
        bubble: '#F3F5F8', userBubble: '#FFF3DC', evilBubble: '#FDECEC', onAccent: '#FFFFFF',
        heat: [[221, 242, 228], [252, 240, 204], [250, 216, 216]], clusters: ['#DCE8FA', '#EBE2FA', '#D8F0E6', '#F8E1EA', '#F6ECCF'],
        syn: { comment: '#008000', string: '#A31515', number: '#098658', keyword: '#0000FF', key: '#0451A5' },
        /* Colours written into hand-made scene SVGs use the dark palette; translate them for light. */
        map: { '#EAEEF6': '#1F2328', '#A6B1C8': '#4A5361', '#67769B': '#5F6A77', '#94A4C4': '#56616E', '#5EA6FF': '#0A5FC2', '#B694FF': '#7339C6',
          '#F4C552': '#9A5800', '#FF6363': '#C42B33', '#3FD69B': '#11743C', '#0B1222': '#FFFFFF', '#1A2440': '#EEF1F5', '#5C6B91': '#8A95A3',
          '#2B1422': '#FDECEC', '#2A2517': '#FFF3DC', '#141F38': '#F3F5F8', '#18264A': '#E3EDFB', '#1D2D57': '#ECE4FA', '#172240': '#FFFFFF' } } }
  };
  const C = {}, DOM = {}, KIND = {}, X = {}; let THEME = 'light';
  function setTheme(name) {
    THEME = THEMES[name] ? name : 'light'; const t = THEMES[THEME];
    Object.assign(C, t.C); Object.assign(DOM, t.DOM); Object.assign(X, t.X);
    Object.assign(KIND, { data: C.data, model: C.model, human: C.human, threat: C.threat, control: C.control, neutral: C.neutral, dim: C.faint });
    return THEME;
  }
  setTheme('light');
  const FONT = { ui: "Archivo, 'Helvetica Neue', Arial, sans-serif", mono: "'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace" };
  const REDUCED = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- small helpers ---------- */
  function el(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    if (attrs) for (const k in attrs) { const v = attrs[k]; if (v !== undefined && v !== null && v !== false) e.setAttribute(k, v); }
    if (parent) parent.appendChild(e);
    return e;
  }
  function rv(e, type) { if (type === 'fade') e.classList.add('op'); else { e.classList.add('rv'); if (type === 'pop') e.classList.add('pop'); } return e; }
  function show(e, on) { if (e) e.classList.toggle('on', !!on); return e; }
  function cls(e, c, on) { if (e) e.classList.toggle(c, !!on); return e; }
  function ids(v) { return !v ? [] : Array.isArray(v) ? v : String(v).split(/[\s,]+/).filter(Boolean); }
  function G(parent, x, y, type) { const o = el('g', { transform: `translate(${x},${y})` }, parent); const i = el('g', {}, o); if (type !== false && type !== '') rv(i, type); i._outer = o; return i; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
  function wrapText(s, max) {
    const words = String(s).split(/\s+/).filter(Boolean); const out = []; let cur = '';
    for (const w of words) { if (!cur) cur = w; else if ((cur + ' ' + w).length <= max) cur += ' ' + w; else { out.push(cur); cur = w; } }
    if (cur) out.push(cur); return out.length ? out : [''];
  }
  function charW(size, font, stretch) { return size * (font === 'mono' ? 0.6 : stretch ? 0.47 : 0.54); }
  function lines(s, size, w, font, stretch) {
    if (s === undefined || s === null || s === '') return [];
    const max = w ? Math.max(3, Math.floor(w / charW(size, font, stretch))) : 1e9;
    return String(s).split('\n').flatMap(p => wrapText(p, max));
  }
  /* Text: y is the baseline of the first line. Returns <text> with _h (block height) and _n (line count). */
  function T(parent, x, y, s, o) {
    o = o || {};
    const size = o.size || 40;
    const t = el('text', { x, y, 'font-size': size, 'font-weight': o.weight || 400, fill: o.fill || C.text, 'text-anchor': o.anchor || 'start', 'font-family': o.font === 'mono' ? FONT.mono : FONT.ui }, parent);
    if (o.stretch) t.style.fontStretch = o.stretch;
    if (o.ls) t.setAttribute('letter-spacing', o.ls);
    if (o.italic) t.setAttribute('font-style', 'italic');
    s = String(s == null ? '' : s).replace(/\{([^}~]+)~([^}]+)\}/g, '$1');
    let ls = lines(s, size, o.w, o.font, o.stretch);
    if (o.maxLines && ls.length > o.maxLines) { ls = ls.slice(0, o.maxLines); ls[ls.length - 1] = ls[ls.length - 1].replace(/\s*\S*$/, '') + '…'; }
    const lh = (o.lh || 1.18) * size;
    let y0 = y;
    if (o.valign === 'middle') y0 = y - (ls.length - 1) * lh / 2 + size * 0.34;
    ls.forEach((ln, i) => { const ts = el('tspan', { x, y: y0 + i * lh }, t); ts.textContent = ln; });
    t._n = ls.length; t._h = ls.length * lh;
    return t;
  }
  function ICON(parent, name, cx, cy, size, color, sw) {
    const s = size / 24;
    const g = el('g', { transform: `translate(${cx - size / 2},${cy - size / 2}) scale(${s})`, fill: 'none', stroke: color || C.text, 'stroke-width': sw || 1.8, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, parent);
    g.style.color = color || C.text;
    g.innerHTML = (window.ICONS && window.ICONS[name]) || window.ICONS.sparkle;
    return g;
  }
  function pill(parent, x, y, text, o) {
    o = o || {}; const size = o.size || 26; const w = Math.max(60, String(text).length * size * 0.55 + 30); const h = size + 22;
    const g = el('g', {}, parent);
    el('rect', { x: x - w / 2, y: y - h / 2, width: w, height: h, rx: h / 2, fill: o.fill || C.bg2, stroke: o.stroke || C.line, 'stroke-width': 2 }, g);
    T(g, x, y + size * 0.35, text, { size, anchor: 'middle', fill: o.color || C.text, weight: 600 });
    return g;
  }
  function chip(parent, x, y, text, color, icon, w) {
    w = w || 480; const ls = lines(text, 29, w - 76); const h = Math.max(58, 20 + ls.length * 36);
    el('rect', { x, y, width: w, height: h, rx: 14, fill: C.panel, stroke: color, 'stroke-width': 2.5 }, parent);
    if (icon) ICON(parent, icon, x + 32, y + h / 2, 30, color);
    T(parent, x + 60, y + h / 2 - (ls.length - 1) * 18 + 10, text, { size: 29, w: w - 76 });
    return y + h + 12;
  }
  function seeded(seed) { let s = (seed >>> 0) || 1; return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  function gauss(r) { let u = 0, v = 0; while (u === 0) u = r(); while (v === 0) v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
  function hexA(hex, a) { const h = hex.replace('#', ''); const n = parseInt(h, 16); return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`; }
  function head(g, sc, ctx) {
    if (!sc.title) return null;
    const grp = rv(el('g', {}, g), 'fade');
    el('rect', { x: 90, y: 64, width: 56, height: 7, rx: 3.5, fill: ctx.accent }, grp);
    T(grp, 90, 138, sc.title, { size: 54, weight: 750, stretch: '86%', w: 1420, maxLines: 1 });
    show(grp, true);
    return grp;
  }
  function makeNotes(g, notes, ctx, x, y, w) {
    return (notes || []).map(nt => {
      if (!nt) return null;
      const t = typeof nt === 'string' ? { d: nt } : nt;
      const p = G(g, x, y, 'fade'); let yy = 0;
      if (t.h) { const hh = T(p, 0, 40, t.h, { size: 42, weight: 750, w, stretch: '88%', fill: KIND[t.k] || ctx.accent }); yy = hh._h + 18; }
      if (t.d) T(p, 0, yy + 34, t.d, { size: 33, fill: C.dim, w, lh: 1.34 });
      return p;
    });
  }
  function notesBeat(arr, k) { let idx = -1; for (let i = 0; i <= k && i < arr.length; i++) if (arr[i]) idx = i; arr.forEach((p, i) => p && show(p, i === idx)); }
  function revealCount(k, n, nb) { return k >= nb - 1 ? n : Math.min(n, k); }

  /* ---------- narration parsing ---------- */
  function speakable(s) {
    return s.replace(/\be\.g\.,?/gi, 'for example,').replace(/\bi\.e\.,?/gi, 'that is,').replace(/\bvs\.?\s/gi, 'versus ')
      .replace(/&/g, ' and ').replace(/(\d)\s?%/g, '$1 percent').replace(/→/g, ' to ').replace(/\s+/g, ' ').trim();
  }
  function parseSay(say) {
    if (!say) return [];
    return String(say).split('|').map(s => s.trim()).filter(s => s.length).map(s => {
      const display = s.replace(/\{([^}~]+)~([^}]+)\}/g, '$1');
      const spoken = speakable(s.replace(/\{([^}~]+)~([^}]+)\}/g, '$2'));
      const words = spoken.split(/\s+/).filter(Boolean).length;
      return { display, spoken, words };
    });
  }
  function segDur(words) { return Math.max(1.8, words / 2.55) + 0.35; }
  function estimate(video) { if (video.audio && video.audio.dur) return video.audio.dur + (video.scenes || []).filter(sc => sc.t === 'quiz').length * 20; let t = 0; (video.scenes || []).forEach(sc => { const segs = parseSay(sc.say || (sc.t === 'quiz' ? sc.q : '')); (segs.length ? segs : [{ words: 0 }]).forEach(g => t += segDur(g.words)); if (sc.t === 'quiz') t += 20; }); return t; }

  /* ---------- speech ---------- */
  const TTS = {
    synth: (typeof window !== 'undefined' && window.speechSynthesis) || null,
    voices: [], broken: false, firstDone: false,
    ok() { return !!this.synth && !this.broken && typeof SpeechSynthesisUtterance !== 'undefined'; },
    init() {
      if (!this.synth) return;
      const load = () => { try { this.voices = this.synth.getVoices().filter(v => /^en([-_]|$)/i.test(v.lang)); } catch (e) { this.voices = []; } };
      load();
      try { this.synth.addEventListener('voiceschanged', load); } catch (e) { this.synth.onvoiceschanged = load; }
    },
    score(v) {
      let s = 0; const n = (v.name || '').toLowerCase(); const l = (v.lang || '').toLowerCase().replace('_', '-');
      if (l === 'en-gb') s += 30; else if (l === 'en-us') s += 14; else if (l.startsWith('en')) s += 8;
      if (/natural|neural|online|premium|enhanced/.test(n)) s += 40;
      if (/google/.test(n)) s += 18;
      if (/sonia|libby|ryan|maisie|thomas|serena|daniel|kate|arthur|martha|aria|jenny|guy/.test(n)) s += 12;
      if (/compact|espeak|robot|novelty|whisper|bad news|bells|boing|bubbles|cellos|zarvox|trinoids|albert|jester|organ|superstar/.test(n)) s -= 60;
      return s;
    },
    best(pref) {
      const vs = this.voices; if (!vs.length) return null;
      if (pref) { const m = vs.find(v => v.voiceURI === pref || v.name === pref); if (m) return m; }
      return vs.slice().sort((a, b) => this.score(b) - this.score(a))[0];
    },
    list() { return this.voices.slice().sort((a, b) => this.score(b) - this.score(a)); },
    busy() { try { return this.synth.speaking || this.synth.pending; } catch (e) { return false; } },
    speak(text, o) {
      const u = new SpeechSynthesisUtterance(text);
      if (o.voice) { u.voice = o.voice; u.lang = o.voice.lang; } else u.lang = 'en-GB';
      u.rate = o.rate || 1; u.pitch = 1; u.volume = 1;
      u.onstart = o.onstart; u.onend = o.onend; u.onerror = o.onerror;
      this._keep = u; // keep a reference so the utterance isn't garbage collected mid-speech
      this.synth.speak(u);
      return u;
    },
    cancel() { try { if (this.synth) this.synth.cancel(); } catch (e) { } }
  };
  TTS.init();

  /* ---------- control icons ---------- */
  const SVGI = {
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l12-7.5z" fill="currentColor"/></svg>',
    pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="4.5" width="4" height="15" rx="1" fill="currentColor"/><rect x="14" y="4.5" width="4" height="15" rx="1" fill="currentColor"/></svg>',
    prev: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5v14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M19 5.5v13L9 12z" fill="currentColor"/></svg>',
    next: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 5v14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M5 5.5v13L15 12z" fill="currentColor"/></svg>',
    cc: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="5" width="19" height="14" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M10.5 10.2a2.3 2.3 0 1 0 0 3.6M17 10.2a2.3 2.3 0 1 0 0 3.6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    snd: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5v5h3.5l5 4v-13l-5 4z" fill="currentColor"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    mute: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5v5h3.5l5 4v-13l-5 4z" fill="currentColor"/><path d="M16 9.5l5 5M21 9.5l-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    list: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.5 6h12M8.5 12h12M8.5 18h12" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><circle cx="4.5" cy="6" r="1.2" fill="currentColor"/><circle cx="4.5" cy="12" r="1.2" fill="currentColor"/><circle cx="4.5" cy="18" r="1.2" fill="currentColor"/></svg>',
    full: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    replay: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4.5v5h5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.6 9.5A8 8 0 1 1 4 13.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
  };
  function fmtTime(s) { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }

  /* ---------- the player ---------- */
  const players = new Set();
  class Player {
    constructor(host, video, opts) {
      this.v = video; this.o = opts || {};
      this.uid = 'v' + Math.random().toString(36).slice(2, 9);
      this.accent = DOM[video.domain] || DOM[0];
      this.scenes = (video.scenes || []).map(sc => {
        let segs = parseSay(sc.say || (sc.t === 'quiz' ? sc.q : ''));
        if (!segs.length) segs = [{ display: '', spoken: '', words: 0 }];
        return { sc, segs };
      });
      this.flat = []; let t = 0;
      this.scenes.forEach((s, si) => { s.start = t; s.segs.forEach((g, gi) => { g.dur = segDur(g.words); g.start = t; this.flat.push({ si, gi, start: t, dur: g.dur }); t += g.dur; }); s.end = t; });
      this.total = t;
      this.audioMode = this.setupAudio(video.audio);
      this.si = 0; this.gi = 0; this.playing = false; this.ended = false; this._gen = 0;
      this._acc = 0; this._t0 = 0; this._movers = []; this._timers = []; this._anims = [];
      this.played = new Set(); this.maxFrac = this.o.watched || 0; this._lastReported = this.maxFrac;
      this.build(host);
      players.add(this);
    }
    now() { return this._acc + (this.playing ? performance.now() - this._t0 : 0); }
    prefs() { return (this.o.prefs && this.o.prefs()) || { rate: 1, narration: true, captions: true }; }

    /* --- recorded narration: one audio file per video drives scenes, beats and captions --- */
    setupAudio(au) {
      this.au = null; this._k = 0; this._quizDone = {};
      if (!au || !au.src || !Array.isArray(au.t) || !(au.dur > 0)) return false;
      try { if (!document.createElement('audio').canPlayType('audio/mp4; codecs="mp4a.40.2"')) return false; } catch (e) { return false; }
      const n = this.flat.length;
      if (au.t.length !== n || au.t.some((x, i) => x[0] !== this.flat[i].si || x[1] !== this.flat[i].gi)) return false; // stale timings
      if (this.prefs().voiceSrc === 'device' && TTS.ok() && TTS.voices.length) return false;
      this.au = au;
      this.flat.forEach((f, i) => {
        f.start = i ? au.t[i][2] : 0; f.end = au.t[i][3];
        f.dur = (i < n - 1 ? au.t[i + 1][2] : au.dur) - f.start;
        const g = this.scenes[f.si].segs[f.gi]; g.start = f.start; g.dur = f.dur; g.aEnd = f.end;
      });
      this.scenes.forEach((s, si) => { const fs = this.flat.filter(f => f.si === si); s.start = fs[0].start; s.end = fs[fs.length - 1].start + fs[fs.length - 1].dur; });
      this.total = au.dur;
      return true;
    }
    ensureAudio() {
      if (this.audio) return this.audio;
      const a = this.audio = this.o.audioEl || new Audio();
      a.preload = 'auto'; a.setAttribute('playsinline', '');
      this._aL = [];
      const on = (ev, fn) => { a.addEventListener(ev, fn); this._aL.push([ev, fn]); };
      on('loadedmetadata', () => { if (this._pendingSeek != null) { const t = this._pendingSeek; this._pendingSeek = null; try { a.currentTime = t; } catch (e) { } } });
      on('seeked', () => { const t = this._seekTo; this._seekTo = null; if (t != null && Math.abs(a.currentTime - t) > 1 && !this._blob) this.audioBlob(t); });
      on('waiting', () => this.root.classList.add('vp-wait'));
      on('playing', () => this.root.classList.remove('vp-wait'));
      on('ended', () => { if (this.playing && this.audioMode) { for (let j = this._k; j < this.flat.length; j++) this.markPlayed(this.flat[j].si, this.flat[j].gi); this.finish(); } });
      on('error', () => { if (a.getAttribute('src')) this.audioFail(a.error && a.error.code); });
      a.src = this.au.src;
      this.applyAudioPrefs();
      return a;
    }
    /* Detach from the audio element. A shared element (playlist listen mode) is left loaded so the next video can reuse it. */
    releaseAudio() {
      const a = this.audio; if (!a) return;
      (this._aL || []).forEach(([ev, fn]) => a.removeEventListener(ev, fn)); this._aL = [];
      try { a.pause(); } catch (e) { }
      if (!this.o.audioEl) { try { a.removeAttribute('src'); a.load(); } catch (e) { } }
      this.audio = null;
    }
    /* True when this player may keep playing while the page is hidden (screen off or locked). */
    bgOK() { return !!(this.audioMode && this.o.background && this.o.background()); }
    applyAudioPrefs() {
      const a = this.audio; if (!a) return; const p = this.prefs();
      try { a.playbackRate = p.rate || 1; a.defaultPlaybackRate = p.rate || 1; } catch (e) { }
      a.muted = p.narration === false;
    }
    audioSeek(t) {
      const a = this.audio;
      if (!a || a.readyState < 1) { this._pendingSeek = t; if (a) { try { a.currentTime = t; } catch (e) { } } return; }
      this._seekTo = t;
      try { a.currentTime = t; } catch (e) { this._pendingSeek = t; }
    }
    /* If the host cannot seek inside the file (no range requests), fetch it whole and play from memory. */
    audioBlob(t) {
      this._blob = true;
      fetch(this.au.src).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.blob(); }).then(b => {
        const a = this.audio; if (!a) return;
        this._pendingSeek = t; a.src = URL.createObjectURL(b);
        if (this.playing) { const pr = a.play(); if (pr && pr.catch) pr.catch(() => { }); }
      }).catch(() => { });
    }
    audioPlay() {
      const a = this.ensureAudio(); this.applyAudioPrefs();
      const pr = a.play();
      if (pr && pr.catch) pr.catch(e => {
        if (!e || e.name === 'AbortError') return;
        if (e.name === 'NotAllowedError') { this.pause(); this.toast('Tap play to start the narration.'); return; }
        this.audioFail(e.name);
      });
    }
    audioFail(code) {
      if (!this.audioMode) return;
      const was = this.playing; this.pause();
      this.audioMode = false; this.root.classList.remove('vp-wait');
      this.releaseAudio();
      this.toast(TTS.ok() && TTS.voices.length ? 'The recorded narration didn’t load, so your device’s voice will read the video instead.' : 'The recorded narration didn’t load, so the captions will carry the video. Check your connection and replay to try again.', 6500);
      console.warn('Narration audio failed', code);
      this.syncButtons();
      if (was) this.play();
    }
    audioTick() {
      const a = this.audio; if (!a) return;
      const t = a.currentTime; const s = this.scenes[this.si];
      if (s.sc.t === 'quiz' && !this._quizDone[this.si] && !document.hidden && t >= s.segs[s.segs.length - 1].aEnd + 0.12 && (t < s.end || this.si === this.scenes.length - 1)) {
        this._quizDone[this.si] = true; this.markPlayed(this.si, this.gi); this.showQuiz(); return;
      }
      let k = this._k;
      while (k < this.flat.length - 1 && t >= this.flat[k + 1].start) k++;
      if (k === this._k) return;
      for (let j = this._k; j < k; j++) this.markPlayed(this.flat[j].si, this.flat[j].gi);
      const f = this.flat[k]; this._k = k;
      if (f.si !== this.si) this.renderScene(f.si, f.gi, false, true);
      else { this.gi = f.gi; this.applyBeat(f.gi, false); }
      this.showCaption(this.scenes[f.si].segs[f.gi].display);
    }
    kOf(si, gi) { const k = this.flat.findIndex(f => f.si === si && f.gi === gi); return k < 0 ? 0 : k; }

    build(host) {
      const v = this.v; const mins = Math.max(1, Math.round(this.total / 60));
      const root = document.createElement('div');
      root.className = 'vp'; root.tabIndex = 0; root.setAttribute('role', 'region'); root.setAttribute('aria-label', 'Video: ' + v.title);
      root.style.setProperty('--vp-accent', this.accent);
      root.innerHTML = `
        <div class="vp-screen">
          <svg class="vs paused posterframe" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" aria-hidden="true"></svg>
          <div class="vp-poster">
            <div class="vp-pk">${esc(v.kicker || 'Video')}</div>
            <div class="vp-pt">${esc(v.title)}</div>
            <div class="vp-pm">${mins} min · ${this.scenes.length} scenes · narrated, with captions</div>
            <button class="vp-pbtn" type="button" aria-label="Play video: ${esc(v.title)}">${SVGI.play}<span>Play video</span></button>
          </div>
          <div class="vp-chap" hidden><div class="vp-chap-h">Chapters</div><ol></ol></div>
          <div class="vp-quiz" hidden></div>
          <div class="vp-end" hidden></div>
          <div class="vp-toast" role="status" hidden></div>
        </div>
        <div class="vp-cap" aria-live="polite"></div>
        <div class="vp-bar" title="Seek"><div class="vp-track"></div></div>
        <div class="vp-ctl">
          <button class="vp-b vp-play" type="button" aria-label="Play">${SVGI.play}</button>
          <button class="vp-b vp-prev" type="button" aria-label="Previous scene">${SVGI.prev}</button>
          <button class="vp-b vp-next" type="button" aria-label="Next scene">${SVGI.next}</button>
          <span class="vp-time">0:00 / ${fmtTime(this.total)}</span>
          <span class="vp-sp"></span>
          <button class="vp-b vp-rate" type="button" aria-label="Playback speed">1×</button>
          <button class="vp-b vp-cc" type="button" aria-label="Captions on or off">${SVGI.cc}</button>
          <button class="vp-b vp-snd" type="button" aria-label="Narration on or off">${SVGI.snd}</button>
          <button class="vp-b vp-chb" type="button" aria-label="Chapters">${SVGI.list}</button>
          <button class="vp-b vp-fs" type="button" aria-label="Full screen">${SVGI.full}</button>
        </div>
        <details class="vp-tx"><summary>Transcript</summary><div class="vp-txb"></div></details>`;
      host.appendChild(root);
      this.root = root;
      const q = s => root.querySelector(s);
      this.svg = q('.vs'); this.poster = q('.vp-poster'); this.capEl = q('.vp-cap'); this.track = q('.vp-track');
      this.timeEl = q('.vp-time'); this.quizEl = q('.vp-quiz'); this.endEl = q('.vp-end'); this.toastEl = q('.vp-toast'); this.chapEl = q('.vp-chap');
      this.btnPlay = q('.vp-play');
      // svg scaffolding
      const defs = el('defs', {}, this.svg);
      const lg = el('linearGradient', { id: this.uid + '-bg', x1: 0, y1: 0, x2: 1, y2: 1 }, defs);
      el('stop', { offset: '0%', 'stop-color': X.bgA }, lg); el('stop', { offset: '100%', 'stop-color': X.bgB }, lg);
      const pat = el('pattern', { id: this.uid + '-dots', width: 40, height: 40, patternUnits: 'userSpaceOnUse' }, defs);
      el('circle', { cx: 2, cy: 2, r: 1.6, fill: X.dots }, pat);
      this.defs = defs; this._markers = {};
      el('rect', { x: 0, y: 0, width: W, height: H, fill: `url(#${this.uid}-bg)` }, this.svg);
      if (X.dotsOp) el('rect', { x: 0, y: 0, width: W, height: H, fill: `url(#${this.uid}-dots)`, opacity: X.dotsOp }, this.svg);
      this.svg.classList.add('vt-' + THEME); root.dataset.vtheme = THEME;
      el('rect', { x: 0, y: H - 6, width: W, height: 6, fill: this.accent, opacity: 0.85 }, this.svg);
      T(this.svg, W - 40, H - 28, (v.code || '').toUpperCase(), { size: 22, font: 'mono', fill: C.faint, anchor: 'end', ls: 2 });
      this.layer = el('g', {}, this.svg); this.fx = el('g', {}, this.svg);
      // progress track
      this.scenes.forEach((s, i) => { const d = document.createElement('div'); d.className = 'vp-seg'; d.style.flexGrow = String(Math.max(0.5, s.end - s.start)); d.innerHTML = '<i></i>'; d.title = this.sceneName(i); this.track.appendChild(d); });
      this.segFills = Array.from(this.track.querySelectorAll('.vp-seg i'));
      // chapters + transcript
      const ol = this.chapEl.querySelector('ol'); const txb = root.querySelector('.vp-txb');
      this.scenes.forEach((s, i) => {
        const li = document.createElement('li'); li.innerHTML = `<button type="button"><span>${esc(this.sceneName(i))}</span><time>${fmtTime(s.start)}</time></button>`;
        li.firstChild.addEventListener('click', () => { this.chapEl.hidden = true; this.jump(i, 0); if (!this.playing) this.play(); });
        ol.appendChild(li);
        const p = document.createElement('p'); p.innerHTML = `<button type="button" class="vp-txt"><time>${fmtTime(s.start)}</time>${esc(s.segs.map(g => g.display).join(' '))}</button>`;
        p.firstChild.addEventListener('click', () => { this.jump(i, 0); if (!this.playing) this.play(); root.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); });
        txb.appendChild(p);
      });
      // events
      q('.vp-pbtn').addEventListener('click', () => this.play());
      this.btnPlay.addEventListener('click', () => this.toggle());
      q('.vp-prev').addEventListener('click', () => this.prevScene());
      q('.vp-next').addEventListener('click', () => this.nextScene());
      q('.vp-rate').addEventListener('click', () => { const r = [0.85, 1, 1.15, 1.3, 1.5]; const cur = this.prefs().rate || 1; const i = r.indexOf(cur); const nx = r[(i + 1) % r.length]; this.o.setPref && this.o.setPref('rate', nx); this.syncButtons(); if (this.playing) this.restartSeg(); });
      q('.vp-cc').addEventListener('click', () => { const p = this.prefs(); this.o.setPref && this.o.setPref('captions', p.captions === false); this.syncButtons(); });
      q('.vp-snd').addEventListener('click', () => { const p = this.prefs(); this.o.setPref && this.o.setPref('narration', p.narration === false); this.syncButtons(); if (this.playing) this.restartSeg(); });
      q('.vp-chb').addEventListener('click', () => { this.chapEl.hidden = !this.chapEl.hidden; });
      q('.vp-fs').addEventListener('click', () => this.toggleFull());
      this.track.parentNode.addEventListener('click', e => { const r = this.track.getBoundingClientRect(); const f = Math.min(0.999, Math.max(0, (e.clientX - r.left) / r.width)); this.seekTime(f * this.total); });
      root.addEventListener('keydown', e => {
        if (e.target.closest('button') && (e.key === ' ' || e.key === 'Enter')) return;
        if (e.key === ' ' || e.key === 'k') { e.preventDefault(); this.toggle(); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); this.nextScene(); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); this.prevScene(); }
        else if (e.key === 'Escape' && root.classList.contains('vp-full')) this.toggleFull(false);
      });
      document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement && root.classList.contains('vp-full') && this._nativeFull) { this._nativeFull = false; root.classList.remove('vp-full'); } });
      this.syncButtons();
      // poster frame: title scene, fully built
      this.renderScene(0, this.scenes[0].segs.length - 1, true);
      this.gi = 0; this.updateBar();
    }
    sceneName(i) { const sc = this.scenes[i].sc; return sc.title || sc.chapter || ({ title: 'Introduction', summary: 'Key takeaways', quiz: 'Quick check' }[sc.t]) || ('Scene ' + (i + 1)); }
    syncButtons() {
      const p = this.prefs(); const q = s => this.root.querySelector(s);
      q('.vp-rate').textContent = (p.rate || 1) + '×';
      q('.vp-cc').classList.toggle('off', p.captions === false);
      this.capEl.hidden = p.captions === false;
      const snd = q('.vp-snd'); const can = this.audioMode || TTS.ok(); const narr = p.narration !== false && can;
      snd.innerHTML = narr ? SVGI.snd : SVGI.mute; snd.classList.toggle('off', !narr);
      snd.title = !can ? 'Narration isn’t available here, so captions carry the video' : (p.narration === false ? 'Narration off' : 'Narration on');
      this.btnPlay.innerHTML = this.playing ? SVGI.pause : SVGI.play;
      this.btnPlay.setAttribute('aria-label', this.playing ? 'Pause' : 'Play');
    }
    toast(msg, ms) { this.toastEl.textContent = msg; this.toastEl.hidden = false; clearTimeout(this._toastT); this._toastT = setTimeout(() => { this.toastEl.hidden = true; }, ms || 4200); }

    /* --- transport --- */
    toggle() { this.playing ? this.pause() : this.play(); }
    play() {
      players.forEach(p => { if (p !== this && p.playing) p.pause(); });
      if (!this.quizEl.hidden) return;
      if (this.ended) { this.ended = false; this.endEl.hidden = true; this.si = 0; this.gi = 0; this._fresh = true; if (this.audioMode) { this._k = 0; this._quizDone = {}; this.audioSeek(0); } }
      if (this.poster && !this.poster.hidden) this.poster.hidden = true;
      this.playing = true; this._t0 = performance.now(); this.svg.classList.remove('posterframe');
      this.svg.classList.remove('paused'); this.root.classList.add('playing'); this.syncButtons();
      if (!this._started || this._fresh) { this._started = true; this._fresh = false; this.renderScene(this.si, this.gi, false, true); }
      if (this.audioMode) { this.showCaption(this.scenes[this.si].segs[this.gi].display); this.audioPlay(); this.loop(); return; }
      if (!this.v.audio && !this._pendNote && this.prefs().voiceSrc !== 'device') { this._pendNote = true; this.toast('The recorded narration for this video is still being produced. ' + (TTS.ok() && TTS.voices.length ? 'Your device’s voice will read it for now.' : 'The captions will carry it for now.'), 6500); }
      this.startSeg(false); this.loop();
    }
    pause() {
      if (!this.playing) return;
      this._acc += performance.now() - this._t0; this.playing = false;
      this._gen++; this.stopSpeech(); clearTimeout(this._segT);
      if (this.audio) { try { this.audio.pause(); } catch (e) { } }
      this.svg.classList.add('paused'); this.root.classList.remove('playing', 'vp-wait');
      this.syncButtons(); this.updateBar();
    }
    stop() { this.pause(); }
    stopSpeech() { clearTimeout(this._w1); clearTimeout(this._w2); clearTimeout(this._spT); if (TTS.synth && (this._speaking || TTS.busy())) TTS.cancel(); this._speaking = false; }
    restartSeg() { if (this.audioMode) { this.applyAudioPrefs(); return; } this._gen++; this.stopSpeech(); clearTimeout(this._segT); this.startSeg(false); }
    loop() { if (this._raf) return; const step = () => { this._raf = 0; if (!this.playing) return; this.frame(); this._raf = requestAnimationFrame(step); }; this._raf = requestAnimationFrame(step); }
    frame() {
      const t = this.now();
      for (const m of this._movers) m(t);
      for (const a of this._anims) a(t);
      for (let i = this._timers.length - 1; i >= 0; i--) { const tm = this._timers[i]; if (t >= tm.at) { this._timers.splice(i, 1); try { tm.fn(); } catch (e) { console.error(e); } } }
      if (this.audioMode && this.playing) this.audioTick();
      this.updateBar();
    }
    curTime() {
      if (this.audioMode) { const a = this.audio, f = this.flat[this._k]; if (!a) return f ? f.start : 0; return Math.min(this.total, this._pendingSeek != null ? this._pendingSeek : a.currentTime); }
      const s = this.scenes[this.si]; if (!s) return 0; const g = s.segs[this.gi];
      let el_ = 0; if (this.playing && this._segStart) el_ = (performance.now() - this._segStart) / 1000 * (this.prefs().rate || 1);
      return g.start + Math.min(g.dur * 0.97, el_);
    }
    updateBar() {
      const t = this.ended ? this.total : this.curTime();
      this.scenes.forEach((s, i) => { const f = t >= s.end ? 1 : t <= s.start ? 0 : (t - s.start) / (s.end - s.start); const fill = this.segFills[i]; if (fill) fill.style.transform = `scaleX(${f})`; });
      if (this.timeEl) this.timeEl.textContent = fmtTime(t) + ' / ' + fmtTime(this.total);
    }
    seekTime(t) { const f = this.flat.find(x => t >= x.start && t < x.start + x.dur) || this.flat[this.flat.length - 1]; this.jump(f.si, f.gi); }
    nextScene() { if (this.si < this.scenes.length - 1) this.jump(this.si + 1, 0); }
    prevScene() { if (this.gi > 0) this.jump(this.si, 0); else if (this.si > 0) this.jump(this.si - 1, 0); else this.jump(0, 0); }
    jump(si, gi) {
      this._gen++; this.stopSpeech(); clearTimeout(this._segT);
      this.ended = false; this.endEl.hidden = true; this.quizEl.hidden = true;
      if (this.poster && !this.poster.hidden) { this.poster.hidden = true; this._started = true; }
      this.svg.classList.remove('posterframe');
      this.renderScene(si, gi, true, true);
      if (this.audioMode) {
        this._k = this.kOf(si, gi); for (const k in this._quizDone) if (+k >= si) delete this._quizDone[k];
        this.audioSeek(this.flat[this._k].start); this.showCaption(this.scenes[si].segs[gi].display); this.updateBar(); return;
      }
      if (this.playing) this.startSeg(false); else { this.showCaption(this.scenes[si].segs[gi].display); this.updateBar(); }
    }

    /* --- rendering --- */
    ctx(s) {
      const P = this;
      return {
        accent: P.accent, uid: P.uid, nb: s.segs.length, C, KIND,
        marker: col => P.marker(col),
        flow: (path, col, o) => P.addFlow(path, col, o),
        after: (ms, fn) => { P._timers.push({ at: P.now() + ms, fn }); if (!P.playing) { /* paused: run immediately */ P._timers.pop(); fn(); } },
        anim: (ms, fn) => P.addAnim(ms, fn)
      };
    }
    marker(col) {
      const key = col.replace('#', '');
      if (!this._markers[key]) {
        const id = `${this.uid}-m-${key}`;
        const m = el('marker', { id, viewBox: '0 0 10 10', refX: 8.6, refY: 5, markerWidth: 20, markerHeight: 20, markerUnits: 'userSpaceOnUse', orient: 'auto-start-reverse' }, this.defs);
        el('path', { d: 'M0 0.6L10 5L0 9.4z', fill: col }, m);
        this._markers[key] = id;
      }
      return this._markers[key];
    }
    addFlow(path, col, o) {
      o = o || {}; let len = 0; try { len = path.getTotalLength(); } catch (e) { return; }
      if (!len) return;
      const n = REDUCED ? 1 : (o.n || 3), dur = (o.dur || Math.max(1100, len * 2.6)) * (REDUCED ? 1.6 : 1), r = o.r || 9;
      const dots = Array.from({ length: n }, () => el('circle', { r, fill: col, opacity: 0.95 }, this.fx));
      const upd = t => { dots.forEach((d, i) => { let ph = ((t / dur) + i / n) % 1; if (o.reverse) ph = 1 - ph; const p = path.getPointAtLength(ph * len); d.setAttribute('cx', p.x); d.setAttribute('cy', p.y); d.setAttribute('opacity', (ph < 0.08 ? ph / 0.08 : ph > 0.92 ? (1 - ph) / 0.08 : 1) * 0.95); }); };
      upd(this.now()); this._movers.push(upd);
    }
    addAnim(ms, fn) {
      const t0 = this.now(); let done = false;
      const a = t => { if (done) return; const f = Math.min(1, (t - t0) / ms); fn(f); if (f >= 1) done = true; };
      if (!this.playing) { fn(1); return; }
      this._anims.push(a);
    }
    clearFx() { this._movers = []; this._timers = []; this._anims = []; while (this.fx.firstChild) this.fx.firstChild.remove(); }
    renderScene(si, gi, instant, rebuild) {
      const s = this.scenes[si];
      if (rebuild || !this.cur || this.cur.si !== si) {
        const old = this.cur;
        const g = el('g', { class: 'scene' + (instant ? '' : ' entering') }, this.layer);
        const tpl = TPL[s.sc.t] || TPL.bullets; let api;
        try { api = tpl(g, s.sc, this.ctx(s)) || { beat() { } }; }
        catch (e) { console.error('Scene failed to render', s.sc, e); T(g, W / 2, H / 2, 'This scene could not be drawn', { anchor: 'middle', fill: C.threat, size: 40 }); api = { beat() { } }; }
        this.cur = { g, api, si };
        if (old) { if (instant) old.g.remove(); else { old.g.classList.add('leaving'); setTimeout(() => old.g.remove(), 460); } }
        if (!instant) { void this.svg.getBoundingClientRect(); requestAnimationFrame(() => g.classList.remove('entering')); }
      }
      this.si = si; this.gi = gi;
      this.applyBeat(gi, instant);
    }
    applyBeat(k, instant) {
      this.clearFx();
      const svg = this.svg;
      if (instant) svg.classList.add('instant'); else void svg.getBoundingClientRect();
      try { this.cur.api.beat(k, !!instant); } catch (e) { console.error('Beat failed', e); }
      if (instant) { void svg.getBoundingClientRect(); requestAnimationFrame(() => requestAnimationFrame(() => svg.classList.remove('instant'))); }
      // draw flows in place even when paused
      const t = this.now(); this._movers.forEach(m => m(t));
    }
    showCaption(text) { this.capEl.textContent = text || ''; }

    /* --- segment sequencing --- */
    startSeg(applyBeat) {
      const gen = ++this._gen;
      const s = this.scenes[this.si], g = s.segs[this.gi];
      if (applyBeat) this.applyBeat(this.gi, false);
      this._segStart = performance.now();
      this.showCaption(g.display);
      const p = this.prefs(); const rate = p.rate || 1;
      const narr = p.narration !== false && TTS.ok() && g.spoken;
      if (narr) this.speakSeg(g, rate, gen);
      else this._segT = setTimeout(() => this.segDone(gen), g.dur * 1000 / rate);
    }
    speakSeg(g, rate, gen) {
      const p = this.prefs();
      const go = () => {
        if (gen !== this._gen || !this.playing) return;
        let started = false;
        this._speaking = true;
        try {
          TTS.speak(g.spoken, {
            rate, voice: TTS.best(p.voice),
            onstart: () => { started = true; TTS.firstDone = true; },
            onend: () => { if (gen === this._gen) { this._speaking = false; this.segDone(gen); } },
            onerror: e => { if (gen !== this._gen) return; const code = e && e.error; if (code === 'interrupted' || code === 'canceled') return; this._speaking = false; this.ttsFail(gen, g, rate); }
          });
        } catch (e) { this.ttsFail(gen, g, rate); return; }
        this._w1 = setTimeout(() => { if (gen === this._gen && !started) this.ttsFail(gen, g, rate); }, TTS.firstDone ? 3000 : 5000);
        this._w2 = setTimeout(() => { if (gen === this._gen && this.playing) { this._speaking = false; TTS.cancel(); this.segDone(gen); } }, (g.dur * 2.4 / rate + 5) * 1000);
      };
      if (TTS.busy()) { TTS.cancel(); this._spT = setTimeout(go, 90); } else go();
    }
    ttsFail(gen, g, rate) {
      if (gen !== this._gen) return;
      TTS.broken = true; TTS.cancel(); this.syncButtons();
      this.toast('Narration isn’t available in this browser, so the captions will carry the video.');
      const elapsed = (performance.now() - this._segStart) / 1000 * rate;
      this._segT = setTimeout(() => this.segDone(gen), Math.max(600, (g.dur - elapsed) * 1000 / rate));
    }
    segDone(gen) {
      if (gen !== this._gen || !this.playing) return;
      clearTimeout(this._w1); clearTimeout(this._w2); clearTimeout(this._segT);
      this.markPlayed(this.si, this.gi);
      const s = this.scenes[this.si];
      if (this.gi < s.segs.length - 1) { this.gi++; this.startSeg(true); return; }
      if (s.sc.t === 'quiz') { this.showQuiz(); return; }
      if (this.si < this.scenes.length - 1) { this.renderScene(this.si + 1, 0, false, true); this.startSeg(false); return; }
      this.finish();
    }
    markPlayed(si, gi) {
      const idx = this.flat.findIndex(f => f.si === si && f.gi === gi); if (idx < 0) return;
      this.played.add(idx);
      let sum = 0; this.played.forEach(i => sum += this.flat[i].dur);
      const frac = sum / this.total;
      if (frac > this.maxFrac) this.maxFrac = frac;
      if (this.o.onProgress && (this.maxFrac - this._lastReported >= 0.05 || this.maxFrac >= 0.9 && this._lastReported < 0.9)) { this._lastReported = this.maxFrac; this.o.onProgress(this.maxFrac); }
    }
    finish() {
      this.pause(); this.ended = true; this.updateBar();
      if (this.o.onProgress) { this._lastReported = this.maxFrac; this.o.onProgress(this.maxFrac); }
      const watched = this.maxFrac >= 0.9;
      this.endEl.innerHTML = `<div class="vp-endc"><div class="vp-endt">${watched ? 'Video complete' : 'End of video'}</div>
        <div class="vp-endm">${watched ? 'Nice work. Carry on with the reading below.' : 'Some scenes were skipped. Replay them to count the video as watched.'}</div>
        <div class="vp-endb"><button type="button" class="vp-btn2 vp-replay">${SVGI.replay}<span>Replay</span></button></div></div>`;
      this.endEl.hidden = false;
      this.endEl.querySelector('.vp-replay').addEventListener('click', () => { this.play(); });
      if (this.o.onEnd) this.o.onEnd(this.maxFrac);
    }
    showQuiz() {
      const sc = this.scenes[this.si].sc;
      this.pause();
      const letters = 'ABCDEF';
      const auto = !!(this.o.autoQuiz && this.o.autoQuiz());
      this.quizEl.innerHTML = `<div class="vp-qc"><div class="vp-qk">Quick check</div><div class="vp-qq">${esc(sc.q)}</div>
        <div class="vp-qo">${sc.o.map((o, i) => `<button type="button" data-i="${i}"><b>${letters[i]}</b><span>${esc(o)}</span></button>`).join('')}</div>
        <div class="vp-qf" hidden></div></div>`;
      this.quizEl.hidden = false;
      const fb = this.quizEl.querySelector('.vp-qf');
      const btns = Array.from(this.quizEl.querySelectorAll('.vp-qo button'));
      const cont = () => {
        clearInterval(this._qT); this._qT = null;
        if (this.quizEl.hidden) return;
        this.quizEl.hidden = true;
        this.markPlayed(this.si, this.gi);
        if (this.audioMode) {
          if (this.si < this.scenes.length - 1) { const si = this.si + 1; this._k = this.kOf(si, 0); this.audioSeek(this.flat[this._k].start); this.renderScene(si, 0, false, true); this.playing = false; this.play(); }
          else { this.playing = true; this.finish(); }
          return;
        }
        if (this.si < this.scenes.length - 1) {
          this.playing = true; this._t0 = performance.now(); this.svg.classList.remove('paused'); this.root.classList.add('playing'); this.syncButtons();
          this.renderScene(this.si + 1, 0, false, true); this.startSeg(false); this.loop();
        } else { this.playing = true; this.finish(); }
      };
      if (auto) {
        this.quizEl.querySelector('.vp-qc').classList.add('vp-qauto');
        btns.forEach(x => { x.disabled = true; if (+x.dataset.i === sc.a) x.classList.add('ok'); });
        let n = 10;
        fb.hidden = false;
        fb.innerHTML = `<p><strong>Why:</strong> ${esc(sc.why || '')}</p><button type="button" class="vp-btn2 vp-cont">Continue now</button> <span class="vp-qn" aria-live="off">Continuing in ${n} s</span>`;
        fb.querySelector('.vp-cont').addEventListener('click', cont);
        const cnt = fb.querySelector('.vp-qn');
        clearInterval(this._qT);
        this._qT = setInterval(() => { if (document.hidden) return; n--; if (n <= 0) cont(); else cnt.textContent = `Continuing in ${n} s`; }, 1000);
        return;
      }
      btns.forEach(b => b.addEventListener('click', () => {
        const i = +b.dataset.i; const ok = i === sc.a;
        btns.forEach(x => { x.disabled = true; const xi = +x.dataset.i; if (xi === sc.a) x.classList.add('ok'); else if (xi === i) x.classList.add('bad'); });
        fb.hidden = false;
        fb.innerHTML = `<p><strong>${ok ? 'Correct.' : 'Not quite.'}</strong> ${esc(sc.why || '')}</p><button type="button" class="vp-btn2 vp-cont">Continue video</button>`;
        fb.querySelector('.vp-cont').addEventListener('click', cont);
        fb.querySelector('.vp-cont').focus();
        if (this.o.onQuiz) this.o.onQuiz(sc, ok);
      }));
    }
    toggleFull(force) {
      const on = force !== undefined ? force : !this.root.classList.contains('vp-full');
      this.root.classList.toggle('vp-full', on);
      document.documentElement.classList.toggle('vp-lock', on);
      if (on) { try { if (this.root.requestFullscreen) { this.root.requestFullscreen().then(() => { this._nativeFull = true; }).catch(() => { }); } } catch (e) { } }
      else if (document.fullscreenElement) { try { document.exitFullscreen(); } catch (e) { } }
      this.root.focus();
    }
    destroy() { clearInterval(this._qT); this.pause(); this.clearFx(); players.delete(this); this.releaseAudio(); document.documentElement.classList.remove('vp-lock'); }
  }
  Player.stopAll = () => players.forEach(p => p.pause());
  Player.all = () => Array.from(players);
  Player.destroyAll = () => Array.from(players).forEach(p => p.destroy());
  document.addEventListener('visibilitychange', () => { if (document.hidden) players.forEach(p => { if (!p.bgOK()) p.pause(); }); });

  /* ---------- geometry for flows ---------- */
  function edgePoint(n, tx, ty) {
    const dx = tx - n.x, dy = ty - n.y; const hw = n.w / 2 + 8, hh = n.h / 2 + 8;
    if (!dx && !dy) return { x: n.x, y: n.y };
    const s = Math.min(dx ? hw / Math.abs(dx) : Infinity, dy ? hh / Math.abs(dy) : Infinity);
    return { x: n.x + dx * s, y: n.y + dy * s };
  }
  function edgePath(a, b, curve) {
    const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
    if (!curve) { const p1 = edgePoint(a, b.x, b.y), p2 = edgePoint(b, a.x, a.y); return { d: `M${p1.x} ${p1.y}L${p2.x} ${p2.y}`, mx: (p1.x + p2.x) / 2, my: (p1.y + p2.y) / 2 }; }
    const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy) || 1; const cx = mx - dy / len * curve, cy = my + dx / len * curve;
    const p1 = edgePoint(a, cx, cy), p2 = edgePoint(b, cx, cy);
    return { d: `M${p1.x} ${p1.y}Q${cx} ${cy} ${p2.x} ${p2.y}`, mx: 0.25 * p1.x + 0.5 * cx + 0.25 * p2.x, my: 0.25 * p1.y + 0.5 * cy + 0.25 * p2.y };
  }

  /* ---------- scene templates ---------- */
  const TPL = {};

  TPL.title = (g, sc, ctx) => {
    const r = seeded(sc.seed || 11);
    const motif = rv(el('g', {}, g), 'fade');
    const pts = Array.from({ length: 16 }, () => ({ x: 1040 + r() * 460, y: 190 + r() * 540 }));
    pts.forEach((p, i) => pts.slice(i + 1).forEach(q => { if (Math.hypot(p.x - q.x, p.y - q.y) < 190) el('line', { x1: p.x, y1: p.y, x2: q.x, y2: q.y, stroke: C.line, 'stroke-width': 2.5 }, motif); }));
    pts.forEach((p, i) => { const big = i % 5 === 0; const c = el('circle', { cx: p.x, cy: p.y, r: big ? 16 : 8, fill: big ? ctx.accent : C.panel2, stroke: big ? 'none' : C.neutral, 'stroke-width': 2.5 }, motif); if (big) c.classList.add('pulse'); });
    if (sc.icon) { const ig = el('g', {}, motif); el('circle', { cx: 1270, cy: 460, r: 96, fill: C.bg, stroke: ctx.accent, 'stroke-width': 5 }, ig); ICON(ig, sc.icon, 1270, 460, 104, ctx.accent); }
    const k = rv(el('g', {}, g)); T(k, 120, 300, (sc.kicker || '').toUpperCase(), { size: 30, font: 'mono', fill: ctx.accent, ls: 3 });
    const tg = rv(el('g', {}, g)); const t = T(tg, 120, 400, sc.title || '', { size: 92, weight: 800, stretch: '82%', w: 860, lh: 1.02 });
    const sg = rv(el('g', {}, g)); if (sc.sub) T(sg, 120, 400 + t._h + 34, sc.sub, { size: 40, fill: C.dim, w: 840, lh: 1.25 });
    [k, tg, sg].forEach((e, i) => { e.style.transitionDelay = (i * 140) + 'ms'; e.classList.add('ttxt'); });
    return { beat() { [motif, k, tg, sg].forEach(e => show(e, true)); } };
  };

  TPL.bullets = (g, sc, ctx) => {
    head(g, sc, ctx);
    const items = sc.items || []; const n = items.length; const top = sc.title ? 196 : 110;
    const els = [], marks = [];
    if (sc.layout === 'grid') {
      const cols = sc.cols || (n <= 3 ? n : n === 4 ? 2 : 3); const rows = Math.ceil(n / cols);
      const gap = 28, w = (1420 - (cols - 1) * gap) / cols, h = Math.min(330, (870 - top - (rows - 1) * gap) / rows);
      items.forEach((it, i) => {
        const c = i % cols, rr = Math.floor(i / cols); const col = KIND[it.k] || ctx.accent;
        const o = G(g, 90 + c * (w + gap), top + rr * (h + gap), '');
        const halo = rv(el('rect', { x: -6, y: -6, width: w + 12, height: h + 12, rx: 26, fill: 'none', stroke: ctx.accent, 'stroke-width': 5, opacity: 0.6 }, o), 'fade');
        el('rect', { x: 0, y: 0, width: w, height: h, rx: 22, fill: C.panel, stroke: C.line, 'stroke-width': 2 }, o);
        if (h < 230) {
          /* Compact card for 3+ rows: icon on the left, text vertically centred beside it. */
          if (it.icon) { el('circle', { cx: 58, cy: h / 2, r: 32, fill: C.bg2, stroke: col, 'stroke-width': 3 }, o); ICON(o, it.icon, 58, h / 2, 36, col); }
          const tx = it.icon ? 110 : 30, tw = w - tx - 24; const hl = lines(it.h || '', 33, tw, null, '92%'), dl = it.d ? lines(it.d, 27, tw) : [];
          const bh = hl.length * 33 * 1.18 + (dl.length ? 6 + dl.length * 27 * 1.24 : 0); const y0 = h / 2 - bh / 2 + 33 * 0.82;
          const ht = T(o, tx, y0, it.h || '', { size: 33, weight: 700, w: tw, stretch: '92%' });
          if (it.d) T(o, tx, y0 + ht._h + 2, it.d, { size: 27, fill: C.dim, w: tw, lh: 1.24 });
        } else {
          let yy = 40;
          if (it.icon) { el('circle', { cx: 64, cy: 70, r: 38, fill: C.bg2, stroke: col, 'stroke-width': 3 }, o); ICON(o, it.icon, 64, 70, 42, col); yy = 128; }
          const ht = T(o, 34, yy + 30, it.h || '', { size: 38, weight: 700, w: w - 60, stretch: '92%' });
          if (it.d) T(o, 34, yy + 30 + ht._h + 6, it.d, { size: 30, fill: C.dim, w: w - 60, lh: 1.28 });
        }
        rv(o); els.push(o); marks.push(halo);
      });
    } else {
      const meas = items.map(it => { const hl = lines(it.h || '', 44, 1250, null, false).length; const dl = lines(it.d || '', 34, 1250).length; return 26 + hl * 52 + dl * 42; });
      const total = meas.reduce((a, b) => a + b, 0) + (n - 1) * 22; let y = top + Math.max(0, (870 - top - total) / 2);
      items.forEach((it, i) => {
        const col = KIND[it.k] || ctx.accent;
        const o = G(g, 0, y, '');
        const bar = rv(el('rect', { x: 84, y: 4, width: 7, height: meas[i] - 14, rx: 3.5, fill: ctx.accent }, o), 'fade');
        el('circle', { cx: 158, cy: 46, r: 40, fill: C.panel2, stroke: col, 'stroke-width': 3 }, o);
        if (it.icon) ICON(o, it.icon, 158, 46, 44, col); else T(o, 158, 62, String(i + 1), { size: 40, weight: 800, anchor: 'middle', fill: col });
        const ht = T(o, 228, 58, it.h || '', { size: 44, weight: 700, w: 1250 });
        if (it.d) T(o, 228, 58 + ht._h + 2, it.d, { size: 34, fill: C.dim, w: 1250, lh: 1.24 });
        rv(o); els.push(o); marks.push(bar); y += meas[i] + 22;
      });
    }
    return { beat(k) { const s = revealCount(k, n, ctx.nb); els.forEach((e, i) => show(e, i < s)); marks.forEach((m, i) => show(m, ctx.nb > 1 && i === k - 1)); } };
  };

  TPL.compare = (g, sc, ctx) => {
    head(g, sc, ctx);
    const cols = sc.cols || [], rows = sc.rows || [], labels = sc.labels; const nc = cols.length;
    const x0 = 90, x1 = 1510, top = 188, gap = 18, lw = labels ? 240 : 0;
    const cw = (x1 - x0 - lw - (labels ? gap : 0) - gap * (nc - 1)) / nc; const headH = 100;
    const cx = i => x0 + lw + (labels ? gap : 0) + i * (cw + gap);
    const fs = sc.size || 31;
    const rh = rows.map(r => 30 + Math.max(1, ...r.map(c => lines(c, fs, cw - 40).length), labels ? 1 : 0) * fs * 1.27);
    const hsAll = Math.max(24, Math.min(38, ...cols.map(c => Math.floor((cw - (c.icon ? 104 : 40)) / (String(c.h).length * 0.55)))));
    const hdrs = cols.map((c, i) => {
      const col = KIND[c.k] || ctx.accent; const o = G(g, cx(i), top, 'fade');
      el('rect', { x: 0, y: 0, width: cw, height: headH, rx: 16, fill: C.panel2 }, o);
      el('rect', { x: 0, y: 0, width: cw, height: 7, rx: 3.5, fill: col }, o);
      if (c.icon) ICON(o, c.icon, 50, headH / 2 + 4, 44, col);
      const hw = cw - (c.icon ? 104 : 40); const hs = hsAll;
      T(o, c.icon ? 88 : 26, headH / 2 + hs * 0.45, c.h, { size: hs, weight: 750, w: hw, maxLines: 1, stretch: '90%' });
      return o;
    });
    let y = top + headH + 14;
    const rowEls = rows.map((r, ri) => {
      const o = G(g, 0, y, ''); const h = rh[ri];
      const mark = rv(el('rect', { x: x0 - 22, y: 6, width: 7, height: h - 12, rx: 3.5, fill: ctx.accent }, o), 'fade');
      if (labels) T(o, x0, 30 + fs * 0.8, labels[ri] || '', { size: 27, weight: 700, fill: C.dim, w: lw - 10, font: 'mono' });
      r.forEach((cell, ci) => { el('rect', { x: cx(ci), y: 0, width: cw, height: h, rx: 14, fill: C.panel, stroke: C.line, 'stroke-width': 2 }, o); T(o, cx(ci) + 20, 22 + fs * 0.85, cell, { size: fs, w: cw - 40, lh: 1.27 }); });
      rv(o); y += h + 12; return { o, mark };
    });
    return { beat(k) { hdrs.forEach(h => show(h, true)); const s = revealCount(k, rows.length, ctx.nb); rowEls.forEach((r, i) => { show(r.o, i < s); show(r.mark, ctx.nb > 1 && i === k - 1); }); } };
  };

  TPL.flow = (g, sc, ctx) => {
    head(g, sc, ctx);
    const N = {}, E = {}, Z = {};
    const zL = el('g', {}, g), eL = el('g', {}, g), nL = el('g', {}, g), oL = el('g', {}, g);
    /* Optional zones: dashed, labelled boxes for trust boundaries or environments, revealed by id like nodes. */
    (sc.zones || []).forEach(z => {
      const col = KIND[z.k] || C.faint; const o = rv(el('g', {}, zL), 'fade');
      el('rect', { x: z.x, y: z.y, width: z.w, height: z.h, rx: 26, fill: hexA(col, THEME === 'light' ? 0.045 : 0.07), stroke: col, 'stroke-width': 3, 'stroke-dasharray': '14 10' }, o);
      if (z.label) { const txt = String(z.label).toUpperCase(); const tw = Math.min(z.w - 36, txt.length * (23 * 0.6 + 1.5) + 26);
        el('rect', { x: z.x + 18, y: z.y - 17, width: tw, height: 34, rx: 9, fill: X.deep, stroke: col, 'stroke-width': 2 }, o);
        T(o, z.x + 31, z.y + 8, txt, { size: 23, weight: 700, font: 'mono', fill: col, ls: 1.5 }); }
      Z[z.id] = o;
    });
    (sc.nodes || []).forEach(n => {
      const w = n.w || 290, ls = n.ls || 38; const ic = !!n.icon;
      const ll = lines(n.label || '', ls, w - 34), sl = lines(n.sub || '', 28, w - 34);
      const h = n.h || Math.max(100, (sl.length ? 48 : 40) + (ic ? 66 : 0) + ll.length * ls * 1.16 + sl.length * 34 + (sl.length ? 6 : 0));
      const col = n.k === 'accent' ? ctx.accent : (KIND[n.k] || C.neutral);
      const o = el('g', { transform: `translate(${n.x - w / 2},${n.y - h / 2})` }, nL);
      const inner = rv(el('g', {}, o), 'pop');
      const halo = rv(el('rect', { x: -11, y: -11, width: w + 22, height: h + 22, rx: 30, fill: 'none', stroke: ctx.accent, 'stroke-width': 7, opacity: 0.6 }, inner), 'fade');
      el('rect', { x: 0, y: 0, width: w, height: h, rx: 22, fill: n.fill || C.panel, stroke: col, 'stroke-width': 3.5 }, inner);
      let cy = 22;
      if (ic) { ICON(inner, n.icon, w / 2, 22 + 30, 52, col); cy = 22 + 64; }
      T(inner, w / 2, cy + ls * 0.95, n.label || '', { size: ls, weight: 700, anchor: 'middle', w: w - 34 });
      if (n.sub) T(inner, w / 2, cy + ls * 0.95 + ll.length * ls * 1.16 + 4, n.sub, { size: 28, fill: C.dim, anchor: 'middle', w: w - 34 });
      const badge = el('g', { transform: `translate(${w - 4},4)` }, inner);
      N[n.id] = { n, w, h, x: n.x, y: n.y, inner, halo, badge, mark: null };
    });
    (sc.edges || []).forEach(e => {
      const id = e.id || (e.from + '-' + e.to); const a = N[e.from], b = N[e.to]; if (!a || !b) return;
      const col = e.k === 'accent' ? ctx.accent : (KIND[e.k] || C.neutral);
      const p = edgePath(a, b, e.curve || 0);
      const grp = rv(el('g', {}, eL), 'fade');
      const path = el('path', { d: p.d, fill: 'none', stroke: col, 'stroke-width': 4, 'marker-end': `url(#${ctx.marker(col)})`, 'stroke-linecap': 'round' }, grp);
      if (e.k === 'threat' || e.dash) path.classList.add('dash');
      if (e.both) path.setAttribute('marker-start', `url(#${ctx.marker(col)})`);
      if (e.label) pill(grp, p.mx + (e.lx || 0), p.my + (e.ly || 0), e.label, { stroke: col, size: 25 });
      E[id] = { e, grp, path, col };
    });
    const steps = sc.steps || [{ show: Object.keys(N).concat(Object.keys(E), Object.keys(Z)) }];
    const notes = steps.map(st => (st.note ? [].concat(st.note) : []).map(nt => {
      const anchor = N[nt.at]; const w = nt.w || 420; const ls = lines(nt.text, 29, w - 40); const h = ls.length * 36 + 32;
      let x = nt.x != null ? nt.x : (anchor ? anchor.x + (nt.dx || 0) : 800); let y = nt.y != null ? nt.y : (anchor ? anchor.y - anchor.h / 2 - h - 26 + (nt.dy || 0) : 200);
      x = Math.min(1510 - w / 2, Math.max(90 + w / 2, x)); y = Math.max(170, Math.min(870 - h, y));
      const col = KIND[nt.k] || ctx.accent; const o = G(oL, x - w / 2, y, 'pop');
      el('rect', { x: 0, y: 0, width: w, height: h, rx: 16, fill: X.deep, stroke: col, 'stroke-width': 3 }, o);
      T(o, w / 2, 22 + 29 * 0.95, nt.text, { size: 29, anchor: 'middle', w: w - 40, lh: 1.24 });
      return o;
    }));
    function setBadge(o, m) {
      if (o.mark === m) return; o.mark = m; while (o.badge.firstChild) o.badge.firstChild.remove(); if (!m) return;
      const map = { ok: [C.control, 'check'], bad: [C.threat, 'x'], warn: [C.human, 'alert'], lock: [C.control, 'lock'], key: [C.human, 'key'], q: [C.faint, 'search'] };
      const [col, ic] = map[m] || [ctx.accent, 'star'];
      el('circle', { cx: 0, cy: 0, r: 25, fill: X.deep, stroke: col, 'stroke-width': 3.5 }, o.badge); ICON(o.badge, ic, 0, 0, 28, col, 2.4);
    }
    return {
      beat(k) {
        const vis = new Set(), marks = {}, relabel = {};
        for (let i = 0; i <= k && i < steps.length; i++) { const st = steps[i]; ids(st.show).forEach(x => vis.add(x)); ids(st.hide).forEach(x => vis.delete(x)); if (st.mark) Object.assign(marks, st.mark); }
        const cur = k < steps.length ? steps[k] : {};
        const hi = new Set(ids(cur.hi)); const focus = !!cur.focus;
        Object.entries(Z).forEach(([id, o]) => show(o, vis.has(id)));
        Object.entries(N).forEach(([id, o]) => { show(o.inner, vis.has(id)); show(o.halo, hi.has(id)); cls(o.inner, 'dimmed', focus && vis.has(id) && !hi.has(id)); setBadge(o, marks[id]); });
        Object.entries(E).forEach(([id, o]) => { show(o.grp, vis.has(id)); cls(o.grp, 'dimmed', focus && !hi.has(id)); });
        ids(cur.flow).forEach(id => { const o = E[id]; if (o && vis.has(id)) ctx.flow(o.path, o.col, { n: o.e.k === 'threat' ? 2 : 3, reverse: !!o.e.rev }); });
        notes.forEach((arr, i) => arr.forEach(o => show(o, i === k)));
      }
    };
  };

  TPL.cycle = (g, sc, ctx) => {
    head(g, sc, ctx);
    const st = sc.stages || []; const n = st.length; const cx = 540, cy = 520, R = sc.r || 222;
    const ring = rv(el('g', {}, g), 'fade');
    el('circle', { cx, cy, r: R, fill: 'none', stroke: C.line, 'stroke-width': 5 }, ring);
    for (let i = 0; i < n; i++) { const a = -Math.PI / 2 + (i + 0.5) * 2 * Math.PI / n; el('path', { d: 'M-11 -10L5 0L-11 10', fill: 'none', stroke: C.faint, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', transform: `translate(${cx + R * Math.cos(a)},${cy + R * Math.sin(a)}) rotate(${a * 180 / Math.PI + 90})` }, ring); }
    const cg = rv(el('g', {}, g), 'fade');
    const ct = T(cg, cx, cy + (sc.centerSub ? -10 : 12), sc.center || '', { size: 40, weight: 750, anchor: 'middle', w: R * 1.15, stretch: '88%' });
    if (sc.centerSub) T(cg, cx, cy - 10 + ct._h + 8, sc.centerSub, { size: 27, fill: C.dim, anchor: 'middle', w: R * 1.2 });
    const nodes = st.map((s, i) => {
      const a = -Math.PI / 2 + i * 2 * Math.PI / n; const x = cx + R * Math.cos(a), y = cy + R * Math.sin(a); const col = KIND[s.k] || ctx.accent;
      const o = G(g, x, y, 'pop');
      const halo = rv(el('circle', { cx: 0, cy: 0, r: 76, fill: 'none', stroke: ctx.accent, 'stroke-width': 8, opacity: 0.55 }, o), 'fade');
      el('circle', { cx: 0, cy: 0, r: 58, fill: C.panel2, stroke: col, 'stroke-width': 4 }, o);
      if (s.icon) ICON(o, s.icon, 0, 0, 52, col); else T(o, 0, 15, String(i + 1), { size: 44, weight: 800, anchor: 'middle', fill: col });
      const ca = Math.cos(a), sa = Math.sin(a);
      const anchor = Math.abs(ca) < 0.35 ? 'middle' : ca > 0 ? 'start' : 'end';
      const lx = Math.abs(ca) < 0.35 ? 0 : ca * 84; const ly = sa > 0.35 ? 108 : sa < -0.35 ? -86 : 12;
      T(o, lx, ly, s.label, { size: 30, weight: 700, anchor, w: anchor === 'middle' ? 300 : 190, lh: 1.08 });
      return { o, halo };
    });
    const px = 1070, pw = 440;
    const panels = st.map((s, i) => { const p = G(g, px, 290, 'fade'); T(p, 0, 0, `STAGE ${i + 1} OF ${n}`, { size: 25, font: 'mono', fill: ctx.accent, ls: 2 }); const t = T(p, 0, 66, s.label, { size: 50, weight: 750, w: pw, stretch: '88%' }); if (s.d) T(p, 0, 66 + t._h + 18, s.d, { size: 33, fill: C.dim, w: pw, lh: 1.32 }); return p; });
    const intro = sc.intro ? (() => { const p = G(g, px, 330, 'fade'); T(p, 0, 0, sc.intro, { size: 36, fill: C.dim, w: pw, lh: 1.32 }); return p; })() : null;
    return { beat(k) { show(ring, true); show(cg, true); const cur = k - 1 < n ? k - 1 : -1; nodes.forEach((nd, i) => { show(nd.o, true); show(nd.halo, i === cur); cls(nd.o, 'dimmed', cur >= 0 && i !== cur); }); panels.forEach((p, i) => show(p, i === cur)); if (intro) show(intro, cur < 0); } };
  };

  TPL.timeline = (g, sc, ctx) => {
    head(g, sc, ctx);
    const ev = sc.events || []; const n = ev.length; const y0 = 535, xa = 120, xb = 1480;
    const axis = rv(el('g', {}, g), 'fade'); el('line', { x1: xa, y1: y0, x2: xb, y2: y0, stroke: C.line, 'stroke-width': 6, 'stroke-linecap': 'round' }, axis);
    const prog = el('rect', { x: xa, y: y0 - 3.5, width: xb - xa, height: 7, rx: 3.5, fill: ctx.accent }, g); prog.classList.add('grow-x'); prog.style.transform = 'scaleX(0)';
    const sp = n > 1 ? (xb - xa - 160) / (n - 1) : 0; const tw = Math.min(340, Math.max(200, sp - 14));
    const xs = ev.map((e, i) => n > 1 ? xa + 80 + i * sp : (xa + xb) / 2);
    const items = ev.map((e, i) => {
      const x = xs[i]; const up = i % 2 === 0; const o = G(g, x, y0, '');
      el('circle', { cx: 0, cy: 0, r: 15, fill: C.bg, stroke: ctx.accent, 'stroke-width': 6 }, o);
      el('line', { x1: 0, y1: up ? -24 : 24, x2: 0, y2: up ? -66 : 66, stroke: C.line, 'stroke-width': 3 }, o);
      const hl = lines(e.h, 33, tw), dl = lines(e.d || '', 27, tw);
      const blockH = 44 + hl.length * 39 + dl.length * 33;
      const top = up ? -84 - blockH + 30 : 108;
      T(o, 0, top, e.y, { size: 33, font: 'mono', fill: ctx.accent, anchor: 'middle', weight: 600 });
      T(o, 0, top + 46, e.h, { size: 33, weight: 700, anchor: 'middle', w: tw });
      if (e.d) T(o, 0, top + 46 + hl.length * 39, e.d, { size: 27, fill: C.dim, anchor: 'middle', w: tw });
      rv(o); return o;
    });
    return { beat(k) { show(axis, true); const s = revealCount(k, n, ctx.nb); items.forEach((it, i) => show(it, i < s)); const last = s - 1; const f = last < 0 ? 0 : (xs[last] - xa) / (xb - xa); prog.style.transform = `scaleX(${f})`; } };
  };

  TPL.chat = (g, sc, ctx) => {
    head(g, sc, ctx);
    const px = 90, pw = sc.notes ? 900 : 1420, top = 176, bottom = 872;
    const panel = rv(el('g', {}, g), 'fade');
    el('rect', { x: px, y: top, width: pw, height: bottom - top, rx: 24, fill: C.bg2, stroke: C.line, 'stroke-width': 2 }, panel);
    el('path', { d: `M${px} ${top + 64}V${top + 24}a24 24 0 0 1 24-24H${px + pw - 24}a24 24 0 0 1 24 24V${top + 64}z`, fill: C.panel }, panel);
    el('circle', { cx: px + 36, cy: top + 32, r: 9, fill: C.control }, panel);
    T(panel, px + 60, top + 42, sc.app || 'AI assistant', { size: 27, weight: 700, fill: C.dim });
    const clipId = ctx.uid + '-c' + Math.random().toString(36).slice(2, 7);
    const cp = el('clipPath', { id: clipId }, g); el('rect', { x: px, y: top + 66, width: pw, height: bottom - top - 70 }, cp);
    const view = el('g', { 'clip-path': `url(#${clipId})` }, g); const scroller = el('g', {}, view); scroller.classList.add('scroller');
    const ROLE = { user: ['User', C.human, 'r'], ai: ['Assistant', C.model, 'l'], sys: ['System prompt', C.neutral, 'w', 1], tool: ['Tool output', C.data, 'l', 1], doc: ['Retrieved document', C.data, 'l'], evil: ['Attacker-controlled content', C.threat, 'l'], note: ['', C.faint, 'w'] };
    let y = top + 92; const items = [];
    (sc.msgs || []).forEach(m => {
      const [lab, col, side, mono] = ROLE[m.r] || ROLE.ai; const maxW = side === 'w' ? pw - 80 : Math.min(660, pw * 0.74);
      const size = mono ? 25 : 29; const ls = lines(m.t, size, maxW - 44, mono ? 'mono' : null); const lh = size * 1.34; const bh = ls.length * lh + 30;
      const bw = Math.min(maxW, Math.max(...ls.map(l => l.length)) * charW(size, mono ? 'mono' : null) + 50);
      const bx = side === 'r' ? px + pw - 40 - bw : px + 40;
      const o = G(scroller, bx, y + 26, '');
      T(o, side === 'r' ? bw : 0, -10, (m.n || lab).toUpperCase(), { size: 19, font: 'mono', fill: col, anchor: side === 'r' ? 'end' : 'start', ls: 1.5 });
      el('rect', { x: 0, y: 0, width: bw, height: bh, rx: 18, fill: m.r === 'evil' ? X.evilBubble : side === 'r' ? X.userBubble : X.bubble, stroke: col, 'stroke-width': m.r === 'evil' || m.hi ? 3.5 : 2 }, o);
      if (m.r === 'evil') ICON(o, 'alert', bw - 26, -24, 28, C.threat);
      T(o, 22, 18 + size * 0.95, m.t, { size, w: maxW - 44, font: mono ? 'mono' : null, lh: 1.34 });
      rv(o); items.push({ o, bottom: y + 26 + bh }); y += 26 + bh + 30;
    });
    const notes = makeNotes(g, sc.notes, ctx, 1030, 230, 480);
    return {
      beat(k) {
        show(panel, true);
        const n = items.length; const nShow = sc.show ? sc.show[Math.min(k, sc.show.length - 1)] : (k >= ctx.nb - 1 ? Math.max(n, 0) : Math.min(n, k + 1));
        items.forEach((it, i) => show(it.o, i < nShow));
        const last = items[nShow - 1]; const shift = last && last.bottom > bottom - 24 ? last.bottom - (bottom - 24) : 0;
        scroller.style.transform = `translateY(${-shift}px)`;
        notesBeat(notes, k);
      }
    };
  };

  function syntax(parent, x, y, line, size) {
    const t = el('text', { x, y, 'font-size': size, 'font-family': FONT.mono, fill: C.text }, parent);
    t.setAttribute('xml:space', 'preserve'); t.style.whiteSpace = 'pre';
    const re = /(#.*$|\/\/.*$)|("(?:[^"\\]|\\.)*")|(\b\d+(?:\.\d+)?\b)|(\b(?:true|false|null|none|allow|deny|required|return|def|import|const|let|function|class|async|await)\b)|([A-Za-z_][\w.\-]*)(?=\s*:)/g;
    let last = 0, m; const add = (s, fill) => { if (!s) return; const ts = el('tspan', fill ? { fill } : {}, t); ts.textContent = s; };
    while ((m = re.exec(line))) { add(line.slice(last, m.index)); add(m[0], m[1] ? X.syn.comment : m[2] ? X.syn.string : m[3] ? X.syn.number : m[4] ? X.syn.keyword : X.syn.key); last = m.index + m[0].length; if (!m[0].length) re.lastIndex++; }
    add(line.slice(last));
    return t;
  }

  TPL.code = (g, sc, ctx) => {
    head(g, sc, ctx);
    const px = 90, pw = sc.notes ? 930 : 1420, top = 178; const L = String(sc.code || '').replace(/^\n/, '').replace(/\s+$/, '').split('\n');
    const lh = 39, size = 26; const ph = Math.min(694, 84 + L.length * lh + 20);
    const panel = rv(el('g', {}, g), 'fade');
    el('rect', { x: px, y: top, width: pw, height: ph, rx: 22, fill: X.code, stroke: C.line, 'stroke-width': 2 }, panel);
    [C.threat, C.human, C.control].forEach((c, i) => el('circle', { cx: px + 34 + i * 26, cy: top + 32, r: 8, fill: c, opacity: 0.8 }, panel));
    T(panel, px + 120, top + 41, sc.file || '', { size: 23, font: 'mono', fill: C.dim });
    const bands = (sc.hl || []).map(r => { if (!r) return null; const [a, b] = Array.isArray(r) ? r : [r, r]; const band = rv(el('g', {}, g), 'fade'); const yy = top + 64 + (a - 1) * lh + 8; el('rect', { x: px + 8, y: yy, width: pw - 16, height: (b - a + 1) * lh, rx: 8, fill: ctx.accent, opacity: 0.17 }, band); el('rect', { x: px + 8, y: yy, width: 6, height: (b - a + 1) * lh, rx: 3, fill: ctx.accent }, band); return band; });
    const code = rv(el('g', {}, g), 'fade');
    L.forEach((ln, i) => { const yy = top + 64 + i * lh + 36; T(code, px + 50, yy, String(i + 1), { size: 21, font: 'mono', fill: C.faint, anchor: 'end' }); syntax(code, px + 74, yy, ln, size); });
    const notes = makeNotes(g, sc.notes, ctx, 1060, 236, 450);
    return { beat(k) { show(panel, true); show(code, true); bands.forEach((b, i) => b && show(b, i === Math.min(k, bands.length - 1) && (k < bands.length || !sc.hlStop))); notesBeat(notes, k); } };
  };

  function fmtNum(v, o) { const d = o.dec || 0; return (o.pre || '') + Number(v).toLocaleString('en-GB', { minimumFractionDigits: d, maximumFractionDigits: d }) + (o.suf || ''); }
  TPL.stat = (g, sc, ctx) => {
    const kg = rv(el('g', {}, g), 'fade'); T(kg, 800, 246, (sc.kicker || 'Key term').toUpperCase(), { size: 30, font: 'mono', fill: ctx.accent, anchor: 'middle', ls: 3 });
    const big = rv(el('g', {}, g)); let numEl = null; let bh;
    if (sc.num) { numEl = T(big, 800, 420, fmtNum(sc.num.v, sc.num), { size: 150, weight: 800, anchor: 'middle', stretch: '80%' }); const lb = T(big, 800, 490, sc.num.label || '', { size: 38, fill: C.dim, anchor: 'middle', w: 1200 }); bh = 476 + (lb._h || 44); }
    else { const t = T(big, 800, 380, sc.big || '', { size: (sc.big || '').length > 20 ? 84 : 108, weight: 800, anchor: 'middle', stretch: '80%', w: 1400, lh: 1.02 }); bh = 380 + t._h - 20; }
    const dg = rv(el('g', {}, g)); const dy = bh + 70; const dt = T(dg, 800, dy, sc.def || '', { size: 41, anchor: 'middle', w: 1260, lh: 1.3 });
    const eg = rv(el('g', {}, g));
    if (sc.ex) { const exl = lines(sc.ex, 33, 1040); const eh = exl.length * 44 + 46; const ey = dy + dt._h + 6; el('rect', { x: 200, y: ey, width: 1200, height: eh, rx: 18, fill: C.panel, stroke: C.line, 'stroke-width': 2 }, eg); T(eg, 240, ey + 52, 'e.g.', { size: 28, font: 'mono', fill: ctx.accent }); T(eg, 330, ey + 54, sc.ex, { size: 33, fill: C.dim, w: 1040, lh: 1.33 }); }
    return {
      beat(k, instant) {
        show(kg, true); show(big, true); show(dg, k >= 1 || ctx.nb === 1); show(eg, ctx.nb <= 2 ? k >= ctx.nb - 1 : k >= 2);
        if (numEl) { if (instant || k > 0) numEl.textContent = fmtNum(sc.num.v, sc.num); else { numEl.textContent = fmtNum(0, sc.num); ctx.anim(1400, f => { const e = 1 - Math.pow(1 - f, 3); numEl.textContent = fmtNum(sc.num.v * e, sc.num); }); } }
      }
    };
  };

  TPL.layers = (g, sc, ctx) => {
    head(g, sc, ctx);
    const L = sc.layers || []; const n = L.length; const x = 90, w = sc.ann ? 860 : 1420; const top = 190, gap = 14; const h = Math.min(126, (680 - (n - 1) * gap) / n);
    const items = L.map((l, i) => {
      const y = top + i * (h + gap); const o = G(g, x, y, 'fade'); const col = KIND[l.k] || ctx.accent;
      const halo = rv(el('rect', { x: -8, y: -8, width: w + 16, height: h + 16, rx: 22, fill: 'none', stroke: ctx.accent, 'stroke-width': 6, opacity: 0.65 }, o), 'fade');
      el('rect', { x: 0, y: 0, width: w, height: h, rx: 16, fill: C.panel, stroke: C.line, 'stroke-width': 2 }, o);
      el('rect', { x: 0, y: 0, width: 10, height: h, rx: 5, fill: col }, o);
      if (l.icon) ICON(o, l.icon, 62, h / 2, 44, col);
      T(o, l.icon ? 112 : 38, h / 2 + (l.sub ? -4 : 14), l.label, { size: 38, weight: 700, w: w - 150, maxLines: 1 });
      if (l.sub) T(o, l.icon ? 112 : 38, h / 2 + 36, l.sub, { size: 27, fill: C.dim, w: w - 150, maxLines: 1 });
      return { o, halo };
    });
    const anns = (sc.ann || []).map(a => {
      if (!a) return null; const p = G(g, 990, 214, 'fade'); let yy = 0;
      if (a.h) { const t = T(p, 0, 40, a.h, { size: 42, weight: 750, w: 520, stretch: '88%', fill: ctx.accent }); yy = t._h + 22; }
      (a.threats || []).forEach(s => { yy = chip(p, 0, yy, s, C.threat, 'alert', 520); });
      (a.controls || []).forEach(s => { yy = chip(p, 0, yy, s, C.control, 'shieldcheck', 520); });
      if (a.d) T(p, 0, yy + 32, a.d, { size: 31, fill: C.dim, w: 520, lh: 1.3 });
      return p;
    });
    const intro = sc.intro ? (() => { const p = G(g, 990, 260, 'fade'); T(p, 0, 0, sc.intro, { size: 34, fill: C.dim, w: 520, lh: 1.32 }); return p; })() : null;
    return { beat(k) { items.forEach(it => show(it.o, true)); const cur = k - 1 < n ? k - 1 : -1; items.forEach((it, i) => { show(it.halo, i === cur); cls(it.o, 'dimmed', cur >= 0 && i !== cur); }); anns.forEach((p, i) => p && show(p, i === cur)); if (intro) show(intro, cur < 0); } };
  };

  function heat(r, c, nr, nc) {
    const s = ((nr - 1 - r) / Math.max(1, nr - 1) + c / Math.max(1, nc - 1)) / 2;
    const stops = X.heat; const f = s * 2; const i = Math.min(1, Math.floor(f)); const t = f - i;
    const a = stops[i], b = stops[i + 1]; return `rgb(${Math.round(a[0] + (b[0] - a[0]) * t)},${Math.round(a[1] + (b[1] - a[1]) * t)},${Math.round(a[2] + (b[2] - a[2]) * t)})`;
  }
  TPL.matrix = (g, sc, ctx) => {
    head(g, sc, ctx);
    const R = sc.rows || [], Cc = sc.cols || []; const nr = R.length, nc = Cc.length;
    const gx = sc.notes ? 330 : 420, gy = 196, gw = sc.notes ? 660 : 960, gh = 540; const cw = gw / nc, ch = gh / nr;
    const grid = rv(el('g', {}, g), 'fade');
    for (let r = 0; r < nr; r++) for (let c = 0; c < nc; c++) {
      el('rect', { x: gx + c * cw + 3, y: gy + r * ch + 3, width: cw - 6, height: ch - 6, rx: 12, fill: sc.heat ? heat(r, c, nr, nc) : C.panel, stroke: C.line, 'stroke-width': 2 }, grid);
      if (sc.cells && sc.cells[r]) T(grid, gx + c * cw + cw / 2, gy + r * ch + ch / 2 + 12, sc.cells[r][c], { size: sc.cellSize || 36, weight: 700, anchor: 'middle', w: cw - 24, valign: 'middle' });
    }
    R.forEach((t, r) => T(grid, gx - 18, gy + r * ch + ch / 2 + 11, t, { size: 28, anchor: 'end', fill: C.dim, w: 210 }));
    Cc.forEach((t, c) => T(grid, gx + c * cw + cw / 2, gy + gh + 42, t, { size: 28, anchor: 'middle', fill: C.dim, w: cw - 10 }));
    if (sc.xLabel) T(grid, gx + gw / 2, gy + gh + 92, sc.xLabel.toUpperCase(), { size: 26, weight: 700, anchor: 'middle', font: 'mono', fill: ctx.accent, ls: 2 });
    if (sc.yLabel) { const t = T(grid, 0, 0, sc.yLabel.toUpperCase(), { size: 26, weight: 700, anchor: 'middle', font: 'mono', fill: ctx.accent, ls: 2 }); t.setAttribute('transform', `translate(${gx - 236},${gy + gh / 2}) rotate(-90)`); t.querySelectorAll('tspan').forEach(ts => { ts.setAttribute('x', 0); ts.setAttribute('y', 0); }); }
    const counts = {};
    const items = (sc.items || []).map(it => {
      const key = it.r + ',' + it.c; const idx = counts[key] = (counts[key] || 0) + 1;
      const x = gx + it.c * cw + cw / 2, y = gy + it.r * ch + 16 + (idx - 1) * 56; const tw = Math.min(cw - 20, it.t.length * 25 * 0.56 + 40);
      const o = G(g, x, y, 'pop'); el('rect', { x: -tw / 2, y: 0, width: tw, height: 46, rx: 23, fill: X.deep, stroke: KIND[it.k] || C.text, 'stroke-width': 2.5 }, o);
      T(o, 0, 32, it.t, { size: 25, weight: 700, anchor: 'middle', maxLines: 1, w: tw - 14 }); return o;
    });
    const notes = makeNotes(g, sc.notes, ctx, 1070, 236, 440);
    return { beat(k) { show(grid, true); const s = revealCount(k, items.length, ctx.nb); items.forEach((o, i) => show(o, i < s)); notesBeat(notes, k); } };
  };

  TPL.neural = (g, sc, ctx) => {
    head(g, sc, ctx);
    const sizes = sc.layers || [3, 4, 4, 2]; const nl = sizes.length;
    const x0 = 230, x1 = sc.notes ? 860 : 1300, yc = 520, span = 500;
    const xs = sizes.map((_, i) => x0 + i * (x1 - x0) / (nl - 1));
    const pos = sizes.map((s, i) => Array.from({ length: s }, (_, j) => ({ x: xs[i], y: yc + (s > 1 ? (j - (s - 1) / 2) * Math.min(118, span / (s - 1)) : 0) })));
    const eg = rv(el('g', {}, g), 'fade'); const edges = [];
    for (let i = 0; i < nl - 1; i++) pos[i].forEach(a => pos[i + 1].forEach(b => edges.push({ li: i, p: el('path', { d: `M${a.x} ${a.y}L${b.x} ${b.y}`, stroke: C.line, 'stroke-width': 2.5, fill: 'none' }, eg) })));
    const neurons = pos.map((col, i) => col.map(p => { const o = G(g, p.x, p.y, 'pop'); el('circle', { cx: 0, cy: 0, r: 30, fill: C.panel2, stroke: i === 0 ? C.data : i === nl - 1 ? C.model : C.neutral, 'stroke-width': 4 }, o); const glow = rv(el('circle', { cx: 0, cy: 0, r: 22, fill: ctx.accent }, o), 'fade'); return { o, glow }; }));
    const lab = rv(el('g', {}, g), 'fade');
    (sc.inLabels || []).forEach((t, j) => pos[0][j] && T(lab, pos[0][j].x - 48, pos[0][j].y + 10, t, { size: 27, anchor: 'end', fill: C.dim }));
    (sc.outLabels || []).forEach((t, j) => pos[nl - 1][j] && T(lab, pos[nl - 1][j].x + 48, pos[nl - 1][j].y + 10, t, { size: 29, weight: 700 }));
    (sc.caps || ['Input', ...Array(Math.max(0, nl - 2)).fill('Hidden'), 'Output']).slice(0, nl).forEach((t, i) => T(lab, xs[i], yc + span / 2 + 88, t.toUpperCase(), { size: 23, font: 'mono', fill: C.faint, anchor: 'middle', ls: 2 }));
    const out = pos[nl - 1][0];
    const loss = rv(el('g', {}, g), 'pop'); pill(loss, out.x + 10, out.y - 90, sc.lossLabel || 'Error: predicted 0.3, expected 1.0', { stroke: C.threat, size: 25 });
    const notes = makeNotes(g, sc.notes, ctx, 1010, 236, 500);
    const steps = sc.steps || ['show'];
    return {
      beat(k, instant) {
        show(eg, true); show(lab, true); neurons.flat().forEach(nn => { show(nn.o, true); show(nn.glow, false); });
        edges.forEach(e => { e.p.setAttribute('stroke', C.line); e.p.setAttribute('stroke-width', 2.5); });
        const st = steps[Math.min(k, steps.length - 1)];
        show(loss, st === 'error' || st === 'backward');
        const wave = dir => {
          const col = dir > 0 ? ctx.accent : C.human; const order = [...Array(nl).keys()]; if (dir < 0) order.reverse();
          order.forEach((li, s) => { const on = () => neurons[li].forEach(nn => { nn.glow.setAttribute('fill', col); show(nn.glow, true); }); if (instant) on(); else ctx.after(s * 450, on); });
          edges.forEach((e, i) => { if (i % 2 === 0) ctx.flow(e.p, col, { n: 1, dur: 1500, r: 7, reverse: dir < 0 }); });
        };
        if (st === 'forward' || st === 'predict') wave(1);
        else if (st === 'backward') wave(-1);
        else if (st === 'update') edges.forEach((e, i) => { e.p.setAttribute('stroke-width', 1.5 + ((i * 37) % 7) * 1.05); e.p.setAttribute('stroke', i % 3 ? C.neutral : ctx.accent); });
        notesBeat(notes, k);
      }
    };
  };

  TPL.conv = (g, sc, ctx) => {
    head(g, sc, ctx);
    const img = sc.img || ['0011100', '0100010', '0000010', '0000100', '0001000', '0010000', '0111110'];
    const N = 7, cs = 54, gx = 100, gy = 230;
    const grid = rv(el('g', {}, g), 'fade');
    img.forEach((row, r) => row.split('').forEach((v, c) => el('rect', { x: gx + c * cs, y: gy + r * cs, width: cs - 5, height: cs - 5, rx: 6, fill: v === '1' ? C.text : C.panel2 }, grid)));
    T(grid, gx + N * cs / 2, gy + N * cs + 46, 'INPUT 7×7', { size: 24, font: 'mono', fill: C.dim, anchor: 'middle', ls: 2 });
    const kOuter = rv(el('g', {}, g), 'fade'); const kMove = el('g', {}, kOuter); kMove.classList.add('kmove');
    el('rect', { x: gx - 5, y: gy - 5, width: 3 * cs + 5, height: 3 * cs + 5, rx: 10, fill: hexA(ctx.accent, 0.15), stroke: ctx.accent, 'stroke-width': 6 }, kMove);
    const kLab = rv(el('g', {}, g), 'fade'); T(kLab, gx + 1.5 * cs, gy - 26, '3×3 filter', { size: 26, font: 'mono', fill: ctx.accent, anchor: 'middle' });
    const fm = 5, fx = 590, fy = 284, fs = 54;
    const fmG = rv(el('g', {}, g), 'fade'); const fcells = [];
    for (let r = 0; r < fm; r++) for (let c = 0; c < fm; c++) { let s = 0; for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) s += img[r + i][c + j] === '1' ? 1 : 0; fcells.push({ r, c, v: s / 9, e: el('rect', { x: fx + c * fs, y: fy + r * fs, width: fs - 5, height: fs - 5, rx: 6, fill: C.panel2 }, fmG) }); }
    T(fmG, fx + fm * fs / 2, fy + fm * fs + 46, 'FEATURE MAP', { size: 24, font: 'mono', fill: C.dim, anchor: 'middle', ls: 2 });
    const pG = rv(el('g', {}, g), 'fade'); const px = 1000, py = 336, ps = 74; const pooled = [];
    for (let r = 0; r < 2; r++) for (let c = 0; c < 2; c++) { let m = 0; for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) { const fc = fcells[(r * 2 + i) * fm + (c * 2 + j)]; m = Math.max(m, fc.v); } pooled.push(el('rect', { x: px + c * ps, y: py + r * ps, width: ps - 6, height: ps - 6, rx: 8, fill: hexA(ctx.accent, 0.2 + m * 0.8) }, pG)); }
    T(pG, px + ps, py + 2 * ps + 46, 'POOLED', { size: 24, font: 'mono', fill: C.dim, anchor: 'middle', ls: 2 });
    const oG = rv(el('g', {}, g), 'fade');
    el('path', { d: `M${px + 2 * ps + 20} ${py + ps}L1260 ${py + ps}`, stroke: C.neutral, 'stroke-width': 4, 'marker-end': `url(#${ctx.marker(C.neutral)})` }, oG);
    el('rect', { x: 1280, y: py + ps - 60, width: 230, height: 120, rx: 18, fill: C.panel, stroke: C.model, 'stroke-width': 3 }, oG);
    T(oG, 1395, py + ps - 6, sc.outLabel || 'Digit: 2', { size: 36, weight: 750, anchor: 'middle' });
    T(oG, 1395, py + ps + 36, sc.outConf || '96% confident', { size: 25, fill: C.dim, anchor: 'middle' });
    const steps = sc.steps || ['image', 'kernel', 'slide', 'pool', 'out']; const at = name => steps.indexOf(name);
    const fill = (i, on) => { const fc = fcells[i]; fc.e.setAttribute('fill', on ? hexA(ctx.accent, 0.15 + fc.v * 0.85) : C.panel2); };
    const place = i => { const r = Math.floor(i / fm), c = i % fm; kMove.style.transform = `translate(${c * cs}px,${r * cs}px)`; };
    return {
      beat(k, instant) {
        show(grid, true);
        const sK = at('kernel') >= 0 && k >= at('kernel'), sS = at('slide') >= 0 && k >= at('slide'), sP = at('pool') >= 0 && k >= at('pool'), sO = at('out') >= 0 && k >= at('out');
        show(kOuter, sK && !sP); show(kLab, sK && !sS); show(fmG, sS); show(pG, sP); show(oG, sO);
        if (sS && k === at('slide') && !instant) { fcells.forEach((_, i) => fill(i, false)); fcells.forEach((_, i) => ctx.after(i * 150, () => { place(i); fill(i, true); })); }
        else if (sS) { fcells.forEach((_, i) => fill(i, true)); place(fcells.length - 1); }
        else { fcells.forEach((_, i) => fill(i, false)); place(0); }
      }
    };
  };

  TPL.attention = (g, sc, ctx) => {
    head(g, sc, ctx);
    const toks = sc.tokens || []; const n = toks.length; const y = 646;
    const ws = toks.map(t => Math.max(112, t.length * 33 * 0.6 + 46)); const tot = ws.reduce((a, b) => a + b, 0) + (n - 1) * 18; let x = 800 - tot / 2; const xs = [];
    const chips = toks.map((t, i) => { xs.push(x + ws[i] / 2); const o = G(g, x, y, 'pop'); const r = el('rect', { x: 0, y: 0, width: ws[i], height: 76, rx: 16, fill: C.panel2, stroke: C.line, 'stroke-width': 3 }, o); T(o, ws[i] / 2, 50, t, { size: 33, anchor: 'middle', weight: 600, font: 'mono' }); const pz = rv(el('g', {}, o), 'fade'); T(pz, ws[i] / 2, 112, 'pos ' + i, { size: 22, font: 'mono', fill: C.faint, anchor: 'middle' }); x += ws[i] + 18; return { o, r, pz }; });
    const f = sc.focus || 0; const wts = sc.weights || toks.map((_, i) => i === f ? 0 : 1 / (n - 1));
    const arcs = rv(el('g', {}, g), 'fade');
    toks.forEach((t, i) => { if (i === f) return; const a = xs[f], b = xs[i]; const hh = 70 + Math.abs(b - a) * 0.32; const w = wts[i] || 0; el('path', { d: `M${a} ${y - 8}C${a} ${y - 8 - hh},${b} ${y - 8 - hh},${b} ${y - 8}`, fill: 'none', stroke: ctx.accent, 'stroke-width': 2 + w * 24, opacity: 0.3 + w * 0.7, 'stroke-linecap': 'round' }, arcs); T(arcs, (a + b) / 2, y - 8 - hh * 0.75 - 12, Math.round(w * 100) + '%', { size: 23, font: 'mono', fill: C.dim, anchor: 'middle' }); });
    const all = rv(el('g', {}, g), 'fade');
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) { const a = xs[i], b = xs[j]; const hh = Math.min(96, 26 + Math.abs(b - a) * 0.1); el('path', { d: `M${a} ${y + 128}C${a} ${y + 128 + hh},${b} ${y + 128 + hh},${b} ${y + 128}`, fill: 'none', stroke: C.model, 'stroke-width': 2.5, opacity: 0.45 }, all); }
    const notes = (sc.notes || []).map(nt => { if (!nt) return null; const p = G(g, 800, 236, 'fade'); T(p, 0, 0, nt, { size: 36, anchor: 'middle', w: 1300, fill: C.dim, lh: 1.3 }); return p; });
    const steps = sc.steps || ['tokens', 'focus', 'weights']; const at = nm => { const i = steps.indexOf(nm); return i < 0 ? 999 : i; };
    return {
      beat(k) {
        chips.forEach(c => show(c.o, true));
        const foc = k >= at('focus'); chips.forEach((c, i) => { c.r.setAttribute('stroke', foc && i === f ? ctx.accent : C.line); c.r.setAttribute('fill', foc && i === f ? hexA(ctx.accent, 0.22) : C.panel2); show(c.pz, k >= at('positions')); });
        show(arcs, k >= at('weights')); show(all, k >= at('all')); notesBeat(notes, k);
      }
    };
  };

  TPL.tokens = (g, sc, ctx) => {
    head(g, sc, ctx);
    const text = sc.text || ''; const toks = sc.toks || text.split(/(?=\s)/);
    const tg = rv(el('g', {}, g), 'fade'); T(tg, 90, 236, '“' + text + '”', { size: 38, w: 1420, lh: 1.25 });
    const pal = X.clusters;
    let x = 90, y = 330; const chips = [];
    toks.forEach((t, i) => {
      const lab = t.replace(/ /g, '·'); const w = Math.max(70, lab.length * 35 * 0.6 + 36);
      if (x + w > 1510) { x = 90; y += 140; }
      const o = G(g, x, y, 'pop'); const r = el('rect', { x: 0, y: 0, width: w, height: 76, rx: 12, fill: pal[i % pal.length], stroke: C.line, 'stroke-width': 2 }, o);
      T(o, w / 2, 51, lab, { size: 35, font: 'mono', anchor: 'middle' });
      const idg = rv(el('g', {}, o), 'fade'); T(idg, w / 2, 110, String(sc.ids ? sc.ids[i] : 1000 + ((i * 7919 + t.length * 131) % 48000)), { size: 24, font: 'mono', fill: C.faint, anchor: 'middle' });
      chips.push({ o, r, idg }); x += w + 12;
    });
    const win = sc.window || { size: Math.max(toks.length, 8) };
    const bar = rv(el('g', {}, g), 'fade'); const bx = 90, by = 760, bw = 1420; const used = toks.length; const cap = win.size;
    el('rect', { x: bx, y: by, width: bw, height: 44, rx: 12, fill: C.panel, stroke: C.line, 'stroke-width': 2 }, bar);
    const frac = Math.min(1, used / cap); const fillR = el('rect', { x: bx + 4, y: by + 4, width: (bw - 8) * frac, height: 36, rx: 9, fill: used > cap ? C.threat : ctx.accent, opacity: 0.85 }, bar);
    fillR.classList.add('grow-x'); fillR.style.transform = 'scaleX(0)';
    T(bar, bx, by - 18, win.label || `Context window: ${Math.min(used, cap)} / ${cap} tokens${used > cap ? ` · ${used - cap} truncated` : ''}`, { size: 27, font: 'mono', fill: used > cap ? C.threat : C.dim });
    const steps = sc.steps || ['text', 'split', 'ids', 'window']; const at = nm => { const i = steps.indexOf(nm); return i < 0 ? 999 : i; };
    const notesY = Math.min(690, y + 168);
    const notes = (sc.notes || []).map(nt => { if (!nt) return null; const p = G(g, 90, notesY, 'fade'); T(p, 0, 0, nt, { size: 32, fill: ctx.accent, weight: 600, w: 1420 }); return p; });
    return {
      beat(k, instant) {
        show(tg, true); const sp = k >= at('split');
        chips.forEach((c, i) => { show(c.o, sp); c.o.style.transitionDelay = sp && !instant ? (i * 70) + 'ms' : '0ms'; show(c.idg, k >= at('ids')); });
        const ov = k >= at('overflow') && used > cap; chips.forEach((c, i) => { cls(c.o, 'dimmed', ov && i < used - cap); c.r.setAttribute('stroke', ov && i < used - cap ? C.threat : C.line); });
        show(bar, k >= at('window')); fillR.style.transform = `scaleX(${k >= at('window') ? 1 : 0})`;
        notesBeat(notes, k);
      }
    };
  };

  TPL.vector = (g, sc, ctx) => {
    head(g, sc, ctx);
    const px = 90, py = 178, pw = sc.notes ? 900 : 1420, ph = 690; const r = seeded(sc.seed || 5);
    const X = v => px + 40 + v * (pw - 80), Y = v => py + 40 + v * (ph - 80);
    const frame = rv(el('g', {}, g), 'fade'); el('rect', { x: px, y: py, width: pw, height: ph, rx: 22, fill: C.bg2, stroke: C.line, 'stroke-width': 2 }, frame);
    for (let i = 1; i < 6; i++) { el('line', { x1: px + i * pw / 6, y1: py + 10, x2: px + i * pw / 6, y2: py + ph - 10, stroke: X.vgrid, 'stroke-width': 2 }, frame); el('line', { x1: px + 10, y1: py + i * ph / 6, x2: px + pw - 10, y2: py + i * ph / 6, stroke: X.vgrid, 'stroke-width': 2 }, frame); }
    const all = [];
    const clusters = (sc.clusters || []).map(cl => {
      const col = KIND[cl.k] || ctx.accent; const grp = rv(el('g', {}, g), 'fade');
      const pts = (cl.pts || Array.from({ length: cl.n || 10 }, () => [cl.cx + gauss(r) * (cl.sp || 0.06), cl.cy + gauss(r) * (cl.sp || 0.06)])).map(p => [Math.min(0.98, Math.max(0.02, p[0])), Math.min(0.98, Math.max(0.02, p[1]))]);
      pts.forEach(p => { el('circle', { cx: X(p[0]), cy: Y(p[1]), r: 11, fill: col, opacity: 0.9 }, grp); all.push({ x: p[0], y: p[1], col }); });
      const lg = rv(el('g', {}, g), 'fade'); if (cl.label) pill(lg, X(cl.lx != null ? cl.lx : cl.cx), Y(cl.ly != null ? cl.ly : cl.cy - (cl.sp || 0.06) * 2.6 - 0.04), cl.label, { stroke: col, size: 26 });
      return { grp, lg };
    });
    const q = sc.query; let qg = null, knn = null;
    if (q) {
      qg = rv(el('g', {}, g), 'pop'); const qx = X(q.x), qy = Y(q.y);
      el('path', { d: `M${qx} ${qy - 22}L${qx + 7} ${qy - 7}L${qx + 22} ${qy - 5}L${qx + 10} ${qy + 6}L${qx + 14} ${qy + 22}L${qx} ${qy + 13}L${qx - 14} ${qy + 22}L${qx - 10} ${qy + 6}L${qx - 22} ${qy - 5}L${qx - 7} ${qy - 7}z`, fill: C.human, stroke: X.deep, 'stroke-width': 2 }, qg);
      if (q.label) pill(qg, qx, q.below ? qy + 52 : qy - 50, q.label, { stroke: C.human, size: 25 });
      knn = rv(el('g', {}, g), 'fade'); const kk = q.k || 3;
      const near = all.map(p => ({ p, d: Math.hypot(p.x - q.x, p.y - q.y) })).sort((a, b) => a.d - b.d).slice(0, kk);
      const rad = near.length ? near[near.length - 1].d : 0.1;
      el('ellipse', { cx: qx, cy: qy, rx: rad * (pw - 80) + 16, ry: rad * (ph - 80) + 16, fill: 'none', stroke: C.human, 'stroke-width': 3, 'stroke-dasharray': '10 10' }, knn);
      near.forEach(nn => el('line', { x1: qx, y1: qy, x2: X(nn.p.x), y2: Y(nn.p.y), stroke: C.human, 'stroke-width': 3 }, knn));
    }
    const bnd = sc.boundary ? (() => { const b = sc.boundary; const o = rv(el('g', {}, g), 'fade'); el('line', { x1: X(b[0]), y1: Y(b[1]), x2: X(b[2]), y2: Y(b[3]), stroke: C.text, 'stroke-width': 4, 'stroke-dasharray': '16 10' }, o); if (sc.boundaryLabel) pill(o, X(b[2]) - 40, Y(b[3]) + 40, sc.boundaryLabel, { size: 24 }); return o; })() : null;
    const ev = sc.evade ? (() => { const e = sc.evade; const o = rv(el('g', {}, g), 'fade'); const ax = X(e.from[0]), ay = Y(e.from[1]), bx = X(e.to[0]), by = Y(e.to[1]); el('circle', { cx: ax, cy: ay, r: 13, fill: 'none', stroke: C.text, 'stroke-width': 3, 'stroke-dasharray': '5 5' }, o); el('path', { d: `M${ax} ${ay}L${bx} ${by}`, stroke: C.threat, 'stroke-width': 4, 'marker-end': `url(#${ctx.marker(C.threat)})` }, o); el('circle', { cx: bx, cy: by, r: 13, fill: KIND[e.k] || C.data, stroke: C.threat, 'stroke-width': 4 }, o); if (e.label) pill(o, (ax + bx) / 2, Math.min(ay, by) - 46, e.label, { stroke: C.threat, size: 25 }); return o; })() : null;
    const po = sc.poison ? (() => { const p = sc.poison; const o = rv(el('g', {}, g), 'fade'); (p.pts || []).forEach(pt => { const cx = X(pt[0]), cy = Y(pt[1]); el('circle', { cx, cy, r: 12, fill: KIND[p.k] || C.data, stroke: C.threat, 'stroke-width': 4 }, o); el('path', { d: `M${cx - 6} ${cy - 6}L${cx + 6} ${cy + 6}M${cx + 6} ${cy - 6}L${cx - 6} ${cy + 6}`, stroke: C.threat, 'stroke-width': 3 }, o); }); if (p.boundary) { const b = p.boundary; el('line', { x1: X(b[0]), y1: Y(b[1]), x2: X(b[2]), y2: Y(b[3]), stroke: C.threat, 'stroke-width': 4, 'stroke-dasharray': '16 10' }, o); } if (p.label) pill(o, X(p.lx || 0.5), Y(p.ly || 0.08), p.label, { stroke: C.threat, size: 25 }); return o; })() : null;
    const notes = makeNotes(g, sc.notes, ctx, 1030, 236, 480);
    const steps = sc.steps || ['points']; const at = nm => { const i = steps.indexOf(nm); return i < 0 ? 999 : i; };
    return {
      beat(k) {
        show(frame, true); clusters.forEach(c => { show(c.grp, k >= Math.min(at('points'), 0)); show(c.lg, k >= at('labels')); });
        if (qg) show(qg, k >= at('query')); if (knn) show(knn, k >= at('knn'));
        if (bnd) { show(bnd, k >= at('boundary')); cls(bnd, 'dimmed', po && k >= at('poison')); } if (ev) show(ev, k >= at('evade')); if (po) show(po, k >= at('poison'));
        notesBeat(notes, k);
      }
    };
  };

  TPL.chart = (g, sc, ctx) => {
    head(g, sc, ctx);
    const px = 190, py = 220, pw = sc.notes ? 800 : 1240, ph = 540; const xs = sc.x || []; const n = xs.length;
    const y0 = sc.yMin != null ? sc.yMin : 0, y1 = sc.yMax != null ? sc.yMax : 100;
    const X = sc.kind === 'bar' ? (i => px + (i + 0.5) * pw / Math.max(1, n)) : (i => px + (n > 1 ? i * pw / (n - 1) : pw / 2)); const Y = v => py + ph - (v - y0) / (y1 - y0) * ph;
    const axes = rv(el('g', {}, g), 'fade'); const ticks = sc.ticks || 5;
    for (let i = 0; i <= ticks; i++) { const v = y0 + (y1 - y0) * i / ticks; el('line', { x1: px, y1: Y(v), x2: px + pw, y2: Y(v), stroke: X.grid, 'stroke-width': 2 }, axes); T(axes, px - 18, Y(v) + 9, ((y1 - y0) <= 10 ? (+v.toFixed(1)) : Math.round(v)) + (sc.unit || ''), { size: 24, font: 'mono', fill: C.faint, anchor: 'end' }); }
    xs.forEach((t, i) => { if (n > 10 && i % Math.ceil(n / 8)) return; T(axes, X(i), py + ph + 42, t, { size: 23, font: 'mono', fill: C.faint, anchor: 'middle' }); });
    if (sc.yLabel) T(axes, px, py - 26, sc.yLabel, { size: 26, fill: C.dim, weight: 600 });
    const useLegend = (sc.series || []).length > 1 && (sc.kind === 'bar' || sc.legend); const labs = [];
    const series = (sc.series || []).map((s, si) => {
      const col = KIND[s.k] || (si === 0 ? ctx.accent : C.neutral); const grp = el('g', {}, g);
      if (sc.kind === 'bar') {
        const bw = Math.min(80, pw / n * 0.6 / (sc.series.length)); const bars = s.v.map((v, i) => { const b = el('rect', { x: X(i) - bw * sc.series.length / 2 + si * bw, y: Y(v), width: bw - 4, height: Math.max(0, Y(y0) - Y(v)), rx: 5, fill: s.ck ? (KIND[s.ck[i]] || col) : s.cs ? (DOM[s.cs[i]] || col) : col }, grp); b.classList.add('grow-y'); b.style.transform = 'scaleY(0)'; return b; });
        return { grp, bars, line: null };
      }
      const d = s.v.map((v, i) => (i ? 'L' : 'M') + X(i) + ' ' + Y(v)).join(''); const p = el('path', { d, fill: 'none', stroke: col, 'stroke-width': 6, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, grp);
      let len = 2000; try { len = p.getTotalLength(); } catch (e) { } p.style.strokeDasharray = len; p.style.strokeDashoffset = len; p.classList.add('draw');
      const dots = rv(el('g', {}, grp), 'fade'); s.v.forEach((v, i) => el('circle', { cx: X(i), cy: Y(v), r: 7, fill: col }, dots));
      if (s.n && sc.series.length > 1 && !useLegend) { const at = s.at != null ? s.at : n - 1; labs.push({ el: T(dots, X(at) - 6 + (s.dx || 0), Y(s.v[at]) - 18 + (s.dy || 0), s.n, { size: 26, weight: 700, fill: col, anchor: s.anchor || 'end' }), y: Y(s.v[at]) - 18 + (s.dy || 0), x: X(at) }); }
      return { grp, line: p, len, dots };
    });
    /* De-collide direct labels that sit close together, then build the legend (bars, or when asked). */
    labs.sort((a, b) => a.y - b.y); for (let i = 1; i < labs.length; i++) { const p0 = labs[i - 1], p1 = labs[i]; if (Math.abs(p1.x - p0.x) < 260 && p1.y - p0.y < 34) { const ny = p0.y + 34; p1.el.querySelectorAll('tspan').forEach(ts => ts.setAttribute('y', ny)); p1.y = ny; } }
    const legend = useLegend ? (() => { const items = sc.series.map((s, si) => ({ s, col: KIND[s.k] || (si === 0 ? ctx.accent : C.neutral), w: 44 + String(s.n || '').length * charW(24) + 34 })); const tot = items.reduce((a, b) => a + b.w, 0); let lx = px + pw / 2 - tot / 2; const ly = py + ph + 92;
      return items.map(it => { const o = rv(el('g', {}, g), 'fade'); el('rect', { x: lx, y: ly - 15, width: 32, height: 14, rx: 7, fill: it.col }, o); T(o, lx + 44, ly, it.s.n || '', { size: 24, fill: C.dim, weight: 600 }); lx += it.w; return o; }); })() : [];
    const placed = [];
    const ann = (sc.annot || []).map(a => { const o = rv(el('g', {}, g), 'fade'); const col = KIND[a.k] || C.human; if (a.x != null) { el('line', { x1: X(a.x), y1: py, x2: X(a.x), y2: py + ph, stroke: col, 'stroke-width': 3, 'stroke-dasharray': '10 8' }, o);
        const pw2 = Math.max(60, String(a.text).length * 24 * 0.55 + 30); let pyy = a.at === 'bottom' ? py + ph - 26 : py + 26; const dir = a.at === 'bottom' ? -1 : 1;
        while (placed.some(q => Math.abs(q.y - pyy) < 40 && Math.abs(q.x - X(a.x)) < (q.w + pw2) / 2 + 8)) pyy += 50 * dir;
        placed.push({ x: X(a.x), y: pyy, w: pw2 }); pill(o, X(a.x), pyy, a.text, { stroke: col, size: 24 }); } if (a.y != null) { el('line', { x1: px, y1: Y(a.y), x2: px + pw, y2: Y(a.y), stroke: col, 'stroke-width': 3, 'stroke-dasharray': '10 8' }, o); pill(o, a.xi != null ? X(a.xi) : px + pw - 160, Y(a.y) - 28, a.text, { stroke: col, size: 24 }); } return o; });
    const notes = makeNotes(g, sc.notes, ctx, 1060, 236, 450);
    const steps = sc.steps || [{ s: series.map((_, i) => i), a: ann.map((_, i) => i) }];
    return {
      beat(k) {
        show(axes, true); const S = new Set(), A = new Set();
        for (let i = 0; i <= k && i < steps.length; i++) { (steps[i].s || []).forEach(x => S.add(x)); (steps[i].a || []).forEach(x => A.add(x)); }
        series.forEach((s, i) => { const on = S.has(i); if (s.line) { s.line.style.strokeDashoffset = on ? 0 : s.len; show(s.dots, on); } if (s.bars) s.bars.forEach(b => b.style.transform = on ? 'scaleY(1)' : 'scaleY(0)'); if (legend[i]) show(legend[i], on); });
        ann.forEach((a, i) => show(a, A.has(i))); notesBeat(notes, k);
      }
    };
  };

  TPL.shield = (g, sc, ctx) => {
    head(g, sc, ctx);
    const L = sc.layers || []; const n = L.length; const ax = 170, tx = 1440, y = 548;
    const base = rv(el('g', {}, g), 'fade');
    el('circle', { cx: ax, cy: y, r: 70, fill: C.panel2, stroke: C.threat, 'stroke-width': 4 }, base); ICON(base, 'attacker', ax, y, 70, C.threat); T(base, ax, y + 112, sc.attacker || 'Attacker', { size: 28, weight: 700, anchor: 'middle', fill: C.threat });
    el('circle', { cx: tx, cy: y, r: 70, fill: C.panel2, stroke: C.model, 'stroke-width': 4 }, base); ICON(base, sc.targetIcon || 'model', tx, y, 70, C.model); T(base, tx, y + 112, sc.target || 'Model and data', { size: 28, weight: 700, anchor: 'middle', w: 260 });
    const bx = L.map((_, i) => 420 + i * (760 / Math.max(1, n - 1 || 1)) + (n === 1 ? 380 : 0));
    L.forEach((l, i) => { const lab = typeof l === 'string' ? l : l.label; el('rect', { x: bx[i] - 15, y: y - 230, width: 30, height: 460, rx: 15, fill: hexA(C.control, 0.25), stroke: C.control, 'stroke-width': 3 }, base); const ll = lines(lab, 26, 230); T(base, bx[i], y - 252 - (ll.length - 1) * 31, lab, { size: 26, weight: 700, anchor: 'middle', w: 230, fill: C.control }); });
    const atk = (sc.attacks || []).map((a, i, arr) => {
      const yy = y + (i - (arr.length - 1) / 2) * 92; const stopped = a.stop != null && a.stop < n; const stopX = stopped ? bx[a.stop] - 40 : tx - 92;
      const o = rv(el('g', {}, g), 'fade'); const mv = el('g', {}, o); mv.classList.add('mover');
      /* Label sits on a solid tag above the dot, so a bar passing behind it never cuts through the text. */
      const ls = lines(a.t, 24, 330); const tw = Math.max.apply(null, ls.map(s => s.length)) * charW(24) + 34; const th = ls.length * 29 + 13; const ty = yy - 24 - th;
      const tag = el('rect', { x: ax + 80 - tw / 2, y: ty, width: tw, height: th, rx: 11, fill: C.bg2, stroke: C.threat, 'stroke-width': 2 }, mv);
      const lab = T(mv, ax + 80, ty + 28, a.t, { size: 24, weight: 700, anchor: 'middle', w: 330, lh: 29 / 24, fill: C.text });
      const dot = el('circle', { cx: ax + 80, cy: yy, r: 16, fill: C.threat }, mv);
      const burst = rv(el('g', {}, g), 'pop'); el('circle', { cx: stopX + 16, cy: yy, r: 30, fill: 'none', stroke: stopped ? C.control : C.threat, 'stroke-width': 5 }, burst);
      return { o, mv, burst, tag, lab, dot, dx: stopX - (ax + 80) };
    });
    return {
      beat(k, instant) {
        show(base, true);
        atk.forEach((a, i) => {
          const active = i < k || (k >= ctx.nb - 1 && atk.length >= ctx.nb); const now = i === k - 1;
          show(a.o, active); const past = active && !now && k < ctx.nb; a.tag.setAttribute('stroke', past ? C.line : C.threat); a.lab.setAttribute('fill', past ? C.dim : C.text); a.dot.setAttribute('opacity', past ? 0.5 : 1);
          if (active) { if (now && !instant) { a.mv.style.transition = 'none'; a.mv.style.transform = 'translateX(0px)'; void a.mv.getBoundingClientRect(); a.mv.style.transition = ''; a.mv.style.transform = `translateX(${a.dx}px)`; show(a.burst, false); ctx.after(1300, () => show(a.burst, true)); } else { a.mv.style.transform = `translateX(${a.dx}px)`; show(a.burst, true); } }
          else { a.mv.style.transform = 'translateX(0px)'; show(a.burst, false); }
        });
      }
    };
  };

  TPL.summary = (g, sc, ctx) => {
    head(g, Object.assign({}, sc, { title: sc.title || 'Key takeaways' }), ctx);
    const items = sc.items || []; const n = items.length; const meas = items.map(t => 22 + lines(t, 38, 1240).length * 48);
    const total = meas.reduce((a, b) => a + b, 0) + (n - 1) * 20; let y = 200 + Math.max(0, (660 - total) / 2);
    const rows = items.map((t, i) => { const o = G(g, 0, y, ''); const tick = rv(el('g', {}, o), 'pop'); el('circle', { cx: 150, cy: 30, r: 30, fill: C.control }, tick); ICON(tick, 'check', 150, 30, 34, X.onAccent, 3); el('circle', { cx: 150, cy: 30, r: 30, fill: 'none', stroke: C.line, 'stroke-width': 3 }, o); T(o, 210, 44, t, { size: 38, w: 1240, lh: 1.26 }); rv(o); y += meas[i] + 20; return { o, tick }; });
    return { beat(k) { const s = revealCount(k, n, ctx.nb); rows.forEach((r, i) => { show(r.o, i < s); show(r.tick, i < s); }); } };
  };

  TPL.quiz = (g, sc, ctx) => {
    const o = rv(el('g', {}, g), 'fade');
    el('circle', { cx: 800, cy: 330, r: 92, fill: C.panel2, stroke: ctx.accent, 'stroke-width': 5 }, o); ICON(o, 'bulb', 800, 330, 96, ctx.accent);
    T(o, 800, 520, 'Quick check', { size: 80, weight: 800, anchor: 'middle', stretch: '82%' });
    T(o, 800, 586, 'Answer to continue the video', { size: 34, fill: C.dim, anchor: 'middle' });
    return { beat() { show(o, true); } };
  };

  TPL.svg = (g, sc, ctx) => {
    head(g, sc, ctx);
    const holder = el('g', {}, g); holder.innerHTML = String(sc.svg || '').replace(/\$ACCENT/g, ctx.accent).replace(/#[0-9A-Fa-f]{6}\b/g, h => X.map[h.toUpperCase()] || h);
    const parts = Array.from(holder.querySelectorAll('[data-b]')); parts.forEach(p => p.classList.add('op'));
    return { beat(k) { parts.forEach(p => show(p, +p.getAttribute('data-b') <= k)); } };
  };

  /* Static rendering of one scene (final state) for diagrams inside lessons. */
  function renderStatic(host, scene, domain, label) {
    const uid = 's' + Math.random().toString(36).slice(2, 9); const accent = DOM[domain] || DOM[0];
    const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, class: 'vs instant still', role: 'img', 'aria-label': label || scene.title || 'Diagram' });
    const defs = el('defs', {}, svg); const markers = {};
    const lg = el('linearGradient', { id: uid + '-bg', x1: 0, y1: 0, x2: 1, y2: 1 }, defs); el('stop', { offset: '0%', 'stop-color': X.bgA }, lg); el('stop', { offset: '100%', 'stop-color': X.bgB }, lg);
    el('rect', { x: 0, y: 0, width: W, height: H, fill: `url(#${uid}-bg)` }, svg); svg.classList.add('vt-' + THEME);
    const g = el('g', {}, svg); host.appendChild(svg);
    const segs = parseSay(scene.say); const nb = Math.max(1, segs.length);
    const ctx = { accent, uid, nb, C, KIND, flow() { }, after(ms, fn) { fn(); }, anim(ms, fn) { fn(1); },
      marker(col) { const key = col.replace('#', ''); if (!markers[key]) { const id = `${uid}-m-${key}`; const m = el('marker', { id, viewBox: '0 0 10 10', refX: 8.6, refY: 5, markerWidth: 20, markerHeight: 20, markerUnits: 'userSpaceOnUse', orient: 'auto-start-reverse' }, defs); el('path', { d: 'M0 0.6L10 5L0 9.4z', fill: col }, m); markers[key] = id; } return markers[key]; } };
    try { const api = (TPL[scene.t] || TPL.bullets)(g, scene, ctx); api && api.beat(nb - 1, true); } catch (e) { console.error(e); }
    return svg;
  }

  window.VIDEO = { Player, TTS, parseSay, estimate, renderStatic, templates: TPL, DOM, setTheme, get theme() { return THEME; } };
})();

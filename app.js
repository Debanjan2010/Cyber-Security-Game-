/* ============================================================
   Cyber Sentinels — game engine
   ============================================================ */
import { PHISH, QUIZ, CHATS, PASSWORD_MISSION, RULES, BOSS_INTRO } from './data.js';

/* ---------------- helpers ---------------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const shuffle = a => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const pickN = (arr, n) => shuffle(arr).slice(0, n);
const prep = arr => arr.map(c => (c.type === 'choice' || c.type === 'chat')
  ? { ...c, options: shuffle(c.options).map(o => ({ ...o })) }
  : { ...c });

/* ---------------- progression ---------------- */
const LEVELS = [[0, 'Recruit'], [150, 'Cadet'], [350, 'Analyst'], [650, 'Specialist'], [1000, 'Sentinel'], [1500, 'Guardian'], [2100, 'Cyber Legend']];
function levelInfo(xp) {
  let i = 0;
  for (let k = 0; k < LEVELS.length; k++) if (xp >= LEVELS[k][0]) i = k;
  const cur = LEVELS[i][0];
  const next = LEVELS[i + 1] ? LEVELS[i + 1][0] : null;
  return {
    name: LEVELS[i][1], i, cur, next,
    pct: next ? clamp(((xp - cur) / (next - cur)) * 100, 0, 100) : 100,
    toNext: next ? Math.max(0, next - xp) : 0
  };
}

const BADGES = [
  { id: 'first', icon: '🚀', name: 'First Contact', desc: 'Finish any mission' },
  { id: 'phish', icon: '🎣', name: 'Phish Hunter', desc: '100% on Phish Hunt' },
  { id: 'vault', icon: '🔐', name: 'Vault Keeper', desc: 'Forge a legendary password' },
  { id: 'quiz', icon: '⚡', name: 'Quick Thinker', desc: '100% on Rapid Fire' },
  { id: 'human', icon: '🧠', name: 'Human Firewall', desc: '100% on Mind Games' },
  { id: 'boss', icon: '👾', name: 'Breach Stopper', desc: 'Defeat NULLBYTE' },
  { id: 'legend', icon: '👑', name: 'Cyber Legend', desc: 'Reach 2,100 XP' },
  { id: 'allstar', icon: '🌟', name: 'Ace Agent', desc: '100% on all five missions' }
];

const MISSIONS = [
  {
    id: 'phish', name: 'Phish Hunt', tag: 'Email forensics', icon: '🎣', accent: '#2ee6ff', diff: 1,
    desc: 'A chaotic inbox, ten messages. Decide what is real and what is hunting you.',
    build: () => prep(pickN(PHISH, 10)), badge: 'phish'
  },
  {
    id: 'pw', name: 'Password Forge', tag: 'Credentials', icon: '🔐', accent: '#9b7bff', diff: 2,
    desc: 'A live cracking lab: build a password and watch the crack-time meter move.',
    build: () => prep(PASSWORD_MISSION), badge: 'vault'
  },
  {
    id: 'quiz', name: 'Rapid Fire', tag: 'Speed quiz', icon: '⚡', accent: '#5ef2a8', diff: 2,
    desc: 'Ten questions, shrinking clock, combo bonuses. Know the basics cold.',
    build: () => prep(pickN(QUIZ, 10)), badge: 'quiz'
  },
  {
    id: 'social', name: 'Mind Games', tag: 'Social engineering', icon: '🎭', accent: '#ff4ecd', diff: 2,
    desc: 'Someone is messaging you right now. Pick the reply that keeps you safe.',
    build: () => prep(shuffle(CHATS)), badge: 'human'
  },
  {
    id: 'boss', name: 'NULLBYTE', tag: 'Final breach', icon: '👾', accent: '#ff5f7a', diff: 3, boss: true,
    desc: 'Everything at once, on a clock. Take the rogue AI down before it takes you.',
    build: () => prep(shuffle([
      ...pickN(PHISH, 3),
      ...pickN(QUIZ, 6),
      ...pickN(CHATS, 3)
    ])).map(c => ({ ...c, time: 22 })), badge: 'boss'
  }
];

/* ---------------- save state ---------------- */
const KEY = 'cybersentinels.v1';
const DEFAULTS = { name: '', xp: 0, best: {}, badges: [], sound: true };
let save = loadSave();

function loadSave() {
  try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; }
  catch { return { ...DEFAULTS }; }
}
function persist() {
  try { localStorage.setItem(KEY, JSON.stringify(save)); } catch { /* storage may be blocked */ }
}

/* ---------------- sound ---------------- */
let AC = null;
function audio() {
  if (!AC) { const C = window.AudioContext || window.webkitAudioContext; if (C) AC = new C(); }
  return AC;
}
function tone(freq, dur = .12, type = 'sine', gain = .05, delay = 0) {
  if (!save.sound) return;
  try {
    const a = audio(); if (!a) return;
    const t = a.currentTime + delay;
    const o = a.createOscillator(), g = a.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(gain, t + .012);
    g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    o.connect(g).connect(a.destination);
    o.start(t); o.stop(t + dur + .03);
  } catch { /* audio is a bonus, never fatal */ }
}
const sfx = {
  click: () => tone(540, .06, 'triangle', .035),
  good: () => { tone(680, .1, 'sine', .06); tone(1020, .16, 'sine', .045, .07); },
  bad: () => { tone(190, .2, 'sawtooth', .045); tone(120, .28, 'sine', .04, .05); },
  win: () => [523, 659, 784, 1046].forEach((f, i) => tone(f, .22, 'triangle', .055, i * .09)),
  lose: () => [440, 330, 247].forEach((f, i) => tone(f, .3, 'sine', .05, i * .12)),
  level: () => [523, 784, 1046, 1318].forEach((f, i) => tone(f, .25, 'sine', .05, i * .1))
};

/* ---------------- confetti ---------------- */
const cvs = $('#fx'), ctx = cvs.getContext('2d');
let parts = [], raf = null;
const CONFETTI_COLORS = ['#2ee6ff', '#9b7bff', '#ff4ecd', '#5ef2a8', '#ffc857', '#ffffff'];
function sizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  cvs.width = innerWidth * dpr; cvs.height = innerHeight * dpr;
  cvs.style.width = innerWidth + 'px'; cvs.style.height = innerHeight + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
addEventListener('resize', sizeCanvas); sizeCanvas();

function confetti(n = 150) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  for (let i = 0; i < n; i++) {
    parts.push({
      x: innerWidth * (.15 + Math.random() * .7),
      y: innerHeight * .18 + Math.random() * 60,
      vx: (Math.random() - .5) * 12,
      vy: -Math.random() * 11 - 2,
      g: .3, w: 5 + Math.random() * 8, h: 8 + Math.random() * 10,
      r: Math.random() * Math.PI, vr: (Math.random() - .5) * .28,
      life: 1, c: CONFETTI_COLORS[(Math.random() * CONFETTI_COLORS.length) | 0]
    });
  }
  if (!raf) raf = requestAnimationFrame(loop);
}
function loop() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  parts = parts.filter(p => p.life > 0 && p.y < innerHeight + 60);
  for (const p of parts) {
    p.vy += p.g; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.life -= .004;
    ctx.save();
    ctx.globalAlpha = Math.max(0, p.life);
    ctx.translate(p.x, p.y); ctx.rotate(p.r);
    ctx.fillStyle = p.c;
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();
  }
  if (parts.length) raf = requestAnimationFrame(loop);
  else { raf = null; ctx.clearRect(0, 0, innerWidth, innerHeight); }
}

/* ---------------- screens ---------------- */
function showScreen(id) {
  $$('.screen').forEach(s => s.classList.toggle('active', s.id === id));
  window.scrollTo(0, 0);
}

/* ---------------- hub ---------------- */
function bossUnlocked() {
  return ['phish', 'pw', 'quiz', 'social'].every(id => typeof save.best[id] === 'number');
}
function missionsDone() {
  return MISSIONS.filter(m => typeof save.best[m.id] === 'number').length;
}

function renderProfile() {
  const lv = levelInfo(save.xp);
  $('#pName').textContent = save.name || 'Agent';
  $('#pAvatar').textContent = (save.name || 'A').trim().charAt(0).toUpperCase();
  $('#pLevel').textContent = `${lv.name} · LVL ${lv.i + 1}`;
  $('#pXp').textContent = save.xp.toLocaleString() + ' XP';
  $('#pToNext').textContent = lv.next ? `${lv.toNext} XP to next rank` : 'max rank reached';
  $('#pBar').style.width = lv.pct + '%';
  $('#pBadges').textContent = save.badges.length;
  $('#pDone').textContent = `${missionsDone()}/${MISSIONS.length}`;

  const wrap = $('#xpWrap');
  wrap.hidden = !save.name;
  $('#topLevel').textContent = `LVL ${lv.i + 1} · ${lv.name}`.toUpperCase();
  $('#topBar').style.width = lv.pct + '%';
}

function renderMissions() {
  const grid = $('#missionGrid');
  grid.innerHTML = MISSIONS.map(m => {
    const locked = m.boss && !bossUnlocked();
    const best = save.best[m.id];
    const status = locked ? '🔒 Clear all four missions' : (typeof best === 'number' ? `${best}% best` : 'Start mission');
    return `<button class="mcard" data-id="${m.id}" style="--accent:${m.accent}" ${locked ? 'disabled' : ''}>
      <div class="mtop">
        <span class="micon">${m.icon}</span>
        <span class="mxp">${'◆'.repeat(m.diff)} \u00a0+${m.boss ? 300 : 150} XP</span>
      </div>
      <h3>${m.name}</h3>
      <div class="mtag">${m.tag}</div>
      <p class="mdesc">${m.desc}</p>
      <div class="mfoot">
        <span class="mstatus">${status}</span>
        <span class="mbest">${m.boss ? 'BOSS' : '10 ROUNDS'}</span>
      </div>
    </button>`;
  }).join('');
  $$('.mcard', grid).forEach(btn => btn.addEventListener('click', () => {
    const m = MISSIONS.find(x => x.id === btn.dataset.id);
    if (m) startMission(m);
  }));
}

function renderBadges() {
  $('#badgeGrid').innerHTML = BADGES.map(b => {
    const on = save.badges.includes(b.id);
    return `<div class="badge ${on ? 'on' : ''}" title="${esc(b.desc)}">
      <span class="bic">${b.icon}</span>
      <div><b>${b.name}</b><span>${b.desc}</span></div>
    </div>`;
  }).join('');
}

function renderRules() {
  const card = r => `<div class="rule"><div class="n">${r.n}</div><h3>${r.title}</h3><p>${r.text}</p></div>`;
  $('#homeRules').innerHTML = RULES.slice(0, 3).map(card).join('');
  $('#hubRules').innerHTML = RULES.map(card).join('');
}

function goHub() {
  renderProfile(); renderMissions(); renderBadges();
  showScreen('s-hub');
}

/* ---------------- session ---------------- */
let ses = null;
let timerId = null;

function startMission(m) {
  if (m.id === 'boss' && !bossUnlocked()) return;
  if (m.boss) return bossBriefing(m);
  launch(m);
}

function launch(m) {
  hideSheet();
  ses = {
    m, queue: m.build(), i: -1, correct: 0, wrong: 0, streak: 0, bestStreak: 0,
    xp: 0, hearts: m.boss ? 4 : 3, bossHP: m.boss ? 96 : 0,
    locked: false, answered: 0, legend: false, attempts: 0, pending: 'next',
    current: null, tTotal: 0, tLeft: 0
  };
  $('#playTitle').textContent = m.name;
  $('#playKind').textContent = m.tag;
  $('#bossbar').hidden = !m.boss;
  $('#stage').innerHTML = '';
  updateHud();
  showScreen('s-play');
  sfx.click();
  nextChallenge();
}

function bossBriefing(m) {
  const inner = $('#sheetInner');
  inner.className = 'sheet-inner bad';
  inner.innerHTML = `
    <div class="fb-head">👾 ${BOSS_INTRO.name} <span class="pts zero" style="color:#ff9aa8;border-color:rgba(255,95,122,.4);background:rgba(255,95,122,.12)">BOSS FIGHT</span></div>
    <p class="fb-why">${esc(BOSS_INTRO.tag)}</p>
    <div class="fb-lesson">Loadout: 4 lives · 12 challenges · 16 damage per correct call. Answer fast for bonus damage.</div>
    <div class="fb-actions">
      <button class="btn" id="bossCancel">Not yet</button>
      <button class="btn primary" id="bossGo">Engage →</button>
    </div>`;
  $('#sheet').classList.add('show');
  $('#bossCancel').onclick = () => { hideSheet(); goHub(); };
  $('#bossGo').onclick = () => { sfx.level(); launch(m); };
}

function updateHud() {
  const max = ses.m.boss ? 4 : 3;
  const box = $('#hearts');
  box.innerHTML = '';
  for (let i = 0; i < max; i++) {
    const s = document.createElement('span');
    s.textContent = i < ses.hearts ? '❤️' : '🖤';
    if (i >= ses.hearts) s.className = 'gone';
    box.appendChild(s);
  }
  if (ses.m.boss) {
    const pct = clamp(ses.bossHP, 0, 96) / 96 * 100;
    $('#bossHp').style.width = pct + '%';
    $('#bossHpNum').textContent = Math.max(0, ses.bossHP);
  }
  const done = clamp(ses.i, 0, ses.queue.length);
  $('#playProgress').style.width = (done / ses.queue.length * 100) + '%';
}

/* ---------------- timer ---------------- */
function startTimer(sec) {
  stopTimer();
  const ring = $('#timerRing');
  ring.style.opacity = 1; ring.classList.remove('warn');
  ses.tTotal = sec; ses.tLeft = sec;
  const t0 = performance.now();
  ring.style.setProperty('--p', 100);
  $('#timerNum').textContent = Math.ceil(sec);
  timerId = setInterval(() => {
    const left = Math.max(0, sec - (performance.now() - t0) / 1000);
    ses.tLeft = left;
    ring.style.setProperty('--p', (left / sec) * 100);
    $('#timerNum').textContent = Math.ceil(left);
    ring.classList.toggle('warn', left <= 5);
    if (left <= 0) { stopTimer(); timeUp(); }
  }, 100);
}
function stopTimer(hide) {
  if (timerId) { clearInterval(timerId); timerId = null; }
  if (hide) { $('#timerRing').style.opacity = .22; $('#timerRing').classList.remove('warn'); }
}
function timeUp() {
  if (!ses || ses.locked) return;
  ses.locked = true;
  $$('.opt,.reply,.vbtn').forEach(b => b.style.pointerEvents = 'none');
  judge(false, {
    why: "⏱ Time's up. An attacker's favourite weapon is the clock — a rushed decision is a wrong decision.",
    lesson: ses.current?.lesson || 'Slow down for ten seconds. Urgency is the tell.'
  });
}

/* ---------------- challenge rendering ---------------- */
function nextChallenge() {
  ses.locked = false;
  ses.attempts = 0;
  ses.i++;
  if (ses.m.boss) {
    if (ses.bossHP <= 0) return endMission(true, 'win');
    if (ses.i >= ses.queue.length) return endMission(false, 'lose');
  } else if (ses.i >= ses.queue.length) {
    return endMission(true, 'clear');
  }
  const ch = ses.queue[ses.i];
  ses.current = ch;
  updateHud();
  if (ch.type === 'phish') renderPhish(ch);
  else if (ch.type === 'choice') renderChoice(ch);
  else if (ch.type === 'chat') renderChat(ch);
  else if (ch.type === 'pwbuild') renderBuild(ch);
  if (ch.time) startTimer(ch.time); else stopTimer(true);
}

const initial = s => (s || '?').replace(/[^A-Za-z0-9]/g, '').charAt(0).toUpperCase() || '?';

function renderPhish(ch) {
  const stage = $('#stage');
  if (ch.channel === 'email') {
    stage.innerHTML = `
      <div class="mailwindow">
        <div class="mailbar"><i></i><i></i><i></i><span>INBOX — ${esc(ch.at || '')}</span></div>
        <div class="mailhead">
          <div class="mavatar">${esc(initial(ch.from))}</div>
          <div class="mailfrom">
            <div class="who">${esc(ch.from)} <span class="addr">&lt;${esc(ch.fromAddr)}&gt;</span></div>
            <div class="subj">${esc(ch.subject)}</div>
          </div>
          <div class="mailtime">${esc(ch.at || '')}</div>
        </div>
        <div class="mailbody">${esc(ch.body)}</div>
        ${ch.link ? `<div class="linkchip">🔗 ${esc(ch.link)}</div>` : ''}
        ${ch.attachment ? `<div class="attach">📎 ${esc(ch.attachment)}</div>` : ''}
      </div>`;
  } else {
    const label = ch.channel === 'sms' ? 'Messages' : 'Direct message';
    stage.innerHTML = `
      <div class="phone">
        <div class="phone-top"><span>${label.toUpperCase()}</span><span>now ●</span></div>
        <div class="phone-top" style="padding-bottom:6px">
          <span style="font-family:'Space Grotesk',sans-serif;color:#c9d5ee;font-size:.9rem">${esc(ch.from)}</span>
          <span>${ch.channel === 'sms' ? 'SMS' : 'DM'}</span>
        </div>
        <div class="bubble">${esc(ch.body)}</div>
        ${ch.link ? `<div class="linkchip" style="margin:14px 0 0">🔗 ${esc(ch.link)}</div>` : ''}
      </div>`;
  }
  stage.insertAdjacentHTML('beforeend', `
    <div class="verdicts">
      <button class="vbtn" data-v="scam">🚨 <span>Phishing<span class="sub">This is an attack</span></span></button>
      <button class="vbtn" data-v="safe">✅ <span>Legitimate<span class="sub">Looks genuine</span></span></button>
    </div>`);
  $$('.vbtn', stage).forEach(b => b.addEventListener('click', () => pickVerdict(b.dataset.v, b)));
}

function pickVerdict(v, btn) {
  if (ses.locked) return;
  ses.locked = true; stopTimer();
  const ch = ses.current;
  const ok = v === ch.verdict;
  $$('.vbtn').forEach(b => {
    if (b.dataset.v === ch.verdict) b.classList.add('picked-good');
    else if (b === btn) b.classList.add('picked-bad');
    else b.classList.add('dim');
  });
  const wasScam = ch.verdict === 'scam';
  judge(ok, {
    why: ok
      ? (wasScam ? 'You caught it. This message is a phishing attempt.' : 'Correct — this one is genuine. The sender domain, the context and the request all line up.')
      : (wasScam
        ? 'This message is a phishing attempt — and it is now sitting in your inbox waiting for a click.'
        : 'This one is actually legitimate. Over-caution is a risk too: it makes you miss real messages.'),
    flags: ch.flags,
    lesson: ch.lesson
  });
}

function renderChoice(ch) {
  const stage = $('#stage');
  const letters = ['1', '2', '3', '4', '5', '6'];
  stage.innerHTML = `
    <div class="qcard">
      <div class="qkind">${esc(ses.m.name)} · ${ses.i + 1} / ${ses.queue.length}</div>
      <h2 class="qtext">${esc(ch.prompt)}</h2>
      ${ch.sub ? `<p class="qsub">${esc(ch.sub)}</p>` : ''}
      <div class="opts">
        ${ch.options.map((o, i) => `<button class="opt ${o.mono ? 'mono' : ''}" data-i="${i}"><span class="k">${letters[i]}</span><span>${esc(o.text)}</span></button>`).join('')}
      </div>
    </div>`;
  $$('.opt', stage).forEach(b => b.addEventListener('click', () => pickOption(Number(b.dataset.i), b)));
}

function pickOption(i, btn) {
  if (ses.locked) return;
  ses.locked = true; stopTimer();
  const ch = ses.current, o = ch.options[i];
  $$('.opt').forEach((b) => {
    const oi = Number(b.dataset.i);
    if (ch.options[oi].correct) b.classList.add('good');
    else if (b === btn) b.classList.add('bad');
    else b.classList.add('dim');
  });
  judge(!!o.correct, { why: o.why, lesson: ch.lesson });
}

function renderChat(ch) {
  const stage = $('#stage');
  stage.innerHTML = `
    <div class="chatcard">
      <div class="chathead">
        <div class="cavatar">${esc(ch.contact.icon || initial(ch.contact.name))}</div>
        <div><b>${esc(ch.contact.name)}</b><span>${esc(ch.contact.sub)}</span></div>
      </div>
      <div class="chatbody">
        ${ch.thread.map(m => `<div class="bubble ${m.who === 'me' ? 'mine' : ''}">${esc(m.text)}</div>`).join('')}
      </div>
      <div class="replies">
        ${ch.options.map((o, i) => `<button class="reply" data-i="${i}">${esc(o.text)}</button>`).join('')}
      </div>
    </div>`;
  $$('.reply', stage).forEach(b => b.addEventListener('click', () => pickChat(Number(b.dataset.i), b)));
}

function pickChat(i, btn) {
  if (ses.locked) return;
  ses.locked = true; stopTimer();
  const ch = ses.current, o = ch.options[i];
  const body = $('.chatbody', $('#stage'));
  const mine = ses;
  body.insertAdjacentHTML('beforeend', `<div class="bubble mine">${esc(o.text)}</div>`);
  btn.classList.add(o.correct ? 'good' : 'bad');
  $$('.reply').forEach(b => { if (b !== btn) b.style.opacity = .35; });
  sfx.click();
  setTimeout(() => {
    if (ses !== mine) return;
    body.insertAdjacentHTML('beforeend', `<div class="bubble">${esc(o.reply || '…')}</div>`);
    body.lastElementChild.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    setTimeout(() => {
      if (ses !== mine) return;
      judge(!!o.correct, { why: o.why, lesson: ch.lesson });
    }, 750);
  }, 420);
}

/* ---------------- password lab ---------------- */
const COMMON_WORDS = ['password', '123456', 'qwerty', 'letmein', 'admin', 'iloveyou', 'welcome', 'monkey', 'dragon', 'football', 'baseball', 'princess', 'sunshine', 'abc123', '111111', 'student', 'school', 'lincoln', 'soccer', 'master', 'shadow', 'hello', 'summer', 'winter', 'spring', 'autumn', 'chocolate', 'batman'];

function analyze(pw) {
  const len = pw.length;
  const hasLower = /[a-z]/.test(pw), hasUpper = /[A-Z]/.test(pw);
  const hasNum = /[0-9]/.test(pw), hasSym = /[^A-Za-z0-9]/.test(pw);
  let pool = 0;
  if (hasLower) pool += 26; if (hasUpper) pool += 26;
  if (hasNum) pool += 10; if (hasSym) pool += 33;

  const lower = pw.toLowerCase();
  const words = COMMON_WORDS.filter(w => lower.includes(w));
  const seq = /(0123|1234|2345|3456|4567|5678|6789|abcd|bcde|qwer|asdf|zxcv|poiu)/i.test(pw) || /(.)\1\1/.test(pw);
  const digitsOnly = /^\d+$/.test(pw);
  const year = /(19|20)\d{2}/.test(pw);

  let entropy = len ? len * Math.log2(Math.max(pool, 2)) : 0;
  entropy -= words.length * 14;
  if (seq) entropy -= 10;
  if (digitsOnly) entropy -= 18;
  if (year) entropy -= 8;
  if (len < 8) entropy *= .55;
  entropy = Math.max(0, entropy);

  const secs = Math.pow(2, entropy) / 2 / 1e11;
  const score = clamp(Math.round(entropy * .85), 0, 100);
  const label = !len ? 'Start typing…' : score < 20 ? 'Very weak' : score < 40 ? 'Weak' : score < 60 ? 'Okay' : score < 80 ? 'Strong' : 'Legendary';
  const color = score < 20 ? '#ff5f7a' : score < 40 ? '#ff9a5f' : score < 60 ? '#ffc857' : score < 80 ? '#5ef2a8' : '#2ee6ff';

  return {
    len, score, entropy, secs, label, color, words, seq, digitsOnly,
    crack: len ? fmtTime(secs) : '—',
    checks: [
      { ok: len >= 12, label: '12+ characters' },
      { ok: len >= 16, label: '16+ characters' },
      { ok: hasLower && hasUpper, label: 'upper + lower' },
      { ok: hasNum, label: 'a number' },
      { ok: hasSym, label: 'a symbol' },
      { ok: words.length === 0 && !seq, label: 'no common word or sequence' }
    ]
  };
}

function fmtTime(s) {
  if (!isFinite(s)) return 'practically forever';
  if (s < 1) return 'cracked instantly';
  if (s < 60) return '≈ ' + Math.round(s) + ' seconds to crack';
  if (s < 3600) return '≈ ' + Math.round(s / 60) + ' minutes to crack';
  if (s < 86400) return '≈ ' + Math.round(s / 3600) + ' hours to crack';
  if (s < 2.6e6) return '≈ ' + Math.round(s / 86400) + ' days to crack';
  if (s < 3.15e7) return '≈ ' + Math.round(s / 2.6e6) + ' months to crack';
  if (s < 3.15e9) return '≈ ' + Math.round(s / 3.15e7) + ' years to crack';
  if (s < 3.15e11) return '≈ ' + Math.round(s / 3.15e9) + ' centuries to crack';
  return 'longer than the universe has existed';
}

function renderBuild(ch) {
  const stage = $('#stage');
  stage.innerHTML = `
    <div class="pwcard">
      <div class="qkind">Password lab · live crack-time estimate</div>
      <h2 class="qtext">${esc(ch.prompt)}</h2>
      <p class="qsub">${esc(ch.sub || '')}</p>
      <div class="pwfield">
        <input id="pwInput" type="text" placeholder="Type a master password…" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" aria-label="Password">
        <button class="eye" id="pwEye" type="button" aria-label="Show or hide password">👁</button>
      </div>
      <div class="meter"><i id="pwMeter"></i></div>
      <div class="pwmeta"><span id="pwLabel">Start typing…</span><span id="pwCrack">—</span></div>
      <div class="checks" id="pwChecks"></div>
      <div class="pwtip" id="pwTip"></div>
      <div style="margin-top:22px;display:flex;gap:10px;flex-wrap:wrap;align-items:center">
        <button class="btn primary" id="pwSubmit" type="button">Forge password →</button>
        <span class="micro" style="margin:0">Target: <b>${ch.threshold}+ power</b></span>
      </div>
    </div>`;

  const input = $('#pwInput'), meter = $('#pwMeter'), label = $('#pwLabel'),
    crack = $('#pwCrack'), checks = $('#pwChecks'), tip = $('#pwTip');

  const paint = () => {
    const a = analyze(input.value);
    meter.style.width = Math.max(3, a.score) + '%';
    meter.style.background = a.color;
    label.textContent = a.label;
    label.style.color = a.color;
    crack.textContent = a.crack;
    checks.innerHTML = a.checks.map(c => `<span class="check ${c.ok ? 'ok' : ''}">${c.ok ? '✓' : '•'} ${c.label}</span>`).join('');
    return a;
  };
  checks.innerHTML = analyze('').checks.map(c => `<span class="check">• ${c.label}</span>`).join('');

  input.addEventListener('input', paint);
  $('#pwEye').addEventListener('click', () => {
    input.type = input.type === 'password' ? 'text' : 'password';
    input.focus();
  });
  input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); submit(); } });
  input.focus();

  function submit() {
    if (ses.locked) return;
    const a = analyze(input.value);
    if (!input.value) { tip.textContent = 'Type something first — even a great password is invisible if it is empty.'; tip.classList.add('show'); return; }

    if (a.score >= ch.threshold) {
      ses.locked = true; stopTimer();
      if (a.score >= 85) ses.legend = true;
      judge(true, {
        why: `Rated ${a.score}/100 (about ${Math.round(a.entropy)} bits of entropy). A machine guessing 100 billion times a second would need ${fmtTime(a.secs)} — and a real attacker will give up long before that.`,
        flags: [
          'Length is doing the heavy lifting here — that is exactly right.',
          a.words.length ? 'Careful: it still contains a common word.' : 'No common words or keyboard patterns found.',
          'Now store it in a password manager and never reuse it.'
        ],
        lesson: ch.hint || 'Long and unique beats short and clever, every single time.'
      });
      return;
    }

    ses.attempts++;
    tip.innerHTML = `<b>${a.score}/100 — not yet.</b> ${a.words.length ? 'It contains a word attackers try first. ' : ''}${a.len < 12 ? 'Too short — length is the fastest win. ' : ''}${!a.checks[2].ok ? 'Mix upper and lower case. ' : ''}${!a.checks[4].ok ? 'Add a symbol. ' : ''}Try a passphrase like <span style="font-family:'JetBrains Mono',monospace">quiet-otter-sunset-hammer</span>.`;
    tip.classList.add('show');
    input.parentElement.classList.remove('shake');
    void input.parentElement.offsetWidth;
    input.parentElement.classList.add('shake');
    sfx.bad();

    if (ses.attempts >= 2) {
      ses.locked = true; stopTimer();
      judge(false, {
        why: `The forge rejected that one at ${a.score}/100. It would take an attacker ${a.crack.replace(' to crack', '')}.`,
        flags: [
          'Attackers try words, years and substitutions first — "Summer2024!" is a wordlist entry.',
          'Every extra character multiplies the work: 12 → 16 characters changes the maths enormously.',
          'Four random words joined by hyphens is the easiest strong pattern to remember.'
        ],
        lesson: ch.hint || 'Aim for 4+ random words or 16+ random characters.'
      });
    }
  }
  $('#pwSubmit').addEventListener('click', submit);
}

/* ---------------- judging + feedback ---------------- */
function judge(ok, info) {
  if (!ses) return;
  ses.answered++;
  let gained = 0;
  if (ok) {
    ses.correct++;
    ses.streak++;
    ses.bestStreak = Math.max(ses.bestStreak, ses.streak);
    let bonus = 0;
    if (ses.tTotal && ses.tLeft / ses.tTotal > .5) bonus = 6;
    gained = 12 + bonus + Math.min(ses.streak * 3, 15);
    if (ses.attempts > 0) gained = Math.round(gained * .6);
    ses.xp += gained;
    if (ses.m.boss) ses.bossHP = Math.max(0, ses.bossHP - 16);
    if (ses.m.boss && ses.bossHP === 0) { sfx.win(); confetti(90); }
    else sfx.good();
  } else {
    ses.wrong++;
    ses.streak = 0;
    ses.hearts = Math.max(0, ses.hearts - 1);
    sfx.bad();
  }
  updateHud();

  const dead = ses.hearts <= 0;
  const bossDown = !!(ses.m.boss && ses.bossHP <= 0);
  ses.pending = dead ? 'lose' : bossDown ? 'win' : 'next';

  showSheet(ok, info, gained);
}

function showSheet(ok, info, gained) {
  const inner = $('#sheetInner');
  inner.className = 'sheet-inner ' + (ok ? 'good' : 'bad');
  const label = ses.pending === 'win' ? 'Finish the fight →'
    : ses.pending === 'lose' ? 'See results →'
      : ses.i + 1 >= ses.queue.length ? 'See results →' : 'Continue →';
  inner.innerHTML = `
    <div class="fb-head">
      ${ok ? '✅ Correct' : '❌ Not quite'}
      <span class="pts ${gained ? '' : 'zero'}">${gained ? '+' + gained + ' XP' : '+0 XP'}</span>
    </div>
    ${info.why ? `<p class="fb-why">${esc(info.why)}</p>` : ''}
    ${info.flags && info.flags.length ? `<ul class="fb-flags">${info.flags.map(f => `<li>${esc(f)}</li>`).join('')}</ul>` : ''}
    ${info.lesson ? `<div class="fb-lesson">💡 ${esc(info.lesson)}</div>` : ''}
    <div class="fb-actions"><button class="btn primary" id="fbNext">${label}</button></div>`;
  $('#sheet').classList.add('show');
  $('#fbNext').onclick = advance;
  $('#fbNext').focus({ preventScroll: true });
}

function hideSheet() {
  $('#sheet').classList.remove('show');
}

function advance() {
  if (!ses) return;
  hideSheet();
  const pending = ses.pending;
  const mine = ses;
  setTimeout(() => {
    if (ses !== mine) return;
    if (pending === 'next') nextChallenge();
    else endMission(pending !== 'lose', pending);
  }, 260);
}

/* ---------------- end of mission ---------------- */
function unlock(id) {
  if (save.badges.includes(id)) return null;
  save.badges.push(id);
  return BADGES.find(b => b.id === id) || null;
}

function endMission(success, reason) {
  stopTimer(true);
  hideSheet();
  const m = ses.m;
  const total = ses.correct + ses.wrong;
  const acc = total ? Math.round((ses.correct / total) * 100) : 0;
  const gained = Math.round(ses.xp * (success ? 1 : .3));

  const beforeLevel = levelInfo(save.xp).i;
  save.xp += gained;
  if (success) {
    save.best[m.id] = Math.max(save.best[m.id] || 0, acc);
  }

  const newBadges = [];
  if (success) { const b = unlock('first'); if (b) newBadges.push(b); }
  if (success && acc === 100 && m.badge) { const b = unlock(m.badge); if (b) newBadges.push(b); }
  if (success && m.id === 'boss') { const b = unlock('boss'); if (b) newBadges.push(b); }
  if (success && m.id === 'pw' && ses.legend) { const b = unlock('vault'); if (b) newBadges.push(b); }
  const afterLevel = levelInfo(save.xp).i;
  if (afterLevel >= LEVELS.length - 1) { const b = unlock('legend'); if (b) newBadges.push(b); }
  if (MISSIONS.every(x => save.best[x.id] === 100)) { const b = unlock('allstar'); if (b) newBadges.push(b); }
  persist();
  renderProfile(); renderMissions(); renderBadges();

  const lv = levelInfo(save.xp);
  const levelUp = afterLevel > beforeLevel;
  const title = m.boss
    ? (success ? 'Breach contained.' : 'NULLBYTE got through.')
    : success ? 'Mission complete.' : 'Connection lost.';
  const sub = m.boss
    ? (success
      ? 'The network is back online. You used everything the academy taught you — under pressure.'
      : 'You ran out of lives. The good news: every trick it used is now in your playbook. Run it again.')
    : success
      ? (acc === 100 ? 'Flawless. Not one bad call.' : 'Solid work. Review the flags below and go again for a perfect run.')
      : 'You ran out of lives. Read the debrief, then take another run at it.';

  const nextM = MISSIONS.find(x => x.id !== 'boss' && x.id !== m.id && typeof save.best[x.id] !== 'number');
  const nextLabel = nextM ? `Next: ${nextM.name} →` : 'Back to mission control →';

  $('#resultInner').innerHTML = `
    <div class="result-wrap">
      <div class="score-ring" style="--p:0" id="ring"><div class="si"><b id="ringNum">0%</b><span>accuracy</span></div></div>
      <h1>${title}</h1>
      <p class="rsub">${sub}</p>
      ${levelUp ? `<div class="newbadge" style="margin-bottom:18px">⭐ Rank up — ${lv.name}!</div>` : ''}
      <div class="result-rows">
        <div class="rrow"><span>${m.boss ? 'Boss integrity left' : 'Correct calls'}</span><b>${m.boss ? Math.max(0, ses.bossHP) + '%' : ses.correct + ' / ' + total}</b></div>
        <div class="rrow"><span>Best streak</span><b>×${ses.bestStreak}</b></div>
        <div class="rrow hl"><span>XP earned</span><b>+${gained}</b></div>
        <div class="rrow"><span>Rank · total</span><b>${lv.name} · ${save.xp.toLocaleString()} XP</b></div>
      </div>
      ${newBadges.length ? `<div class="newbadges">${newBadges.map(b => `<span class="newbadge">${b.icon} ${b.name} unlocked</span>`).join('')}</div>` : ''}
      <div class="result-actions">
        <button class="btn primary" id="rNext">${nextLabel}</button>
        <button class="btn" id="rRetry">Replay ${m.name}</button>
        <button class="ghost" id="rHub">Mission control</button>
      </div>
    </div>`;

  showScreen('s-result');
  const ring = $('#ring');
  requestAnimationFrame(() => {
    ring.style.setProperty('--p', acc);
    ring.style.background = `conic-gradient(${success ? 'var(--cyan)' : 'var(--red)'} calc(var(--p) * 1%), rgba(255,255,255,.08) 0)`;
    let n = 0; const step = () => { n += Math.max(1, Math.round(acc / 24)); if (n >= acc) n = acc; $('#ringNum').textContent = n + '%'; if (n < acc) requestAnimationFrame(step); };
    step();
  });

  $('#rRetry').onclick = () => launch(m);
  $('#rHub').onclick = () => goHub();
  $('#rNext').onclick = () => {
    if (nextM) launch(nextM); else goHub();
  };

  if (success) sfx.win(); else sfx.lose();
  if (success && (acc >= 80 || m.boss)) confetti(m.boss ? 200 : 140);
}

/* ---------------- keyboard ---------------- */
addEventListener('keydown', e => {
  if ($('#sheet').classList.contains('show')) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); $('#fbNext')?.click(); }
    return;
  }
  if (!$('#s-play').classList.contains('active') || !ses || ses.locked) return;
  if (ses.current?.type === 'pwbuild') return;
  if (ses.current?.type === 'phish') {
    if (e.key === '1' || e.key === '2') {
      e.preventDefault();
      $$('.vbtn')[e.key === '1' ? 0 : 1]?.click();
    }
    return;
  }
  if (/^[1-6]$/.test(e.key)) {
    const i = Number(e.key) - 1;
    const list = ses.current?.type === 'chat' ? '.reply' : '.opt';
    const el = $$(list)[i];
    if (el) { e.preventDefault(); el.click(); }
  }
});

/* ---------------- developer credit ---------------- */
function mountDevPhoto() {
  $$('.dev-photo').forEach(box => {
    if (box.dataset.mounted) return;
    box.dataset.mounted = '1';
    const img = new Image();
    img.alt = 'Debanjan Ghosh — developer of Cyber Sentinels';
    img.decoding = 'async';
    img.onload = () => { box.classList.add('has-img'); box.prepend(img); };
    img.onerror = () => box.classList.add('no-img');
    img.src = box.dataset.photo || 'assets/debanjan-ghosh.jpg';
  });
}

/* ---------------- restart everything ---------------- */
function restartAll() {
  stopTimer(true);
  hideSheet();
  ses = null;
  save = { ...DEFAULTS, sound: save.sound };
  persist();
  // put the home screen back into its first-run state
  $('#xpWrap').hidden = true;
  $('#returnNote').hidden = true;
  $('#codename').value = '';
  $('#startBtn').innerHTML = 'Start training <span aria-hidden="true">→</span>';
  renderProfile(); renderMissions(); renderBadges();
  showScreen('s-home');
  window.scrollTo(0, 0);
  sfx.click();
}

function confirmRestart() {
  const ok = confirm('Restart everything?\n\nThis clears your codename, XP, badges and best scores on this device, and takes you back to the home screen.');
  if (ok) restartAll();
}

/* ---------------- boot ---------------- */
function boot() {
  renderRules();
  mountDevPhoto();
  renderProfile();
  $('#soundBtn').classList.toggle('off', !save.sound);
  $('#soundBtn').textContent = save.sound ? '🔊' : '🔇';

  if (save.name) {
    const lv = levelInfo(save.xp);
    const note = $('#returnNote');
    note.hidden = false;
    note.innerHTML = `Welcome back, <b>${esc(save.name)}</b> — ${lv.name} · ${save.xp.toLocaleString()} XP · ${save.badges.length} badges. <button id="resumeBtn" class="ghost" style="padding:2px 8px;color:var(--cyan)">Continue →</button>`;
    $('#codename').value = save.name;
    $('#startBtn').innerHTML = 'Resume training <span aria-hidden="true">→</span>';
    $('#resumeBtn').onclick = () => { sfx.click(); goHub(); };
  }

  $('#nameForm').addEventListener('submit', e => {
    e.preventDefault();
    const v = $('#codename').value.trim().slice(0, 16);
    save.name = v || ['Agent', 'Nova', 'Cipher', 'Echo', 'Vector'][(Math.random() * 5) | 0] + Math.floor(Math.random() * 89 + 10);
    persist();
    audio(); sfx.level();
    goHub();
  });

  $('#soundBtn').addEventListener('click', () => {
    save.sound = !save.sound;
    persist();
    $('#soundBtn').classList.toggle('off', !save.sound);
    $('#soundBtn').textContent = save.sound ? '🔊' : '🔇';
    if (save.sound) sfx.click();
  });

  $('#quitBtn').addEventListener('click', () => {
    stopTimer(true); hideSheet(); ses = null; goHub();
  });

  $('#resetBtn').addEventListener('click', confirmRestart);
  $('#restartBtn').addEventListener('click', confirmRestart);
}

boot();

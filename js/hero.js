/* ═══════════════════════════════════════════════════════════
   hero.js — Secuencia de frames en el hero de index.html
   Solo se carga en index.html.
   ═══════════════════════════════════════════════════════════ */

(function () {

  /* ────── CONFIG ────── */
  var TOTAL_FRAMES = 240;
  var SCROLL_PX    = 12;
  var LERP         = 0.14;
  var FRAME_DIR    = 'frames_webp/';
  var FRAME_PRE    = 'frame_';
  var FRAME_EXT    = '.webp';
  var FRAME_PAD    = 4;
  var EAGER        = 30;
  var BATCH        = 40;

  function src(i) {
    return FRAME_DIR + FRAME_PRE + String(i + 1).padStart(FRAME_PAD, '0') + FRAME_EXT;
  }

  /* ────── ESTADO ────── */
  var imgs      = new Array(TOTAL_FRAMES).fill(null);
  var frameReal = 0;
  var frameTgt  = 0;
  var lastDrawn = -1;
  var revealed  = false;

  /* ────── DOM ────── */
  var zone   = document.getElementById('hero-zone');
  var canvas = document.getElementById('hero-canvas');
  var ctx    = canvas.getContext('2d', { alpha: false });

  /* ────── ZONE HEIGHT ────── */
  function setHeight() {
    zone.style.height = (window.innerHeight + TOTAL_FRAMES * SCROLL_PX) + 'px';
  }

  /* ────── CANVAS RESIZE ────── */
  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = '#0a0807';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    lastDrawn = -1;
  }

  /* ────── DRAW (object-fit: cover centrado) ────── */
  function draw(idx) {
    var img = imgs[idx];
    if (!img || !img.complete || img.naturalWidth === 0) return;
    var iw = img.naturalWidth,  ih = img.naturalHeight;
    var cw = canvas.width,      ch = canvas.height;
    var s  = Math.max(cw / iw, ch / ih);
    ctx.drawImage(img, (cw - iw * s) * 0.5, (ch - ih * s) * 0.5, iw * s, ih * s);
    lastDrawn = idx;
  }

  /* ────── RAF LOOP ────── */
  function tick() {
    requestAnimationFrame(tick);
    var d = frameTgt - frameReal;
    frameReal = Math.abs(d) < 0.05 ? frameTgt : frameReal + d * LERP;
    var idx = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(frameReal)));
    if (idx !== lastDrawn) draw(idx);
  }

  /* ────── REVEAL NAV + CONTENIDO HERO ────── */
  function revealContent() {
    if (revealed) return;
    revealed = true;
    var nav  = document.getElementById('nav');
    var pill = document.getElementById('pill');
    if (nav)  nav.classList.add('revealed');
    if (pill) pill.classList.add('revealed');
    var body  = document.querySelector('.hero-body');
    var cards = document.querySelector('.hero-cards');
    var scroll= document.querySelector('.hero-scroll');
    if (body)  body.classList.add('revealed');
    if (cards) cards.classList.add('revealed');
    if (scroll)scroll.classList.add('revealed');
    setTimeout(function () {
      document.querySelectorAll('.hero .cr, .hero .rv').forEach(function (el) {
        el.classList.add('in');
      });
    }, 300);
  }

  /* ────── SCROLL HANDLER ────── */
  function onScroll() {
    var into  = window.scrollY - zone.offsetTop;
    var maxS  = zone.offsetHeight - window.innerHeight;
    var prog  = Math.max(0, Math.min(1, into / maxS));
    frameTgt  = Math.round(prog * (TOTAL_FRAMES - 1));
    if (prog >= 0.72) revealContent();
  }

  /* ────── PRELOAD ────── */
  function loadImg(i) {
    if (imgs[i]) return;
    var img     = new Image();
    img.decoding = 'async';
    img.onload  = function () { if (i === 0 && lastDrawn < 0) draw(0); };
    img.onerror = function () { console.warn('[frames] No se pudo cargar:', src(i)); };
    img.src     = src(i);
    imgs[i]     = img;
  }

  function preload() {
    for (var i = 0; i < Math.min(EAGER, TOTAL_FRAMES); i++) loadImg(i);
    var j = EAGER;
    (function batch() {
      if (j >= TOTAL_FRAMES) return;
      var end = Math.min(j + BATCH, TOTAL_FRAMES);
      for (; j < end; j++) loadImg(j);
      setTimeout(batch, 32);
    })();
  }

  /* ────── INIT ────── */
  setHeight();
  resize();
  preload();
  tick();

  window.addEventListener('resize', function () { setHeight(); resize(); }, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  requestAnimationFrame(onScroll);

})();

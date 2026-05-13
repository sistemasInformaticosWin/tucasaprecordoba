/* ═══════════════════════════════════════════════════════════
   lightbox.js — Visor de imágenes a pantalla completa
   ═══════════════════════════════════════════════════════════ */

(function () {

  /* Crear el lightbox en el DOM */
  var lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.innerHTML =
    '<div id="lb-overlay"></div>' +
    '<div id="lb-content">' +
      '<button id="lb-close">✕</button>' +
      '<button id="lb-prev">&#8592;</button>' +
      '<button id="lb-next">&#8594;</button>' +
      '<img id="lb-img" src="" alt="">' +
      '<div id="lb-counter"></div>' +
    '</div>';
  document.body.appendChild(lb);

  var style = document.createElement('style');
  style.textContent =
    '#lightbox { position:fixed; inset:0; z-index:99990; display:flex; align-items:center; justify-content:center; opacity:0; pointer-events:none; transition:opacity .3s; }' +
    '#lightbox.open { opacity:1; pointer-events:auto; }' +
    '#lb-overlay { position:absolute; inset:0; background:rgba(10,8,7,.95); backdrop-filter:blur(8px); }' +
    '#lb-content { position:relative; z-index:1; max-width:90vw; max-height:90vh; display:flex; align-items:center; justify-content:center; }' +
    '#lb-img { max-width:90vw; max-height:85vh; object-fit:contain; display:block; }' +
    '#lb-close { position:fixed; top:24px; right:24px; background:none; border:none; color:rgba(244,237,230,.6); font-size:24px; cursor:pointer; z-index:2; transition:color .2s; line-height:1; }' +
    '#lb-close:hover { color:#ea0f01; }' +
    '#lb-prev,#lb-next { position:fixed; top:50%; transform:translateY(-50%); background:rgba(10,8,7,.6); border:1px solid rgba(255,255,255,.1); color:rgba(244,237,230,.6); width:48px; height:48px; font-size:18px; cursor:pointer; z-index:2; transition:all .2s; }' +
    '#lb-prev { left:24px; } #lb-next { right:24px; }' +
    '#lb-prev:hover,#lb-next:hover { background:#ea0f01; color:#fff; border-color:#ea0f01; }' +
    '#lb-counter { position:fixed; bottom:24px; left:50%; transform:translateX(-50%); font-size:12px; letter-spacing:.18em; text-transform:uppercase; color:rgba(244,237,230,.35); }';
  document.head.appendChild(style);

  var images = [];
  var current = 0;

  function open(imgs, index) {
    images  = imgs;
    current = index || 0;
    show();
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  function show() {
    var img = document.getElementById('lb-img');
    img.src = images[current];
    document.getElementById('lb-counter').textContent = (current + 1) + ' / ' + images.length;
  }

  function prev() { current = (current - 1 + images.length) % images.length; show(); }
  function next() { current = (current + 1) % images.length; show(); }

  document.getElementById('lb-close').addEventListener('click', close);
  document.getElementById('lb-overlay').addEventListener('click', close);
  document.getElementById('lb-prev').addEventListener('click', prev);
  document.getElementById('lb-next').addEventListener('click', next);

  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  prev();
    if (e.key === 'ArrowRight') next();
  });

  /* Inicializar en galería de propiedad */
  document.querySelectorAll('.prop-gallery img').forEach(function (img, i, all) {
    img.parentElement.style.cursor = 'zoom-in';
    img.parentElement.addEventListener('click', function () {
      open(Array.from(all).map(function (el) { return el.src; }), i);
    });
  });

  /* Exponer globalmente */
  window.Lightbox = { open: open, close: close };

})();

/* ═══════════════════════════════════════════════════════════
   main.js — Todos los comportamientos compartidos
   ═══════════════════════════════════════════════════════════ */

(function () {

  /* ─── PWA SERVICE WORKER ─── */
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(function(){});
  }

  /* ─── CONTADOR VISITANTES (propiedad.html) ─── */
  var counterEl = document.getElementById('visitor-count');
  if (counterEl) {
    var count = Math.floor(Math.random() * 9) + 3;
    counterEl.textContent = count;
    setInterval(function () {
      var delta = Math.random() > 0.5 ? 1 : -1;
      count = Math.max(2, Math.min(15, count + delta));
      counterEl.textContent = count;
    }, 25000);
  }

  /* ─── STAGGER en grids de propiedades ─── */
  document.querySelectorAll('.prop-grid, .bento-grid').forEach(function (grid) {
    var cards = grid.querySelectorAll('.prop-card, .bento-card');
    cards.forEach(function (card, i) {
      card.style.transitionDelay = (i * 0.07) + 's';
    });
  });

  /* ─── SCROLL REVEALS ─── */
  var rvObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (x) { if (x.isIntersecting) x.target.classList.add('in'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.rv,.cr').forEach(function (el) {
    if (!el.closest('#hero-zone')) rvObs.observe(el);
  });

  /* ─── CONTADORES ─── */
  var coObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting && !e.target._done) {
        e.target._done = 1;
        var to = parseFloat(e.target.dataset.to), dec = e.target.dataset.dec !== undefined;
        var d = 1800, s = performance.now();
        (function u(now) {
          var p = Math.min((now - s) / d, 1), ease = 1 - Math.pow(1 - p, 3), v = to * ease;
          e.target.textContent = dec ? v.toFixed(1) : Math.round(v).toLocaleString('es');
          if (p < 1) requestAnimationFrame(u);
          else e.target.textContent = dec ? to.toFixed(1) : to >= 1000 ? to.toLocaleString('es') : to;
        })(s);
      }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.sn[data-to]').forEach(function (el) { coObs.observe(el); });

  /* ─── DRAG GALLERY ─── */
  var dg = document.getElementById('dg');
  if (dg) {
    var dn = false, sx, sl;
    dg.addEventListener('mousedown', function (e) { dn = true; sx = e.pageX - dg.offsetLeft; sl = dg.scrollLeft; dg.style.cursor = 'grabbing'; });
    dg.addEventListener('mouseleave', function () { dn = false; dg.style.cursor = 'grab'; });
    dg.addEventListener('mouseup',    function () { dn = false; dg.style.cursor = 'grab'; });
    dg.addEventListener('mousemove',  function (e) { if (!dn) return; e.preventDefault(); dg.scrollLeft = sl - (e.pageX - dg.offsetLeft - sx) * 1.6; });
    var tx = 0, tl = 0;
    dg.addEventListener('touchstart', function (e) { tx = e.touches[0].pageX; tl = dg.scrollLeft; }, { passive: true });
    dg.addEventListener('touchmove',  function (e) { dg.scrollLeft = tl - (e.touches[0].pageX - tx) * 1.2; }, { passive: true });
    dg.querySelectorAll('.dg-card').forEach(function (c) {
      c.style.cursor = 'pointer';
      c.addEventListener('click', function () { window.location.href = 'contacto.html'; });
    });
  }

  /* ─── PARALLAX IMAGE BREAK ─── */
  var ibb = document.getElementById('ibb');
  if (ibb) {
    window.addEventListener('scroll', function () {
      ibb.style.transform = 'translateY(' + (ibb.parentElement.getBoundingClientRect().top / innerHeight * 40) + 'px)';
    }, { passive: true });
  }

  /* ─── TARJETAS PROPIEDADES → PROPIEDAD o CONTACTO ─── */
  document.querySelectorAll('.bento-card:not(.bento-text),.prop-card,.dg-card,.hcard').forEach(function (c) {
    c.style.cursor = 'pointer';
    c.addEventListener('click', function (e) {
      if (e.target.closest('.comp-toggle,.bento-text-cta')) return;
      var id = c.dataset.id;
      window.location.href = id ? 'propiedad.html?id=' + id : 'contacto.html';
    });
  });

  /* ─── FORMULARIO CONTACTO ─── */
  var form = document.querySelector('form');
  if (form && form.querySelector('.form-submit,.clf-submit')) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('.form-submit,.clf-submit');
      var ok = true;
      form.querySelectorAll('[required]').forEach(function (f) {
        if (!f.value.trim()) { ok = false; f.style.borderColor = 'var(--terra)'; }
        else f.style.borderColor = '';
      });
      if (!ok) return;
      btn.textContent = '✓ Enviado — te contactamos pronto';
      btn.style.background = '#2a7a4b';
      btn.disabled = true;
      form.reset();
    });
  }

  /* ─── VALORACIÓN → URL EXTERNA ─── */
  document.querySelectorAll('.val-submit').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      window.open('https://valoracion.tucasacordoba.com/', '_blank');
    });
  });

  /* ─── NEWSLETTER DARK STRIP ─── */
  document.querySelectorAll('.dark-strip-cta button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var input = btn.previousElementSibling;
      if (!input || input.type !== 'email' || !input.value || !input.value.includes('@')) {
        if (input) input.style.outline = '1px solid var(--terra)';
        return;
      }
      input.style.outline = '';
      btn.textContent = '✓ Suscrito';
      btn.style.background = '#2a7a4b';
      btn.disabled = true;
      input.value = '';
    });
  });

  /* ─── FILTRO DE COMPRA ─── */
  var filterBtn = document.querySelector('.filter-btn');
  if (filterBtn) {
    filterBtn.addEventListener('click', function () {
      var tipo   = document.querySelector('.filter-tipo')   && document.querySelector('.filter-tipo').value;
      var precio = document.querySelector('.filter-precio') && document.querySelector('.filter-precio').value;
      var habs   = document.querySelector('.filter-habs')   && document.querySelector('.filter-habs').value;
      var zona   = document.querySelector('.filter-zona')   && document.querySelector('.filter-zona').value;

      document.querySelectorAll('.bento-card[data-tipo]').forEach(function (card) {
        var show = true;
        if (tipo   && tipo   !== 'all' && card.dataset.tipo   !== tipo)   show = false;
        if (zona   && zona   !== 'all' && card.dataset.zona   !== zona)   show = false;
        if (habs   && habs   !== 'all' && parseInt(card.dataset.hab) < parseInt(habs)) show = false;
        if (precio && precio !== 'all' && parseInt(card.dataset.precio)  > parseInt(precio)) show = false;
        card.style.display = show ? '' : 'none';
      });
    });
  }

  /* ─── CARRUSEL TESTIMONIOS ─── */
  var carousel = document.querySelector('.carousel-wrap');
  if (carousel) {
    var track  = carousel.querySelector('.carousel-track');
    var slides = carousel.querySelectorAll('.carousel-slide');
    var dots   = carousel.querySelectorAll('.carousel-dot');
    var current = 0;
    var total   = slides.length;
    var timer;

    function goTo(n) {
      current = (n + total) % total;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach(function (d, i) { d.classList.toggle('active', i === current); });
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }
    function startAuto() { timer = setInterval(next, 5000); }
    function stopAuto()  { clearInterval(timer); }

    var arrowPrev = carousel.querySelector('.carousel-arrow.prev');
    var arrowNext = carousel.querySelector('.carousel-arrow.next');
    if (arrowPrev) arrowPrev.addEventListener('click', function () { stopAuto(); prev(); startAuto(); });
    if (arrowNext) arrowNext.addEventListener('click', function () { stopAuto(); next(); startAuto(); });
    dots.forEach(function (d, i) {
      d.addEventListener('click', function () { stopAuto(); goTo(i); startAuto(); });
    });

    /* swipe táctil */
    var startX = 0;
    carousel.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    carousel.addEventListener('touchend', function (e) {
      var diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { stopAuto(); diff > 0 ? next() : prev(); startAuto(); }
    });

    goTo(0);
    startAuto();
  }

  /* ─── CALCULADORA HIPOTECA ─── */
  function calcHipoteca() {
    var precio  = parseFloat(document.getElementById('calc-precio')  && document.getElementById('calc-precio').value)  || 0;
    var entrada = parseFloat(document.getElementById('calc-entrada') && document.getElementById('calc-entrada').value) || 20;
    var plazo   = parseInt(document.getElementById('calc-plazo')     && document.getElementById('calc-plazo').value)   || 25;
    var tipo    = parseFloat(document.getElementById('calc-tipo')    && document.getElementById('calc-tipo').value)    || 3.5;

    var P = precio * (1 - entrada / 100);
    var r = tipo / 100 / 12;
    var n = plazo * 12;
    var cuota = P > 0 && r > 0 ? P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : 0;
    var total = cuota * n;
    var intereses = total - P;

    var elCuota     = document.getElementById('calc-cuota');
    var elTotal     = document.getElementById('calc-total');
    var elIntereses = document.getElementById('calc-intereses');
    var elCapital   = document.getElementById('calc-capital');

    if (elCuota)     elCuota.textContent     = cuota.toLocaleString('es', { minimumFractionDigits:0, maximumFractionDigits:0 }) + '€';
    if (elTotal)     elTotal.textContent     = (total / 1000).toFixed(0) + '.000€';
    if (elIntereses) elIntereses.textContent = (intereses / 1000).toFixed(0) + '.000€';
    if (elCapital)   elCapital.textContent   = (P / 1000).toFixed(0) + '.000€';

    var labelPlazo = document.getElementById('calc-plazo-label');
    if (labelPlazo) labelPlazo.textContent = plazo + ' años';
    var labelEntrada = document.getElementById('calc-entrada-label');
    if (labelEntrada) labelEntrada.textContent = entrada + '%';
  }

  ['calc-precio','calc-entrada','calc-plazo','calc-tipo'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('input', calcHipoteca);
  });
  calcHipoteca();

})();

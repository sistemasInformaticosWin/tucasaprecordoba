/* ═══════════════════════════════════════════════════════════
   app.js — Todos los comportamientos del cliente
   (nav, cookie banner, lead popup, reveals, contadores,
   drag gallery, formularios, calculadora, carrusel)
   ═══════════════════════════════════════════════════════════ */

(function () {

  /* ─── SCROLL AL TOP EN CADA CARGA DE PÁGINA ─── */
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  /* ─── SKELETON LOADING ─── */
  function buildSkeleton() {
    var el = document.createElement('div');
    el.className = 'skeleton-overlay';
    el.id = 'skeleton';
    el.innerHTML =
      '<div class="sk-nav">' +
        '<div class="sk sk-logo"></div>' +
        '<div class="sk-links">' +
          '<div class="sk sk-link"></div>' +
          '<div class="sk sk-link"></div>' +
          '<div class="sk sk-link"></div>' +
          '<div class="sk sk-link"></div>' +
          '<div class="sk sk-link"></div>' +
        '</div>' +
        '<div class="sk sk-btn"></div>' +
      '</div>' +
      '<div class="sk-hero">' +
        '<div class="sk sk-tag"></div>' +
        '<div class="sk sk-h1a"></div>' +
        '<div class="sk sk-h1b"></div>' +
        '<div class="sk sk-sub"></div>' +
        '<div class="sk-btns"><div class="sk sk-btna"></div><div class="sk sk-btnb"></div></div>' +
      '</div>';
    return el;
  }

  function showSkeleton() {
    if (document.getElementById('skeleton')) return;
    document.body.appendChild(buildSkeleton());
  }

  function hideSkeleton() {
    ['skeleton', 'sk-early'].forEach(function(id) {
      var sk = document.getElementById(id);
      if (!sk) return;
      sk.style.transition = 'opacity .4s ease';
      sk.style.opacity = '0';
      setTimeout(function () { sk && sk.remove(); }, 420);
    });
  }

  /* Mostrar skeleton al cargar (páginas HTML sin PHP) */
  if (!document.getElementById('sk-early')) showSkeleton();

  /* Ocultar tras load con mínimo 400ms de visibilidad */
  var loadTime = Date.now();
  window.addEventListener('load', function () {
    var elapsed = Date.now() - loadTime;
    var wait    = Math.max(0, 400 - elapsed);
    setTimeout(hideSkeleton, wait);
  });
  /* Fallback */
  setTimeout(hideSkeleton, 3000);

  /* Interceptar clics en enlaces internos */
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href]');
    if (!link) return;
    var href = link.getAttribute('href');

    /* Solo enlaces internos de la misma página */
    var isInternal = href &&
      !href.startsWith('#') &&
      !href.startsWith('http') &&
      !href.startsWith('tel:') &&
      !href.startsWith('mailto:') &&
      !href.startsWith('javascript');

    if (!isInternal) return;
    if (link.target === '_blank') return;

    e.preventDefault();

    /* 1. Subir arriba instantáneamente */
    window.scrollTo({ top: 0, behavior: 'instant' });

    /* 2. Mostrar skeleton */
    showSkeleton();

    /* 3. Navegar después de 600ms para que el skeleton sea visible */
    setTimeout(function () {
      window.location.href = href;
    }, 600);
  });

  /* ─── PWA SERVICE WORKER ─── */
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(function(){});
  }

  /* ─── NAV SCROLL ─── */
  window.addEventListener('scroll', function () {
    var nav = document.getElementById('nav');
    if (nav) nav.classList.toggle('solid', window.scrollY > 60);
  }, { passive: true });

  /* ─── NAV: revelar en páginas interiores ─── */
  var page = document.body.dataset.page || 'index';
  if (page !== 'index') {
    var nav  = document.getElementById('nav');
    var pill = document.getElementById('pill');
    if (nav)  nav.classList.add('revealed');
    if (pill) pill.classList.add('revealed');
  }

  /* ─── HAMBURGER ─── */
  var burger    = document.getElementById('nav-burger');
  var mobileNav = document.getElementById('nav-mobile');
  var mainNav   = document.getElementById('nav');

  function openMenu() {
    if (!burger) return;
    burger.classList.add('open');
    mobileNav.classList.add('open');
    mainNav.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    if (!burger) return;
    burger.classList.remove('open');
    mobileNav && mobileNav.classList.remove('open');
    mainNav   && mainNav.classList.remove('menu-open');
    document.body.style.overflow = '';
  }
  if (burger) {
    burger.addEventListener('click', function () {
      mobileNav && mobileNav.classList.contains('open') ? closeMenu() : openMenu();
    });
  }
  mobileNav && mobileNav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });

  /* ─── DROPDOWNS (hover CSS + caret rotación) ─── */
  /* Solo necesario para compatibilidad — el hover lo hace CSS */

  /* ─── SCROLL REVEALS ─── */
  var rvObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (x) { if (x.isIntersecting) x.target.classList.add('in'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.rv,.cr').forEach(function (el) {
    if (!el.closest('#hero-zone')) rvObs.observe(el);
  });

  /* ─── STAGGER en grids ─── */
  document.querySelectorAll('.prop-grid,.bento-grid').forEach(function (grid) {
    grid.querySelectorAll('.prop-card,.bento-card').forEach(function (c, i) {
      c.style.transitionDelay = (i * 0.07) + 's';
    });
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
      c.addEventListener('click', function () {
        var id = c.dataset.id;
        window.location.href = id ? '/propiedad.php?id=' + id : '/contacto.php';
      });
    });
  }

  /* ─── PARALLAX IMAGE BREAK ─── */
  var ibb = document.getElementById('ibb');
  if (ibb) {
    window.addEventListener('scroll', function () {
      ibb.style.transform = 'translateY(' + (ibb.parentElement.getBoundingClientRect().top / innerHeight * 40) + 'px)';
    }, { passive: true });
  }

  /* ─── TARJETAS PROPIEDADES → PROPIEDAD.PHP ─── */
  document.querySelectorAll('.bento-card:not(.bento-text),.prop-card,.hcard').forEach(function (c) {
    c.style.cursor = 'pointer';
    c.addEventListener('click', function (e) {
      if (e.target.closest('.comp-toggle,.bento-text-cta')) return;
      var id = c.dataset.id;
      window.location.href = id ? '/propiedad.php?id=' + id : '/contacto.php';
    });
  });

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

      document.querySelectorAll('.bento-card[data-tipo]').forEach(function (card) {
        var show = true;
        if (tipo   && tipo   !== 'all' && card.dataset.tipo !== tipo)                         show = false;
        if (precio && precio !== 'all' && parseInt(card.dataset.precio) > parseInt(precio))   show = false;
        if (habs   && habs   !== 'all' && parseInt(card.dataset.hab) < parseInt(habs))        show = false;
        card.style.display = show ? '' : 'none';
      });
    });
  }

  /* ─── CARRUSEL TESTIMONIOS ─── */
  var carousel = document.querySelector('.carousel-wrap');
  if (carousel) {
    var track = carousel.querySelector('.carousel-track');
    var dots  = carousel.querySelectorAll('.carousel-dot');
    var total = carousel.querySelectorAll('.carousel-slide').length;
    var cur = 0, timer;

    function goTo(n) {
      cur = (n + total) % total;
      track.style.transform = 'translateX(-' + (cur * 100) + '%)';
      dots.forEach(function (d, i) { d.classList.toggle('active', i === cur); });
    }
    function startAuto() { timer = setInterval(function () { goTo(cur + 1); }, 5000); }
    function stopAuto()  { clearInterval(timer); }

    var prev = carousel.querySelector('.carousel-arrow.prev');
    var next = carousel.querySelector('.carousel-arrow.next');
    if (prev) prev.addEventListener('click', function () { stopAuto(); goTo(cur - 1); startAuto(); });
    if (next) next.addEventListener('click', function () { stopAuto(); goTo(cur + 1); startAuto(); });
    dots.forEach(function (d, i) { d.addEventListener('click', function () { stopAuto(); goTo(i); startAuto(); }); });

    var startX = 0;
    carousel.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    carousel.addEventListener('touchend',   function (e) {
      var diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { stopAuto(); diff > 0 ? goTo(cur + 1) : goTo(cur - 1); startAuto(); }
    });

    goTo(0); startAuto();
  }

  /* ─── CALCULADORA HIPOTECA ─── */
  function calcHipoteca() {
    var precio  = parseFloat(document.getElementById('calc-precio')  && document.getElementById('calc-precio').value)  || 0;
    var entrada = parseFloat(document.getElementById('calc-entrada') && document.getElementById('calc-entrada').value) || 20;
    var plazo   = parseInt(document.getElementById('calc-plazo')     && document.getElementById('calc-plazo').value)   || 25;
    var tipo    = parseFloat(document.getElementById('calc-tipo')    && document.getElementById('calc-tipo').value)    || 3.5;
    var P = precio * (1 - entrada / 100);
    var r = tipo / 100 / 12, n = plazo * 12;
    var cuota = P > 0 && r > 0 ? P * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n) - 1) : 0;
    var total = cuota * n, intereses = total - P;
    var f = function(v) { return v.toLocaleString('es', {maximumFractionDigits:0}) + '€'; };
    var el = function(id) { return document.getElementById(id); };
    if (el('calc-cuota'))     el('calc-cuota').textContent     = f(cuota);
    if (el('calc-total'))     el('calc-total').textContent     = f(total);
    if (el('calc-intereses')) el('calc-intereses').textContent = f(intereses);
    if (el('calc-capital'))   el('calc-capital').textContent   = f(P);
    if (el('calc-plazo-label'))   el('calc-plazo-label').textContent   = plazo + ' años';
    if (el('calc-entrada-label')) el('calc-entrada-label').textContent = entrada + '%';
  }
  ['calc-precio','calc-entrada','calc-plazo','calc-tipo'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('input', calcHipoteca);
  });
  calcHipoteca();

  /* ─── CONTADOR VISITANTES ─── */
  var counterEl = document.getElementById('visitor-count');
  if (counterEl) {
    var count = Math.floor(Math.random() * 9) + 3;
    counterEl.textContent = count;
    setInterval(function () {
      count = Math.max(2, Math.min(15, count + (Math.random() > 0.5 ? 1 : -1)));
      counterEl.textContent = count;
    }, 25000);
  }

  /* ─── COOKIE BANNER ─── */
  if (!localStorage.getItem('cookies_accepted')) {
    var cookieEl = document.createElement('div');
    cookieEl.className = 'cookie-banner';
    cookieEl.innerHTML =
      '<p class="cookie-text">Usamos cookies para mejorar tu experiencia. <a href="/cookies.php">Política de cookies</a></p>' +
      '<div class="cookie-btns"><button class="cookie-accept" id="cookie-ok">Aceptar todas</button><button class="cookie-reject" id="cookie-rej">Solo esenciales</button></div>';
    document.body.appendChild(cookieEl);
    setTimeout(function () { cookieEl.classList.add('show'); }, 800);
    function closeCookie(type) { localStorage.setItem('cookies_accepted', type); cookieEl.classList.remove('show'); }
    document.getElementById('cookie-ok').addEventListener('click',  function () { closeCookie('all'); });
    document.getElementById('cookie-rej').addEventListener('click', function () { closeCookie('essential'); });
  }

  /* ─── LEAD POPUP — 15 segundos, una vez por sesión ─── */
  if (page !== 'contacto' && !sessionStorage.getItem('popup_shown')) {
    var popup = document.createElement('div');
    popup.className = 'lead-popup';
    popup.innerHTML =
      '<div class="lead-popup-box">' +
        '<button class="lead-popup-close" id="popup-close">✕</button>' +
        '<div class="lead-popup-tag">Oferta exclusiva</div>' +
        '<h2 class="lead-popup-h">¿Sabes cuánto<br>vale tu vivienda?</h2>' +
        '<p class="lead-popup-p">Valoración gratuita con nuestros expertos. Sin compromiso, respuesta en 24 horas.</p>' +
        '<div class="lead-popup-ig"><input class="lead-popup-input" type="text" placeholder="Tu nombre y teléfono" id="popup-input"><button class="lead-popup-btn" id="popup-btn">Valorar gratis</button></div>' +
        '<p class="lead-popup-note">Tus datos están protegidos.</p>' +
      '</div>';
    document.body.appendChild(popup);
    function closeLead() { popup.classList.remove('show'); sessionStorage.setItem('popup_shown', '1'); }
    setTimeout(function () { popup.classList.add('show'); }, 15000);
    document.getElementById('popup-close').addEventListener('click', closeLead);
    popup.addEventListener('click', function (e) { if (e.target === popup) closeLead(); });
    document.getElementById('popup-btn').addEventListener('click', function () {
      var val = document.getElementById('popup-input').value.trim();
      if (!val) { document.getElementById('popup-input').style.borderColor = 'var(--terra)'; return; }
      window.open('https://valoracion.tucasacordoba.com/', '_blank');
      closeLead();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeMenu(); }
  });

})();

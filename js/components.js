/* ═══════════════════════════════════════════════════════════
   components.js — Nav + Footer injection + shared interactions
   Se carga en todas las páginas.
   ═══════════════════════════════════════════════════════════ */

(function () {

  /* ────────────────────────────────────────────────────────
     NAV HTML
  ──────────────────────────────────────────────────────── */
  var NAV_HTML = `
<div class="nav-mobile" id="nav-mobile">
  <a href="index.html"          data-page="index">Inicio</a>
  <a href="comprar.html"        data-page="comprar">Comprar</a>
  <a href="exclusivas.html"     data-page="exclusivas">Exclusivas</a>
  <a href="lofts.html"          data-page="lofts">Lofts</a>
  <a href="vender.html"         data-page="vender">Vender</a>
  <a href="tour-virtual.html"   data-page="tour-virtual">Tour Virtual</a>
  <a href="zonas.html"          data-page="zonas">Zonas</a>
  <a href="sobre-nosotros.html" data-page="sobre-nosotros">Sobre Nosotros</a>
  <a href="blog.html"           data-page="blog">Blog</a>
  <a href="contacto.html" class="nav-mobile-cta">Contacto</a>
  <div class="nav-mobile-phone">957 080 310</div>
</div>

<nav id="nav">
  <a class="logo" href="index.html">
    <img src="https://tucasapre.hostingcordoba.com/wp-content/uploads/2025/02/logoNegro.png"
         alt="tucasa córdoba" class="logo-img">
  </a>

  <div class="nl">
    <a href="index.html" data-page="index">Inicio</a>
    <div class="nl-drop">
      <a href="comprar.html" data-page="comprar">Comprar <span class="nl-caret">▾</span></a>
      <div class="nl-dd-wrap">
        <div class="nl-dd">
          <a href="exclusivas.html" data-page="exclusivas">Exclusivas</a>
          <a href="lofts.html"      data-page="lofts">Lofts</a>
        </div>
      </div>
    </div>
    <div class="nl-drop">
      <a href="vender.html" data-page="vender">Vender <span class="nl-caret">▾</span></a>
      <div class="nl-dd-wrap">
        <div class="nl-dd">
          <a href="tour-virtual.html" data-page="tour-virtual">Tour Virtual</a>
        </div>
      </div>
    </div>
    <a href="zonas.html"          data-page="zonas">Zonas</a>
    <a href="sobre-nosotros.html" data-page="sobre-nosotros">Sobre Nosotros</a>
    <a href="blog.html"           data-page="blog">Blog</a>
  </div>

  <div class="nr">
    <a href="tel:957080310" class="n-phone">957 080 310</a>
    <div class="n-div"></div>
    <a href="contacto.html" class="n-cta">Contacto</a>
  </div>

  <button class="nav-burger" id="nav-burger" aria-label="Abrir menú">
    <span></span><span></span><span></span>
  </button>
</nav>

<div class="pill" id="pill">
  <a class="pb on" href="tel:957080310">Llámanos</a>
  <div class="ps"></div>
  <a class="pb" href="contacto.html">Contacto</a>
  <div class="ps"></div>
  <a class="pb" href="https://wa.me/34744744910" target="_blank">WhatsApp</a>
</div>
`;

  /* ────────────────────────────────────────────────────────
     FOOTER HTML
  ──────────────────────────────────────────────────────── */
  var FOOTER_HTML = `
<footer>
  <div class="foot-grid">
    <div class="f-brand">
      <a href="index.html" class="f-brand-logo">
        <img src="https://tucasapre.hostingcordoba.com/wp-content/uploads/2025/02/logoNegro.png"
             alt="tucasa córdoba" class="f-logo-img">
      </a>
      <p>Ayudamos a comprar, vender y alquilar inmuebles en toda Córdoba con un servicio profesional, transparente y adaptado a cada persona.</p>
    </div>
    <div class="f-col">
      <div class="f-col-t">Navegación</div>
      <ul>
        <li><a href="index.html">Inicio</a></li>
        <li><a href="comprar.html">Comprar</a></li>
        <li><a href="exclusivas.html">Exclusivas</a></li>
        <li><a href="lofts.html">Lofts</a></li>
        <li><a href="vender.html">Vender</a></li>
        <li><a href="zonas.html">Guía de zonas</a></li>
        <li><a href="blog.html">Blog</a></li>
      </ul>
    </div>
    <div class="f-col">
      <div class="f-col-t">Servicios</div>
      <ul>
        <li>Tour Virtual</li>
        <li>Valoración gratuita</li>
        <li>Viviendas exclusivas</li>
        <li>Locales y naves</li>
        <li>Asesoramiento</li>
      </ul>
    </div>
    <div class="f-col">
      <div class="f-col-t">Contacto</div>
      <ul>
        <li><a href="tel:957080310">957 080 310</a></li>
        <li><a href="https://wa.me/34744744910" target="_blank">WhatsApp</a></li>
        <li><a href="contacto.html">Enviar mensaje</a></li>
        <li><a href="sobre-nosotros.html">Trabaja con nosotros</a></li>
        <li><a href="sobre-nosotros.html">Sobre nosotros</a></li>
      </ul>
    </div>
  </div>
  <div class="foot-b">
    <div class="f-legal">© 2025 tucasa córdoba inmobiliaria · <a href="#" style="color:inherit">Privacidad</a> · <a href="#" style="color:inherit">Aviso legal</a> · <a href="#" style="color:inherit">Cookies</a></div>
    <div class="f-social">
      <a href="https://www.instagram.com/tucasacordoba/" target="_blank">Instagram</a>
      <a href="https://www.facebook.com/tucasacordobainmobiliaria" target="_blank">Facebook</a>
      <a href="https://www.linkedin.com/company/tucasac%C3%B3rdoba/" target="_blank">LinkedIn</a>
      <a href="https://www.youtube.com/@inmobiliariatucasacordoba" target="_blank">YouTube</a>
    </div>
  </div>
</footer>
`;

  /* ────────────────────────────────────────────────────────
     INJECT
  ──────────────────────────────────────────────────────── */
  var headerRoot = document.getElementById('header-root');
  var footerRoot = document.getElementById('footer-root');

  if (headerRoot) headerRoot.innerHTML = NAV_HTML;
  if (footerRoot) footerRoot.innerHTML = FOOTER_HTML;

  /* ────────────────────────────────────────────────────────
     ACTIVE NAV LINK
  ──────────────────────────────────────────────────────── */
  var page = document.body.dataset.page || 'index';
  document.querySelectorAll('.nl a[data-page], .nav-mobile a[data-page]').forEach(function (a) {
    if (a.dataset.page === page) a.classList.add('active');
  });

  /* ────────────────────────────────────────────────────────
     EN PÁGINAS QUE NO SON INDEX: revelar nav y pill de inmediato
  ──────────────────────────────────────────────────────── */
  if (page !== 'index') {
    var nav  = document.getElementById('nav');
    var pill = document.getElementById('pill');
    if (nav)  nav.classList.add('revealed');
    if (pill) pill.classList.add('revealed');
  }

  /* ────────────────────────────────────────────────────────
     NAV SCROLL — solid al bajar
  ──────────────────────────────────────────────────────── */
  window.addEventListener('scroll', function () {
    var nav = document.getElementById('nav');
    if (nav) nav.classList.toggle('solid', window.scrollY > 60);
  }, { passive: true });

  /* ────────────────────────────────────────────────────────
     HAMBURGER
  ──────────────────────────────────────────────────────── */
  function openMenu() {
    var burger    = document.getElementById('nav-burger');
    var mobileNav = document.getElementById('nav-mobile');
    var mainNav   = document.getElementById('nav');
    if (!burger) return;
    burger.classList.add('open');
    mobileNav.classList.add('open');
    mainNav.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    var burger    = document.getElementById('nav-burger');
    var mobileNav = document.getElementById('nav-mobile');
    var mainNav   = document.getElementById('nav');
    if (!burger) return;
    burger.classList.remove('open');
    mobileNav.classList.remove('open');
    mainNav.classList.remove('menu-open');
    document.body.style.overflow = '';
  }

  var burger = document.getElementById('nav-burger');
  if (burger) {
    burger.addEventListener('click', function () {
      document.getElementById('nav-mobile').classList.contains('open') ? closeMenu() : openMenu();
    });
  }

  document.querySelectorAll('#nav-mobile a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeMenu(); closeLead(); }
  });

  /* ────────────────────────────────────────────────────────
     COOKIE BANNER
  ──────────────────────────────────────────────────────── */
  if (!localStorage.getItem('cookies_accepted')) {
    var cookieEl = document.createElement('div');
    cookieEl.className = 'cookie-banner';
    cookieEl.innerHTML = '<p class="cookie-text">Usamos cookies propias y de terceros para mejorar tu experiencia. Puedes aceptarlas todas o solo las esenciales. <a href="#">Política de cookies</a></p>' +
      '<div class="cookie-btns"><button class="cookie-accept" id="cookie-ok">Aceptar todas</button><button class="cookie-reject" id="cookie-rej">Solo esenciales</button></div>';
    document.body.appendChild(cookieEl);
    setTimeout(function () { cookieEl.classList.add('show'); }, 800);
    document.getElementById('cookie-ok').addEventListener('click', function () {
      localStorage.setItem('cookies_accepted', 'all');
      cookieEl.classList.remove('show');
    });
    document.getElementById('cookie-rej').addEventListener('click', function () {
      localStorage.setItem('cookies_accepted', 'essential');
      cookieEl.classList.remove('show');
    });
  }

  /* ────────────────────────────────────────────────────────
     LEAD POPUP — aparece a los 15 segundos, solo una vez por sesión
  ──────────────────────────────────────────────────────── */
  var page = document.body.dataset.page || 'index';
  if (page !== 'contacto' && !sessionStorage.getItem('popup_shown')) {
    var popup = document.createElement('div');
    popup.className = 'lead-popup';
    popup.innerHTML =
      '<div class="lead-popup-box">' +
        '<button class="lead-popup-close" id="popup-close">✕</button>' +
        '<div class="lead-popup-tag">Oferta exclusiva</div>' +
        '<h2 class="lead-popup-h">¿Sabes cuánto<br>vale tu vivienda?</h2>' +
        '<p class="lead-popup-p">Valoración gratuita con nuestros expertos. Sin compromiso, respuesta en menos de 24 horas.</p>' +
        '<div class="lead-popup-ig">' +
          '<input class="lead-popup-input" type="text" placeholder="Tu nombre y teléfono" id="popup-input">' +
          '<button class="lead-popup-btn" id="popup-btn">Valorar gratis</button>' +
        '</div>' +
        '<p class="lead-popup-note">Tus datos están protegidos. Sin compromiso.</p>' +
      '</div>';
    document.body.appendChild(popup);

    function closeLead() {
      popup.classList.remove('show');
      sessionStorage.setItem('popup_shown', '1');
    }

    setTimeout(function () {
      popup.classList.add('show');
    }, 15000);

    document.getElementById('popup-close').addEventListener('click', closeLead);
    popup.addEventListener('click', function (e) { if (e.target === popup) closeLead(); });
    document.getElementById('popup-btn').addEventListener('click', function () {
      var input = document.getElementById('popup-input');
      if (!input.value.trim()) { input.style.borderColor = 'var(--terra)'; return; }
      window.open('https://valoracion.tucasacordoba.com/', '_blank');
      closeLead();
    });
  } else {
    function closeLead() {}
  }

})();

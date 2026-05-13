/* ═══════════════════════════════════════════════════════════
   main.js — Comportamientos compartidos entre todas las páginas:
   scroll reveals, contadores animados, drag gallery, parallax
   ═══════════════════════════════════════════════════════════ */

(function () {

  /* ─── SCROLL REVEALS (.rv y .cr) — excluye #hero-zone en index ─── */
  var rvObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (x) {
      if (x.isIntersecting) x.target.classList.add('in');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.rv,.cr').forEach(function (el) {
    if (!el.closest('#hero-zone')) rvObs.observe(el);
  });

  /* ─── CONTADORES ANIMADOS ─── */
  var coObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting && !e.target._done) {
        e.target._done = 1;
        var to  = parseFloat(e.target.dataset.to);
        var dec = e.target.dataset.dec !== undefined;
        var d   = 1800;
        var s   = performance.now();
        (function u(now) {
          var p    = Math.min((now - s) / d, 1);
          var ease = 1 - Math.pow(1 - p, 3);
          var v    = to * ease;
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
    dg.addEventListener('mousemove',  function (e) { if (!dn) return; e.preventDefault(); var x = e.pageX - dg.offsetLeft; dg.scrollLeft = sl - (x - sx) * 1.6; });
    var tx = 0, tl = 0;
    dg.addEventListener('touchstart', function (e) { tx = e.touches[0].pageX; tl = dg.scrollLeft; }, { passive: true });
    dg.addEventListener('touchmove',  function (e) { dg.scrollLeft = tl - (e.touches[0].pageX - tx) * 1.2; }, { passive: true });
  }

  /* ─── IMAGE BREAK PARALLAX ─── */
  var ibb = document.getElementById('ibb');
  if (ibb) {
    window.addEventListener('scroll', function () {
      var rect = ibb.parentElement.getBoundingClientRect();
      var pct  = rect.top / innerHeight;
      ibb.style.transform = 'translateY(' + (pct * 40) + 'px)';
    }, { passive: true });
  }

})();

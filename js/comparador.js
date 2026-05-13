/* ═══════════════════════════════════════════════════════════
   comparador.js — Comparador de propiedades (hasta 3)
   ═══════════════════════════════════════════════════════════ */

(function () {

  var MAX = 3;
  var selected = [];

  /* ── Estilos ── */
  var style = document.createElement('style');
  style.textContent =
    '.comp-bar { position:fixed; bottom:0; left:0; right:0; z-index:8000; background:var(--ink2); border-top:1px solid rgba(255,255,255,.12); padding:14px 52px; display:flex; align-items:center; gap:16px; transform:translateY(100%); transition:transform .35s cubic-bezier(.16,1,.3,1); }' +
    '.comp-bar.show { transform:translateY(0); }' +
    '.comp-bar-label { font-size:10px; letter-spacing:.18em; text-transform:uppercase; color:rgba(244,237,230,.4); flex-shrink:0; }' +
    '.comp-slots { display:flex; gap:10px; flex:1; }' +
    '.comp-slot { width:160px; height:48px; border:1px solid rgba(255,255,255,.1); display:flex; align-items:center; padding:0 12px; gap:8px; background:rgba(255,255,255,.04); flex-shrink:0; }' +
    '.comp-slot-name { font-family:"Cormorant Garamond",serif; font-size:14px; font-weight:300; color:rgba(244,237,230,.65); flex:1; overflow:hidden; white-space:nowrap; text-overflow:ellipsis; }' +
    '.comp-slot-rm { background:none; border:none; color:rgba(244,237,230,.3); cursor:pointer; font-size:14px; line-height:1; transition:color .15s; }' +
    '.comp-slot-rm:hover { color:#ea0f01; }' +
    '.comp-btn { font-size:10px; letter-spacing:.16em; text-transform:uppercase; padding:12px 24px; background:#ea0f01; color:#fff; border:none; cursor:pointer; transition:background .2s; flex-shrink:0; }' +
    '.comp-btn:hover { background:#db2d21; }' +
    '.comp-btn:disabled { background:rgba(255,255,255,.1); color:rgba(244,237,230,.3); cursor:default; }' +
    '.comp-clear { font-size:10px; letter-spacing:.14em; text-transform:uppercase; color:rgba(244,237,230,.3); background:none; border:none; cursor:pointer; transition:color .2s; }' +
    '.comp-clear:hover { color:rgba(244,237,230,.7); }' +
    '.comp-toggle { display:inline-flex; align-items:center; gap:6px; font-size:10px; letter-spacing:.14em; text-transform:uppercase; padding:8px 16px; border:1px solid rgba(255,255,255,.15); color:rgba(244,237,230,.5); background:none; cursor:pointer; transition:all .2s; margin-top:12px; }' +
    '.comp-toggle.active { border-color:#ea0f01; color:#ea0f01; background:rgba(234,15,1,.08); }' +
    '.comp-toggle:hover { border-color:rgba(255,255,255,.3); color:rgba(244,237,230,.8); }' +
    /* Modal comparación */
    '.comp-modal { position:fixed; inset:0; z-index:9900; background:rgba(10,8,7,.92); backdrop-filter:blur(12px); display:flex; flex-direction:column; opacity:0; pointer-events:none; transition:opacity .35s; overflow-y:auto; padding:80px 40px 40px; }' +
    '.comp-modal.open { opacity:1; pointer-events:auto; }' +
    '.comp-modal-close { position:fixed; top:24px; right:24px; background:none; border:none; color:rgba(244,237,230,.5); font-size:24px; cursor:pointer; transition:color .2s; }' +
    '.comp-modal-close:hover { color:#ea0f01; }' +
    '.comp-table { display:grid; grid-template-columns:180px repeat(3,1fr); gap:1px; background:rgba(255,255,255,.06); max-width:1100px; margin:0 auto; width:100%; }' +
    '.comp-cell { background:var(--ink2); padding:18px 22px; }' +
    '.comp-cell.header { background:var(--ink3); font-size:10px; letter-spacing:.18em; text-transform:uppercase; color:rgba(244,237,230,.4); }' +
    '.comp-cell.prop-header { background:var(--ink); font-family:"Cormorant Garamond",serif; font-size:18px; font-weight:300; color:var(--cream); }' +
    '.comp-cell.label { background:var(--ink); font-size:11px; letter-spacing:.12em; text-transform:uppercase; color:rgba(244,237,230,.35); display:flex; align-items:center; }' +
    '.comp-cell.value { font-family:"Cormorant Garamond",serif; font-size:20px; font-weight:300; color:var(--cream); }' +
    '.comp-cell.value.highlight { color:#ea0f01; }';
  document.head.appendChild(style);

  /* ── Barra de comparación ── */
  var bar = document.createElement('div');
  bar.className = 'comp-bar';
  bar.innerHTML =
    '<span class="comp-bar-label">Comparar</span>' +
    '<div class="comp-slots" id="comp-slots"></div>' +
    '<button class="comp-btn" id="comp-compare" disabled>Comparar</button>' +
    '<button class="comp-clear" id="comp-clear">Limpiar</button>';
  document.body.appendChild(bar);

  /* ── Modal de comparación ── */
  var modal = document.createElement('div');
  modal.className = 'comp-modal';
  modal.innerHTML = '<button class="comp-modal-close" id="comp-modal-close">✕</button><div id="comp-table-wrap"></div>';
  document.body.appendChild(modal);

  function update() {
    var slots = document.getElementById('comp-slots');
    slots.innerHTML = selected.map(function (p, i) {
      return '<div class="comp-slot">' +
        '<span class="comp-slot-name">' + (p.nombre || 'Propiedad ' + (i + 1)) + '</span>' +
        '<button class="comp-slot-rm" data-i="' + i + '">✕</button>' +
        '</div>';
    }).join('');
    /* Slots vacíos */
    for (var j = selected.length; j < MAX; j++) {
      slots.innerHTML += '<div class="comp-slot" style="opacity:.3;"><span class="comp-slot-name">Añadir propiedad</span></div>';
    }

    var btn = document.getElementById('comp-compare');
    btn.disabled = selected.length < 2;

    bar.classList.toggle('show', selected.length > 0);

    /* Botones en tarjetas */
    document.querySelectorAll('.comp-toggle').forEach(function (t) {
      t.classList.toggle('active', selected.some(function (p) { return p.id === t.dataset.id; }));
      t.textContent = selected.some(function (p) { return p.id === t.dataset.id; }) ? '✓ En comparador' : '+ Comparar';
    });

    slots.querySelectorAll('.comp-slot-rm').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        selected.splice(parseInt(btn.dataset.i), 1);
        update();
      });
    });
  }

  function addProperty(prop) {
    if (selected.some(function (p) { return p.id === prop.id; })) {
      selected = selected.filter(function (p) { return p.id !== prop.id; });
    } else if (selected.length < MAX) {
      selected.push(prop);
    }
    update();
  }

  function openModal() {
    var wrap = document.getElementById('comp-table-wrap');
    var rows = [
      ['Precio',       selected.map(function (p) { return p.precio ? p.precio.toLocaleString('es') + '€' : '—'; })],
      ['Habitaciones', selected.map(function (p) { return p.habitaciones || '—'; })],
      ['Baños',        selected.map(function (p) { return p.banos || '—'; })],
      ['m² construidos', selected.map(function (p) { return p.metros ? p.metros + ' m²' : '—'; })],
      ['Zona',         selected.map(function (p) { return p.zona || '—'; })],
      ['Tipo',         selected.map(function (p) { return p.tipo || '—'; })]
    ];

    var html = '<div class="comp-table" style="grid-template-columns: 180px ' + selected.map(function () { return '1fr'; }).join(' ') + ';">';
    /* Cabecera */
    html += '<div class="comp-cell header"></div>';
    selected.forEach(function (p) {
      html += '<div class="comp-cell prop-header">' + (p.nombre || 'Propiedad') + '<br><span style="font-size:14px;color:#ea0f01;">' + (p.precio ? p.precio.toLocaleString('es') + '€' : '') + '</span></div>';
    });
    /* Filas */
    rows.forEach(function (row) {
      html += '<div class="comp-cell label">' + row[0] + '</div>';
      row[1].forEach(function (val) {
        html += '<div class="comp-cell value">' + val + '</div>';
      });
    });
    html += '</div>';
    html += '<div style="text-align:center;margin-top:32px;"><a href="contacto.html" class="btn-f">Solicitar información de estas propiedades</a></div>';
    wrap.innerHTML = html;
    modal.classList.add('open');
  }

  /* Eventos */
  document.getElementById('comp-compare').addEventListener('click', openModal);
  document.getElementById('comp-clear').addEventListener('click', function () { selected = []; update(); });
  document.getElementById('comp-modal-close').addEventListener('click', function () { modal.classList.remove('open'); });
  modal.addEventListener('click', function (e) { if (e.target === modal) modal.classList.remove('open'); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') modal.classList.remove('open'); });

  /* Añadir botón "Comparar" a tarjetas de propiedad */
  function initButtons() {
    document.querySelectorAll('.prop-card, .bento-card:not(.bento-text), .listing-row').forEach(function (card) {
      if (card.querySelector('.comp-toggle')) return;
      var id    = card.dataset.id || card.dataset.ref || Math.random().toString(36).slice(2);
      var nombre = card.querySelector('.prop-name, .bento-name, .listing-title');
      var precio = card.querySelector('.prop-price, .bento-price, .listing-price');
      var btn = document.createElement('button');
      btn.className = 'comp-toggle';
      btn.dataset.id = id;
      btn.textContent = '+ Comparar';
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        addProperty({
          id     : id,
          nombre : nombre ? nombre.textContent : 'Propiedad',
          precio : precio ? parseInt(precio.textContent.replace(/\D/g, '')) : 0,
          zona   : card.querySelector('.prop-zone, .bento-zone, .listing-loc') ? card.querySelector('.prop-zone, .bento-zone, .listing-loc').textContent : '',
          habitaciones: card.querySelector('.prop-attrs, .bento-attrs') ? (card.querySelector('.prop-attrs, .bento-attrs').textContent.match(/\d+\s*hab/) || ['—'])[0] : '—'
        });
      });

      var body = card.querySelector('.prop-body, .bento-body, .listing-info');
      if (body) body.appendChild(btn);
    });
  }

  /* Inicializar y re-inicializar tras carga dinámica */
  initButtons();
  window.ComparadorInit = initButtons;

})();

/* ═══════════════════════════════════════════════════════════
   inmovilla.js — Integración API CRM Inmovilla

   CONFIGURACIÓN:
   Rellena AGENCY_CODE y API_KEY con los datos de tu cuenta
   de Inmovilla. Puedes obtenerlos en:
   CRM → Configuración → API → Credenciales
   ═══════════════════════════════════════════════════════════ */

var Inmovilla = (function () {

  /* ────── CONFIGURACIÓN — editar aquí ────── */
  var CONFIG = {
    AGENCY_CODE : 'TU_CODIGO_AGENCIA',   // ej: "12345"
    API_KEY     : 'TU_API_KEY',          // ej: "abc123xyz..."
    BASE_URL    : 'https://api.inmovilla.com/v1',
    LANG        : 'es',
    PER_PAGE    : 12
  };

  /* ────── ENDPOINTS ────── */
  var ENDPOINTS = {
    properties : CONFIG.BASE_URL + '/properties',
    property   : CONFIG.BASE_URL + '/properties/{id}',
    search     : CONFIG.BASE_URL + '/properties/search'
  };

  /* ────── HEADERS ────── */
  function getHeaders() {
    return {
      'Authorization' : 'Bearer ' + CONFIG.API_KEY,
      'X-Agency-Code' : CONFIG.AGENCY_CODE,
      'Accept'        : 'application/json',
      'Accept-Language': CONFIG.LANG
    };
  }

  /* ────── FETCH GENÉRICO ────── */
  function apiFetch(url, params) {
    var qs = params ? '?' + new URLSearchParams(params).toString() : '';
    return fetch(url + qs, { headers: getHeaders() })
      .then(function (r) {
        if (!r.ok) throw new Error('Inmovilla API error: ' + r.status);
        return r.json();
      });
  }

  /* ────── MÉTODOS PÚBLICOS ────── */

  /**
   * Obtiene listado de propiedades
   * @param {Object} filters - { tipo, precio_max, precio_min, habitaciones, zona, page }
   */
  function getProperties(filters) {
    var params = Object.assign({ per_page: CONFIG.PER_PAGE, page: 1 }, filters || {});
    return apiFetch(ENDPOINTS.properties, params);
  }

  /**
   * Obtiene una propiedad por ID
   * @param {string|number} id
   */
  function getProperty(id) {
    return apiFetch(ENDPOINTS.property.replace('{id}', id));
  }

  /**
   * Busca propiedades por texto libre
   * @param {string} query
   */
  function searchProperties(query) {
    return apiFetch(ENDPOINTS.search, { q: query, per_page: CONFIG.PER_PAGE });
  }

  /**
   * Obtiene propiedades destacadas / en portada
   */
  function getFeatured() {
    return getProperties({ destacada: 1 });
  }

  /**
   * Obtiene propiedades exclusivas
   */
  function getExclusivas() {
    return getProperties({ exclusiva: 1 });
  }

  /**
   * Obtiene lofts
   */
  function getLofts() {
    return getProperties({ tipo: 'loft' });
  }

  /* ────── RENDERIZADO ────── */

  /**
   * Convierte un objeto propiedad de Inmovilla en HTML de bento-card
   * @param {Object} prop
   */
  function renderBentoCard(prop) {
    var img    = prop.fotos && prop.fotos[0] ? prop.fotos[0].url : 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80';
    var precio = prop.precio ? prop.precio.toLocaleString('es') + '€' : '—';
    var badge  = prop.exclusiva ? 'Exclusiva' : (prop.nueva_construccion ? 'Nueva' : 'En venta');
    var zona   = prop.zona || prop.localidad || '';
    var nombre = prop.titulo || prop.tipo || 'Propiedad';
    var attrs  = [prop.habitaciones && prop.habitaciones + ' hab', prop.banos && prop.banos + ' baños', prop.metros && prop.metros + ' m²'].filter(Boolean).join(' · ');

    return '<div class="bento-card" data-id="' + prop.id + '" data-tipo="' + (prop.tipo || '') + '" data-precio="' + (prop.precio || 0) + '" data-hab="' + (prop.habitaciones || 0) + '" style="cursor:pointer;" onclick="window.location.href=\'propiedad.html?id=' + prop.id + '\'">' +
      '<div class="bento-bg" style="background-image:url(\'' + img + '\')"></div>' +
      '<div class="bento-veil"></div>' +
      '<div class="bento-badge">' + badge + '</div>' +
      '<div class="bento-body">' +
        '<div class="bento-zone">' + zona + '</div>' +
        '<div class="bento-name">' + nombre + '</div>' +
        '<div class="bento-attrs">' + attrs + '</div>' +
        '<div class="bento-price">' + precio + '</div>' +
      '</div>' +
    '</div>';
  }

  /**
   * Convierte un objeto propiedad en HTML de listing-row
   * @param {Object} prop
   * @param {number} index
   * @param {boolean} flip
   */
  function renderListingRow(prop, index, flip) {
    var img    = prop.fotos && prop.fotos[0] ? prop.fotos[0].url : 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&q=85';
    var precio = prop.precio ? prop.precio.toLocaleString('es') + '€' : '—';
    var badge  = prop.exclusiva ? 'Exclusiva' : 'En venta';
    var num    = String(index + 1).padStart(2, '0');
    var hab    = prop.habitaciones || '—';
    var banos  = prop.banos || '—';
    var m2     = prop.metros || '—';
    var zona   = (prop.zona || prop.localidad || '') + (prop.provincia ? ' · ' + prop.provincia : '');

    return '<div class="listing-row rv ' + (flip ? 'flip' : '') + '" onclick="window.location.href=\'propiedad.html?id=' + prop.id + '\'" style="cursor:pointer;">' +
      '<div class="listing-img"><div class="listing-img-bg" style="background-image:url(\'' + img + '\')"></div></div>' +
      '<div class="listing-info">' +
        '<div class="listing-num">' + num + '</div>' +
        '<div class="listing-badge">' + badge + '</div>' +
        '<div class="listing-price">' + precio + '</div>' +
        '<div class="listing-title">' + (prop.titulo || prop.tipo || 'Propiedad') + '</div>' +
        '<div class="listing-loc">' + zona + '</div>' +
        '<div class="listing-specs">' +
          '<div><div class="listing-spec-v">' + hab + '</div><div class="listing-spec-l">Habitaciones</div></div>' +
          '<div><div class="listing-spec-v">' + banos + '</div><div class="listing-spec-l">Baños</div></div>' +
          '<div><div class="listing-spec-v">' + m2 + '</div><div class="listing-spec-l">m²</div></div>' +
        '</div>' +
        '<a href="propiedad.html?id=' + prop.id + '" class="listing-cta">Ver propiedad →</a>' +
      '</div>' +
    '</div>';
  }

  /**
   * Inyecta propiedades en un contenedor
   * @param {string} containerId - ID del elemento donde renderizar
   * @param {Object} filters - Filtros para la API
   * @param {string} mode - 'bento' | 'listing'
   */
  function loadIntoContainer(containerId, filters, mode) {
    var container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '<div style="text-align:center;padding:40px;font-family:\'Cormorant Garamond\',serif;font-size:20px;color:rgba(244,237,230,.4);">Cargando propiedades...</div>';

    getProperties(filters)
      .then(function (data) {
        var props = data.data || data.properties || data || [];
        if (!props.length) {
          container.innerHTML = '<div style="text-align:center;padding:40px;font-family:\'Cormorant Garamond\',serif;font-size:20px;color:rgba(244,237,230,.4);">No hay propiedades disponibles.</div>';
          return;
        }
        container.innerHTML = props.map(function (p, i) {
          return mode === 'listing' ? renderListingRow(p, i, i % 2 !== 0) : renderBentoCard(p);
        }).join('');
      })
      .catch(function (err) {
        console.warn('[Inmovilla] Error cargando propiedades:', err.message);
        container.innerHTML = '<div style="text-align:center;padding:40px;font-family:\'Cormorant Garamond\',serif;font-size:20px;color:rgba(244,237,230,.4);">Error al cargar propiedades. Comprueba la configuración de la API.</div>';
      });
  }

  /**
   * Lee parámetros de la URL para mostrar una propiedad individual
   * Uso: Inmovilla.loadPropertyDetail('prop-container')
   */
  function loadPropertyDetail(containerId) {
    var params = new URLSearchParams(window.location.search);
    var id = params.get('id');
    if (!id) return;

    var container = document.getElementById(containerId);
    if (!container) return;

    getProperty(id)
      .then(function (prop) {
        /* Actualizar título y precio */
        var titleEl = document.querySelector('.prop-detail-title');
        var priceEl = document.querySelector('.prop-detail-price');
        var locEl   = document.querySelector('.prop-detail-loc');
        var descEl  = document.querySelector('.prop-detail-desc');
        if (titleEl) titleEl.textContent = prop.titulo || prop.tipo || '';
        if (priceEl) priceEl.textContent = prop.precio ? prop.precio.toLocaleString('es') + '€' : '';
        if (locEl)   locEl.textContent   = (prop.zona || prop.localidad || '') + ' · Ref. ' + prop.referencia;
        if (descEl)  descEl.innerHTML    = '<p>' + (prop.descripcion || '').replace(/\n/g, '</p><p>') + '</p>';

        /* Galería */
        var fotos = prop.fotos || [];
        if (fotos.length) {
          var mainImg = document.querySelector('.prop-gallery-main img');
          var thumb1  = document.querySelectorAll('.prop-gallery-thumb img')[0];
          var thumb2  = document.querySelectorAll('.prop-gallery-thumb img')[1];
          if (mainImg) mainImg.src = fotos[0].url;
          if (thumb1 && fotos[1]) thumb1.src = fotos[1].url;
          if (thumb2 && fotos[2]) thumb2.src = fotos[2].url;
        }

        /* Specs */
        var specs = document.querySelectorAll('.prop-detail-spec-v');
        if (specs[0]) specs[0].textContent = prop.habitaciones || '—';
        if (specs[1]) specs[1].textContent = prop.banos || '—';
        if (specs[2]) specs[2].textContent = prop.metros || '—';
        if (specs[3]) specs[3].textContent = prop.metros_parcela || '—';

        /* Meta tag OG dinámica */
        document.title = (prop.titulo || 'Propiedad') + ' — Tu Casa Córdoba';
      })
      .catch(function (err) {
        console.warn('[Inmovilla] Error cargando propiedad ' + id + ':', err.message);
      });
  }

  /* ────── API PÚBLICA ────── */
  return {
    config           : CONFIG,
    getProperties    : getProperties,
    getProperty      : getProperty,
    searchProperties : searchProperties,
    getFeatured      : getFeatured,
    getExclusivas    : getExclusivas,
    getLofts         : getLofts,
    loadIntoContainer: loadIntoContainer,
    loadPropertyDetail: loadPropertyDetail,
    renderBentoCard  : renderBentoCard,
    renderListingRow : renderListingRow
  };

})();

/* ═══════════════════════════════════════════════════════════
   USO:

   1. Configurar credenciales arriba (AGENCY_CODE y API_KEY)

   2. Cargar propiedades en un contenedor:
      Inmovilla.loadIntoContainer('mi-grid', { tipo: 'chalet' }, 'bento');

   3. En comprar.html, reemplazar el bento-grid estático:
      <div id="inmovilla-grid" class="bento-grid"></div>
      <script>
        Inmovilla.loadIntoContainer('inmovilla-grid', {}, 'bento');
      </script>

   4. En exclusivas.html:
      Inmovilla.loadIntoContainer('exclusivas-grid', { exclusiva: 1 }, 'listing');

   5. En propiedad.html, cargar detalle dinámico:
      Inmovilla.loadPropertyDetail('prop-detail');
   ═══════════════════════════════════════════════════════════ */

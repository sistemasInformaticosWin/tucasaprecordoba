<?php
require_once 'includes/config.php';
require_once 'api/inmovilla.php';
require_once 'data/properties.php';

$current_page = 'comprar';
$page_title   = 'Comprar vivienda — ' . SITE_NAME;
$page_desc    = 'Encuentra tu hogar en Córdoba. Casas, pisos, lofts y áticos con tucasa córdoba.';

$properties = get_properties_with_fallback();

include 'includes/head.php';
include 'includes/header.php';
?>

<section class="page-hero">
  <div class="page-hero-bg" style="background-image:url('https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=90')"></div>
  <div class="page-hero-veil"></div>
  <div class="page-hero-body">
    <div class="page-tag">Comprar vivienda</div>
    <h1 class="page-h1">Encuentra<br>tu próximo<br>hogar.</h1>
    <p class="page-sub">Casa, piso, loft o ático — conocemos cada zona, cada calle, cada oportunidad de Córdoba.</p>
  </div>
</section>

<!-- FILTROS -->
<div class="filter-bar">
  <select class="filter-sel filter-tipo">
    <option value="all">Tipo de inmueble</option>
    <option value="casa">Casa</option>
    <option value="piso">Piso</option>
    <option value="loft">Loft</option>
    <option value="atico">Ático</option>
    <option value="chalet">Chalet</option>
  </select>
  <select class="filter-sel filter-precio">
    <option value="all">Precio máximo</option>
    <option value="150000">Hasta 150.000€</option>
    <option value="250000">Hasta 250.000€</option>
    <option value="350000">Hasta 350.000€</option>
    <option value="9999999">Sin límite</option>
  </select>
  <select class="filter-sel filter-habs">
    <option value="all">Habitaciones</option>
    <option value="1">1+</option>
    <option value="2">2+</option>
    <option value="3">3+</option>
    <option value="4">4+</option>
  </select>
  <button class="filter-btn">Buscar</button>
</div>

<!-- PROPIEDADES BENTO -->
<section class="sec-dark" style="padding-bottom:0">
  <div class="sec-header" style="margin-bottom:32px;">
    <h2 class="sec-title rv">Propiedades disponibles</h2>
    <p class="sec-sub rv d1">Selección actualizada en Córdoba y Málaga.</p>
  </div>
</section>
<div style="padding:0 52px 52px;background:var(--ink);">
  <div class="bento-grid rv">
    <?php
    // Primera propiedad grande
    if (isset($properties[0])): $p = $properties[0]; ?>
    <?= render_bento_card($p, 'bento-span2 bento-row2') ?>
    <?php endif; ?>

    <?php if (isset($properties[1])): $p = $properties[1]; ?>
    <?= render_bento_card($p) ?>
    <?php endif; ?>

    <div class="bento-card bento-text">
      <div>
        <div class="bento-text-label">Asesoramiento gratuito</div>
        <div class="bento-text-body">¿No encuentras<br>lo que buscas?<br>Te lo encontramos.</div>
      </div>
      <a href="/contacto.php" class="bento-text-cta">Hablar con un agente →</a>
    </div>

    <?php foreach (array_slice($properties, 2, 4) as $p): ?>
    <?= render_bento_card($p) ?>
    <?php endforeach; ?>
  </div>
  <div class="rv" style="text-align:center;padding-top:36px;">
    <a href="https://crm.inmovilla.com" target="_blank" class="btn-f">Ver catálogo completo</a>
  </div>
</div>

<!-- PULL QUOTE -->
<div class="pull-quote-wrap">
  <blockquote class="pull-quote rv">"Más de 1.200 viviendas vendidas en Córdoba. Cada una, una historia diferente."</blockquote>
  <div class="pull-quote-attr rv d1">tucasa córdoba · Desde 1999</div>
</div>

<!-- TIMELINE -->
<div class="timeline-wrap">
  <div class="sec-header light" style="margin-bottom:52px;">
    <h2 class="sec-title rv" style="color:var(--ink)">Cómo te ayudamos</h2>
  </div>
  <div class="timeline">
    <div class="timeline-item rv"><div class="timeline-dot"></div><div class="timeline-num">01 — Asesoramiento</div><div class="timeline-title">Analizamos tu perfil</div><div class="timeline-text">Presupuesto, zona, tipo de inmueble y necesidades. Te orientamos desde el primer momento.</div></div>
    <div class="timeline-item rv d1"><div class="timeline-dot"></div><div class="timeline-num">02 — Selección</div><div class="timeline-title">Solo lo que encaja</div><div class="timeline-text">Filtramos el catálogo completo y te presentamos únicamente las propiedades que se ajustan a lo que buscas.</div></div>
    <div class="timeline-item rv d2"><div class="timeline-dot"></div><div class="timeline-num">03 — Negociación</div><div class="timeline-title">Negociamos por ti</div><div class="timeline-text">Te acompañamos en cada visita y negociamos el precio en tu nombre para obtener las mejores condiciones.</div></div>
    <div class="timeline-item rv d3"><div class="timeline-dot"></div><div class="timeline-num">04 — Firma</div><div class="timeline-title">Hasta el notario</div><div class="timeline-text">Gestionamos toda la documentación y coordinamos la firma. Sin estrés, sin complicaciones.</div></div>
  </div>
</div>

<!-- STATS -->
<section class="stats">
  <div class="stats-wm">comprar</div>
  <div class="stats-grid">
    <div class="stat"><span class="sn" data-to="8">0</span><div class="sl">Oficinas en Córdoba</div></div>
    <div class="stat"><span class="sn" data-to="25">0</span><div class="sl">Años de experiencia</div></div>
    <div class="stat"><span class="sn" data-to="1200">0</span><div class="sl">Viviendas vendidas</div></div>
    <div class="stat"><span class="sn" data-to="4.9" data-dec>0</span><div class="sl">Valoración Google ★</div></div>
  </div>
</section>

<!-- CALCULADORA -->
<section class="calc-section">
  <div class="sec-header light" style="margin-bottom:52px;">
    <h2 class="sec-title rv" style="color:var(--ink)">Calculadora de hipoteca</h2>
    <p class="sec-sub rv d1" style="color:rgba(10,8,7,.5)">Estima tu cuota mensual en segundos.</p>
  </div>
  <div class="calc-grid">
    <div class="calc-form rv">
      <div class="calc-field"><label class="calc-label" for="calc-precio">Precio (€)</label><input class="calc-input" id="calc-precio" type="number" value="250000" min="50000" max="2000000" step="5000"></div>
      <div class="calc-field"><label class="calc-label" for="calc-entrada">Entrada: <span id="calc-entrada-label">20%</span></label><input class="calc-range" id="calc-entrada" type="range" value="20" min="5" max="50"></div>
      <div class="calc-field"><label class="calc-label" for="calc-plazo">Plazo: <span id="calc-plazo-label">25 años</span></label><input class="calc-range" id="calc-plazo" type="range" value="25" min="5" max="40"></div>
      <div class="calc-field"><label class="calc-label" for="calc-tipo">Interés anual (%)</label><input class="calc-input" id="calc-tipo" type="number" value="3.5" min="0.5" max="10" step="0.1"></div>
    </div>
    <div class="calc-result rv d1">
      <div><div class="calc-result-label">Cuota mensual</div><div class="calc-result-value" id="calc-cuota">—</div></div>
      <div><div class="calc-result-label">Capital financiado</div><div class="calc-result-value" id="calc-capital" style="font-size:clamp(26px,3vw,36px)">—</div></div>
      <div><div class="calc-result-label">Total intereses</div><div class="calc-result-value" id="calc-intereses" style="font-size:clamp(26px,3vw,36px)">—</div></div>
      <div><div class="calc-result-label">Total a pagar</div><div class="calc-result-value" id="calc-total" style="font-size:clamp(26px,3vw,36px)">—</div></div>
    </div>
  </div>
  <p class="calc-disclaimer rv">* Cálculo orientativo. Las condiciones reales dependen de la entidad financiera y tu perfil.</p>
</section>

<!-- ALERTA DE PROPIEDADES -->
<section class="sec-dark">
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;max-width:1100px;margin:0 auto;">
    <div>
      <div class="val-tag rv">Alerta personalizada</div>
      <h2 class="val-h rv d1" style="font-size:clamp(32px,4vw,50px);">Te avisamos cuando<br>aparezca tu vivienda.</h2>
      <p class="val-p rv d2" style="font-size:18px;">Dinos qué buscas y te enviamos un email en cuanto tengamos algo que encaje.</p>
    </div>
    <form class="rv d2" method="POST" action="/api/alerta.php">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">
        <div class="val-ig" style="margin-bottom:0;"><input class="val-input" type="text" name="nombre" placeholder="Tu nombre"></div>
        <div class="val-ig" style="margin-bottom:0;"><input class="val-input" type="email" name="email" placeholder="Tu email" required></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">
        <select class="val-input" style="background:transparent;cursor:pointer;" name="tipo"><option value="">Tipo</option><option>Casa</option><option>Piso</option><option>Loft</option><option>Ático</option><option>Chalet</option></select>
        <select class="val-input" style="background:transparent;cursor:pointer;" name="precio"><option value="">Precio máximo</option><option value="150000">150.000€</option><option value="250000">250.000€</option><option value="350000">350.000€</option><option value="500000">500.000€</option></select>
      </div>
      <div class="val-ig" style="margin-bottom:16px;"><input class="val-input" type="text" name="zona" placeholder="Zona o barrio preferido"></div>
      <button type="submit" class="val-submit" style="width:100%;padding:16px;">Crear alerta gratuita</button>
    </form>
  </div>
</section>

<!-- CTA VALORACIÓN -->
<section class="val-section">
  <div class="val-visual"><div class="val-bg"></div><div class="val-veil"></div><div class="val-img-text rv">¿Buscas algo concreto? Te lo encontramos.</div></div>
  <div class="val-form">
    <div class="val-tag rv">Sin compromiso</div>
    <h2 class="val-h rv d1">Cuéntanos<br>qué buscas.</h2>
    <p class="val-p rv d2">Un agente dedicado te llama en menos de 24 horas.</p>
    <div class="rv d3">
      <div class="val-ig"><input class="val-input" type="text" placeholder="Tu nombre y teléfono"><button class="val-submit">Contactar</button></div>
      <p class="val-note">Tus datos están protegidos.</p>
    </div>
  </div>
</section>

<?php include 'includes/footer.php'; ?>
<script src="/js/app.js"></script>
</body>
</html>

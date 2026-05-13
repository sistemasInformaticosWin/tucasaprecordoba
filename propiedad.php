<?php
require_once 'includes/config.php';
require_once 'api/inmovilla.php';
require_once 'data/properties.php';

$id   = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_STRING) ?? '';
$prop = $id ? get_property_with_fallback($id) : null;

if (!$prop) {
    header('Location: /comprar.php');
    exit;
}

$current_page = 'comprar';
$page_title   = $prop['titulo'] . ' — ' . SITE_NAME;
$page_desc    = substr(strip_tags($prop['descripcion']), 0, 160);
$og_image     = $prop['fotos'][0] ?? SITE_LOGO;

include 'includes/head.php';
include 'includes/header.php';

$foto1 = htmlspecialchars($prop['fotos'][0] ?? '');
$foto2 = htmlspecialchars($prop['fotos'][1] ?? $prop['fotos'][0] ?? '');
$foto3 = htmlspecialchars($prop['fotos'][2] ?? $prop['fotos'][0] ?? '');

// Propiedades similares (mismo tipo, excluye la actual)
$similares = array_filter(
    get_properties_with_fallback(['tipo' => $prop['tipo']]),
    fn($p) => $p['id'] !== $prop['id']
);
$similares = array_slice(array_values($similares), 0, 3);
?>

<!-- CONTADOR VISITANTES -->
<div style="background:var(--ink3);border-bottom:1px solid var(--line-d);padding:10px 52px;margin-top:100px;display:flex;align-items:center;gap:8px;">
  <span style="width:8px;height:8px;border-radius:50%;background:#2a7a4b;display:inline-block;animation:pulse 2s ease-in-out infinite;"></span>
  <span style="font-size:12px;letter-spacing:.1em;color:rgba(244,237,230,.45);"><span id="visitor-count">5</span> personas están viendo esta propiedad ahora</span>
</div>

<!-- GALERÍA -->
<div class="prop-gallery">
  <div class="prop-gallery-main">
    <img src="<?= $foto1 ?>" alt="<?= htmlspecialchars($prop['titulo']) ?>" loading="eager">
  </div>
  <div class="prop-gallery-thumb">
    <img src="<?= $foto2 ?>" alt="<?= htmlspecialchars($prop['titulo']) ?> foto 2" loading="lazy">
  </div>
  <div class="prop-gallery-thumb">
    <img src="<?= $foto3 ?>" alt="<?= htmlspecialchars($prop['titulo']) ?> foto 3" loading="lazy">
  </div>
</div>

<!-- DETALLE -->
<div class="prop-detail">
  <div class="prop-detail-main">
    <div style="font-size:9px;letter-spacing:.22em;text-transform:uppercase;padding:5px 12px;background:var(--terra);color:var(--white);display:inline-block;margin-bottom:20px;">
      <?= htmlspecialchars($prop['badge']) ?>
    </div>
    <div class="prop-detail-price"><?= htmlspecialchars($prop['precio']) ?></div>
    <div class="prop-detail-title"><?= htmlspecialchars($prop['titulo']) ?></div>
    <div class="prop-detail-loc"><?= htmlspecialchars($prop['zona']) ?> · Ref. <?= htmlspecialchars($prop['ref']) ?></div>

    <div class="prop-detail-specs">
      <div><div class="prop-detail-spec-v"><?= $prop['hab'] ?></div><div class="prop-detail-spec-l">Habitaciones</div></div>
      <div><div class="prop-detail-spec-v"><?= $prop['banos'] ?></div><div class="prop-detail-spec-l">Baños</div></div>
      <div><div class="prop-detail-spec-v"><?= $prop['m2'] ?></div><div class="prop-detail-spec-l">m²</div></div>
      <?php if ($prop['m2parcela'] > 0): ?>
      <div><div class="prop-detail-spec-v"><?= $prop['m2parcela'] ?></div><div class="prop-detail-spec-l">m² parcela</div></div>
      <?php endif; ?>
    </div>

    <div class="prop-detail-desc">
      <p><?= nl2br(htmlspecialchars($prop['descripcion'])) ?></p>
    </div>

    <?php if (!empty($prop['caracteristicas'])): ?>
    <div style="margin-top:40px;padding-top:32px;border-top:1px solid rgba(10,8,7,.1);">
      <div style="font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:var(--terra);margin-bottom:20px;">Características</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px 32px;">
        <?php foreach ($prop['caracteristicas'] as $c): ?>
        <div style="font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:300;color:rgba(10,8,7,.65);padding:10px 0;border-bottom:1px solid rgba(10,8,7,.06);">
          <?= htmlspecialchars($c) ?>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
    <?php endif; ?>
  </div>

  <!-- SIDEBAR CONTACTO -->
  <div class="prop-detail-sidebar">
    <div style="font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:var(--terra);margin-bottom:20px;">Contactar por esta propiedad</div>
    <div style="font-family:'Cormorant Garamond',serif;font-size:clamp(22px,2.8vw,34px);font-weight:300;font-style:italic;color:var(--cream);line-height:1.1;margin-bottom:28px;">¿Te interesa esta vivienda?</div>

    <?php if (!empty($_GET['sent'])): ?>
    <div style="background:#2a7a4b;padding:16px;font-size:14px;color:#fff;margin-bottom:20px;">✓ Mensaje enviado — te contactamos pronto</div>
    <?php endif; ?>

    <form method="POST" action="/api/contacto-propiedad.php">
      <input type="hidden" name="propiedad_id"    value="<?= htmlspecialchars($prop['id']) ?>">
      <input type="hidden" name="propiedad_titulo" value="<?= htmlspecialchars($prop['titulo']) ?>">
      <div style="margin-bottom:16px;border-bottom:1px solid rgba(244,237,230,.12);"><input class="form-input" type="text"  name="nombre"  placeholder="Nombre y apellidos" required style="color:var(--cream);"></div>
      <div style="margin-bottom:16px;border-bottom:1px solid rgba(244,237,230,.12);"><input class="form-input" type="tel"   name="telefono" placeholder="Teléfono" style="color:var(--cream);"></div>
      <div style="margin-bottom:16px;border-bottom:1px solid rgba(244,237,230,.12);"><input class="form-input" type="email" name="email"    placeholder="Correo electrónico" style="color:var(--cream);"></div>
      <div style="margin-bottom:20px;border-bottom:1px solid rgba(244,237,230,.12);">
        <textarea class="form-textarea" name="mensaje" placeholder="Me interesa esta propiedad. ¿Podemos hablar?" style="color:var(--cream);height:90px;"></textarea>
      </div>
      <div class="form-check" style="margin-bottom:20px;">
        <input type="checkbox" id="priv-prop" name="privacidad" required>
        <label for="priv-prop" style="color:rgba(244,237,230,.35);font-size:11px;">Acepto la <a href="/privacidad.php" style="color:rgba(244,237,230,.5);">política de privacidad</a></label>
      </div>
      <button type="submit" class="form-submit">Solicitar información</button>
    </form>

    <div style="margin-top:24px;padding-top:24px;border-top:1px solid rgba(255,255,255,.06);">
      <a href="tel:<?= CONTACT_PHONE ?>" style="display:flex;align-items:center;gap:10px;text-decoration:none;color:rgba(244,237,230,.5);font-size:13px;margin-bottom:10px;">
        <span style="color:var(--terra);">✆</span> <?= chunk_split(CONTACT_PHONE, 3, ' ') ?>
      </a>
      <a href="https://wa.me/<?= CONTACT_WHATSAPP ?>?text=Hola,%20me%20interesa%20la%20propiedad%20<?= urlencode($prop['ref']) ?>" target="_blank" style="display:flex;align-items:center;gap:10px;text-decoration:none;color:rgba(244,237,230,.5);font-size:13px;">
        <span style="color:var(--terra);">●</span> WhatsApp directo
      </a>
    </div>
  </div>
</div>

<!-- PROPIEDADES SIMILARES -->
<?php if (!empty($similares)): ?>
<section class="sec-dark">
  <div class="sec-header">
    <h2 class="sec-title rv">Propiedades similares</h2>
    <a href="/comprar.php" class="sec-link">Ver todas →</a>
  </div>
  <div class="prop-grid">
    <?php foreach ($similares as $s): $img = htmlspecialchars($s['fotos'][0] ?? ''); ?>
    <div class="prop-card rv" data-id="<?= $s['id'] ?>" style="cursor:pointer;" onclick="window.location.href='/propiedad.php?id=<?= $s['id'] ?>'">
      <div class="prop-card-bg" style="background-image:url('<?= $img ?>')"></div>
      <div class="prop-card-veil"></div>
      <div class="prop-badge"><?= htmlspecialchars($s['badge']) ?></div>
      <div class="prop-body">
        <div class="prop-zone"><?= htmlspecialchars($s['zona']) ?></div>
        <div class="prop-name"><?= htmlspecialchars($s['titulo']) ?></div>
        <div class="prop-attrs"><?= $s['hab'] ?> hab · <?= $s['banos'] ?> baños · <?= $s['m2'] ?> m²</div>
        <div class="prop-price"><?= htmlspecialchars($s['precio']) ?></div>
      </div>
    </div>
    <?php endforeach; ?>
  </div>
</section>
<?php endif; ?>

<?php include 'includes/footer.php'; ?>
<script src="/js/app.js"></script>
<script src="/js/lightbox.js"></script>
<script src="/js/comparador.js"></script>
</body>
</html>

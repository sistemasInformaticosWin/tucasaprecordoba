<?php
/* Marca el link activo */
function nav_active(string $page): string {
    global $current_page;
    return ($current_page ?? '') === $page ? ' class="active"' : '';
}
function drop_active(array $pages): string {
    global $current_page;
    return in_array($current_page ?? '', $pages, true) ? ' class="active"' : '';
}
?>

<!-- MOBILE NAV -->
<div class="nav-mobile" id="nav-mobile">
  <a href="/index.php"<?= nav_active('index') ?>>Inicio</a>
  <a href="/comprar.php"<?= nav_active('comprar') ?>>Comprar</a>
  <a href="/exclusivas.php"<?= nav_active('exclusivas') ?>>Exclusivas</a>
  <a href="/lofts.php"<?= nav_active('lofts') ?>>Lofts</a>
  <a href="/vender.php"<?= nav_active('vender') ?>>Vender</a>
  <a href="/tour-virtual.php"<?= nav_active('tour-virtual') ?>>Tour Virtual</a>
  <a href="/zonas.php"<?= nav_active('zonas') ?>>Zonas</a>
  <a href="/sobre-nosotros.php"<?= nav_active('sobre-nosotros') ?>>Sobre Nosotros</a>
  <a href="/blog.php"<?= nav_active('blog') ?>>Blog</a>
  <a href="/contacto.php" class="nav-mobile-cta">Contacto</a>
  <div class="nav-mobile-phone"><?= CONTACT_PHONE ?></div>
</div>

<!-- NAV -->
<nav id="nav">
  <a class="logo" href="/index.php">
    <img src="<?= SITE_LOGO ?>" alt="<?= SITE_NAME ?>" class="logo-img">
  </a>

  <div class="nl">
    <a href="/index.php"<?= nav_active('index') ?>>Inicio</a>

    <div class="nl-drop"<?= drop_active(['comprar','exclusivas','lofts']) ?>>
      <a href="/comprar.php"<?= nav_active('comprar') ?>>Comprar <span class="nl-caret">▾</span></a>
      <div class="nl-dd-wrap">
        <div class="nl-dd">
          <a href="/exclusivas.php"<?= nav_active('exclusivas') ?>>Exclusivas</a>
          <a href="/lofts.php"<?= nav_active('lofts') ?>>Lofts</a>
        </div>
      </div>
    </div>

    <div class="nl-drop"<?= drop_active(['vender','tour-virtual']) ?>>
      <a href="/vender.php"<?= nav_active('vender') ?>>Vender <span class="nl-caret">▾</span></a>
      <div class="nl-dd-wrap">
        <div class="nl-dd">
          <a href="/tour-virtual.php"<?= nav_active('tour-virtual') ?>>Tour Virtual</a>
        </div>
      </div>
    </div>

    <a href="/zonas.php"<?= nav_active('zonas') ?>>Zonas</a>
    <a href="/sobre-nosotros.php"<?= nav_active('sobre-nosotros') ?>>Sobre Nosotros</a>
    <a href="/blog.php"<?= nav_active('blog') ?>>Blog</a>
  </div>

  <div class="nr">
    <a href="tel:<?= CONTACT_PHONE ?>" class="n-phone"><?= chunk_split(CONTACT_PHONE, 3, ' ') ?></a>
    <div class="n-div"></div>
    <a href="/contacto.php" class="n-cta">Contacto</a>
  </div>

  <button class="nav-burger" id="nav-burger" aria-label="Abrir menú">
    <span></span><span></span><span></span>
  </button>
</nav>

<!-- PILL -->
<div class="pill" id="pill">
  <a class="pb on" href="tel:<?= CONTACT_PHONE ?>">Llámanos</a>
  <div class="ps"></div>
  <a class="pb" href="/contacto.php">Contacto</a>
  <div class="ps"></div>
  <a class="pb" href="https://wa.me/<?= CONTACT_WHATSAPP ?>" target="_blank">WhatsApp</a>
</div>

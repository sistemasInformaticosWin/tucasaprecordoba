<footer>
  <div class="foot-grid">
    <div class="f-brand">
      <a href="/index.php" class="f-brand-logo">
        <img src="<?= SITE_LOGO ?>" alt="<?= SITE_NAME ?>" class="f-logo-img">
      </a>
      <p>Ayudamos a comprar, vender y alquilar inmuebles en toda Córdoba con un servicio profesional, transparente y adaptado a cada persona.</p>
    </div>
    <div class="f-col">
      <div class="f-col-t">Navegación</div>
      <ul>
        <li><a href="/index.php">Inicio</a></li>
        <li><a href="/comprar.php">Comprar</a></li>
        <li><a href="/exclusivas.php">Exclusivas</a></li>
        <li><a href="/lofts.php">Lofts</a></li>
        <li><a href="/vender.php">Vender</a></li>
        <li><a href="/zonas.php">Guía de zonas</a></li>
        <li><a href="/blog.php">Blog</a></li>
      </ul>
    </div>
    <div class="f-col">
      <div class="f-col-t">Servicios</div>
      <ul>
        <li><a href="/tour-virtual.php">Tour Virtual</a></li>
        <li><a href="<?= VALORACION_URL ?>" target="_blank">Valoración gratuita</a></li>
        <li><a href="/exclusivas.php">Viviendas exclusivas</a></li>
        <li><a href="/lofts.php">Lofts</a></li>
        <li><a href="/sobre-nosotros.php">Asesoramiento</a></li>
      </ul>
    </div>
    <div class="f-col">
      <div class="f-col-t">Contacto</div>
      <ul>
        <li><a href="tel:<?= CONTACT_PHONE ?>"><?= chunk_split(CONTACT_PHONE, 3, ' ') ?></a></li>
        <li><a href="https://wa.me/<?= CONTACT_WHATSAPP ?>" target="_blank">WhatsApp</a></li>
        <li><a href="/contacto.php">Enviar mensaje</a></li>
        <li><a href="/sobre-nosotros.php">Trabaja con nosotros</a></li>
        <li><a href="/sobre-nosotros.php">Sobre nosotros</a></li>
      </ul>
    </div>
  </div>
  <div class="foot-b">
    <div class="f-legal">© <?= date('Y') ?> <?= SITE_NAME ?> · <a href="/privacidad.php" style="color:inherit">Privacidad</a> · <a href="/aviso-legal.php" style="color:inherit">Aviso legal</a> · <a href="/cookies.php" style="color:inherit">Cookies</a></div>
    <div class="f-social">
      <a href="<?= INSTAGRAM_URL ?>" target="_blank">Instagram</a>
      <a href="<?= FACEBOOK_URL ?>" target="_blank">Facebook</a>
      <a href="<?= LINKEDIN_URL ?>" target="_blank">LinkedIn</a>
      <a href="<?= YOUTUBE_URL ?>" target="_blank">YouTube</a>
    </div>
  </div>
</footer>

<script src="/js/app.js"></script>
</body>
</html>

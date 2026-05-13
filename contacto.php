<?php
require_once 'includes/config.php';

$current_page = 'contacto';
$page_title   = 'Contacto — ' . SITE_NAME;
$page_desc    = 'Estamos aquí para ayudarte. 8 oficinas en Córdoba y Málaga.';

/* ── Procesar formulario ── */
$sent = false;
$error = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre   = htmlspecialchars(trim($_POST['nombre']   ?? ''));
    $telefono = htmlspecialchars(trim($_POST['telefono'] ?? ''));
    $email    = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
    $mensaje  = htmlspecialchars(trim($_POST['mensaje']  ?? ''));
    $priv     = !empty($_POST['privacidad']);

    if ($nombre && $email && $priv) {
        $asunto  = "Nuevo contacto web — $nombre";
        $cuerpo  = "Nombre: $nombre\nTeléfono: $telefono\nEmail: $email\n\nMensaje:\n$mensaje";
        $headers = "From: noreply@tucasacordoba.com\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8";
        $sent    = mail(CONTACT_EMAIL, $asunto, $cuerpo, $headers);
    } else {
        $error = true;
    }
}

include 'includes/head.php';
include 'includes/header.php';
?>

<section class="page-hero" style="min-height:42vh;">
  <div class="page-hero-bg" style="background-image:url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&q=90')"></div>
  <div class="page-hero-veil"></div>
  <div class="page-hero-body">
    <div class="page-tag">Contacto</div>
    <h1 class="page-h1">Hablemos.</h1>
    <p class="page-sub">8 oficinas en Córdoba y Málaga. Llámanos, escríbenos o pásate cuando quieras.</p>
  </div>
</section>

<!-- FORMULARIO + INFO -->
<div class="contact-layout">
  <div class="contact-form-side">
    <div class="val-tag rv">Escríbenos</div>
    <h2 class="val-h rv d1" style="font-size:clamp(34px,4vw,52px);">¿En qué<br>podemos<br>ayudarte?</h2>

    <?php if ($sent): ?>
    <div style="background:#2a7a4b;padding:20px;color:#fff;font-family:'Cormorant Garamond',serif;font-size:19px;margin-top:28px;">
      ✓ Mensaje enviado — te contactamos en menos de 24 horas.
    </div>
    <?php elseif ($error): ?>
    <div style="background:var(--terra);padding:20px;color:#fff;font-size:14px;margin-top:28px;">
      Por favor, rellena todos los campos obligatorios.
    </div>
    <?php endif; ?>

    <form method="POST" action="/contacto.php" style="margin-top:32px;" class="rv d2">
      <div class="form-row"><input class="form-input" type="text"  name="nombre"   placeholder="Nombre y apellidos" required value="<?= htmlspecialchars($_POST['nombre'] ?? '') ?>"></div>
      <div class="form-row"><input class="form-input" type="tel"   name="telefono" placeholder="Teléfono"            value="<?= htmlspecialchars($_POST['telefono'] ?? '') ?>"></div>
      <div class="form-row"><input class="form-input" type="email" name="email"    placeholder="Correo electrónico"  required value="<?= htmlspecialchars($_POST['email'] ?? '') ?>"></div>
      <div class="form-row"><textarea class="form-textarea" name="mensaje" placeholder="Tu mensaje…" rows="4"><?= htmlspecialchars($_POST['mensaje'] ?? '') ?></textarea></div>
      <div class="form-check">
        <input type="checkbox" id="privacidad" name="privacidad" required <?= !empty($_POST['privacidad']) ? 'checked' : '' ?>>
        <label for="privacidad">He leído y acepto la <a href="/privacidad.php">política de privacidad</a> y el tratamiento de mis datos para gestionar mi consulta.</label>
      </div>
      <button type="submit" class="form-submit">Enviar mensaje</button>
    </form>
  </div>

  <div class="contact-info-side">
    <div class="contact-info-item rv">
      <div class="contact-info-label">Teléfono principal</div>
      <div class="contact-info-value"><a href="tel:<?= CONTACT_PHONE ?>"><?= chunk_split(CONTACT_PHONE, 3, ' ') ?></a></div>
    </div>
    <div class="contact-info-item rv d1">
      <div class="contact-info-label">WhatsApp</div>
      <div class="contact-info-value" style="font-size:24px;"><a href="https://wa.me/<?= CONTACT_WHATSAPP ?>" target="_blank">744 74 49 10</a></div>
    </div>
    <div class="contact-info-item rv d2">
      <div class="contact-info-label">Horario</div>
      <div class="contact-info-value" style="font-size:20px;">Lun–Vie<br>9:30–14:00 · 16:00–20:00</div>
    </div>
    <div class="rv d3">
      <div class="contact-info-label" style="margin-bottom:14px;">Síguenos</div>
      <div class="contact-social" style="gap:10px;flex-wrap:wrap;">
        <a href="<?= INSTAGRAM_URL ?>" target="_blank" title="Instagram" style="width:56px;height:56px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(244,237,230,.15);color:rgba(244,237,230,.5);text-decoration:none;transition:all .2s;" onmouseover="this.style.borderColor='#ea0f01';this.style.color='#ea0f01'" onmouseout="this.style.borderColor='rgba(244,237,230,.15)';this.style.color='rgba(244,237,230,.5)'">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
        </a>
        <a href="<?= FACEBOOK_URL ?>" target="_blank" title="Facebook" style="width:56px;height:56px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(244,237,230,.15);color:rgba(244,237,230,.5);text-decoration:none;transition:all .2s;" onmouseover="this.style.borderColor='#ea0f01';this.style.color='#ea0f01'" onmouseout="this.style.borderColor='rgba(244,237,230,.15)';this.style.color='rgba(244,237,230,.5)'">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        </a>
        <a href="<?= LINKEDIN_URL ?>" target="_blank" title="LinkedIn" style="width:56px;height:56px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(244,237,230,.15);color:rgba(244,237,230,.5);text-decoration:none;transition:all .2s;" onmouseover="this.style.borderColor='#ea0f01';this.style.color='#ea0f01'" onmouseout="this.style.borderColor='rgba(244,237,230,.15)';this.style.color='rgba(244,237,230,.5)'">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
        <a href="<?= YOUTUBE_URL ?>" target="_blank" title="YouTube" style="width:56px;height:56px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(244,237,230,.15);color:rgba(244,237,230,.5);text-decoration:none;transition:all .2s;" onmouseover="this.style.borderColor='#ea0f01';this.style.color='#ea0f01'" onmouseout="this.style.borderColor='rgba(244,237,230,.15)';this.style.color='rgba(244,237,230,.5)'">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
        </a>
      </div>
    </div>
  </div>
</div>

<!-- OFICINAS -->
<section class="sec-cream">
  <div class="sec-header light">
    <h2 class="sec-title rv" style="color:var(--ink)">Nuestras oficinas</h2>
    <p class="sec-sub rv d1" style="color:rgba(10,8,7,.5)">Encuéntranos en tu barrio.</p>
  </div>
  <div class="office-cards">
    <?php
    $oficinas = [
      ['01','Santa Rosa','c/ Santa Rosa, 6<br>Córdoba','957089797','957 08 97 97','34744744910','WhatsApp 744 74 49 10'],
      ['02','Zona Sur','Avd. de Cádiz, 59<br>Córdoba','957077000','957 077 000','34654765431','WhatsApp 654 76 54 31'],
      ['03','Levante Sur','Avda. Barcelona, 11<br>Córdoba','957891212','957 89 12 12','34744749762','WhatsApp 744 74 97 62'],
      ['04','Arroyo del Moro','Glorieta Amadora, 2<br>Córdoba','957390514','957 39 05 14',null,'Contactar →'],
      ['05','Ciudad Jardín','Alcalde Sanz Noguer, 1<br>Córdoba','957193644','957 19 36 44',null,'Contactar →'],
      ['06','Fátima','Avda. Virgen de Fátima, 30<br>Córdoba','957393399','957 39 33 99',null,'Contactar →'],
      ['07','Centro Córdoba','Cruz Conde, 24<br>14001 Córdoba','957080310','957 080 310',null,'Oficina principal'],
      ['08','Málaga','Héroe de Sostoa, 136<br>29003 Málaga','951158350','95 11 58 350',null,'Contactar →'],
    ];
    foreach ($oficinas as [$num,$nombre,$addr,$tel_raw,$tel,$wa,$wa_label]): ?>
    <div class="office-card rv">
      <div class="office-card-n"><?= $num ?></div>
      <div class="office-card-name"><?= $nombre ?></div>
      <div class="office-card-addr"><?= $addr ?></div>
      <a class="office-card-phone" href="tel:<?= $tel_raw ?>"><?= $tel ?></a>
      <?php if ($wa): ?>
      <a class="office-card-wa" href="https://wa.me/<?= $wa ?>" target="_blank"><?= $wa_label ?></a>
      <?php else: ?>
      <a class="office-card-wa" href="/contacto.php"><?= $wa_label ?></a>
      <?php endif; ?>
    </div>
    <?php endforeach; ?>
  </div>
</section>

<!-- MAPA -->
<div class="map-section">
  <div class="map-wrap rv">
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3150!2d-4.7816!3d37.8882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6d0044f7e4e4e5%3A0x1!2sCalle+Cruz+Conde%2C+24%2C+C%C3%B3rdoba!5e0!3m2!1ses!2ses!4v1700000000000" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  </div>
</div>

<?php include 'includes/footer.php'; ?>
<script src="/js/app.js"></script>
</body>
</html>

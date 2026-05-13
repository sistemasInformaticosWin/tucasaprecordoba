<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="<?= htmlspecialchars($page_desc ?? SITE_DESC) ?>">
<meta property="og:title" content="<?= htmlspecialchars($page_title ?? SITE_NAME) ?>">
<meta property="og:description" content="<?= htmlspecialchars($page_desc ?? SITE_DESC) ?>">
<meta property="og:type" content="website">
<meta property="og:url" content="<?= SITE_URL . '/' . ($page_file ?? '') ?>">
<meta property="og:image" content="<?= $og_image ?? SITE_LOGO ?>">
<meta name="twitter:card" content="summary_large_image">
<title><?= htmlspecialchars($page_title ?? SITE_NAME) ?></title>
<link rel="icon" href="/favicon.ico" type="image/x-icon">
<link rel="manifest" href="/manifest.json">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/styles.css">
</head>
<body data-page="<?= htmlspecialchars($current_page ?? 'index') ?>">
<script>
/* Skeleton inmediato — se ejecuta antes de renderizar el body */
(function(){
  var css = document.createElement('style');
  css.textContent = '#sk-early{position:fixed;inset:0;z-index:99991;background:#0a0807;display:flex;flex-direction:column;}' +
    '.ske{background:linear-gradient(90deg,rgba(255,255,255,.04)25%,rgba(255,255,255,.10)50%,rgba(255,255,255,.04)75%);background-size:200% 100%;animation:sksh 1.6s linear infinite;}' +
    '@keyframes sksh{0%{background-position:200% 0}100%{background-position:-200% 0}}' +
    '.ske-nav{height:100px;flex-shrink:0;background:rgba(20,18,16,.95);border-bottom:1px solid rgba(255,255,255,.06);display:flex;align-items:center;padding:0 52px;gap:24px;}';
  document.head.appendChild(css);

  var el = document.createElement('div');
  el.id = 'sk-early';
  el.innerHTML =
    '<div class="ske-nav">' +
      '<div class="ske" style="width:80px;height:44px;border-radius:2px;flex-shrink:0;"></div>' +
      '<div style="flex:1;display:flex;justify-content:center;gap:32px;">' +
        '<div class="ske" style="width:52px;height:10px;border-radius:2px;"></div>' +
        '<div class="ske" style="width:52px;height:10px;border-radius:2px;"></div>' +
        '<div class="ske" style="width:52px;height:10px;border-radius:2px;"></div>' +
        '<div class="ske" style="width:52px;height:10px;border-radius:2px;"></div>' +
        '<div class="ske" style="width:52px;height:10px;border-radius:2px;"></div>' +
      '</div>' +
      '<div class="ske" style="width:96px;height:36px;border-radius:2px;"></div>' +
    '</div>' +
    '<div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;padding:0 52px 80px;gap:16px;">' +
      '<div class="ske" style="width:120px;height:10px;border-radius:2px;"></div>' +
      '<div class="ske" style="width:58%;height:clamp(52px,7vw,88px);border-radius:2px;"></div>' +
      '<div class="ske" style="width:44%;height:clamp(52px,7vw,88px);border-radius:2px;"></div>' +
      '<div class="ske" style="width:42%;height:18px;border-radius:2px;margin-top:8px;"></div>' +
      '<div style="display:flex;gap:12px;margin-top:8px;">' +
        '<div class="ske" style="width:160px;height:46px;border-radius:2px;"></div>' +
        '<div class="ske" style="width:160px;height:46px;border-radius:2px;opacity:.4;"></div>' +
      '</div>' +
    '</div>';

  /* Insertar al principio del body en cuanto esté disponible */
  if (document.body) {
    document.body.insertBefore(el, document.body.firstChild);
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      document.body.insertBefore(el, document.body.firstChild);
    });
  }
})();
</script>

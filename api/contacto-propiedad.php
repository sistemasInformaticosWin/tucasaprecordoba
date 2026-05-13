<?php
require_once __DIR__ . '/../includes/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /comprar.php');
    exit;
}

$nombre    = htmlspecialchars(trim($_POST['nombre']           ?? ''));
$telefono  = htmlspecialchars(trim($_POST['telefono']         ?? ''));
$email     = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$mensaje   = htmlspecialchars(trim($_POST['mensaje']          ?? ''));
$prop_id   = htmlspecialchars(trim($_POST['propiedad_id']     ?? ''));
$prop_tit  = htmlspecialchars(trim($_POST['propiedad_titulo'] ?? ''));
$priv      = !empty($_POST['privacidad']);

if (!$nombre || !$email || !$priv) {
    header('Location: /propiedad.php?id=' . urlencode($prop_id) . '&error=1');
    exit;
}

$asunto = "Interés en propiedad $prop_id — $nombre";
$cuerpo = "Propiedad: $prop_tit (ID: $prop_id)\n\nNombre: $nombre\nTeléfono: $telefono\nEmail: $email\n\nMensaje:\n$mensaje";
$headers = "From: noreply@tucasacordoba.com\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8";

mail(CONTACT_EMAIL, $asunto, $cuerpo, $headers);

header('Location: /propiedad.php?id=' . urlencode($prop_id) . '&sent=1');
exit;

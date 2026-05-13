<?php
require_once __DIR__ . '/../includes/config.php';

/* ═══════════════════════════════════════════════════════════
   api/inmovilla.php — Integración API Inmovilla via cURL
   ═══════════════════════════════════════════════════════════ */

/**
 * Petición base a la API
 */
function inmovilla_request(string $endpoint, array $params = []): ?array {
    $url = INMOVILLA_BASE . $endpoint;
    if ($params) $url .= '?' . http_build_query($params);

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 10,
        CURLOPT_HTTPHEADER     => [
            'Authorization: Bearer ' . INMOVILLA_KEY,
            'X-Agency-Code: '        . INMOVILLA_AGENCY,
            'Accept: application/json',
            'Accept-Language: '      . INMOVILLA_LANG,
        ],
    ]);

    $body = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($body === false || $code !== 200) return null;
    return json_decode($body, true);
}

/**
 * Normaliza una propiedad Inmovilla al formato interno
 */
function inmovilla_normalize(array $raw): array {
    return [
        'id'          => (string)($raw['id'] ?? ''),
        'badge'       => !empty($raw['exclusiva']) ? 'Exclusiva' : (!empty($raw['nueva_construccion']) ? 'Nueva' : 'En venta'),
        'precio'      => number_format($raw['precio'] ?? 0, 0, ',', '.') . '€',
        'precio_num'  => (int)($raw['precio'] ?? 0),
        'titulo'      => $raw['titulo'] ?? ($raw['tipo'] ?? 'Propiedad'),
        'zona'        => trim(($raw['zona'] ?? '') . ' · ' . ($raw['localidad'] ?? '')),
        'ref'         => $raw['referencia'] ?? '',
        'hab'         => (int)($raw['habitaciones'] ?? 0),
        'banos'       => (int)($raw['banos'] ?? 0),
        'm2'          => (int)($raw['metros'] ?? 0),
        'm2parcela'   => (int)($raw['metros_parcela'] ?? 0),
        'tipo'        => strtolower($raw['tipo'] ?? 'casa'),
        'fotos'       => array_column($raw['fotos'] ?? [], 'url'),
        'descripcion' => $raw['descripcion'] ?? '',
        'caracteristicas' => array_values(array_filter([
            !empty($raw['garaje'])    ? 'Garaje' : null,
            !empty($raw['piscina'])   ? 'Piscina' : null,
            !empty($raw['jardin'])    ? 'Jardín' : null,
            !empty($raw['ascensor'])  ? 'Ascensor' : null,
            !empty($raw['terraza'])   ? 'Terraza' : null,
            !empty($raw['cert_energetica']) ? 'Cert. ' . $raw['cert_energetica'] : null,
        ])),
    ];
}

/* ── MÉTODOS PÚBLICOS ── */

function api_get_properties(array $filters = []): array {
    $params = array_merge(['per_page' => 12, 'page' => 1], $filters);
    $data   = inmovilla_request('/properties', $params);
    if (!$data) return [];
    $items = $data['data'] ?? $data['properties'] ?? $data ?? [];
    return array_map('inmovilla_normalize', $items);
}

function api_get_property(string $id): ?array {
    $data = inmovilla_request('/properties/' . urlencode($id));
    return $data ? inmovilla_normalize($data) : null;
}

function api_get_featured(): array {
    return api_get_properties(['destacada' => 1]);
}

function api_get_exclusivas(): array {
    return api_get_properties(['exclusiva' => 1]);
}

function api_get_lofts(): array {
    return api_get_properties(['tipo' => 'loft']);
}

/* ── HELPER: obtiene propiedad con fallback a datos locales ── */
function get_property_with_fallback(string $id): ?array {
    // 1. Intentar API
    if (INMOVILLA_KEY !== 'TU_API_KEY') {
        $prop = api_get_property($id);
        if ($prop) return $prop;
    }
    // 2. Fallback a datos locales
    require_once __DIR__ . '/../data/properties.php';
    return get_property_by_id($id);
}

function get_properties_with_fallback(array $filters = []): array {
    if (INMOVILLA_KEY !== 'TU_API_KEY') {
        $props = api_get_properties($filters);
        if ($props) return $props;
    }
    require_once __DIR__ . '/../data/properties.php';
    return filter_properties($filters);
}

<?php
/* ═══════════════════════════════════════════════════════════
   data/properties.php — Base de datos local de propiedades
   Cuando la API de Inmovilla esté activa este archivo se
   usa solo como fallback.
   ═══════════════════════════════════════════════════════════ */

$PROPERTIES = [
  [
    'id'          => 'tcc-001',
    'badge'       => 'Exclusiva',
    'precio'      => '410.000€',
    'precio_num'  => 410000,
    'titulo'      => 'Villa con piscina infinita y jardín privado',
    'zona'        => 'Arroyo del Moro · Córdoba',
    'ref'         => 'TCC-001',
    'hab'         => 5,
    'banos'       => 3,
    'm2'          => 250,
    'm2parcela'   => 500,
    'tipo'        => 'chalet',
    'fotos'       => [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1400&q=90',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80',
    ],
    'descripcion' => 'Excepcional villa en la exclusiva zona de Arroyo del Moro con piscina de borde infinito y amplio jardín privado. La vivienda combina materiales de primera calidad con una distribución moderna y funcional. La planta baja alberga un gran salón-comedor diáfano con acceso directo al jardín, cocina de diseño totalmente equipada y dormitorio de invitados con baño privado. En la planta superior, cuatro amplias habitaciones con la suite principal en suite completa. Garaje para dos vehículos. Certificación energética A.',
    'caracteristicas' => ['Garaje · 2 plazas', 'Piscina infinita', 'Jardín 500 m²', 'Aire acondicionado', 'Calefacción central', 'Certificación A', 'Orientación sur', 'Armarios empotrados'],
  ],
  [
    'id'          => 'tcc-002',
    'badge'       => 'Destacada',
    'precio'      => '325.000€',
    'precio_num'  => 325000,
    'titulo'      => 'Casa moderna en el corazón de Córdoba',
    'zona'        => 'Santa Rosa · Córdoba',
    'ref'         => 'TCC-002',
    'hab'         => 4,
    'banos'       => 2,
    'm2'          => 180,
    'm2parcela'   => 220,
    'tipo'        => 'casa',
    'fotos'       => [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=90',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=700&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700&q=80',
    ],
    'descripcion' => 'Excepcional vivienda completamente reformada en el corazón de Santa Rosa. Materiales de primera calidad: suelos de microcemento, cocina de diseño con electrodomésticos Bosch, baños con grifería de alta gama. La distribución aprovecha al máximo la luz natural. Terraza privada con vistas. A 5 minutos andando del centro histórico.',
    'caracteristicas' => ['Garaje incluido', 'Terraza privada', 'Cocina Bosch equipada', 'Aire acondicionado', 'Suelo microcemento', 'Certificación B', 'Orientación sur', 'Reformada 2022'],
  ],
  [
    'id'          => 'tcc-003',
    'badge'       => 'Nueva',
    'precio'      => '285.000€',
    'precio_num'  => 285000,
    'titulo'      => 'Ático con vistas panorámicas sobre Córdoba',
    'zona'        => 'Ciudad Jardín · Córdoba',
    'ref'         => 'TCC-003',
    'hab'         => 3,
    'banos'       => 2,
    'm2'          => 120,
    'm2parcela'   => 0,
    'tipo'        => 'atico',
    'fotos'       => [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=90',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=80',
    ],
    'descripcion' => 'Impresionante ático en Ciudad Jardín con vistas panorámicas sobre Córdoba. Gran terraza de 40 m² orientada al sur. Distribución de tres habitaciones, dos baños completos y salón-comedor con doble altura. Cocina americana totalmente equipada. Acabados de lujo.',
    'caracteristicas' => ['Terraza 40 m²', 'Vistas panorámicas', 'Doble altura en salón', 'Cocina americana', 'Garaje comunitario', 'Certificación B', 'Orientación sur', 'Año 2021'],
  ],
  [
    'id'          => 'tcc-004',
    'badge'       => 'En venta',
    'precio'      => '189.000€',
    'precio_num'  => 189000,
    'titulo'      => 'Piso reformado con terraza en Levante Sur',
    'zona'        => 'Levante Sur · Córdoba',
    'ref'         => 'TCC-004',
    'hab'         => 3,
    'banos'       => 1,
    'm2'          => 95,
    'm2parcela'   => 0,
    'tipo'        => 'piso',
    'fotos'       => [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=90',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
    ],
    'descripcion' => 'Piso completamente reformado en Levante Sur con terraza privada. Reforma integral 2023. Tres habitaciones, baño renovado, cocina nueva equipada y salón luminoso con salida a terraza. Edificio con ascensor. Excelente comunicación con el centro.',
    'caracteristicas' => ['Terraza privada', 'Reforma integral 2023', 'Cocina equipada', 'Ascensor', 'Aire acondicionado', 'Certificación C', 'Orientación este', '3ª planta'],
  ],
  [
    'id'          => 'tcc-005',
    'badge'       => 'Exclusiva',
    'precio'      => '365.000€',
    'precio_num'  => 365000,
    'titulo'      => 'Casa con jardín privado y garaje doble',
    'zona'        => 'Zona Sur · Córdoba',
    'ref'         => 'TCC-005',
    'hab'         => 4,
    'banos'       => 3,
    'm2'          => 220,
    'm2parcela'   => 350,
    'tipo'        => 'casa',
    'fotos'       => [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=90',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=700&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80',
    ],
    'descripcion' => 'Magnífica casa unifamiliar en Zona Sur con jardín y garaje doble. Cuatro habitaciones, tres baños completos y aseo de cortesía. Salón comedor con acceso al jardín y zona de barbacoa. Posibilidad de instalar piscina.',
    'caracteristicas' => ['Jardín 350 m²', 'Garaje doble', 'Zona barbacoa', 'Posibilidad piscina', 'Calefacción', 'Aire acondicionado', 'Certificación C', 'Orientación suroeste'],
  ],
  [
    'id'          => 'tcc-006',
    'badge'       => 'Exclusiva',
    'precio'      => '165.000€',
    'precio_num'  => 165000,
    'titulo'      => 'Loft singular a pie de calle con patio interior',
    'zona'        => 'Fátima · Córdoba',
    'ref'         => 'TCC-006',
    'hab'         => 1,
    'banos'       => 1,
    'm2'          => 68,
    'm2parcela'   => 0,
    'tipo'        => 'loft',
    'fotos'       => [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1400&q=90',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=700&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80',
    ],
    'descripcion' => 'Loft único en el barrio de Fátima. Planta diáfana de 68 m² con techos de 3,5 metros, cocina integrada y patio interior privado. Suelo de cemento pulido, ladrillo visto restaurado y grandes ventanales. Alto potencial de revalorización.',
    'caracteristicas' => ['Patio interior privado', 'Techos 3,5 m', 'Suelo cemento pulido', 'Ladrillo visto', 'Cocina integrada', 'Certificación D', 'Planta baja', 'Reformado 2023'],
  ],
  [
    'id'          => 'tcc-007',
    'badge'       => 'Nueva',
    'precio'      => '298.000€',
    'precio_num'  => 298000,
    'titulo'      => 'Unifamiliar con patio andaluz restaurado',
    'zona'        => 'Santa Rosa · Córdoba',
    'ref'         => 'TCC-007',
    'hab'         => 4,
    'banos'       => 2,
    'm2'          => 185,
    'm2parcela'   => 180,
    'tipo'        => 'casa',
    'fotos'       => [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1400&q=90',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=700&q=80',
    ],
    'descripcion' => 'Preciosa vivienda unifamiliar con patio andaluz restaurado. Combina arquitectura tradicional cordobesa con reforma moderna y funcional. Patio central con fuente original. Cuatro habitaciones, cocina renovada y dos baños completos.',
    'caracteristicas' => ['Patio andaluz original', 'Fuente interior', 'Reforma integral', 'Techos altos', 'Vigas de madera', 'Certificación C', 'Orientación sur', 'Reformada 2024'],
  ],
];

/**
 * Busca una propiedad por ID
 */
function get_property_by_id(string $id): ?array {
    global $PROPERTIES;
    foreach ($PROPERTIES as $p) {
        if ($p['id'] === $id) return $p;
    }
    return null;
}

/**
 * Filtra propiedades por criterios
 */
function filter_properties(array $filters = []): array {
    global $PROPERTIES;
    return array_values(array_filter($PROPERTIES, function($p) use ($filters) {
        if (!empty($filters['tipo'])   && $p['tipo'] !== $filters['tipo'])           return false;
        if (!empty($filters['max'])    && $p['precio_num'] > (int)$filters['max'])   return false;
        if (!empty($filters['min_hab'])&& $p['hab'] < (int)$filters['min_hab'])      return false;
        return true;
    }));
}

/**
 * Render de una tarjeta bento
 */
function render_bento_card(array $p, string $extra_class = ''): string {
    $foto = htmlspecialchars($p['fotos'][0] ?? '');
    return <<<HTML
<div class="bento-card {$extra_class}" data-id="{$p['id']}" data-tipo="{$p['tipo']}" data-precio="{$p['precio_num']}" data-hab="{$p['hab']}">
  <div class="bento-bg" style="background-image:url('{$foto}')"></div>
  <div class="bento-veil"></div>
  <div class="bento-badge">{$p['badge']}</div>
  <div class="bento-body">
    <div class="bento-zone">{$p['zona']}</div>
    <div class="bento-name">{$p['titulo']}</div>
    <div class="bento-attrs">{$p['hab']} hab · {$p['banos']} baños · {$p['m2']} m²</div>
    <div class="bento-price">{$p['precio']}</div>
  </div>
</div>
HTML;
}

/**
 * Render de una listing-row
 */
function render_listing_row(array $p, int $idx = 0): string {
    $foto  = htmlspecialchars($p['fotos'][0] ?? '');
    $num   = str_pad($idx + 1, 2, '0', STR_PAD_LEFT);
    $flip  = $idx % 2 !== 0 ? ' flip' : '';
    $m2p   = $p['m2parcela'] > 0 ? ' · ' . $p['m2parcela'] . ' m² parcela' : '';
    return <<<HTML
<div class="listing-row{$flip} rv" onclick="window.location.href='/propiedad.php?id={$p['id']}'" style="cursor:pointer;">
  <div class="listing-img">
    <div class="listing-img-bg" style="background-image:url('{$foto}')"></div>
  </div>
  <div class="listing-info">
    <div class="listing-num">{$num}</div>
    <div class="listing-badge">{$p['badge']}</div>
    <div class="listing-price">{$p['precio']}</div>
    <div class="listing-title">{$p['titulo']}</div>
    <div class="listing-loc">{$p['zona']}{$m2p}</div>
    <div class="listing-specs">
      <div><div class="listing-spec-v">{$p['hab']}</div><div class="listing-spec-l">Habitaciones</div></div>
      <div><div class="listing-spec-v">{$p['banos']}</div><div class="listing-spec-l">Baños</div></div>
      <div><div class="listing-spec-v">{$p['m2']}</div><div class="listing-spec-l">m²</div></div>
    </div>
    <a href="/propiedad.php?id={$p['id']}" class="listing-cta">Ver propiedad →</a>
  </div>
</div>
HTML;
}

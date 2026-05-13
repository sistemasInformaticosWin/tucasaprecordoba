/* ═══════════════════════════════════════════════════════════
   properties-data.js — Base de datos de propiedades
   Cuando integres Inmovilla, este archivo quedará obsoleto
   y lo sustituirá la API. Mientras tanto, edita aquí.
   ═══════════════════════════════════════════════════════════ */

var PROPERTIES = [
  {
    id: 'tcc-001',
    badge: 'Exclusiva',
    precio: '410.000€',
    titulo: 'Villa con piscina infinita y jardín privado',
    zona: 'Arroyo del Moro · Córdoba',
    ref: 'TCC-001',
    hab: 5, banos: 3, m2: 250, m2parcela: 500,
    fotos: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1400&q=90',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80'
    ],
    descripcion: 'Excepcional villa en la exclusiva zona de Arroyo del Moro con piscina de borde infinito y amplio jardín privado. La vivienda combina materiales de primera calidad con una distribución moderna y funcional. La planta baja alberga un gran salón-comedor diáfano con acceso directo al jardín, cocina de diseño totalmente equipada y dormitorio de invitados con baño privado. En la planta superior, cuatro amplias habitaciones con la suite principal en suite completa. Garaje para dos vehículos. Certificación energética A.',
    caracteristicas: ['Garaje · 2 plazas', 'Piscina infinita', 'Jardín privado 500 m²', 'Aire acondicionado', 'Calefacción central', 'Certificación A', 'Orientación sur', 'Armarios empotrados'],
    tipo: 'chalet', tipoLabel: 'Chalet'
  },
  {
    id: 'tcc-002',
    badge: 'Destacada',
    precio: '325.000€',
    titulo: 'Casa moderna en el corazón de Córdoba',
    zona: 'Santa Rosa · Córdoba',
    ref: 'TCC-002',
    hab: 4, banos: 2, m2: 180, m2parcela: 220,
    fotos: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=90',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=700&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700&q=80'
    ],
    descripcion: 'Excepcional vivienda completamente reformada en el corazón de Santa Rosa. Materiales de primera calidad en cada rincón: suelos de microcemento, cocina de diseño con electrodomésticos Bosch, baños con grifería de alta gama. La distribución aprovecha al máximo la luz natural en todas las estancias. Terraza privada con vistas. A 5 minutos andando del centro histórico.',
    caracteristicas: ['Garaje incluido', 'Terraza privada', 'Cocina Bosch equipada', 'Aire acondicionado', 'Suelo microcemento', 'Certificación B', 'Orientación sur', 'Reformada 2022'],
    tipo: 'casa', tipoLabel: 'Casa'
  },
  {
    id: 'tcc-003',
    badge: 'Nueva',
    precio: '285.000€',
    titulo: 'Ático con vistas panorámicas sobre Córdoba',
    zona: 'Ciudad Jardín · Córdoba',
    ref: 'TCC-003',
    hab: 3, banos: 2, m2: 120, m2parcela: 0,
    fotos: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=90',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=80'
    ],
    descripcion: 'Impresionante ático en la mejor zona de Ciudad Jardín con vistas panorámicas sobre Córdoba. Gran terraza de 40 m² orientada al sur con vistas despejadas. Distribución de tres habitaciones amplias, dos baños completos y salón-comedor con doble altura. Cocina americana abierta totalmente equipada. Acabados de lujo en toda la vivienda.',
    caracteristicas: ['Terraza 40 m²', 'Vistas panorámicas', 'Doble altura en salón', 'Cocina americana', 'Garaje comunitario', 'Certificación B', 'Orientación sur', 'Año 2021'],
    tipo: 'atico', tipoLabel: 'Ático'
  },
  {
    id: 'tcc-004',
    badge: 'En venta',
    precio: '189.000€',
    titulo: 'Piso reformado con terraza en Levante Sur',
    zona: 'Levante Sur · Córdoba',
    ref: 'TCC-004',
    hab: 3, banos: 1, m2: 95, m2parcela: 0,
    fotos: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=90',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80'
    ],
    descripcion: 'Piso completamente reformado en Levante Sur con terraza privada. Reforma integral realizada en 2023 con materiales de primera calidad. Tres habitaciones, baño renovado, cocina nueva equipada y salón luminoso con salida a terraza. Edificio con ascensor. Muy bien comunicado con el centro y con todos los servicios a pie de calle.',
    caracteristicas: ['Terraza privada', 'Reforma integral 2023', 'Cocina equipada', 'Ascensor', 'Aire acondicionado', 'Certificación C', 'Orientación este', '3ª planta'],
    tipo: 'piso', tipoLabel: 'Piso'
  },
  {
    id: 'tcc-005',
    badge: 'Exclusiva',
    precio: '365.000€',
    titulo: 'Casa con jardín privado y garaje doble',
    zona: 'Zona Sur · Córdoba',
    ref: 'TCC-005',
    hab: 4, banos: 3, m2: 220, m2parcela: 350,
    fotos: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=90',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=700&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80'
    ],
    descripcion: 'Magnífica casa unifamiliar en Zona Sur con jardín privado y garaje para dos coches. Cuatro habitaciones distribuidas en dos plantas, tres baños completos y un aseo de cortesía. La planta baja cuenta con salón comedor independiente, cocina office y acceso directo al jardín con zona de barbacoa. Posibilidad de instalar piscina en el jardín.',
    caracteristicas: ['Jardín 350 m²', 'Garaje doble', 'Zona barbacoa', 'Posibilidad piscina', 'Calefacción', 'Aire acondicionado', 'Certificación C', 'Orientación suroeste'],
    tipo: 'casa', tipoLabel: 'Casa'
  },
  {
    id: 'tcc-006',
    badge: 'Exclusiva',
    precio: '165.000€',
    titulo: 'Loft singular a pie de calle con patio interior',
    zona: 'Fátima · Córdoba',
    ref: 'TCC-006',
    hab: 1, banos: 1, m2: 68, m2parcela: 0,
    fotos: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1400&q=90',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=700&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80'
    ],
    descripcion: 'Loft único en su estilo en el barrio de Fátima. Planta diáfana de 68 m² con techos de 3,5 metros, cocina integrada de diseño y patio interior privado. Suelo de cemento pulido, paredes de ladrillo visto restaurado y grandes ventanales. Perfecto para quien busca una vivienda diferente con alto potencial de revalorización.',
    caracteristicas: ['Patio interior privado', 'Techos 3,5 m', 'Suelo cemento pulido', 'Ladrillo visto', 'Cocina integrada', 'Certificación D', 'Planta baja', 'Reformado 2023'],
    tipo: 'loft', tipoLabel: 'Loft'
  },
  {
    id: 'tcc-007',
    badge: 'Nueva',
    precio: '298.000€',
    titulo: 'Unifamiliar con patio andaluz restaurado',
    zona: 'Santa Rosa · Córdoba',
    ref: 'TCC-007',
    hab: 4, banos: 2, m2: 185, m2parcela: 180,
    fotos: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1400&q=90',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=700&q=80'
    ],
    descripcion: 'Preciosa vivienda unifamiliar con patio andaluz perfectamente restaurado. Combina los elementos arquitectónicos tradicionales cordobeses con una reforma moderna y funcional. El patio central con fuente original es el eje de la vivienda. Cuatro habitaciones distribuidas en dos plantas, cocina completamente renovada y dos baños completos. Un trozo de la Córdoba más auténtica.',
    caracteristicas: ['Patio andaluz original', 'Fuente interior', 'Reforma integral', 'Techos altos', 'Vigas de madera', 'Certificación C', 'Orientación sur', 'Reformada 2024'],
    tipo: 'casa', tipoLabel: 'Casa'
  }
];

/* Función helper para buscar por ID */
function getPropertyById(id) {
  return PROPERTIES.find(function(p) { return p.id === id; }) || null;
}

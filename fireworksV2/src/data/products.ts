export type Category =
  | 'pasteles'
  | 'volcanes'
  | 'luces'
  | 'truenos'
  | 'cohetes'
  | 'infantiles'

export type Product = {
  id: string
  name: string
  description: string
  price: number
  // Precio de costo: solo se usa en la orden interna para calcular la ganancia.
  cost: number
  image: string
  category: Category
  // URL de YouTube o de un archivo .mp4; si falta, la tarjeta no muestra el botón de video.
  video?: string
  badge?: string
}

export const categories: { id: Category; label: string }[] = [
  { id: 'pasteles', label: 'Pasteles' },
  { id: 'volcanes', label: 'Volcanes y fuentes' },
  { id: 'luces', label: 'Luces y bengalas' },
  { id: 'truenos', label: 'Truenos' },
  { id: 'cohetes', label: 'Cohetes y candelas' },
  { id: 'infantiles', label: 'Para niños' },
]

// Precios en quetzales. Ajusta nombres, precios, costos y videos según el inventario real.
// Los costos actuales son de ejemplo (entre 58% y 71% del precio de venta).
export const products: Product[] = [
  {
    id: 'sol-y-luna',
    name: 'Pastel Sol y Luna',
    description: '19 tiros con estallidos azules y dorados. Ideal para abrir el show.',
    price: 189.5,
    cost: 117.49,
    image: '/assets/item1.jpeg',
    category: 'pasteles',
    badge: 'Más vendido',
  },
  {
    id: 'zodiac-19',
    name: 'Pastel Zodiac 19 efectos',
    description: 'Mil colores con crackling final. Incluye dos volcancitos de regalo.',
    price: 164.75,
    cost: 108.73,
    image: '/assets/item2.jpeg',
    category: 'pasteles',
  },
  {
    id: 'cielo-el-tauro',
    name: 'Pastel Cielo El Tauro',
    description: 'Peonías rojas, moradas y rosadas que llenan el cielo por casi un minuto.',
    price: 212.25,
    cost: 125.23,
    image: '/assets/item9.jpeg',
    category: 'pasteles',
  },
  {
    id: 'peonias-multicolores',
    name: 'Peonías multicolores',
    description: 'Pastel de estallidos tipo peonía en verde, rojo y azul.',
    price: 147.9,
    cost: 100.57,
    image: '/assets/item20.jpeg',
    category: 'pasteles',
    badge: 'Nuevo',
  },
  {
    id: 'misil-25-49',
    name: 'Misil con crackling',
    description: 'Pastel El Misil de 25 tiros. Pregunta por la versión de 49 tiros.',
    price: 118.4,
    cost: 75.78,
    image: '/assets/item24.jpeg',
    category: 'pasteles',
  },
  {
    id: 'volcan-luminoso',
    name: 'Volcán Luminoso',
    description: 'Caja de 24 volcancitos con luces verdes, rojas y supercrackling.',
    price: 86.3,
    cost: 52.64,
    image: '/assets/item3.jpeg',
    category: 'volcanes',
  },
  {
    id: 'volcan-grande',
    name: 'Volcán grande',
    description: 'Fuente de chispas doradas que sube más de dos metros.',
    price: 27.6,
    cost: 19.6,
    image: '/assets/item11.jpeg',
    category: 'volcanes',
  },
  {
    id: 'barril-el-chavo',
    name: 'Barril El Chavo',
    description: 'Fuente en forma de barril con lluvia de chispas de colores.',
    price: 42.8,
    cost: 26.96,
    image: '/assets/item6.jpeg',
    category: 'volcanes',
  },
  {
    id: 'botella-magica',
    name: 'Botella mágica',
    description: 'Fuente decorada con flores que suelta chispas plateadas y silbidos.',
    price: 33.45,
    cost: 19.4,
    image: '/assets/item18.jpeg',
    category: 'volcanes',
  },
  {
    id: 'bengalas-estrellas',
    name: 'Bengalas de estrellas',
    description: 'Tigre Brand, caja con 6 luces de larga duración.',
    price: 18.7,
    cost: 12.53,
    image: '/assets/item10.jpeg',
    category: 'luces',
  },
  {
    id: 'estrellitas-gigantes',
    name: 'Estrellitas tipo gigante',
    description: 'Tiger Brand con 4 luces de colores. Fórmula original alemana.',
    price: 14.35,
    cost: 9.33,
    image: '/assets/item16.jpeg',
    category: 'luces',
    badge: 'Favorito',
  },
  {
    id: 'luces-maravillosas',
    name: 'Luces maravillosas',
    description: 'Sobre de estrellitas clásicas Tigre Brand para fotos y brindis.',
    price: 7.9,
    cost: 4.74,
    image: '/assets/item27.jpeg',
    category: 'luces',
  },
  {
    id: 'fosforos-colores',
    name: 'Fósforos de colores',
    description: 'Bolsa surtida de fósforos que encienden con flama de color.',
    price: 11.25,
    cost: 7.76,
    image: '/assets/item12.jpeg',
    category: 'luces',
  },
  {
    id: 'super-tronadores',
    name: 'Super Tronadores',
    description: 'Caja T8500 de El Misil con truenos fuertes y secos.',
    price: 54.6,
    cost: 33.85,
    image: '/assets/item4.jpeg',
    category: 'truenos',
  },
  {
    id: 'pili-cracker',
    name: 'Pili Cracker',
    description: 'Caja individual de petardos que emiten chispas. Se colocan en el piso.',
    price: 9.85,
    cost: 6.5,
    image: '/assets/item5.jpeg',
    category: 'truenos',
  },
  {
    id: 'pili-cracker-paquete',
    name: 'Pili Cracker paquete',
    description: 'Paquete de 6 cajas Pili Cracker con mejor precio por unidad.',
    price: 52.4,
    cost: 30.92,
    image: '/assets/item19.jpeg',
    category: 'truenos',
  },
  {
    id: 'toro-negro',
    name: 'Rollo de cohetillos Toro Negro',
    description: 'Marca original guatemalteca con más de 45 años de tradición.',
    price: 236.9,
    cost: 161.09,
    image: '/assets/item23.jpeg',
    category: 'truenos',
    badge: 'Tradicional',
  },
  {
    id: 'cohetes-vara',
    name: 'Cohetes de vara arcoíris',
    description: 'Manojo de cohetes con vara que suben con silbido y truenan arriba.',
    price: 38.2,
    cost: 24.45,
    image: '/assets/item17.jpeg',
    category: 'cohetes',
  },
  {
    id: 'magical-shooter',
    name: 'Magical Shooter 10 luces',
    description: 'Paquete de candelas romanas con 10 disparos de colores cada una.',
    price: 96.55,
    cost: 58.9,
    image: '/assets/item22.jpeg',
    category: 'cohetes',
  },
  {
    id: 'candela-romana',
    name: 'Candela romana',
    description: 'Unidad individual con bolas de fuego azules, verdes y rojas.',
    price: 12.4,
    cost: 8.8,
    image: '/assets/item25.jpeg',
    category: 'cohetes',
  },
  {
    id: 'butterfly',
    name: 'Mariposas voladoras',
    description: 'Butterfly 0435B. Giran y se elevan con un zumbido brillante.',
    price: 23.8,
    cost: 14.99,
    image: '/assets/item15.jpeg',
    category: 'cohetes',
  },
  {
    id: 'colita-de-raton',
    name: 'Colita de ratón',
    description: 'Caja de 50 unidades que corren por el piso entre chispas.',
    price: 16.45,
    cost: 9.54,
    image: '/assets/item8.jpeg',
    category: 'infantiles',
  },
  {
    id: 'crisantemo-abierto',
    name: 'Crisantemo de colores',
    description: 'Ruedas que giran en el suelo como una flor de luz. Caja de 12.',
    price: 19.3,
    cost: 12.93,
    image: '/assets/item7.jpeg',
    category: 'infantiles',
  },
  {
    id: 'crisantemo-w608',
    name: 'Crisantemo W608',
    description: 'Presentación El Misil con instrucciones de uso seguro impresas.',
    price: 21.15,
    cost: 13.75,
    image: '/assets/item14.jpeg',
    category: 'infantiles',
  },
  {
    id: 'humo-color',
    name: 'Bolas de humo de color',
    description: 'Greatwall, 6 piezas de humo amarillo, azul, blanco y morado.',
    price: 24.65,
    cost: 14.79,
    image: '/assets/item13.jpeg',
    category: 'infantiles',
  },
  {
    id: 'bombitas-colores',
    name: 'Bombitas de colores',
    description: 'Bolsa surtida de bombitas pequeñas para los más chicos de la casa.',
    price: 8.6,
    cost: 5.93,
    image: '/assets/item21.jpeg',
    category: 'infantiles',
  },
  {
    id: 'trompos',
    name: 'Trompos de luz',
    description: 'Paquete de 6 trompos que giran sobre el piso y cambian de color.',
    price: 17.95,
    cost: 11.13,
    image: '/assets/trompos.png',
    category: 'infantiles',
  },
]

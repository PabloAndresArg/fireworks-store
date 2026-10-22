import type { Category } from './products'

export type Offer = {
  id: string
  eyebrow: string
  title: string
  description: string
  image: string
  imageAlt: string
  cta: string
  // Filtro del catálogo que se activa al tocar el botón de la promoción.
  filter: Category | 'todos'
}

// Banners del carrusel de ofertas. Son informativos: el carrito todavía no aplica estos descuentos.
export const offers: Offer[] = [
  {
    id: 'estrellitas-6x7',
    eyebrow: 'Luces y bengalas',
    title: 'Lleva 6 estrellitas gigantes y te regalamos la séptima',
    description:
      'Aplica en Estrellitas tipo gigante Tiger Brand. Suficientes para repartir entre toda la familia la noche del 24.',
    image: '/assets/item16.jpeg',
    imageAlt: 'Cajas de Estrellitas tipo gigante Tiger Brand',
    cta: 'Ver estrellitas',
    filter: 'luces',
  },
  {
    id: 'envio-gratis',
    eyebrow: 'Envío a domicilio',
    title: 'Envío gratis en pedidos mayores a Q350',
    description:
      'Nuestro repartidor lleva tu pedido en moto hasta la puerta de tu casa. En pedidos menores el envío cuesta Q30.',
    image: '/assets/promo-envio-moto.svg',
    imageAlt: 'Ilustración de un repartidor en moto con la caja de CuetesYa',
    cta: 'Armar mi pedido',
    filter: 'todos',
  },
  {
    id: 'combo-fiesta-familiar',
    eyebrow: 'Combos',
    title: 'Combo Fiesta Familiar: cinco productos por Q329',
    description:
      'Batería, volcán, truenos, bengalas y colita de ratón en un solo paquete. Comprados por separado suman Q365.55.',
    image: '/assets/promo-combo-fiesta-familiar.jpeg',
    imageAlt: 'Productos del Combo Fiesta Familiar',
    cta: 'Ver combos',
    filter: 'combos',
  },
]

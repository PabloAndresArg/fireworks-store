import { useReveal } from '../hooks/useReveal'

type HeroProps = {
  productCount: number
}

// Destellos decorativos: posiciones fijas para que no cambien entre renders.
const sparks = [
  { top: '12%', left: '8%', delay: '0s' },
  { top: '28%', left: '46%', delay: '1.2s' },
  { top: '64%', left: '4%', delay: '2.1s' },
  { top: '8%', left: '72%', delay: '0.6s' },
  { top: '82%', left: '52%', delay: '1.7s' },
  { top: '44%', left: '94%', delay: '2.6s' },
  { top: '90%', left: '86%', delay: '0.9s' },
]

export function Hero({ productCount }: HeroProps) {
  const copyRef = useReveal<HTMLDivElement>()
  const visualRef = useReveal<HTMLDivElement>()

  return (
    <section id="inicio" className="hero">
      {sparks.map((s, i) => (
        <span
          key={i}
          className="spark"
          style={{ top: s.top, left: s.left, animationDelay: s.delay }}
          aria-hidden="true"
        />
      ))}

      <div ref={copyRef} className="hero-copy reveal">
        <p className="eyebrow">Pirotecnia para Navidad y Año Nuevo</p>
        <h1 className="hero-title">
          Todo para tu celebración,
          <br />
          del primer destello
          <br />
          al gran final
        </h1>
        <p className="hero-sub">
          Pasteles, volcanes, bengalas y cohetillos de marcas como El Misil, Greatwall y Tigre
          Brand. Elige cantidades y arma tu pedido en pocos minutos.
        </p>
        <a className="btn btn-primary" href="#catalogo">
          Ver el catálogo
        </a>
        <p className="hero-proof">
          <strong>{productCount} productos</strong> disponibles hoy · precios en quetzales
        </p>
      </div>

      <div ref={visualRef} className="hero-visual reveal" aria-hidden="true">
        <img className="hero-img hero-img-a" src="/assets/item20.jpeg" alt="" />
        <img className="hero-img hero-img-b" src="/assets/item1.jpeg" alt="" />
        <img className="hero-img hero-img-c" src="/assets/item16.jpeg" alt="" />
      </div>
    </section>
  )
}

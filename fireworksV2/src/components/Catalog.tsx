import { useState } from 'react'
import { categories, type Category, type Product } from '../data/products'
import { useReveal } from '../hooks/useReveal'
import { ProductCard } from './ProductCard'
import { VideoModal } from './VideoModal'

type CatalogProps = {
  products: Product[]
  onAdd: (product: Product, quantity: number) => void
}

type Filter = Category | 'todos'

export function Catalog({ products, onAdd }: CatalogProps) {
  const headRef = useReveal<HTMLDivElement>()
  const [filter, setFilter] = useState<Filter>('todos')
  const [videoProduct, setVideoProduct] = useState<Product | null>(null)

  const visible = filter === 'todos' ? products : products.filter((p) => p.category === filter)
  const filters: { id: Filter; label: string }[] = [{ id: 'todos', label: 'Todos' }, ...categories]

  return (
    <section id="catalogo" className="catalog" aria-labelledby="catalogo-title">
      <div ref={headRef} className="section-head reveal">
        <h2 id="catalogo-title" className="section-title">
          Nuestro <span className="accent">catálogo</span>
        </h2>
        <p className="section-sub">
          Elige la cantidad de cada producto y agrégalo a tu pedido. El contador de arriba te
          muestra cuántos artículos llevas.
        </p>
      </div>

      <div className="filters" role="group" aria-label="Filtrar por categoría">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            className="chip"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="catalog-panel">
        {visible.length > 0 ? (
          <div className="grid">
            {visible.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                onAdd={onAdd}
                onPlayVideo={setVideoProduct}
              />
            ))}
          </div>
        ) : (
          <div className="empty">
            <p className="empty-title">Esta categoría todavía no tiene productos</p>
            <p className="empty-sub">Revisa las demás categorías o vuelve a ver todo el catálogo.</p>
            <button type="button" className="btn btn-outline" onClick={() => setFilter('todos')}>
              Ver todos los productos
            </button>
          </div>
        )}
      </div>

      <VideoModal product={videoProduct} onClose={() => setVideoProduct(null)} />
    </section>
  )
}

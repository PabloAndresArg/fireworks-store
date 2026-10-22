import { useEffect, useState, type CSSProperties } from 'react'
import type { Product } from '../data/products'
import { useReveal } from '../hooks/useReveal'
import { formatPrice } from '../lib/format'
import { Icon } from './Icon'
import { MIN_QTY, QuantityStepper } from './QuantityStepper'

type ProductCardProps = {
  product: Product
  index: number
  onAdd: (product: Product, quantity: number) => void
  onPlayVideo: (product: Product) => void
}

const ADDED_FEEDBACK_MS = 1600

export function ProductCard({ product, index, onAdd, onPlayVideo }: ProductCardProps) {
  const ref = useReveal<HTMLElement>()
  const [quantity, setQuantity] = useState(MIN_QTY)
  const [loaded, setLoaded] = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  useEffect(() => {
    if (!justAdded) return
    const timer = window.setTimeout(() => setJustAdded(false), ADDED_FEEDBACK_MS)
    return () => window.clearTimeout(timer)
  }, [justAdded])

  const handleAdd = () => {
    onAdd(product, quantity)
    setQuantity(MIN_QTY)
    setJustAdded(true)
  }

  return (
    <article
      ref={ref}
      className="card reveal"
      // Escalonado ligero dentro de cada fila de cuatro tarjetas.
      style={{ '--delay': `${(index % 4) * 80}ms` } as CSSProperties}
    >
      <div className={loaded ? 'card-media' : 'card-media is-loading'}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
        />
        {product.badge && <span className="badge">{product.badge}</span>}
        {product.video && (
          <button
            type="button"
            className="video-btn"
            onClick={() => onPlayVideo(product)}
            aria-label={`Ver video de ${product.name}`}
          >
            <Icon name="play" size={20} />
            Ver video
          </button>
        )}
      </div>

      <div className="card-body">
        <h3 className="card-title">{product.name}</h3>
        <p className="card-desc">{product.description}</p>
        <p className="card-price">{formatPrice(product.price)}</p>

        <div className="card-actions">
          <QuantityStepper value={quantity} onChange={setQuantity} label={product.name} />
          <button
            type="button"
            className={justAdded ? 'btn btn-add is-added' : 'btn btn-add'}
            onClick={handleAdd}
          >
            {justAdded ? (
              <>
                <Icon name="check" size={16} />
                Agregado
              </>
            ) : (
              <>
                <Icon name="cart" size={16} />
                Agregar
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  )
}

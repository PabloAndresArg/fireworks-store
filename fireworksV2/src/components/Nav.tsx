import { Icon } from './Icon'

type NavProps = {
  cartCount: number
  onOpenCart: () => void
}

export function Nav({ cartCount, onOpenCart }: NavProps) {
  return (
    <header className="nav-wrap">
      <nav className="nav" aria-label="Principal">
        <a className="nav-brand" href="#inicio">
          <Icon name="sparkle" size={20} />
          <span>
            Cuetes<span className="accent">Ya</span>
          </span>
        </a>
        <a className="nav-link" href="#catalogo" aria-current="page">
          Catálogo
        </a>
        <button
          type="button"
          className={cartCount > 0 ? 'cart-pill has-items' : 'cart-pill'}
          onClick={onOpenCart}
          aria-haspopup="dialog"
        >
          <Icon name="cart" size={20} />
          <span className="sr-only">Abrir carrito. Artículos:</span>
          {/* La key reinicia la animación de rebote cada vez que cambia el número. */}
          <span key={cartCount} className="cart-count" aria-live="polite">
            {cartCount}
          </span>
        </button>
      </nav>
    </header>
  )
}

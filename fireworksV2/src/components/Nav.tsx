import { Icon } from './Icon'

type NavProps = {
  cartCount: number
  // Id de la sección visible; su enlace queda marcado como el actual.
  activeSection: string | null
  onOpenCart: () => void
}

const links = [
  { id: 'ofertas', label: 'Ofertas' },
  { id: 'catalogo', label: 'Catálogo' },
]

export function Nav({ cartCount, activeSection, onOpenCart }: NavProps) {
  return (
    <header className="nav-wrap">
      <nav className="nav" aria-label="Principal">
        <a className="nav-brand" href="#inicio" aria-label="CuetesYa, ir al inicio">
          <Icon name="sparkle" size={20} />
          <span className="nav-brand-text">
            Cuetes<span className="accent">Ya</span>
          </span>
        </a>
        {links.map((link) => (
          <a
            key={link.id}
            className="nav-link"
            href={`#${link.id}`}
            aria-current={activeSection === link.id ? 'location' : undefined}
          >
            {link.label}
          </a>
        ))}
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

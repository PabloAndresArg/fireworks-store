import { useState } from 'react'
import { flushSync } from 'react-dom'
import { CartDrawer } from './components/CartDrawer'
import { Catalog, type Filter } from './components/Catalog'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Offers } from './components/Offers'
import { TaglineReveal } from './components/TaglineReveal'
import { offers, type Offer } from './data/offers'
import { products } from './data/products'
import { useActiveSection } from './hooks/useActiveSection'
import { useCart } from './hooks/useCart'
import { confirmAndSendOrder } from './lib/alerts'
import type { Customer } from './lib/checkout'
import { buildOrder } from './lib/order'

function App() {
  const cart = useCart(products)
  const [cartOpen, setCartOpen] = useState(false)
  const [filter, setFilter] = useState<Filter>('todos')
  const activeSection = useActiveSection(['inicio', 'ofertas', 'catalogo'])

  // El botón de cada promoción lleva al catálogo con la categoría de la oferta ya filtrada.
  // El filtro se aplica antes de desplazarse: si el catálogo cambia de alto a mitad del
  // desplazamiento suave, el navegador lo cancela.
  const seeOffer = (offer: Offer) => {
    flushSync(() => setFilter(offer.filter))
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })
  }

  // Módulo 4: arma la orden, la confirma y la envía. Devuelve true si se envió.
  const submitOrder = async (customer: Customer) => {
    const order = buildOrder(customer, cart.lines, cart.shipping)
    // El panel es un <dialog> modal: se cierra para que SweetAlert2 quede encima.
    setCartOpen(false)
    const sent = await confirmAndSendOrder(order)
    if (sent) cart.clear()
    else setCartOpen(true)
    return sent
  }

  return (
    <>
      <a className="skip-link" href="#catalogo">
        Saltar al catálogo
      </a>
      <Nav
        cartCount={cart.itemCount}
        activeSection={activeSection}
        onOpenCart={() => setCartOpen(true)}
      />
      <main>
        <Hero productCount={products.length} />
        <Offers offers={offers} onSeeOffer={seeOffer} />
        <Catalog products={products} filter={filter} onFilterChange={setFilter} onAdd={cart.add} />
        <TaglineReveal />
      </main>
      <footer className="footer">
        <p>
          Cuetes<span className="accent">Ya</span> · Venta exclusiva para mayores de edad. Usa la
          pirotecnia al aire libre y bajo supervisión de un adulto.
        </p>
      </footer>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        lines={cart.lines}
        itemCount={cart.itemCount}
        subtotal={cart.subtotal}
        shipping={cart.shipping}
        total={cart.total}
        isEmpty={cart.isEmpty}
        onQuantityChange={cart.setQuantity}
        onRemove={cart.remove}
        onClear={cart.clear}
        onSubmitOrder={submitOrder}
      />
    </>
  )
}

export default App

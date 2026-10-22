import { useState } from 'react'
import { CartDrawer } from './components/CartDrawer'
import { Catalog } from './components/Catalog'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { TaglineReveal } from './components/TaglineReveal'
import { products } from './data/products'
import { useCart } from './hooks/useCart'
import { confirmAndSendOrder } from './lib/alerts'
import type { Customer } from './lib/checkout'
import { buildOrder } from './lib/order'

function App() {
  const cart = useCart(products)
  const [cartOpen, setCartOpen] = useState(false)

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
      <Nav cartCount={cart.itemCount} onOpenCart={() => setCartOpen(true)} />
      <main>
        <Hero productCount={products.length} />
        <Catalog products={products} onAdd={cart.add} />
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

import { useEffect, useState } from 'react'
import { MAX_QTY, MIN_QTY } from '../components/QuantityStepper'
import type { Product } from '../data/products'

// Cargo de envío fijo en quetzales (el mismo de la tienda original).
export const SHIPPING_FEE = 30

const STORAGE_KEY = 'cuetesya:cart'

// Cantidades por id de producto.
type CartQuantities = Record<string, number>

export type CartLine = {
  product: Product
  quantity: number
  lineTotal: number
}

const clamp = (n: number) => Math.min(MAX_QTY, Math.max(MIN_QTY, Math.round(n)))

function readStorage(): CartQuantities {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null) return {}

    // Descarta valores corruptos o editados a mano.
    const clean: CartQuantities = {}
    for (const [id, qty] of Object.entries(parsed)) {
      if (typeof qty === 'number' && Number.isFinite(qty) && qty >= MIN_QTY) clean[id] = clamp(qty)
    }
    return clean
  } catch {
    return {}
  }
}

export function useCart(catalog: Product[]) {
  const [quantities, setQuantities] = useState<CartQuantities>(readStorage)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(quantities))
    } catch {
      // Sin almacenamiento disponible (modo privado, cuota llena): el carrito sigue en memoria.
    }
  }, [quantities])

  // Mantiene sincronizadas varias pestañas abiertas de la tienda.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setQuantities(readStorage())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  // Solo se muestran productos que siguen existiendo en el catálogo.
  const lines: CartLine[] = catalog
    .filter((product) => quantities[product.id])
    .map((product) => {
      const quantity = quantities[product.id]
      return { product, quantity, lineTotal: product.price * quantity }
    })

  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0)
  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0)
  const isEmpty = lines.length === 0
  const shipping = isEmpty ? 0 : SHIPPING_FEE
  const total = subtotal + shipping

  const add = (product: Product, quantity: number) => {
    setQuantities((prev) => ({ ...prev, [product.id]: clamp((prev[product.id] ?? 0) + quantity) }))
  }

  const setQuantity = (productId: string, quantity: number) => {
    setQuantities((prev) => ({ ...prev, [productId]: clamp(quantity) }))
  }

  const remove = (productId: string) => {
    setQuantities((prev) => {
      const next = { ...prev }
      delete next[productId]
      return next
    })
  }

  const clear = () => setQuantities({})

  return { lines, itemCount, subtotal, shipping, total, isEmpty, add, setQuantity, remove, clear }
}

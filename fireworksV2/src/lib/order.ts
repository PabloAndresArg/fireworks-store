import { computeTotals, type Order } from '../../supabase/functions/_shared/order-email.ts'
import type { CartLine } from '../hooks/useCart'
import type { Customer } from './checkout'

// La plantilla del correo vive junto a la función serverless para que ambos lados usen la misma.
export {
  buildOrderHtml,
  buildOrderSubject,
  formatDate,
  type Order,
  type OrderLine,
} from '../../supabase/functions/_shared/order-email.ts'

function createOrderId(date: Date) {
  const stamp = `${String(date.getFullYear()).slice(2)}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`
  const random = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `CY-${stamp}-${random}`
}

export function buildOrder(customer: Customer, cartLines: CartLine[], shipping: number): Order {
  const now = new Date()
  const items = cartLines.map(({ product, quantity }) => ({
    productId: product.id,
    name: product.name,
    quantity,
    price: product.price,
    cost: product.cost,
  }))

  return {
    id: createOrderId(now),
    createdAt: now.toISOString(),
    customer,
    ...computeTotals(items, shipping),
  }
}

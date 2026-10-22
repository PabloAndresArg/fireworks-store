import { computeTotals, type Order, type OrderLine } from '../_shared/order-email.ts'

// Los límites existen para que nadie use la función como relevo de correos arbitrarios.
const MAX_LINES = 100
const MAX_QTY = 99
const MAX_AMOUNT = 100_000

export class ValidationError extends Error {}

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v)

function text(value: unknown, field: string, { min = 1, max = 120, pattern }: { min?: number; max?: number; pattern?: RegExp } = {}) {
  if (typeof value !== 'string') throw new ValidationError(`Falta el campo ${field}.`)
  const v = value.trim()
  if (v.length < min || v.length > max || (pattern && !pattern.test(v))) {
    throw new ValidationError(`El campo ${field} no es válido.`)
  }
  return v
}

function amount(value: unknown, field: string) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value > MAX_AMOUNT) {
    throw new ValidationError(`El monto ${field} no es válido.`)
  }
  return value
}

function line(value: unknown, index: number): Omit<OrderLine, 'subtotalSale' | 'subtotalCost'> {
  if (!isRecord(value)) throw new ValidationError(`El producto ${index + 1} no es válido.`)
  const quantity = value.quantity
  if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QTY) {
    throw new ValidationError(`La cantidad del producto ${index + 1} no es válida.`)
  }
  return {
    productId: text(value.productId, 'productId', { max: 80, pattern: /^[a-z0-9-]+$/ }),
    name: text(value.name, 'name'),
    quantity,
    price: amount(value.price, 'price'),
    cost: amount(value.cost, 'cost'),
  }
}

// Valida la orden recibida y recalcula subtotales y totales en el servidor,
// así el correo nunca muestra cifras que no cuadren con precio × cantidad.
export function parseOrder(body: unknown): Order {
  if (!isRecord(body) || !isRecord(body.order)) throw new ValidationError('No se recibió la orden.')
  const o = body.order
  if (!isRecord(o.customer)) throw new ValidationError('Faltan los datos del cliente.')
  const c = o.customer

  if (!Array.isArray(o.lines) || o.lines.length === 0) throw new ValidationError('La orden no tiene productos.')
  if (o.lines.length > MAX_LINES) throw new ValidationError('La orden tiene demasiados productos.')

  const createdAt = text(o.createdAt, 'createdAt', { max: 40 })
  if (Number.isNaN(Date.parse(createdAt))) throw new ValidationError('La fecha de creación no es válida.')

  const fullName = text(c.fullName, 'nombre completo', { min: 3 })
  if (fullName.split(/\s+/).length < 2) throw new ValidationError('El nombre debe incluir al menos un apellido.')

  return {
    id: text(o.id, 'id', { max: 20, pattern: /^CY-\d{6}-[A-Z0-9]{4}$/ }),
    createdAt,
    customer: {
      fullName,
      email: text(c.email, 'correo', { max: 254, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/ }).toLowerCase(),
      phone: text(c.phone, 'celular', { pattern: /^\d{4} \d{4}$/ }),
    },
    ...computeTotals(o.lines.map(line), amount(o.shipping, 'envío')),
  }
}

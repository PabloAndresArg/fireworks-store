import type { CartLine } from '../hooks/useCart'
import { formatPrice } from './format'

// Monto mínimo del subtotal (sin envío) para procesar una orden.
// La tienda original pedía Q 50 de productos (Q 80 contando los Q 30 de envío).
export const MIN_ORDER_AMOUNT = 50

export type CustomerForm = {
  fullName: string
  email: string
  phone: string
  requiredDate: string // AAAA-MM-DD, tal como lo entrega <input type="date">
}

export type Customer = CustomerForm

export type CustomerErrors = Partial<Record<keyof CustomerForm, string>>

export const emptyCustomer: CustomerForm = { fullName: '', email: '', phone: '', requiredDate: '' }

// Fecha local de hoy en formato AAAA-MM-DD (toISOString usaría UTC y podría adelantar un día).
export function todayIso() {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export const PHONE_DIGITS = 8

// El campo de celular solo admite dígitos y como máximo 8; se aplica mientras se escribe o se pega.
export function sanitizePhoneInput(value: string) {
  return value.replace(/\D/g, '').slice(0, PHONE_DIGITS)
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Formato de lectura para la orden: 5847 1293.
function formatPhone(digits: string) {
  return `${digits.slice(0, 4)} ${digits.slice(4)}`
}

export function validateCustomer(form: CustomerForm): CustomerErrors {
  const errors: CustomerErrors = {}
  const name = form.fullName.trim()

  if (!name) errors.fullName = 'Escribe tu nombre completo.'
  else if (name.split(/\s+/).length < 2) errors.fullName = 'Incluye al menos un nombre y un apellido.'

  const email = form.email.trim()
  if (!email) errors.email = 'Escribe tu correo electrónico.'
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Revisa el correo, por ejemplo lucia.aju@gmail.com.'

  if (!form.phone) errors.phone = 'Escribe tu número de celular.'
  else if (!/^\d+$/.test(form.phone)) errors.phone = 'El celular solo puede tener números.'
  else if (form.phone.length !== PHONE_DIGITS)
    errors.phone = `El celular debe tener exactamente ${PHONE_DIGITS} dígitos. Llevas ${form.phone.length}.`

  if (!form.requiredDate) errors.requiredDate = 'Elige la fecha en que necesitas tu pedido.'
  else if (form.requiredDate < todayIso()) errors.requiredDate = 'La fecha no puede ser anterior a hoy.'

  return errors
}

// Valida el carrito: que no esté vacío y que alcance el monto mínimo.
export function validateCart(lines: CartLine[], subtotal: number): string | null {
  if (lines.length === 0) return 'Tu carrito está vacío. Agrega productos antes de continuar.'
  if (subtotal < MIN_ORDER_AMOUNT) {
    return `El pedido mínimo es de ${formatPrice(MIN_ORDER_AMOUNT)}. Te faltan ${formatPrice(MIN_ORDER_AMOUNT - subtotal)}.`
  }
  return null
}

// Prepara los datos limpios del cliente para el siguiente paso (generación de orden).
export function toCustomer(form: CustomerForm): Customer {
  return {
    fullName: form.fullName.trim().replace(/\s+/g, ' '),
    email: form.email.trim().toLowerCase(),
    phone: formatPhone(form.phone),
    requiredDate: form.requiredDate,
  }
}

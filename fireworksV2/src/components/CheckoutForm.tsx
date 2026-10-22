import { useState, type ChangeEvent, type FormEvent, type InputHTMLAttributes } from 'react'
import type { CartLine } from '../hooks/useCart'
import {
  PHONE_DIGITS,
  emptyCustomer,
  sanitizePhoneInput,
  todayIso,
  toCustomer,
  validateCart,
  validateCustomer,
  type Customer,
  type CustomerErrors,
  type CustomerForm,
} from '../lib/checkout'
import { formatPrice } from '../lib/format'
import { Icon } from './Icon'

type CheckoutFormProps = {
  lines: CartLine[]
  itemCount: number
  subtotal: number
  shipping: number
  total: number
  onBack: () => void
  // Devuelve true cuando la orden se envió y el formulario debe reiniciarse.
  onSubmit: (customer: Customer) => Promise<boolean>
}

type Field = keyof CustomerForm

export function CheckoutForm({
  lines,
  itemCount,
  subtotal,
  shipping,
  total,
  onBack,
  onSubmit,
}: CheckoutFormProps) {
  const [form, setForm] = useState<CustomerForm>(emptyCustomer)
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const errors: CustomerErrors = validateCustomer(form)
  const cartError = validateCart(lines, subtotal)
  // Los errores aparecen al salir del campo o al intentar enviar, no mientras se escribe por primera vez.
  const visibleError = (field: Field) => (touched[field] || submitted ? errors[field] : undefined)

  const update = (field: Field) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = field === 'phone' ? sanitizePhoneInput(e.target.value) : e.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const blur = (field: Field) => () => setTouched((prev) => ({ ...prev, [field]: true }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    if (Object.keys(errors).length > 0 || cartError) {
      // Lleva el foco al primer campo con error.
      const first = (['fullName', 'email', 'phone', 'requiredDate'] as Field[]).find((f) => errors[f])
      if (first) document.getElementById(`checkout-${first}`)?.focus()
      return
    }

    setSending(true)
    const sent = await onSubmit(toCustomer(form))
    setSending(false)
    if (sent) {
      setForm(emptyCustomer)
      setTouched({})
      setSubmitted(false)
    }
  }

  return (
    <form className="checkout" onSubmit={handleSubmit} noValidate>
      <div className="checkout-body">
        <button type="button" className="back-link" onClick={onBack}>
          <Icon name="arrowLeft" size={16} />
          Volver al carrito
        </button>

        <div>
          <h3 className="checkout-title">Tus datos</h3>
          <p className="checkout-sub">Los usamos para confirmar tu pedido y coordinar la entrega.</p>
        </div>

        <TextField
          id="checkout-fullName"
          label="Nombre completo"
          autoComplete="name"
          placeholder="Ej. Lucía Ajú Morales"
          value={form.fullName}
          onChange={update('fullName')}
          onBlur={blur('fullName')}
          error={visibleError('fullName')}
        />
        <TextField
          id="checkout-email"
          label="Correo electrónico"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          placeholder="Ej. lucia.aju@gmail.com"
          value={form.email}
          onChange={update('email')}
          onBlur={blur('email')}
          error={visibleError('email')}
        />
        <TextField
          id="checkout-phone"
          label="Número de celular"
          type="tel"
          inputMode="numeric"
          pattern="[0-9]{8}"
          maxLength={PHONE_DIGITS}
          autoComplete="tel-national"
          placeholder="Ej. 58471293"
          value={form.phone}
          onChange={update('phone')}
          onBlur={blur('phone')}
          error={visibleError('phone')}
        />
        <TextField
          id="checkout-requiredDate"
          label="Fecha en que lo necesitas"
          type="date"
          min={todayIso()}
          value={form.requiredDate}
          onChange={update('requiredDate')}
          onBlur={blur('requiredDate')}
          error={visibleError('requiredDate')}
        />
      </div>

      <footer className="cart-summary">
        {cartError && (
          <p className="notice notice-error" role="alert">
            <Icon name="warning" size={20} />
            {cartError}
          </p>
        )}
        <dl className="summary-rows">
          <div className="summary-row">
            <dt>Subtotal ({itemCount === 1 ? '1 artículo' : `${itemCount} artículos`})</dt>
            <dd>{formatPrice(subtotal)}</dd>
          </div>
          <div className="summary-row">
            <dt>Envío</dt>
            <dd>{formatPrice(shipping)}</dd>
          </div>
          <div className="summary-row summary-total">
            <dt>Total</dt>
            <dd>{formatPrice(total)}</dd>
          </div>
        </dl>
        <button type="submit" className="btn btn-primary btn-block" disabled={sending}>
          {sending ? 'Procesando pedido…' : 'Revisar y confirmar pedido'}
        </button>
      </footer>
    </form>
  )
}

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string
  label: string
  error?: string
}

function TextField({ id, label, error, ...input }: TextFieldProps) {
  const errorId = `${id}-error`
  return (
    <div className={error ? 'field has-error' : 'field'}>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <input
        id={id}
        className="field-input"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        required
        {...input}
      />
      {error && (
        <p id={errorId} className="field-error">
          {error}
        </p>
      )}
    </div>
  )
}

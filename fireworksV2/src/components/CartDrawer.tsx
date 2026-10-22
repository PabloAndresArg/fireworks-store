import { useEffect, useRef, useState } from 'react'
import type { CartLine } from '../hooks/useCart'
import { MIN_ORDER_AMOUNT, type Customer } from '../lib/checkout'
import { formatPrice } from '../lib/format'
import { CheckoutForm } from './CheckoutForm'
import { Icon } from './Icon'
import { QuantityStepper } from './QuantityStepper'

type CartDrawerProps = {
  open: boolean
  onClose: () => void
  lines: CartLine[]
  itemCount: number
  subtotal: number
  shipping: number
  total: number
  isEmpty: boolean
  onQuantityChange: (productId: string, quantity: number) => void
  onRemove: (productId: string) => void
  onClear: () => void
  onSubmitOrder: (customer: Customer) => Promise<boolean>
}

type Step = 'cart' | 'checkout'

export function CartDrawer({
  open,
  onClose,
  lines,
  itemCount,
  subtotal,
  shipping,
  total,
  isEmpty,
  onQuantityChange,
  onRemove,
  onClear,
  onSubmitOrder,
}: CartDrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  // Confirmación integrada en el panel para vaciar el carrito (sin window.confirm).
  const [confirmingClear, setConfirmingClear] = useState(false)
  const [step, setStep] = useState<Step>('cart')
  // Con el carrito vacío no tiene sentido mostrar el formulario.
  const currentStep: Step = isEmpty ? 'cart' : step
  const missingForMinimum = Math.max(0, MIN_ORDER_AMOUNT - subtotal)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  const close = () => {
    setConfirmingClear(false)
    onClose()
  }

  const clearAll = () => {
    setConfirmingClear(false)
    onClear()
  }

  const submitOrder = async (customer: Customer) => {
    const sent = await onSubmitOrder(customer)
    if (sent) setStep('cart')
    return sent
  }

  const goToCatalog = () => {
    close()
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <dialog
      ref={dialogRef}
      className="cart-drawer"
      onClose={close}
      // Cierra al hacer clic en el fondo oscuro.
      onClick={(e) => e.target === e.currentTarget && close()}
      aria-labelledby="cart-title"
    >
      <div className="cart-inner">
        <header className="cart-head">
          <div>
            <h2 id="cart-title" className="cart-title">
              {currentStep === 'cart' ? (
                <>
                  Tu <span className="accent">carrito</span>
                </>
              ) : (
                <>
                  Finalizar <span className="accent">pedido</span>
                </>
              )}
            </h2>
            <p className="cart-meta">
              {itemCount === 1 ? '1 artículo' : `${itemCount} artículos`}
            </p>
          </div>
          <button type="button" className="icon-btn" onClick={close} aria-label="Cerrar carrito">
            <Icon name="x" size={20} />
          </button>
        </header>

        {isEmpty ? (
          <div className="cart-empty">
            <span className="cart-empty-icon">
              <Icon name="bag" size={32} />
            </span>
            <p className="empty-title">Tu carrito está vacío</p>
            <p className="empty-sub">
              Elige pasteles, volcanes o bengalas del catálogo y aparecerán aquí con su total.
            </p>
            <button type="button" className="btn btn-primary" onClick={goToCatalog}>
              Explorar el catálogo
            </button>
          </div>
        ) : currentStep === 'checkout' ? (
          <CheckoutForm
            lines={lines}
            itemCount={itemCount}
            subtotal={subtotal}
            shipping={shipping}
            total={total}
            onBack={() => setStep('cart')}
            onSubmit={submitOrder}
          />
        ) : (
          <>
            <ul className="cart-list" aria-label="Productos en el carrito">
              {lines.map(({ product, quantity, lineTotal }) => (
                <li key={product.id} className="cart-item">
                  <img className="cart-thumb" src={product.image} alt="" />
                  <div className="cart-item-body">
                    <div className="cart-item-top">
                      <div>
                        <p className="cart-item-name">{product.name}</p>
                        <p className="cart-item-unit">{formatPrice(product.price)} c/u</p>
                      </div>
                      <button
                        type="button"
                        className="icon-btn icon-btn-danger"
                        onClick={() => onRemove(product.id)}
                        aria-label={`Eliminar ${product.name} del carrito`}
                      >
                        <Icon name="trash" size={16} />
                      </button>
                    </div>
                    <div className="cart-item-bottom">
                      <QuantityStepper
                        value={quantity}
                        onChange={(q) => onQuantityChange(product.id, q)}
                        label={product.name}
                      />
                      <p className="cart-line-total">{formatPrice(lineTotal)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="cart-summary">
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

              {missingForMinimum > 0 && (
                <p className="notice" role="status">
                  <Icon name="warning" size={20} />
                  Te faltan {formatPrice(missingForMinimum)} para el pedido mínimo de{' '}
                  {formatPrice(MIN_ORDER_AMOUNT)}.
                </p>
              )}

              <button
                type="button"
                className="btn btn-primary btn-block"
                disabled={missingForMinimum > 0}
                onClick={() => setStep('checkout')}
              >
                Continuar con el pedido
              </button>

              <div className="cart-actions">
                <button type="button" className="btn btn-outline" onClick={close}>
                  Seguir comprando
                </button>
                {confirmingClear ? (
                  <div className="clear-confirm" role="group" aria-label="Confirmar vaciar carrito">
                    <span>¿Vaciar todo?</span>
                    <button type="button" className="btn btn-danger" onClick={clearAll}>
                      Sí, vaciar
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={() => setConfirmingClear(false)}
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => setConfirmingClear(true)}
                  >
                    Vaciar carrito
                  </button>
                )}
              </div>
            </footer>
          </>
        )}
      </div>
    </dialog>
  )
}

import Swal from 'sweetalert2'
import { DELIVERY_ESTIMATE, type Order } from './order'
import { formatPrice } from './format'
import { OrderSendError, sendOrder } from './sendOrder'

// SweetAlert2 con la misma paleta del sitio: los botones reutilizan las clases .btn.
const themed = Swal.mixin({
  background: '#181818',
  color: '#ffffff',
  buttonsStyling: false,
  customClass: {
    popup: 'swal-popup',
    title: 'swal-title',
    htmlContainer: 'swal-body',
    actions: 'swal-actions',
    confirmButton: 'btn btn-primary',
    cancelButton: 'btn btn-outline',
    validationMessage: 'swal-validation',
  },
  showClass: { popup: 'swal-in' },
  hideClass: { popup: 'swal-out' },
})

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

// Resumen para el cliente: sin precios de costo ni ganancia (esos solo van en la orden interna).
function customerSummaryHtml(order: Order) {
  const items = order.lines
    .map(
      (l) =>
        `<li><span>${l.quantity} × ${escapeHtml(l.name)}</span><span>${formatPrice(l.subtotalSale)}</span></li>`,
    )
    .join('')

  return `
    <div class="swal-summary">
      <p class="swal-customer">
        <strong>${escapeHtml(order.customer.fullName)}</strong><br />
        ${escapeHtml(order.customer.email)}<br />
        ${escapeHtml(order.customer.phone)}
      </p>
      <ul class="swal-lines">${items}</ul>
      <dl class="swal-totals">
        <div><dt>Subtotal</dt><dd>${formatPrice(order.subtotal)}</dd></div>
        <div><dt>Envío</dt><dd>${formatPrice(order.shipping)}</dd></div>
        <div class="swal-grand"><dt>Total a pagar</dt><dd>${formatPrice(order.total)}</dd></div>
      </dl>
    </div>`
}

// Confirma, envía la orden y muestra el resultado. Devuelve true si se envió.
export async function confirmAndSendOrder(order: Order) {
  const result = await themed.fire({
    title: 'Confirma tu pedido',
    html: customerSummaryHtml(order),
    showCancelButton: true,
    confirmButtonText: 'Enviar pedido',
    cancelButtonText: 'Revisar datos',
    reverseButtons: true,
    showLoaderOnConfirm: true,
    allowOutsideClick: () => !Swal.isLoading(),
    allowEscapeKey: () => !Swal.isLoading(),
    preConfirm: async () => {
      try {
        await sendOrder(order)
        return true
      } catch (error) {
        const message =
          error instanceof OrderSendError ? error.message : 'Ocurrió un error inesperado al enviar tu pedido.'
        // Mantiene el diálogo abierto con el mensaje para que el cliente pueda reintentar.
        Swal.showValidationMessage(message)
        return false
      }
    },
  })

  if (!result.isConfirmed) return false

  // Sin await: quien llama vacía el carrito de inmediato, aunque el cliente no cierre el aviso.
  void themed.fire({
    icon: 'success',
    iconColor: '#f5c542',
    title: 'Pedido enviado',
    html: `Tu orden <strong>${escapeHtml(order.id)}</strong> quedó registrada y la entregaremos <strong>${DELIVERY_ESTIMATE}</strong>. Te escribiremos al <strong>${escapeHtml(order.customer.phone)}</strong> para coordinar la entrega.`,
    confirmButtonText: 'Listo',
  })
  return true
}

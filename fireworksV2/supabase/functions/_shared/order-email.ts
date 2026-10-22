// Plantilla del correo de la orden. La comparten el frontend (src/lib/order.ts)
// y la función serverless, así que no debe usar APIs de Node, Deno ni del navegador.

export type OrderCustomer = {
  fullName: string
  email: string
  phone: string
  requiredDate: string // AAAA-MM-DD
}

export type OrderLine = {
  productId: string
  name: string
  quantity: number
  price: number
  cost: number
  subtotalSale: number
  subtotalCost: number
}

export type Order = {
  id: string
  createdAt: string // ISO
  customer: OrderCustomer
  lines: OrderLine[]
  itemCount: number
  subtotal: number
  shipping: number
  total: number // total a cobrar
  totalCost: number
  profit: number
}

// El negocio opera en Guatemala; se fija la zona para que el servidor (UTC) muestre la hora local.
const TIME_ZONE = 'America/Guatemala'

const currency = new Intl.NumberFormat('es-GT', { style: 'currency', currency: 'GTQ' })
const formatMoney = (value: number) => currency.format(value)

// Redondea a centavos para evitar arrastrar errores de punto flotante.
export const money = (n: number) => Math.round(n * 100) / 100

// Calcula subtotales por línea y totales de la orden a partir de precio, costo y cantidad.
export function computeTotals(
  items: Pick<OrderLine, 'productId' | 'name' | 'quantity' | 'price' | 'cost'>[],
  shipping: number,
) {
  const lines: OrderLine[] = items.map((l) => ({
    ...l,
    subtotalSale: money(l.price * l.quantity),
    subtotalCost: money(l.cost * l.quantity),
  }))
  const subtotal = money(lines.reduce((sum, l) => sum + l.subtotalSale, 0))
  const totalCost = money(lines.reduce((sum, l) => sum + l.subtotalCost, 0))

  return {
    lines,
    itemCount: lines.reduce((sum, l) => sum + l.quantity, 0),
    subtotal,
    shipping: money(shipping),
    total: money(subtotal + shipping),
    totalCost,
    // La ganancia se mide sobre los productos; el envío no se considera ingreso.
    profit: money(subtotal - totalCost),
  }
}

export function formatDate(isoDate: string) {
  // AAAA-MM-DD se interpreta a mediodía para que ninguna zona horaria cambie el día.
  const date = new Date(isoDate.length === 10 ? `${isoDate}T12:00:00` : isoDate)
  return new Intl.DateTimeFormat('es-GT', { dateStyle: 'full', timeZone: TIME_ZONE }).format(date)
}

function formatDateTime(iso: string) {
  return new Intl.DateTimeFormat('es-GT', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: TIME_ZONE,
  }).format(new Date(iso))
}

export const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  )

// Mismo formato de asunto que usaba la tienda original.
export function buildOrderSubject(order: Order) {
  return `Nueva orden de ${order.customer.fullName} - ${order.customer.phone}`
}

// Detalle de la orden en HTML con estilos en línea, listo para el cuerpo de un correo.
export function buildOrderHtml(order: Order) {
  const cell = 'padding:8px 12px;border-bottom:1px solid #e5e5e5;'
  const num = `${cell}text-align:right;white-space:nowrap;`
  const head =
    'padding:8px 12px;background:#131209;color:#f5c542;font-size:12px;text-transform:uppercase;letter-spacing:0.04em;'
  const label = 'padding:4px 12px 4px 0;color:#555;'
  const value = 'padding:4px 0;font-weight:600;'

  const rows = order.lines
    .map(
      (l) => `
      <tr>
        <td style="${cell}">${escapeHtml(l.name)}</td>
        <td style="${num}">${l.quantity}</td>
        <td style="${num}">${formatMoney(l.price)}</td>
        <td style="${num}">${formatMoney(l.cost)}</td>
        <td style="${num}">${formatMoney(l.subtotalSale)}</td>
        <td style="${num}">${formatMoney(l.subtotalCost)}</td>
      </tr>`,
    )
    .join('')

  const totalRow = (text: string, amount: number, strong = false, color = '#131209') => `
      <tr>
        <td style="padding:4px 12px;color:${strong ? color : '#555'};${strong ? 'font-weight:700;' : ''}">${text}</td>
        <td style="padding:4px 12px;text-align:right;${strong ? `font-weight:700;font-size:16px;color:${color};` : ''}">${formatMoney(amount)}</td>
      </tr>`

  return `<!doctype html>
<html lang="es">
<body style="margin:0;padding:24px;background:#f4f4f4;font-family:Manrope,Arial,sans-serif;color:#131209;">
  <div style="max-width:720px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;">
    <div style="padding:24px;background:#000000;color:#ffffff;">
      <p style="margin:0;font-size:20px;font-weight:700;">Cuetes<span style="color:#f5c542;">Ya</span></p>
      <p style="margin:4px 0 0;color:#9b9b9b;">Nueva orden de fuegos artificiales · ${escapeHtml(order.id)}</p>
    </div>

    <div style="padding:24px;">
      <h2 style="margin:0 0 12px;font-size:16px;text-transform:uppercase;letter-spacing:0.04em;">Datos del cliente</h2>
      <table style="border-collapse:collapse;margin-bottom:24px;">
        <tr><td style="${label}">Nombre</td><td style="${value}">${escapeHtml(order.customer.fullName)}</td></tr>
        <tr><td style="${label}">Correo</td><td style="${value}">${escapeHtml(order.customer.email)}</td></tr>
        <tr><td style="${label}">Celular</td><td style="${value}">${escapeHtml(order.customer.phone)}</td></tr>
        <tr><td style="${label}">Fecha requerida</td><td style="${value}">${escapeHtml(formatDate(order.customer.requiredDate))}</td></tr>
        <tr><td style="${label}">Orden creada</td><td style="padding:4px 0;">${escapeHtml(formatDateTime(order.createdAt))}</td></tr>
      </table>

      <h2 style="margin:0 0 12px;font-size:16px;text-transform:uppercase;letter-spacing:0.04em;">Productos (${order.itemCount})</h2>
      <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <thead>
            <tr>
              <th style="${head}text-align:left;">Producto</th>
              <th style="${head}text-align:right;">Cant.</th>
              <th style="${head}text-align:right;">Precio venta</th>
              <th style="${head}text-align:right;">Precio costo</th>
              <th style="${head}text-align:right;">Subtotal venta</th>
              <th style="${head}text-align:right;">Subtotal costo</th>
            </tr>
          </thead>
          <tbody>${rows}
          </tbody>
        </table>
      </div>

      <table style="margin:24px 0 0 auto;border-collapse:collapse;font-size:14px;min-width:280px;">
        ${totalRow('Subtotal venta', order.subtotal)}
        ${totalRow('Envío', order.shipping)}
        ${totalRow('Total a cobrar', order.total, true)}
        <tr><td colspan="2" style="padding:8px 0;"><div style="border-top:1px solid #e5e5e5;"></div></td></tr>
        ${totalRow('Total costo', order.totalCost)}
        ${totalRow('Ganancia', order.profit, true, '#1f8a4c')}
      </table>

      <p style="margin:32px 0 0;padding-top:16px;border-top:1px solid #e5e5e5;color:#666;font-size:13px;">
        Esta orden fue generada automáticamente desde la tienda CuetesYa.
      </p>
    </div>
  </div>
</body>
</html>`
}

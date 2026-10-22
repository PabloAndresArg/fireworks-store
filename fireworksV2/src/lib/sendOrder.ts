import { buildOrderHtml, buildOrderSubject, type Order } from './order'
import { createRateLimiter } from './rateLimit'

// Función serverless de Supabase que envía el correo de la orden.
// Se puede cambiar con VITE_ORDER_EMAIL_URL en el archivo .env.
const ORDER_EMAIL_URL =
  import.meta.env.VITE_ORDER_EMAIL_URL ??
  'https://vixrjxscxyutnzazmczp.supabase.co/functions/v1/send-email---fireworks-'

// Las funciones de Supabase piden la clave anónima salvo que se desplieguen con --no-verify-jwt.
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

const TIMEOUT_MS = 15000

// Máximo de intentos de envío por minuto desde este navegador (incluye los fallidos).
export const ORDER_ATTEMPTS_PER_MINUTE = 3

const orderLimiter = createRateLimiter({
  key: 'cuetesya:order-attempts',
  limit: ORDER_ATTEMPTS_PER_MINUTE,
  windowMs: 60_000,
})

export class OrderSendError extends Error {}

export async function sendOrder(order: Order) {
  const waitMs = orderLimiter.retryIn()
  if (waitMs > 0) {
    const seconds = Math.ceil(waitMs / 1000)
    throw new OrderSendError(
      `Hiciste varios intentos seguidos. Espera ${seconds} ${seconds === 1 ? 'segundo' : 'segundos'} antes de enviar de nuevo.`,
    )
  }
  orderLimiter.hit()

  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS)

  // Sin Content-Type explícito el navegador manda text/plain y se evita la consulta previa de CORS,
  // igual que la tienda original. La función lee el cuerpo como texto y lo interpreta como JSON.
  const headers: Record<string, string> = {}
  if (SUPABASE_ANON_KEY) {
    headers.Authorization = `Bearer ${SUPABASE_ANON_KEY}`
    headers.apikey = SUPABASE_ANON_KEY
  }

  let response: Response
  try {
    response = await fetch(ORDER_EMAIL_URL, {
      method: 'POST',
      headers,
      signal: controller.signal,
      body: JSON.stringify({
        subject: buildOrderSubject(order),
        // La función reconstruye el correo desde `order`; el HTML viaja como referencia de lo que vio el cliente.
        html: buildOrderHtml(order),
        order,
      }),
    })
  } catch (error) {
    const timedOut = error instanceof DOMException && error.name === 'AbortError'
    throw new OrderSendError(
      timedOut
        ? 'El servicio tardó demasiado en responder. Inténtalo de nuevo en unos minutos.'
        : 'No pudimos conectar con el servicio de pedidos. Revisa tu conexión e inténtalo de nuevo.',
    )
  } finally {
    window.clearTimeout(timer)
  }

  if (!response.ok) {
    // La función devuelve { error } con un mensaje legible cuando rechaza los datos (400).
    if (response.status === 400) {
      const data: unknown = await response.json().catch(() => null)
      if (data && typeof data === 'object' && 'error' in data && typeof data.error === 'string') {
        throw new OrderSendError(data.error)
      }
    }
    throw new OrderSendError(
      `El servicio de pedidos respondió con un error (${response.status}). Tu carrito sigue guardado; inténtalo de nuevo.`,
    )
  }
}

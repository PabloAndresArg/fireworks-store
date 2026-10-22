// Función serverless de Supabase: recibe la orden de la tienda, arma el correo HTML
// y lo envía por Resend al destinatario configurado.
//
// Secretos (supabase secrets set --env-file supabase/functions/.env):
//   RESEND_API_KEY   clave de la API de Resend (obligatoria)
//   ORDER_EMAIL_TO   destinatarios separados por coma (obligatorio)
//   ORDER_EMAIL_FROM remitente verificado en Resend, ej. "CuetesYa <pedidos@tudominio.com>"
//   ALLOWED_ORIGINS  dominios permitidos separados por coma; "*" permite cualquiera

import { buildOrderHtml, buildOrderSubject } from '../_shared/order-email.ts'
import { parseOrder, ValidationError } from './validate.ts'

const RESEND_API_URL = Deno.env.get('RESEND_API_URL') ?? 'https://api.resend.com/emails'
const MAX_BODY_BYTES = 100_000

function corsHeaders(origin: string | null): Record<string, string> {
  const allowed = (Deno.env.get('ALLOWED_ORIGINS') ?? '*').split(',').map((o) => o.trim())
  const allowOrigin = allowed.includes('*') ? '*' : origin && allowed.includes(origin) ? origin : allowed[0]
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    Vary: 'Origin',
  }
}

function json(body: unknown, status: number, cors: Record<string, string>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, 'Content-Type': 'application/json; charset=utf-8' },
  })
}

Deno.serve(async (req) => {
  const cors = corsHeaders(req.headers.get('Origin'))

  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors })
  if (req.method !== 'POST') return json({ error: 'Método no permitido.' }, 405, cors)

  const apiKey = Deno.env.get('RESEND_API_KEY')
  const to = (Deno.env.get('ORDER_EMAIL_TO') ?? '').split(',').map((e) => e.trim()).filter(Boolean)
  const from = Deno.env.get('ORDER_EMAIL_FROM') ?? 'CuetesYa <onboarding@resend.dev>'
  if (!apiKey || to.length === 0) {
    console.error('Faltan los secretos RESEND_API_KEY u ORDER_EMAIL_TO.')
    return json({ error: 'El servicio de pedidos no está configurado.' }, 500, cors)
  }

  const raw = await req.text()
  if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) {
    return json({ error: 'La orden es demasiado grande.' }, 413, cors)
  }

  let order
  try {
    order = parseOrder(JSON.parse(raw))
  } catch (error) {
    const message = error instanceof ValidationError ? error.message : 'La orden no tiene un formato válido.'
    return json({ error: message }, 400, cors)
  }

  // El correo se arma aquí con los datos validados; el HTML que envía el navegador se ignora.
  const resend = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to,
      reply_to: order.customer.email,
      subject: buildOrderSubject(order),
      html: buildOrderHtml(order),
    }),
  }).catch((error: unknown) => {
    console.error('No se pudo contactar a Resend:', error)
    return null
  })

  if (!resend || !resend.ok) {
    if (resend) console.error('Resend respondió', resend.status, await resend.text())
    return json({ error: 'No se pudo enviar el correo de la orden.' }, 502, cors)
  }

  const { id: emailId } = (await resend.json()) as { id?: string }
  console.log(`Orden ${order.id} enviada (correo ${emailId ?? 'sin id'})`)
  return json({ ok: true, orderId: order.id, emailId }, 200, cors)
})

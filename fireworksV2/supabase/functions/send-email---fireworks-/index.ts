// Función serverless de Supabase: recibe la orden de la tienda y envía dos correos por SMTP (Gmail):
// la orden interna (con costos) a la tienda y un comprobante sin costos al comprador.
//
// Secretos (supabase secrets set --env-file supabase/functions/.env):
//   SMTP_USER        cuenta que envía, ej. tucuenta@gmail.com (obligatorio)
//   SMTP_PASS        contraseña de aplicación de esa cuenta (obligatorio)
//   SMTP_HOST        servidor SMTP; por defecto smtp.gmail.com
//   SMTP_PORT        puerto; por defecto 465
//   ORDER_EMAIL_TO   destinatarios de la orden interna, separados por coma (obligatorio).
//                    El primero recibe las respuestas del cliente al comprobante.
//   ALLOWED_ORIGINS  dominios permitidos separados por coma; "*" permite cualquiera

import nodemailer from 'npm:nodemailer@6.9.3'
import {
  buildCustomerOrderHtml,
  buildCustomerSubject,
  buildOrderHtml,
  buildOrderSubject,
} from '../_shared/order-email.ts'
import { parseOrder, ValidationError } from './validate.ts'

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

  const user = Deno.env.get('SMTP_USER')
  const pass = Deno.env.get('SMTP_PASS')
  const port = Number(Deno.env.get('SMTP_PORT') ?? '465')
  const to = (Deno.env.get('ORDER_EMAIL_TO') ?? '')
    .split(',')
    .map((e) => e.trim())
    .filter(Boolean)
  if (!user || !pass || to.length === 0) {
    console.error('Faltan los secretos SMTP_USER, SMTP_PASS u ORDER_EMAIL_TO.')
    return json({ error: 'El servicio de pedidos no está configurado.' }, 500, cors)
  }

  const raw = await req.text()
  if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) {
    return json({ error: 'La orden es demasiado grande.' }, 413, cors)
  }

  let body: Record<string, unknown>
  try {
    body = JSON.parse(raw)
  } catch {
    return json({ error: 'La orden no tiene un formato válido.' }, 400, cors)
  }

  const transporter = nodemailer.createTransport({
    host: Deno.env.get('SMTP_HOST') ?? 'smtp.gmail.com',
    port,
    secure: port === 465,
    auth: { user, pass },
  })
  const from = `"CuetesYa" <${user}>`

  // Envía un correo. Devuelve su id o null si falló (el error queda en los logs).
  const sendEmail = async (email: { to: string[]; replyTo?: string; subject: string; html: string }, kind: string) => {
    try {
      const info = await transporter.sendMail({ from, ...email })
      return String(info.messageId ?? 'sin id')
    } catch (error) {
      console.error(`No se pudo enviar el correo (${kind}):`, error)
      return null
    }
  }

  // Compatibilidad con la tienda anterior (docs/), que manda { subject, html } sin `order`.
  // Se puede quitar cuando el sitio publicado sea fireworksV2.
  if (!('order' in body)) {
    const { subject, html } = body
    if (typeof subject !== 'string' || typeof html !== 'string') {
      return json({ error: 'La orden no tiene un formato válido.' }, 400, cors)
    }
    const id = await sendEmail({ to, subject: subject.slice(0, 200), html }, 'tienda anterior')
    if (!id) return json({ error: 'No se pudo enviar el correo de la orden.' }, 502, cors)
    return json({ messageId: id, accepted: to }, 200, cors)
  }

  let order
  try {
    order = parseOrder(body)
  } catch (error) {
    const message = error instanceof ValidationError ? error.message : 'La orden no tiene un formato válido.'
    return json({ error: message }, 400, cors)
  }

  // Los correos se arman aquí con los datos validados; el HTML que envía el navegador se ignora.
  // Primero la orden interna: si no llega a la tienda, el pedido no cuenta como enviado.
  const emailId = await sendEmail(
    { to, replyTo: order.customer.email, subject: buildOrderSubject(order), html: buildOrderHtml(order) },
    'orden interna',
  )
  if (!emailId) return json({ error: 'No se pudo enviar el correo de la orden.' }, 502, cors)

  // Después el comprobante del cliente, sin costos. Si falla, la orden ya llegó a la tienda y se da por buena.
  const customerEmailId = await sendEmail(
    {
      to: [order.customer.email],
      replyTo: to[0],
      subject: buildCustomerSubject(order),
      html: buildCustomerOrderHtml(order),
    },
    'comprobante del cliente',
  )

  console.log(`Orden ${order.id} enviada (interna ${emailId}, cliente ${customerEmailId ?? 'falló'})`)
  return json({ ok: true, orderId: order.id, emailId, customerEmailSent: customerEmailId !== null }, 200, cors)
})

export const prerender = false

import type { APIRoute } from 'astro'
// @ts-ignore
import nodemailer from 'nodemailer'

import { getDate } from '@/helpers/getDate'
import { requestValidator } from '@/helpers/request-validator'

import MailTemplate from '@/components/Mail/inlined'

type MailInfo = {
  messageId: string
  envelope: {
    from: string
    to: string[]
  }
  accepted: string[]
  rejected: string[]
  reason: string
}

export const POST: APIRoute = async ({ request }) => {
  const body = JSON.parse(await request.text())
  // const locale = request.headers.get('locale')

  const validate = requestValidator(body, {
    name: 'required',
    email: 'required',
    phone: 'required'
    // comments: 'required',
  })

  if (validate.fails()) {
    return new Response(
      JSON.stringify({
        errors: validate.errors.errors,
        error: true
      }),
      { status: 200 }
    )
  }

  const transporter = nodemailer.createTransport({
    host: import.meta.env.SMTP_HOST,
    port: import.meta.env.SMTP_PORT,
    auth: {
      user: import.meta.env.SMTP_USER,
      pass: import.meta.env.SMTP_PASSWORD
    }
  })

  const { locale, ...restBody } = body

  const view = 'Contacto'
  const mailConfig = {
    to: `${import.meta.env.MAIL_TO}`,
    from: `${body.email ?? import.meta.env.MAIL_FROM}`,
    replyTo: `${body.email ?? ''}`,
    subject: `${view} :: ${getDate({ output: 'DD/MM/YYYY' })}`,
    html: `${MailTemplate({ view: view, data: restBody })}`
  }

  const sent = await transporter
    .sendMail(mailConfig)
    .then((info: MailInfo) => {
      const success = info?.accepted.length > 0

      return { success }
    })
    .catch((error: string) => {
      console.error('Transporter ERROR:', error)

      return { success: false, message: error }
    })

  if (!sent.success) {
    return new Response(
      JSON.stringify({
        error: true
      }),
      { status: 200 }
    )
  }

  return new Response(JSON.stringify({ error: false }), {
    status: 200
  })
}

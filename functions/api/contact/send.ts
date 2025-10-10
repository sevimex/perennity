// functions/api/contact/send.ts
// Envía correo con Resend y respeta el contrato del front (errors|{}).

import type { PagesFunction } from '@cloudflare/workers-types';

type BodyIn = {
  locale?: string;
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  comments?: string; // el front usa "comments"
  message?: string;  // lo rellenamos desde "comments" para el cuerpo del correo
};

type Errors = Record<string, string>;

interface Env {
  RESEND_API_KEY?: string; // Secret en Pages
  MAIL_FROM?: string;      // p.ej. "info@perennity.mx" (dominio verificado)
  MAIL_TO?: string;        // uno o varios, separados por coma
}

export const onRequestPost = (async (context: Parameters<PagesFunction<Env>>[0]) => {
  const { request, env } = context;
  try {
    const body = (await request.json()) as BodyIn;

    // --- Validación mínima: name + email + comments ---
    const errors: Errors = {};
    const name = body?.name?.trim() ?? '';
    const email = body?.email?.trim() ?? '';
    const comments = body?.comments?.trim() ?? '';

    if (!name) errors.name = 'required';
    if (!email) errors.email = 'required';
    else if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = 'invalid';
    if (!comments) errors.comments = 'required';

    if (Object.keys(errors).length) {
      // Tu UI espera 200 con { errors: { ... } }
      return json({ errors });
    }

    // Normaliza "message" a partir de "comments" (para el cuerpo del mail)
    body.message = comments;

    // --- Envío de correo con Resend (si hay configuración) ---
    if (env.RESEND_API_KEY && env.MAIL_FROM && env.MAIL_TO) {
      const subject = `Nuevo contacto: ${name || email}`;
      const toList = env.MAIL_TO.split(',').map((s) => s.trim()).filter(Boolean);

      const text = [
        `Nombre:   ${name}`,
        `Empresa:  ${body.company || '-'}`,
        `Email:    ${email}`,
        `Tel:      ${body.phone || '-'}`,
        '',
        'Mensaje:',
        body.message || '-',
        '',
        `Locale:   ${body.locale || '-'}`,
      ].join('\n');

      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          authorization: `Bearer ${env.RESEND_API_KEY}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          from: env.MAIL_FROM!,
          to: toList,
          subject,
          text,
          // permite responder directo al usuario desde el cliente de correo
          reply_to: email,
        }),
      });

      if (!r.ok) {
        // Si el proveedor falla, tu UI entiende { error: true }
        return json({ error: true });
      }
    } else {
      // Si faltan variables de Resend, consideramos que no hay transporte configurado.
      // Devuelve éxito UI ({}), o si prefieres forzar error descomenta la siguiente línea:
      // return json({ error: true });
    }

    // Éxito EXACTO para tu UI: sin `errors` y sin `error`
    return json({});
  } catch {
    return json({ error: true });
  }
}) as unknown as PagesFunction<Env>;

// Helper JSON con status 200 (lo que espera el front)
function json(payload: unknown): Response {
  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
}
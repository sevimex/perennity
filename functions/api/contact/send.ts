// functions/api/contact/send.ts  (compatible con el contrato del form de la agencia)

type BodyIn = {
  locale?: string;
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  message?: string;
  comments?: string; // por si el form usa "comments"
};

type Errors = Record<string, string>;

const isEmail = (v?: string) => !!v && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const t = (msg: string) => msg; // si después quieres mensajes localizados, aquí haces el map por `locale`

export const onRequestPost: PagesFunction = async ({ request, env }) => {
  try {
    if (!request.headers.get('content-type')?.includes('application/json')) {
      return new Response(JSON.stringify({ error: true }), { status: 200 });
    }

    const body = (await request.json()) as BodyIn;

    // Campos que el form de la agencia suele mandar
    const name = (body.name ?? '').toString().trim();
    const company = (body.company ?? '').toString().trim();
    const email = (body.email ?? '').toString().trim();
    const phone = (body.phone ?? '').toString().trim();
    const message = (body.message ?? body.comments ?? '').toString().trim();

    // Validación como hacía la API original: devolver `errors` por campo
    const errors: Errors = {};
    if (!name) errors.name = t('required');
    if (!email || !isEmail(email)) errors.email = t('required');
    if (!phone) errors.phone = t('required');
    if (!message) errors.message = t('required');

    if (Object.keys(errors).length) {
      // El frontend espera exactamente { errors: {...} }
      return new Response(JSON.stringify({ errors }), { status: 200 });
    }

    // Envío por Resend respetando tus variables
    const payload = {
      from: env.MAIL_FROM,          // ajusta esto en Cloudflare Pages
      to: env.MAIL_TO,              // ajusta esto en Cloudflare Pages
      reply_to: email,              // responde al correo del cliente
      subject: `Contacto :: ${new Date().toLocaleDateString('es-MX')}`,
      html: `
        <h3>NUEVO CONTACTO</h3>
        <p><b>Nombre:</b> ${escapeHtml(name)}</p>
        <p><b>Empresa:</b> ${escapeHtml(company)}</p>
        <p><b>Email:</b> ${escapeHtml(email)}</p>
        <p><b>Teléfono:</b> ${escapeHtml(phone)}</p>
        <p><b>Mensaje:</b><br/>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
      `,
      text: `NUEVO CONTACTO

Nombre: ${name}
Empresa: ${company}
Email: ${email}
Teléfono: ${phone}

Mensaje:
${message}
`
    };

    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!resp.ok) {
      // Error general: { error: true }
      return new Response(JSON.stringify({ error: true }), { status: 200 });
    }

    // Éxito EXACTO para tu form: no `errors` y no `error`
    return new Response(JSON.stringify({}), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: true }), { status: 200 });
  }
};

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m]!));
}
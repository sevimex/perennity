type ContactBody = { name?: string; email?: string; phone?: string; message?: string; turnstile?: string };
const isEmail = (v?: string) => !!v && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const clean = (v?: string) => (v ?? '').toString().trim().replace(/[<>]/g, m => ({'<':'&lt;','>':'&gt;'}[m]!));

export const onRequestPost: PagesFunction = async (ctx) => {
  try {
    const { request, env } = ctx;
    if (!request.headers.get('content-type')?.includes('application/json'))
      return new Response(JSON.stringify({ error: true, reason: 'bad_content_type' }), { status: 200 });

    const body = await request.json() as ContactBody;
    if (!isEmail(body.email) || !body.name || !body.message)
      return new Response(JSON.stringify({ error: true, reason: 'bad_request' }), { status: 200 });

    // (Opcional) Turnstile
    if (env.TURNSTILE_SECRET && body.turnstile) {
      const form = new URLSearchParams();
      form.append('secret', env.TURNSTILE_SECRET);
      form.append('response', body.turnstile);
      const ok = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method:'POST', body: form })
        .then(r=>r.json()).then(r=>r.success as boolean);
      if (!ok) return new Response(JSON.stringify({ error: true, reason: 'captcha_failed' }), { status: 200 });
    }

    const name = clean(body.name), email = clean(body.email), phone = clean(body.phone);
    const message = clean(body.message).replace(/\n/g,'<br/>');

    const payload = {
      from: env.MAIL_FROM,
      to: env.MAIL_TO,
      reply_to: email,
      subject: `Contacto :: ${new Date().toLocaleDateString('es-MX')}`,
      html: `<h3>Nuevo contacto</h3>
             <p><b>Nombre:</b> ${name}</p>
             <p><b>Email:</b> ${email}</p>
             <p><b>Teléfono:</b> ${phone}</p>
             <p><b>Mensaje:</b><br/>${message}</p>`
    };

    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (resp.ok) return new Response(JSON.stringify({ error: false }), { status: 200 });
    console.error('Resend error', resp.status, await resp.text());
    return new Response(JSON.stringify({ error: true, reason: 'provider_error' }), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: true, reason: 'server_error' }), { status: 200 });
  }
};
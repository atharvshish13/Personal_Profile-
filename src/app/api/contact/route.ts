const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const maxRequestSize = 25_000;

type ResendEmail = {
  from: string;
  to: string;
  reply_to?: string;
  subject: string;
  text: string;
};

async function sendEmail(
  apiKey: string,
  email: ResendEmail,
  label: string,
): Promise<boolean> {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(email),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error(`Resend rejected the ${label} email`, { status: response.status });
      return false;
    }

    return true;
  } catch (error) {
    console.error(`Resend could not send the ${label} email`, error);
    return false;
  }
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  const requestHost = request.headers.get('host')?.toLowerCase();
  if (!origin || !requestHost) {
    return Response.json({ error: 'This request could not be verified.' }, { status: 403 });
  }

  try {
    const originUrl = new URL(origin);
    if (
      !['http:', 'https:'].includes(originUrl.protocol) ||
      originUrl.host !== requestHost
    ) {
      return Response.json({ error: 'This request could not be verified.' }, { status: 403 });
    }
  } catch {
    return Response.json({ error: 'This request could not be verified.' }, { status: 403 });
  }

  if (request.headers.get('content-type')?.split(';', 1)[0].trim() !== 'application/json') {
    return Response.json({ error: 'Expected a JSON request.' }, { status: 415 });
  }

  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (!Number.isFinite(contentLength) || contentLength > maxRequestSize) {
    return Response.json({ error: 'The submitted message is too large.' }, { status: 413 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: 'The submitted form could not be read.' }, { status: 400 });
  }

  if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
    return Response.json({ error: 'Please complete all contact form fields.' }, { status: 400 });
  }

  const fields = payload as Record<string, unknown>;
  const name = typeof fields.name === 'string' ? fields.name.trim() : '';
  const email = typeof fields.email === 'string' ? fields.email.trim() : '';
  const subject = typeof fields.subject === 'string'
    ? fields.subject.trim().replace(/[\r\n]+/g, ' ')
    : '';
  const message = typeof fields.message === 'string' ? fields.message.trim() : '';
  const honeypot = typeof fields.website === 'string' ? fields.website.trim() : '';

  if (honeypot) {
    return Response.json({ error: 'The contact form could not be verified.' }, { status: 400 });
  }

  if (
    !name || name.length > 100 ||
    !emailPattern.test(email) || email.length > 254 ||
    !subject || subject.length > 200 ||
    message.length < 10 || message.length > 5_000
  ) {
    return Response.json({ error: 'Please check the contact form fields and try again.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const missingConfiguration = [
    !apiKey && 'RESEND_API_KEY',
    !from && 'RESEND_FROM_EMAIL',
    !to && 'CONTACT_TO_EMAIL',
  ].filter(Boolean);

  if (!apiKey || !from || !to) {
    console.error('Contact email configuration is incomplete', { missing: missingConfiguration });
    return Response.json(
      { error: 'Email is not configured yet. Please email atharvshish13@gmail.com directly.' },
      { status: 503 },
    );
  }

  const inquirySent = await sendEmail(apiKey, {
    from,
    to,
    reply_to: email,
    subject: `Portfolio contact: ${subject}`,
    text: `New portfolio message\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
  }, 'inquiry');

  if (!inquirySent) {
    return Response.json(
      { error: 'Your message could not be delivered. Please email atharvshish13@gmail.com directly.' },
      { status: 502 },
    );
  }

  const confirmationSent = await sendEmail(apiKey, {
    from,
    to: email,
    subject: 'Thanks for contacting Atharvshish',
    text: `Hi ${name},\n\nThanks for reaching out. Your message has been delivered, and Atharvshish will get back to you.\n\nYour message:\nSubject: ${subject}\n\n${message}\n\n— Atharvshish Barwat`,
  }, 'visitor confirmation');

  return Response.json({ ok: true, confirmationSent });
}

import { createServerFn } from '@tanstack/react-start'

interface ContactPayload {
  person?: string
  navn: string
  epost: string
  telefon?: string
  melding: string
}

interface ContactResult {
  ok: boolean
  feilmelding?: string
}

export const sendContactForm = createServerFn({ method: 'POST' })
  .validator((data: unknown): ContactPayload => {
    const d = data as Record<string, string>
    if (!d.navn?.trim()) throw new Error('Navn er påkrevd')
    if (!d.epost?.trim() || !d.epost.includes('@')) throw new Error('Gyldig e-post er påkrevd')
    if (!d.melding?.trim()) throw new Error('Melding er påkrevd')
    const person = d.person?.trim().toLowerCase()
    return {
      person: person || undefined,
      navn: d.navn.trim(),
      epost: d.epost.trim(),
      telefon: d.telefon?.trim() || undefined,
      melding: d.melding.trim(),
    }
  })
  .handler(async ({ data }): Promise<ContactResult> => {
    const hildeApiKey = process.env['BREVO_API_KEY_HILDE']
    const tinaApiKey = process.env['BREVO_API_KEY_TINA']

    const recipientByPerson: Record<string, string> = {
      hilde: 'hilde@brottogblega.no',
      tina: 'filosamtale@gmail.com',
    }

    const personKey = data.person?.toLowerCase()
    if (personKey && !recipientByPerson[personKey]) {
      return { ok: false, feilmelding: 'Ugyldig kontaktperson valgt.' }
    }
    const toEmail = personKey ? recipientByPerson[personKey] : undefined
    const fallbackToEmail = process.env['CONTACT_TO_EMAIL'] ?? 'hilde@brottogblega.no'

    const apiKeyByPerson: Record<string, string | undefined> = {
      hilde: hildeApiKey,
      tina: tinaApiKey,
    }
    const apiKey = personKey ? apiKeyByPerson[personKey] : undefined
    const senderEmail = process.env['SENDER_EMAIL'] ?? 'noreply@brottogblega.no'

    if (!apiKey) {
      console.error('[contact] Ingen Brevo API-nokkel er satt for valgt mottaker')
      return { ok: false, feilmelding: 'Konfigurasjonsfeil — prøv igjen senere.' }
    }

    const resolvedToEmail = toEmail ?? fallbackToEmail

    console.log('[contact] Sender e-post fra', senderEmail, 'til', resolvedToEmail)

    const html = `
      <h2>Ny henvendelse fra brottogblega.no</h2>
      <p><strong>Navn:</strong> ${escHtml(data.navn)}</p>
      <p><strong>E-post:</strong> ${escHtml(data.epost)}</p>
      ${data.telefon ? `<p><strong>Telefon:</strong> ${escHtml(data.telefon)}</p>` : ''}
      <p><strong>Melding:</strong></p>
      <blockquote style="border-left:3px solid #4fb8b2;padding-left:12px;color:#416166">
        ${escHtml(data.melding).replace(/\n/g, '<br>')}
      </blockquote>
    `

    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'Brott og Blega Helse Kontaktskjema', email: senderEmail },
        to: [{ email: resolvedToEmail, name: 'Brott og Blega Helse' }],
        replyTo: { email: data.epost, name: data.navn },
        subject: `Ny henvendelse fra ${data.navn}`,
        htmlContent: html,
      }),
    })

    if (!res.ok) {
      const body = await res.text().catch(() => '')
      console.error('[contact] Brevo API feil', res.status, body)
      
      // Parse error details if available
      let errorMsg = 'Kunne ikke sende meldingen. Prøv igjen.'
      try {
        const errorData = JSON.parse(body)
        if (errorData.message) {
          errorMsg = `Brevo feil: ${errorData.message}`
        }
      } catch {
        // Not JSON or parsing failed
      }
      
      return { 
        ok: false, 
        feilmelding: `${errorMsg} (Status: ${res.status})` 
      }
    }

    return { ok: true }
  })

function escHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

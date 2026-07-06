import { createServerFn } from '@tanstack/react-start'

export type ContactFormInput = {
  name: string
  email: string
  message: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContactInput(input: ContactFormInput) {
  const name = input.name.trim()
  const email = input.email.trim().toLowerCase()
  const message = input.message.trim()

  if (name.length < 2) {
    throw new Error('Navn må være minst 2 tegn.')
  }

  if (!EMAIL_REGEX.test(email)) {
    throw new Error('Oppgi en gyldig e-postadresse.')
  }

  if (message.length < 10) {
    throw new Error('Meldingen må være minst 10 tegn.')
  }

  return { name, email, message }
}

export const submitContactMessage = createServerFn({ method: 'POST' })
  .validator((input: ContactFormInput) => validateContactInput(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.BREVO_API_KEY
    const toEmail = process.env.BREVO_TO_EMAIL
    const senderEmail = process.env.BREVO_SENDER_EMAIL || 'noreply@brottogblega.no'
    const senderName = process.env.BREVO_SENDER_NAME || 'Brott og Blega'

    if (!apiKey || !toEmail) {
      return {
        ok: false,
        message:
          'Kontaktskjema er ikke konfigurert ennå. Sett BREVO_API_KEY og BREVO_TO_EMAIL i miljøvariabler.',
      }
    }

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email: toEmail }],
        replyTo: { email: data.email, name: data.name },
        subject: `Ny henvendelse fra ${data.name}`,
        textContent: `Navn: ${data.name}\nE-post: ${data.email}\n\nMelding:\n${data.message}`,
      }),
    })

    if (!response.ok) {
      return {
        ok: false,
        message: 'Kunne ikke sende meldingen akkurat nå. Prøv igjen litt senere.',
      }
    }

    return { ok: true, message: 'Takk! Vi svarer deg så raskt vi kan.' }
  })

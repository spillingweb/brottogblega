import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import React from 'react'

// useServerFn is only a wrapper in production; return the function as-is for tests
vi.mock('@tanstack/react-start', () => ({
  useServerFn: (fn: unknown) => fn,
}))

// Replace the Radix UI Select with a native <select> for reliable jsdom interaction
vi.mock('#/components/ui/select', () => ({
  Select: ({
    children,
    value,
    onValueChange,
  }: {
    children: React.ReactNode
    value: string
    onValueChange: (v: string) => void
  }) => (
    <select
      data-testid="person-select"
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
    >
      {children}
    </select>
  ),
  SelectTrigger: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  SelectValue: ({ placeholder }: { placeholder: string }) => (
    <option value="">{placeholder}</option>
  ),
  SelectContent: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  SelectItem: ({ value, children }: { value: string; children: React.ReactNode }) => (
    <option value={value}>{children}</option>
  ),
}))

const mockSend = vi.hoisted(() => vi.fn())

vi.mock('#/server/contact', () => ({
  sendContactForm: mockSend,
}))

import { Dialog } from '#/components/ui/dialog'
import ContactDialog from './ContactDialog'

function renderDialog(props: { sendTo?: 'hilde' | 'tina'; message?: string } = {}) {
  return render(
    <Dialog open>
      <ContactDialog {...props} />
    </Dialog>,
  )
}

function fillRequiredFields({
  name = 'Ola Nordmann',
  email = 'ola@example.com',
  message = 'Hei, jeg trenger hjelp.',
} = {}) {
  fireEvent.change(screen.getByPlaceholderText('Ditt fulle navn'), {
    target: { value: name },
  })
  fireEvent.change(screen.getByPlaceholderText('din@epost.no'), {
    target: { value: email },
  })
  fireEvent.change(screen.getByPlaceholderText('Hva kan vi hjelpe deg med?'), {
    target: { value: message },
  })
}

describe('ContactDialog', () => {
  beforeEach(() => {
    mockSend.mockReset()
  })

  it('renders the contact form with all required fields', () => {
    renderDialog()
    expect(screen.getByText('Kontakt oss')).toBeTruthy()
    expect(screen.getByPlaceholderText('Ditt fulle navn')).toBeTruthy()
    expect(screen.getByPlaceholderText('din@epost.no')).toBeTruthy()
    expect(screen.getByPlaceholderText('+47 000 00 000 (valgfritt)')).toBeTruthy()
    expect(screen.getByPlaceholderText('Hva kan vi hjelpe deg med?')).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Send melding' })).toBeTruthy()
  })

  it('pre-fills the message field from the message prop', () => {
    renderDialog({ message: 'Jeg er interessert i fysioterapi' })
    const textarea = screen.getByPlaceholderText(
      'Hva kan vi hjelpe deg med?',
    ) as HTMLTextAreaElement
    expect(textarea.value).toBe('Jeg er interessert i fysioterapi')
  })

  it('pre-selects the recipient from the sendTo prop', () => {
    renderDialog({ sendTo: 'tina' })
    const select = screen.getByTestId('person-select') as HTMLSelectElement
    expect(select.value).toBe('tina')
  })

  it('defaults to Hilde when sendTo is not provided', () => {
    renderDialog()
    const select = screen.getByTestId('person-select') as HTMLSelectElement
    expect(select.value).toBe('hilde')
  })

  it('shows the success view after a successful submission', async () => {
    mockSend.mockResolvedValueOnce({ ok: true })
    renderDialog()
    fillRequiredFields()
    fireEvent.click(screen.getByRole('button', { name: 'Send melding' }))

    await waitFor(() => {
      expect(screen.getByText('Takk for din henvendelse!')).toBeTruthy()
    })
    expect(screen.getByText('Vi tar kontakt med deg innen 1–2 virkedager.')).toBeTruthy()
  })

  it('shows an error message when the server returns an error', async () => {
    mockSend.mockResolvedValueOnce({ ok: false, feilmelding: 'Konfigurasjonsfeil' })
    renderDialog()
    fillRequiredFields()
    fireEvent.click(screen.getByRole('button', { name: 'Send melding' }))

    await waitFor(() => {
      expect(screen.getByText('Konfigurasjonsfeil')).toBeTruthy()
    })
  })

  it('shows a fallback error message when the server returns no feilmelding', async () => {
    mockSend.mockResolvedValueOnce({ ok: false })
    renderDialog()
    fillRequiredFields()
    fireEvent.click(screen.getByRole('button', { name: 'Send melding' }))

    await waitFor(() => {
      expect(screen.getByText('Noe gikk galt.')).toBeTruthy()
    })
  })

  it('shows an error message when a network error is thrown', async () => {
    mockSend.mockRejectedValueOnce(new Error('Network failure'))
    renderDialog()
    fillRequiredFields()
    fireEvent.click(screen.getByRole('button', { name: 'Send melding' }))

    await waitFor(() => {
      expect(screen.getByText(/Noe gikk galt/)).toBeTruthy()
    })
    expect(screen.getByText(/Network failure/)).toBeTruthy()
  })

  it('disables the submit button and shows "Sender..." while sending', async () => {
    let resolveRequest!: (value: { ok: boolean }) => void
    mockSend.mockReturnValueOnce(new Promise((res) => { resolveRequest = res }))

    renderDialog()
    fillRequiredFields()
    fireEvent.click(screen.getByRole('button', { name: 'Send melding' }))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Sender...' })).toBeTruthy()
    })
    expect(
      (screen.getByRole('button', { name: 'Sender...' }) as HTMLButtonElement).disabled,
    ).toBe(true)

    // Resolve so the component can clean up
    resolveRequest({ ok: true })
  })

  it('can send a new message after a successful submission', async () => {
    mockSend.mockResolvedValueOnce({ ok: true })
    renderDialog()
    fillRequiredFields()
    fireEvent.click(screen.getByRole('button', { name: 'Send melding' }))

    await waitFor(() => screen.getByText('Takk for din henvendelse!'))

    fireEvent.click(screen.getByRole('button', { name: 'Send ny melding' }))

    expect(screen.getByText('Kontakt oss')).toBeTruthy()
    expect((screen.getByPlaceholderText('Ditt fulle navn') as HTMLInputElement).value).toBe('')
  })

  it('passes the correct data to the server function', async () => {
    mockSend.mockResolvedValueOnce({ ok: true })
    renderDialog({ sendTo: 'tina' })
    fillRequiredFields({
      name: 'Test Person',
      email: 'test@example.com',
      message: 'Dette er en test.',
    })
    fireEvent.click(screen.getByRole('button', { name: 'Send melding' }))

    await waitFor(() => screen.getByText('Takk for din henvendelse!'))

    expect(mockSend).toHaveBeenCalledWith({
      data: {
        person: 'tina',
        navn: 'Test Person',
        epost: 'test@example.com',
        telefon: '',
        melding: 'Dette er en test.',
      },
    })
  })
})

import { describe, it, expect, vi } from 'vitest'

// Mock @tanstack/react-start so the module-level createServerFn() call succeeds
vi.mock('@tanstack/react-start', () => ({
  createServerFn: () => ({
    validator: () => ({ handler: () => undefined }),
  }),
}))

import { validateContactPayload, escHtml } from './contact'

describe('validateContactPayload', () => {
  const validData = {
    navn: 'Ola Nordmann',
    epost: 'ola@example.com',
    melding: 'Hei, jeg trenger hjelp.',
  }

  it('accepts valid payload with all required fields', () => {
    const result = validateContactPayload(validData)
    expect(result.navn).toBe('Ola Nordmann')
    expect(result.epost).toBe('ola@example.com')
    expect(result.melding).toBe('Hei, jeg trenger hjelp.')
  })

  it('trims whitespace from all fields', () => {
    const result = validateContactPayload({
      navn: '  Ola Nordmann  ',
      epost: '  ola@example.com  ',
      melding: '  Hei  ',
    })
    expect(result.navn).toBe('Ola Nordmann')
    expect(result.epost).toBe('ola@example.com')
    expect(result.melding).toBe('Hei')
  })

  it('normalizes the person field to lowercase', () => {
    const result = validateContactPayload({ ...validData, person: 'Hilde' })
    expect(result.person).toBe('hilde')
  })

  it('sets person to undefined when not provided', () => {
    const result = validateContactPayload(validData)
    expect(result.person).toBeUndefined()
  })

  it('includes telefon when provided', () => {
    const result = validateContactPayload({ ...validData, telefon: '12345678' })
    expect(result.telefon).toBe('12345678')
  })

  it('sets telefon to undefined when empty', () => {
    const result = validateContactPayload({ ...validData, telefon: '' })
    expect(result.telefon).toBeUndefined()
  })

  it('throws when navn is missing', () => {
    expect(() => validateContactPayload({ ...validData, navn: '' })).toThrow('Navn er påkrevd')
  })

  it('throws when navn is only whitespace', () => {
    expect(() => validateContactPayload({ ...validData, navn: '   ' })).toThrow('Navn er påkrevd')
  })

  it('throws when epost is empty', () => {
    expect(() => validateContactPayload({ ...validData, epost: '' })).toThrow('Gyldig e-post er påkrevd')
  })

  it('throws when epost has no @ sign', () => {
    expect(() =>
      validateContactPayload({ ...validData, epost: 'notanemail' }),
    ).toThrow('Gyldig e-post er påkrevd')
  })

  it('throws when melding is empty', () => {
    expect(() => validateContactPayload({ ...validData, melding: '' })).toThrow('Melding er påkrevd')
  })

  it('throws when melding is only whitespace', () => {
    expect(() => validateContactPayload({ ...validData, melding: '   ' })).toThrow('Melding er påkrevd')
  })
})

describe('escHtml', () => {
  it('escapes ampersands', () => {
    expect(escHtml('Tom & Jerry')).toBe('Tom &amp; Jerry')
  })

  it('escapes < and > characters', () => {
    expect(escHtml('<script>')).toBe('&lt;script&gt;')
  })

  it('escapes double quotes', () => {
    expect(escHtml('"hello"')).toBe('&quot;hello&quot;')
  })

  it('escapes all special characters together', () => {
    expect(escHtml('<a href="test&query">text</a>')).toBe(
      '&lt;a href=&quot;test&amp;query&quot;&gt;text&lt;/a&gt;',
    )
  })

  it('leaves plain text unchanged', () => {
    expect(escHtml('Hello, World!')).toBe('Hello, World!')
  })
})

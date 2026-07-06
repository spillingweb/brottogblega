import { describe, expect, it } from 'vitest'
import { validateContactInput } from './contact'

describe('validateContactInput', () => {
  it('returns normalized values for valid input', () => {
    const result = validateContactInput({
      name: '  Ola Nordmann ',
      email: 'OLA@example.com ',
      message: 'Dette er en melding med nok tegn.',
    })

    expect(result).toEqual({
      name: 'Ola Nordmann',
      email: 'ola@example.com',
      message: 'Dette er en melding med nok tegn.',
    })
  })

  it('throws on invalid email', () => {
    expect(() =>
      validateContactInput({
        name: 'Ola',
        email: 'invalid',
        message: 'Dette er en melding med nok tegn.',
      }),
    ).toThrow('Oppgi en gyldig e-postadresse.')
  })
})

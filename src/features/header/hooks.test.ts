import { describe, it, expect, vi } from 'vitest'

// Mock the TinaCMS client to prevent CMS network calls during tests
vi.mock('#/tina/__generated__/client', () => ({
  client: { queries: {} },
}))

import { toServiceId } from './hooks'

describe('toServiceId', () => {
  it('uses _sys.filename when available', () => {
    expect(toServiceId({ _sys: { filename: 'fysioterapi' } })).toBe('fysioterapi')
  })

  it('generates a URL slug from the title when _sys.filename is absent', () => {
    expect(toServiceId({ title: 'Manuell Terapi' })).toBe('manuell-terapi')
  })

  it('converts Norwegian characters: æ → ae, ø → o, å → a', () => {
    expect(toServiceId({ title: 'Øvelse Ånd og Ærfugl' })).toBe('ovelse-and-og-aerfugl')
  })

  it('replaces non-alphanumeric sequences with hyphens', () => {
    expect(toServiceId({ title: 'Yoga & Mindfulness!' })).toBe('yoga-mindfulness')
  })

  it('strips leading and trailing hyphens', () => {
    expect(toServiceId({ title: '---test---' })).toBe('test')
  })

  it('falls back to "tjeneste" when title is absent', () => {
    expect(toServiceId({})).toBe('tjeneste')
  })

  it('falls back to "tjeneste" when title is an empty string', () => {
    expect(toServiceId({ title: '' })).toBe('tjeneste')
  })
})

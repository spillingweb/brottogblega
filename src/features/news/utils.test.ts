import { describe, it, expect } from 'vitest'
import { calculateReadingTime, categoryColors } from './utils'

describe('calculateReadingTime', () => {
  it('returns 0 for empty string content', () => {
    expect(calculateReadingTime('')).toBe(0)
  })

  it('returns 0 for null content', () => {
    expect(calculateReadingTime(null)).toBe(0)
  })

  it('returns 0 for undefined content', () => {
    expect(calculateReadingTime(undefined)).toBe(0)
  })

  it('calculates 1 minute for exactly 200 words', () => {
    const text = Array(200).fill('word').join(' ')
    expect(calculateReadingTime(text)).toBe(1)
  })

  it('rounds up to 2 minutes for 201 words', () => {
    const text = Array(201).fill('word').join(' ')
    expect(calculateReadingTime(text)).toBe(2)
  })

  it('extracts text from rich-text node objects', () => {
    const content = {
      children: [{ text: 'Hello world this is a test sentence with several words' }],
    }
    expect(calculateReadingTime(content)).toBeGreaterThan(0)
  })

  it('handles nested arrays of rich-text nodes', () => {
    const content = [
      { text: 'First paragraph text here' },
      { children: [{ text: 'Nested second paragraph text here' }] },
    ]
    expect(calculateReadingTime(content)).toBeGreaterThan(0)
  })
})

describe('categoryColors', () => {
  it('has color classes defined for all expected categories', () => {
    expect(categoryColors['Refleksjon']).toBeTruthy()
    expect(categoryColors['Fagartikkel']).toBeTruthy()
    expect(categoryColors['Kronikk']).toBeTruthy()
    expect(categoryColors['Nyhet']).toBeTruthy()
  })

  it('each category class string contains both a background and text color', () => {
    for (const cls of Object.values(categoryColors)) {
      expect(cls).toContain('bg-')
      expect(cls).toContain('text-')
    }
  })
})

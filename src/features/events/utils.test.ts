import { describe, it, expect } from 'vitest'
import { spotsColor, isPastEvent, formatEventDates } from './utils'

describe('spotsColor', () => {
  it('returns green classes for "Åpent"', () => {
    expect(spotsColor('Åpent')).toBe('text-chart-2 bg-chart-2-bg')
  })

  it('returns yellow classes for "Få plasser igjen"', () => {
    expect(spotsColor('Få plasser igjen')).toBe('text-chart-1 bg-chart-1-bg')
  })

  it('returns red classes for "Fullt"', () => {
    expect(spotsColor('Fullt')).toBe('text-destructive bg-destructive/10')
  })

  it('returns gray classes for an unknown status', () => {
    expect(spotsColor('Ukjent')).toBe('text-gray-500 bg-gray-100')
  })

  it('returns gray classes for an empty string', () => {
    expect(spotsColor('')).toBe('text-gray-500 bg-gray-100')
  })
})

describe('isPastEvent', () => {
  it('returns false for a future event', () => {
    expect(isPastEvent({ date: '2099-12-31' })).toBe(false)
  })

  it('returns true for a past event', () => {
    expect(isPastEvent({ date: '2000-01-01' })).toBe(true)
  })

  it('returns false for an event happening today', () => {
    const today = new Date().toISOString().slice(0, 10)
    expect(isPastEvent({ date: today })).toBe(false)
  })

  it('returns false for a multi-day event whose end date is in the future', () => {
    expect(isPastEvent({ date: '2000-01-01', endDate: '2099-12-31' })).toBe(false)
  })

  it('returns true for a multi-day event that has fully ended', () => {
    expect(isPastEvent({ date: '2000-01-01', endDate: '2000-01-03' })).toBe(true)
  })

  it('respects a custom reference date', () => {
    const event = { date: '2024-06-15' }
    expect(isPastEvent(event, new Date('2024-06-14'))).toBe(false)
    expect(isPastEvent(event, new Date('2024-06-16'))).toBe(true)
  })
})

describe('formatEventDates', () => {
  it('formats a single-day event', () => {
    const { day, month, formattedDate } = formatEventDates('2025-03-15')
    expect(day).toBe(15)
    expect(month).toBeTruthy()
    expect(formattedDate).toContain('15')
    expect(formattedDate).toContain('mars')
    expect(formattedDate).toContain('2025')
  })

  it('formats a multi-day event within the same month (compact form)', () => {
    const { day, month, formattedDate } = formatEventDates('2025-03-10', '2025-03-15')
    expect(day).toBe(10)
    expect(month).toBeTruthy()
    expect(formattedDate).toContain('10')
    expect(formattedDate).toContain('15')
    expect(formattedDate).toContain('mars')
  })

  it('formats a multi-day event spanning two months (full form)', () => {
    const { formattedDate } = formatEventDates('2025-03-28', '2025-04-02')
    expect(formattedDate).toContain('mars')
    expect(formattedDate).toContain('april')
    expect(formattedDate).toContain('2025')
  })

  it('returns a truthy short month and the correct day for January', () => {
    const { day, month } = formatEventDates('2025-01-07')
    expect(day).toBe(7)
    expect(month).toBeTruthy()
    expect(month).toMatch(/jan/i)
  })
})

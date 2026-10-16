import { describe, it, expect } from 'vitest'
import { formatArticleDate } from './dateFormatter'

describe('formatArticleDate', () => {
  it('formats a standard date in Norwegian bokmål', () => {
    expect(formatArticleDate('2025-06-15')).toBe('15. juni 2025')
  })

  it('formats 1 January correctly', () => {
    expect(formatArticleDate('2025-01-01')).toBe('1. januar 2025')
  })

  it('formats 31 December correctly', () => {
    expect(formatArticleDate('2024-12-31')).toBe('31. desember 2024')
  })

  it('formats March dates correctly', () => {
    expect(formatArticleDate('2025-03-15')).toBe('15. mars 2025')
  })

  it('is timezone-safe — ISO date-only strings are treated as UTC midnight', () => {
    // 2025-07-04 should always be "4. juli 2025" regardless of local timezone
    expect(formatArticleDate('2025-07-04')).toBe('4. juli 2025')
  })
})

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('tinacms/tina-field', () => ({ tinaField: () => '' }))
vi.mock('tinacms/dist/rich-text', () => ({
  TinaMarkdown: () => null,
}))

import IndividualSection from './IndividualSection'
import type { PagesAbout } from '../../../../tina/__generated__/types'

const mockPage = {
  hildeTitle: 'Hilde Stenqvist',
  hildeKicker: 'Fysioterapi',
  hildeImage: '/hilde.jpg',
  hildeContent: null,
  hildeKeywords: ['Manuellterapi', 'Rygg', null, '   '],
  tinaMariaTitle: 'Tina Maria Lie',
  tinaMariaKicker: 'Samtaleterapi',
  tinaMariaImage: '/tina.jpg',
  tinaMariaContent: null,
  tinaMariaKeywords: ['Filosofi', 'Eksistensielle spørsmål'],
} as unknown as PagesAbout

describe('IndividualSection — Hilde', () => {
  it("renders Hilde's title and kicker", () => {
    render(<IndividualSection id="hilde" page={mockPage} isHilde />)
    expect(screen.getByText('Hilde Stenqvist')).toBeTruthy()
    expect(screen.getByText('Fysioterapi')).toBeTruthy()
  })

  it('renders valid keywords', () => {
    render(<IndividualSection id="hilde" page={mockPage} isHilde />)
    expect(screen.getByText('Manuellterapi')).toBeTruthy()
    expect(screen.getByText('Rygg')).toBeTruthy()
  })

  it('filters out null and whitespace-only keywords', () => {
    render(<IndividualSection id="hilde" page={mockPage} isHilde />)
    // Only 2 keyword badges should be rendered, not 4
    const keywords = screen.getAllByText(/^(Manuellterapi|Rygg)$/)
    expect(keywords).toHaveLength(2)
  })
})

describe('IndividualSection — Tina Maria', () => {
  it("renders Tina Maria's title and kicker", () => {
    render(<IndividualSection id="tina" page={mockPage} />)
    expect(screen.getByText('Tina Maria Lie')).toBeTruthy()
    expect(screen.getByText('Samtaleterapi')).toBeTruthy()
  })

  it("renders Tina Maria's keywords", () => {
    render(<IndividualSection id="tina" page={mockPage} />)
    expect(screen.getByText('Filosofi')).toBeTruthy()
    expect(screen.getByText('Eksistensielle spørsmål')).toBeTruthy()
  })
})

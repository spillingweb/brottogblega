import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('tinacms/tina-field', () => ({
  tinaField: () => '',
}))

import Intro from './Intro'
import type { PagesHomepage } from '../../../../tina/__generated__/types'

const mockPage = {
  intro1Title: 'Hva vi tilbyr',
  intro1Text: 'Vi tilbyr fysioterapi og samtaleterapi.',
  intro2Title: 'Vår tilnærming',
  intro2Text: 'Vi jobber helhetlig med deg.',
  intro3Title: 'Book time',
  intro3Text: 'Ta kontakt for å bestille time.',
} as unknown as PagesHomepage

describe('Intro', () => {
  it('renders all three section titles', () => {
    render(<Intro page={mockPage} />)
    expect(screen.getByText('Hva vi tilbyr')).toBeTruthy()
    expect(screen.getByText('Vår tilnærming')).toBeTruthy()
    expect(screen.getByText('Book time')).toBeTruthy()
  })

  it('renders all three section description texts', () => {
    render(<Intro page={mockPage} />)
    expect(screen.getByText('Vi tilbyr fysioterapi og samtaleterapi.')).toBeTruthy()
    expect(screen.getByText('Vi jobber helhetlig med deg.')).toBeTruthy()
    expect(screen.getByText('Ta kontakt for å bestille time.')).toBeTruthy()
  })

  it('displays the numbered section labels 01, 02, 03', () => {
    render(<Intro page={mockPage} />)
    expect(screen.getByText('01')).toBeTruthy()
    expect(screen.getByText('02')).toBeTruthy()
    expect(screen.getByText('03')).toBeTruthy()
  })
})

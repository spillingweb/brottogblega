import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'

vi.mock('@tanstack/react-router', () => ({
  Link: ({
    children,
    to,
    ...props
  }: {
    children: React.ReactNode
    to: string
    [key: string]: unknown
  }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}))
vi.mock('tinacms/tina-field', () => ({ tinaField: () => '' }))

import ServicesTeaser from './ServicesTeaser'
import type { PagesHomepage, ServicesConnectionQuery } from '../../../../tina/__generated__/types'

const mockPage = { servicesHeading: 'Våre tjenester' } as unknown as PagesHomepage

const emptyData = {
  servicesConnection: { edges: [] },
} as unknown as ServicesConnectionQuery

const servicesData = {
  servicesConnection: {
    edges: [
      { node: { id: '3', title: 'Service C', order: 3, description: 'Third service' } },
      { node: { id: '1', title: 'Service A', order: 1, description: 'First service' } },
      { node: { id: '2', title: 'Service B', order: 2, description: 'Second service' } },
    ],
  },
} as unknown as ServicesConnectionQuery

describe('ServicesTeaser', () => {
  it('renders the section heading from page data', () => {
    render(<ServicesTeaser page={mockPage} servicesData={emptyData} />)
    expect(screen.getByText('Våre tjenester')).toBeTruthy()
  })

  it('shows an empty-state message when there are no services', () => {
    render(<ServicesTeaser page={mockPage} servicesData={emptyData} />)
    expect(screen.getByText('Ingen tjenester er lagt inn ennå.')).toBeTruthy()
  })

  it('renders services sorted by their order field', () => {
    render(<ServicesTeaser page={mockPage} servicesData={servicesData} />)
    const titles = screen.getAllByText(/^Service [ABC]$/)
    expect(titles[0].textContent).toBe('Service A')
    expect(titles[1].textContent).toBe('Service B')
    expect(titles[2].textContent).toBe('Service C')
  })

  it('renders a link to the services page', () => {
    render(<ServicesTeaser page={mockPage} servicesData={emptyData} />)
    const link = screen.getByRole('link', { name: /Se alle tjenester/ }) as HTMLAnchorElement
    expect(link.href).toContain('/tjenester')
  })
})

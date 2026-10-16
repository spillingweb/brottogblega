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

import FooterNavLink from './FooterNavLink'

describe('FooterNavLink', () => {
  it('renders the correct label text', () => {
    render(<FooterNavLink path="/om-oss" label="Om oss" />)
    expect(screen.getByText('Om oss')).toBeTruthy()
  })

  it('renders a link pointing to the correct path', () => {
    render(<FooterNavLink path="/tjenester" label="Tjenester" />)
    const link = screen.getByRole('link', { name: 'Tjenester' }) as HTMLAnchorElement
    expect(link.href).toContain('/tjenester')
  })

  it('wraps the link in a list item', () => {
    const { container } = render(<FooterNavLink path="/" label="Hjem" />)
    expect(container.querySelector('li')).toBeTruthy()
  })
})

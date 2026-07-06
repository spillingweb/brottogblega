import { Link } from '@tanstack/react-router'

const links = [
  { to: '/', label: 'Hjem' },
  { to: '/about', label: 'Om oss' },
  { to: '/services', label: 'Tjenester' },
  { to: '/events', label: 'Arrangementer' },
  { to: '/contact', label: 'Kontakt' },
] as const

export default function Header() {
  return (
    <header className="border-b border-border bg-background/90 backdrop-blur-sm">
      <nav className="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-4 px-4 py-4">
        <Link to="/" className="text-sm font-semibold tracking-wide text-foreground no-underline">
          Brott og Blega
        </Link>
        <div className="ml-auto flex flex-wrap gap-4 text-sm text-muted-foreground">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="transition-colors hover:text-foreground"
              activeProps={{ className: 'text-foreground' }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}

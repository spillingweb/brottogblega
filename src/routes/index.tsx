import { createFileRoute, Link } from '@tanstack/react-router'
import { siteContent } from '@/content/site-content'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12">
      <section className="rounded-2xl border border-border bg-card p-8 md:p-12">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          {siteContent.home.kicker}
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          {siteContent.home.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{siteContent.home.description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/services">
            <Button size="lg">Se tjenester</Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" size="lg">
              Kontakt oss
            </Button>
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {siteContent.home.highlights.map((highlight) => (
          <Card key={highlight}>
            <CardContent className="pt-6 text-sm text-muted-foreground">{highlight}</CardContent>
          </Card>
        ))}
      </section>
    </main>
  )
}

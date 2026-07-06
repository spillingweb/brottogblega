import { createFileRoute } from '@tanstack/react-router'
import { siteContent } from '@/content/site-content'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12">
      <section className="mb-8">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">{siteContent.about.title}</h1>
        <p className="mt-3 max-w-3xl text-muted-foreground">{siteContent.about.description}</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {siteContent.about.people.map((person) => (
          <Card key={person.name}>
            <CardHeader>
              <CardTitle>{person.name}</CardTitle>
              <CardDescription>{person.role}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{person.bio}</CardContent>
          </Card>
        ))}
      </section>
    </main>
  )
}

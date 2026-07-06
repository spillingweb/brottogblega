import { createFileRoute } from '@tanstack/react-router'
import { siteContent } from '@/content/site-content'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/services')({ component: ServicesPage })

function ServicesPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12">
      <h1 className="text-4xl font-semibold tracking-tight text-foreground">{siteContent.services.title}</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {siteContent.services.items.map((service) => (
          <Card key={service.name}>
            <CardHeader>
              <CardTitle>{service.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{service.description}</CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}

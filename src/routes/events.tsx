import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getEvents } from '@/lib/events'

export const Route = createFileRoute('/events')({ component: EventsPage })

function EventsPage() {
  const eventsQuery = useQuery({
    queryKey: ['events'],
    queryFn: () => getEvents(),
  })

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12">
      <h1 className="text-4xl font-semibold tracking-tight text-foreground">Arrangementer</h1>
      <p className="mt-3 max-w-3xl text-muted-foreground">
        Kommende samlinger i Fevik og nærområdet.
      </p>

      {eventsQuery.isLoading ? <p className="mt-6 text-sm text-muted-foreground">Laster arrangementer…</p> : null}

      {eventsQuery.data ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {eventsQuery.data.map((event) => (
            <Card key={event.id}>
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {new Date(event.date).toLocaleDateString('nb-NO')} · {event.location}
                </p>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{event.description}</CardContent>
            </Card>
          ))}
        </div>
      ) : null}
    </main>
  )
}

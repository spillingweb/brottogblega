import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { submitContactMessage } from '@/lib/contact'

export const Route = createFileRoute('/contact')({ component: ContactPage })

function ContactPage() {
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
    onSubmit: async ({ value }) => {
      const result = await submitContactMessage({ data: value })
      setStatusMessage(result.message)
      if (result.ok) {
        form.reset()
      }
    },
  })

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Kontakt oss</CardTitle>
          <p className="text-sm text-muted-foreground">
            Send oss en melding om timebestilling, samtaler eller seminarer.
          </p>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault()
              event.stopPropagation()
              form.handleSubmit()
            }}
          >
            <form.Field name="name">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Navn</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    required
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="email">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>E-post</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    required
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="message">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Melding</Label>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    required
                  />
                </div>
              )}
            </form.Field>

            <form.Subscribe selector={(state) => ({ isSubmitting: state.isSubmitting })}>
              {({ isSubmitting }) => (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sender…' : 'Send melding'}
                </Button>
              )}
            </form.Subscribe>

            {statusMessage ? <p className="text-sm text-muted-foreground">{statusMessage}</p> : null}
          </form>
        </CardContent>
      </Card>
    </main>
  )
}

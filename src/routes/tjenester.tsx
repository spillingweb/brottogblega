import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tjenester')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/tjenester"!</div>
}

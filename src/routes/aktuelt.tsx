import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/aktuelt')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/aktuelt"!</div>
}

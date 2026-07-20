import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/om-oss')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/om-oss"!</div>
}

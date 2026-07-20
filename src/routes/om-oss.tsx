import About from '#/features/about/About'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/om-oss')({
  component: RouteComponent,
})

function RouteComponent() {
  return <About />
}

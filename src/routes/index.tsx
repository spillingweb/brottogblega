import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-heading">Welcome to TanStack Start</h1>
      <p className="mt-4">
        Edit a file to get started.
      </p>
    </div>
  )
}

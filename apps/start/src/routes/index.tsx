import { createFileRoute } from '@tanstack/react-router'

const Home = () => (
  <section className="space-y-3">
    <h1 className="text-3xl font-bold">Home</h1>
    <p className="text-slate-600">Server-rendered with TanStack Start, TanStack Router and Tailwind.</p>
  </section>
)

export const Route = createFileRoute('/')({ component: Home })

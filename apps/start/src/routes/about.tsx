import { createFileRoute } from '@tanstack/react-router'

const About = () => (
  <section className="space-y-3">
    <h1 className="text-3xl font-bold">About</h1>
    <p className="text-slate-600">Second page of the Start app, running as a Node server on Railway.</p>
  </section>
)

export const Route = createFileRoute('/about')({ component: About })

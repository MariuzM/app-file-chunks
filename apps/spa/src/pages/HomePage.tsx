import { CardTabs } from '../components/CardTabs.tsx'

const cards = [
  { title: 'Card 1', body: 'First card. Click Next or tab 2 to continue.' },
  { title: 'Card 2', body: 'Second card. Click Back or tab 1 to return.' },
]

export const HomePage = () => (
  <section className="space-y-6">
    <div className="space-y-3">
      <h1 className="text-3xl font-bold">Home</h1>
      <p className="text-slate-600">Client-side rendered with Vite, React Router and Tailwind.</p>
    </div>
    <CardTabs cards={cards} />
  </section>
)

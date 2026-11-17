import { useState } from 'react'

type Card = {
  title: string
  body: string
}

type Props = {
  cards: Card[]
}

const navButtonClass =
  'rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40'

export const CardTabs = ({ cards }: Props) => {
  const [active, setActive] = useState(0)
  const card = cards[active]
  const isFirst = active === 0
  const isLast = active === cards.length - 1

  return (
    <div className="space-y-4">
      <div role="tablist" className="flex gap-2">
        {cards.map((c, i) => (
          <button
            key={c.title}
            type="button"
            role="tab"
            id={`card-tab-${i}`}
            aria-selected={i === active}
            aria-controls="card-panel"
            onClick={() => setActive(i)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              i === active ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id="card-panel"
        aria-labelledby={`card-tab-${active}`}
        className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h2 className="text-xl font-semibold">{card.title}</h2>
        <p className="mt-2 text-slate-600">{card.body}</p>
      </div>

      <div className="flex items-center justify-between">
        <button type="button" className={navButtonClass} disabled={isFirst} onClick={() => setActive((s) => s - 1)}>
          Back
        </button>
        <span className="text-sm text-slate-500">
          {active + 1} / {cards.length}
        </span>
        <button type="button" className={navButtonClass} disabled={isLast} onClick={() => setActive((s) => s + 1)}>
          Next
        </button>
      </div>
    </div>
  )
}

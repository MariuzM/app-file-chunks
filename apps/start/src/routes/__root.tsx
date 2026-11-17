import { HeadContent, Link, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import appCss from '../styles.css?url'

type Props = {
  children: React.ReactNode
}

const linkClass = 'rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100'
const activeClass = 'bg-slate-900 text-white hover:bg-slate-900'

const RootDocument = ({ children }: Props) => (
  <html lang="en">
    <head>
      <HeadContent />
    </head>
    <body className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <nav className="mx-auto flex max-w-3xl items-center gap-2 px-4 py-3">
          <span className="mr-auto font-semibold">TanStack Start</span>
          <Link to="/" className={linkClass} activeProps={{ className: activeClass }} activeOptions={{ exact: true }}>
            Home
          </Link>
          <Link to="/about" className={linkClass} activeProps={{ className: activeClass }}>
            About
          </Link>
        </nav>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-10">{children}</main>
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
      <Scripts />
    </body>
  </html>
)

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

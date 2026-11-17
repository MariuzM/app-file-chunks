import { StrictMode, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import { Layout } from './Layout.tsx'

const HomePage = lazy(() => import('./pages/HomePage.tsx').then((m) => ({ default: m.HomePage })))
const AboutPage = lazy(() => import('./pages/AboutPage.tsx').then((m) => ({ default: m.AboutPage })))

const RELOAD_KEY = 'chunk-reload-at'

window.addEventListener('vite:preloadError', (e) => {
  try {
    const last = Number(sessionStorage.getItem(RELOAD_KEY) ?? 0)
    if (Date.now() - last < 10_000) return
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()))
  } catch {}
  e.preventDefault()
  window.location.reload()
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

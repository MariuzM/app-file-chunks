import { StrictMode, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import { Layout } from './Layout.tsx'

const HomePage = lazy(() => import('./pages/HomePage.tsx').then((m) => ({ default: m.HomePage })))
const AboutPage = lazy(() => import('./pages/AboutPage.tsx').then((m) => ({ default: m.AboutPage })))

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

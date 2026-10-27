import { useCallback, useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { CommandPalette } from './components/CommandPalette'
import { Cursor } from './components/Cursor'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Preloader } from './components/Preloader'
import { initSmoothScroll, scrollToTarget, ScrollTrigger } from './lib/motion'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { ProjectPage } from './pages/ProjectPage'

function App() {
  const location = useLocation()
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const toastTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    initSmoothScroll()
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setPaletteOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // New page: jump to top (unless Home will scroll to a section) and remeasure triggers.
  useEffect(() => {
    const hasTarget = Boolean((location.state as { scrollTo?: string } | null)?.scrollTo)
    if (!hasTarget) scrollToTarget(0, { immediate: true })
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120)
    return () => window.clearTimeout(id)
  }, [location.pathname])

  const markReady = useCallback(() => document.documentElement.classList.add('is-ready'), [])

  const showToast = useCallback((message: string) => {
    setToast(message)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 2200)
  }, [])

  const closePalette = useCallback(() => setPaletteOpen(false), [])

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Preloader onDone={markReady} />
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <Header onOpenPalette={() => setPaletteOpen(true)} />

      <main id="main" key={location.pathname} className="page">
        <Routes location={location}>
          <Route path="/" element={<Home onToast={showToast} />} />
          <Route path="/work/:slug" element={<ProjectPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <CommandPalette open={paletteOpen} onClose={closePalette} onToast={showToast} />
      <div className={`toast ${toast ? 'is-visible' : ''}`} role="status" aria-live="polite">{toast}</div>
    </>
  )
}

export default App

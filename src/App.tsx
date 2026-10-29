import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { useReveal } from './hooks/useReveal'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { ProjectPage } from './pages/ProjectPage'

function App() {
  const { pathname, hash } = useLocation()
  useReveal(pathname)

  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main" key={pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<ProjectPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App

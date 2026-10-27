import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { scrollToTarget } from '../lib/motion'
import { About } from '../sections/About'
import { Contact } from '../sections/Contact'
import { Experience } from '../sections/Experience'
import { Hero } from '../sections/Hero'
import { Milestones } from '../sections/Milestones'
import { Skills } from '../sections/Skills'
import { Work } from '../sections/Work'

export function Home({ onToast }: { onToast: (message: string) => void }) {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Sankalp M Tellur — Software Developer | Full-Stack & AI'
  }, [])

  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo
    if (!target) return
    // Wait for pinned sections to measure before scrolling to a section below them.
    const id = window.setTimeout(() => {
      scrollToTarget(target)
      navigate('/', { replace: true, state: null })
    }, 350)
    return () => window.clearTimeout(id)
  }, [location.state, navigate])

  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Work />
      <Skills />
      <Milestones />
      <Contact onToast={onToast} />
    </>
  )
}

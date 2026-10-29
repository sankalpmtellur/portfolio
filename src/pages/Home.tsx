import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { About } from '../sections/About'
import { Contact } from '../sections/Contact'
import { Experience } from '../sections/Experience'
import { Hero } from '../sections/Hero'
import { Toolkit } from '../sections/Toolkit'
import { Work } from '../sections/Work'

export function Home() {
  const { hash } = useLocation()

  useEffect(() => {
    document.title = 'Sankalp M Tellur — Software Developer | Full-Stack & AI'
  }, [])

  // Arriving from another page with a section hash, e.g. /#work.
  useEffect(() => {
    if (!hash) return
    const id = window.setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 60)
    return () => window.clearTimeout(id)
  }, [hash])

  return (
    <>
      <Hero />
      <Work />
      <About />
      <Experience />
      <Toolkit />
      <Contact />
    </>
  )
}

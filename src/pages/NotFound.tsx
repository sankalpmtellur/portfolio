import { useEffect } from 'react'
import { Link } from 'react-router'
import { FiArrowLeft } from 'react-icons/fi'

export function NotFound() {
  useEffect(() => {
    document.title = 'Page not found · Sankalp M Tellur'
  }, [])

  return (
    <section className="not-found container">
      <p className="eyebrow"><span>404</span>Not found</p>
      <h1>Lost in the build.</h1>
      <p>This page doesn’t exist — or it hasn’t shipped yet.</p>
      <Link to="/" className="btn btn-accent"><FiArrowLeft aria-hidden="true" /> Back home</Link>
    </section>
  )
}

import { useEffect } from 'react'
import { Link } from 'react-router'
import { FiArrowLeft } from 'react-icons/fi'

export function NotFound() {
  useEffect(() => {
    document.title = 'Page not found · Sankalp M Tellur'
  }, [])

  return (
    <section className="not-found container">
      <p className="mono-label">Error 404</p>
      <h1 className="not-found-title">
        <span className="line"><span>Lost in</span></span>
        <span className="line"><span><em>the build.</em></span></span>
      </h1>
      <p>This page doesn’t exist — or it hasn’t shipped yet.</p>
      <Link to="/" className="btn btn-primary"><FiArrowLeft aria-hidden="true" /> Back home</Link>
    </section>
  )
}

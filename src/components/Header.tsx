import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { FiArrowUpRight } from 'react-icons/fi'
import { navItems, profile, socials } from '../data/portfolio'
import { useSectionNav } from '../hooks/useSectionNav'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const goTo = useSectionNav()
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('is-locked', menuOpen)
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  useEffect(() => setMenuOpen(false), [pathname])

  const handleNav = (id: string) => {
    setMenuOpen(false)
    // Release the menu's scroll lock now; the effect would only clear it after this scroll.
    document.documentElement.classList.remove('is-locked')
    goTo(id)
  }

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'is-open' : ''}`}>
      <div className="container header-bar">
        <Link
          to="/"
          className="brand"
          aria-label={`${profile.name} — home`}
          onClick={(event) => {
            if (pathname !== '/') return
            event.preventDefault()
            handleNav('top')
          }}
        >
          <span className="brand-mark" aria-hidden="true">sm<i>t</i></span>
          <span className="brand-name">{profile.name}</span>
        </Link>

        <nav className="nav" aria-label="Primary">
          {navItems.map((item, index) => (
            <button type="button" key={item.target} onClick={() => handleNav(item.target)}>
              <span className="nav-num">0{index + 1}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <a className="btn btn-ink btn-sm header-resume" href={profile.resume} target="_blank" rel="noopener noreferrer">
            Résumé <FiArrowUpRight aria-hidden="true" />
          </a>
          <button
            type="button"
            className="menu-button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="mobile-menu" aria-hidden={!menuOpen} inert={!menuOpen}>
        <nav className="container" aria-label="Mobile">
          <ul>
            {navItems.map((item, index) => (
              <li key={item.target} style={{ transitionDelay: menuOpen ? `${80 + index * 40}ms` : '0ms' }}>
                <button type="button" onClick={() => handleNav(item.target)}>
                  <span className="nav-num">0{index + 1}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="mobile-menu-links">
            <a href={profile.resume} target="_blank" rel="noopener noreferrer">Résumé ↗</a>
            {socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">{social.label} ↗</a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}

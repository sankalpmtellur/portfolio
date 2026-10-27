import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { FiArrowUpRight, FiCommand } from 'react-icons/fi'
import { navItems, profile, socials } from '../data/portfolio'
import { useSectionNav } from '../hooks/useSectionNav'
import { setScrollLocked } from '../lib/motion'
import { ThemeToggle } from './ThemeToggle'

export function Header({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const goTo = useSectionNav()
  const { pathname } = useLocation()

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 320)
        lastY = y
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setScrollLocked(menuOpen)
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  useEffect(() => setMenuOpen(false), [pathname])

  const handleNav = (id: string) => {
    setMenuOpen(false)
    setScrollLocked(false) // Lenis ignores scrollTo while stopped, so unlock before scrolling.
    goTo(id)
  }

  return (
    <>
      <header className={`site-header ${hidden && !menuOpen ? 'is-hidden' : ''} ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container header-inner">
          <Link to="/" className="brand" aria-label={`${profile.name} — home`} onClick={() => pathname === '/' && handleNav('top')}>
            <span className="brand-mark">S</span>
            <span className="brand-name">
              Sankalp M Tellur
              <small>{profile.role}</small>
            </span>
          </Link>

          <nav className="desktop-nav" aria-label="Primary">
            {navItems.map((item) => (
              <button type="button" key={item.target} onClick={() => handleNav(item.target)}>
                <span className="nav-roll"><span data-text={item.label}>{item.label}</span></span>
              </button>
            ))}
          </nav>

          <div className="header-actions">
            <button type="button" className="palette-trigger" onClick={onOpenPalette} aria-label="Open command menu">
              <FiCommand aria-hidden="true" />
              <kbd>K</kbd>
            </button>
            <ThemeToggle />
            <a className="header-cta" href={profile.resume} target="_blank" rel="noopener noreferrer">
              Résumé <FiArrowUpRight aria-hidden="true" />
            </a>
            <button
              type="button"
              className={`menu-button ${menuOpen ? 'is-open' : ''}`}
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
      </header>

      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen} inert={!menuOpen}>
        <nav className="container mobile-menu-inner" aria-label="Mobile">
          <p className="mono-label">Navigation</p>
          <ul>
            {navItems.map((item, index) => (
              <li key={item.target} style={{ transitionDelay: menuOpen ? `${120 + index * 50}ms` : '0ms' }}>
                <button type="button" onClick={() => handleNav(item.target)}>
                  <span className="mono-label">0{index + 1}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="mobile-menu-foot">
            <a href={profile.resume} target="_blank" rel="noopener noreferrer">Résumé ↗</a>
            {socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">{social.label} ↗</a>
            ))}
          </div>
        </nav>
      </div>
    </>
  )
}

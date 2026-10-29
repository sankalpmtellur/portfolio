import { FiArrowUp, FiArrowUpRight } from 'react-icons/fi'
import { profile, socials } from '../data/portfolio'
import { useLocalTime } from '../hooks/useLocalTime'

export function Footer() {
  const time = useLocalTime()

  return (
    <footer className="site-footer">
      <div className="container footer-row">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p className="footer-time"><span className="live-dot" /> {time} IST</p>
        <ul className="footer-links">
          {socials.map((social) => (
            <li key={social.label}>
              <a href={social.href} target="_blank" rel="noopener noreferrer">{social.label} <FiArrowUpRight aria-hidden="true" /></a>
            </li>
          ))}
        </ul>
        <button type="button" className="footer-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Top <FiArrowUp aria-hidden="true" />
        </button>
      </div>
    </footer>
  )
}

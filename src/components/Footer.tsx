import { Link } from 'react-router'
import { FiArrowUp, FiArrowUpRight } from 'react-icons/fi'
import { navItems, profile, projects, socials } from '../data/portfolio'
import { useLocalTime } from '../hooks/useLocalTime'
import { useSectionNav } from '../hooks/useSectionNav'
import { scrollToTarget } from '../lib/motion'

export function Footer() {
  const goTo = useSectionNav()
  const time = useLocalTime()

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-intro">
            <Link to="/" className="footer-brand">Sankalp M Tellur<span>.</span></Link>
            <p>Software developer building full-stack products, thoughtful interfaces and practical AI tools.</p>
            <a className="footer-email" href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>

          <div className="footer-col">
            <h3>Explore</h3>
            <ul>
              {navItems.map((item) => (
                <li key={item.target}><button type="button" onClick={() => goTo(item.target)}>{item.label}</button></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h3>Projects</h3>
            <ul>
              {projects.map((project) => (
                <li key={project.slug}><Link to={`/work/${project.slug}`}>{project.title}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h3>Connect</h3>
            <ul>
              {socials.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer">{social.label} <FiArrowUpRight aria-hidden="true" /></a>
                </li>
              ))}
              <li><a href={profile.resume} target="_blank" rel="noopener noreferrer">Résumé <FiArrowUpRight aria-hidden="true" /></a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Sankalp M Tellur. Designed &amp; built with care.</p>
          <p className="footer-time"><span className="live-dot" /> {time} IST · {profile.location}</p>
          <button type="button" className="back-to-top" onClick={() => scrollToTarget(0)}>
            Back to top <FiArrowUp aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="footer-wordmark" aria-hidden="true">SANKALP</div>
    </footer>
  )
}

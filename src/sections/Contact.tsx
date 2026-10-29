import { FiArrowUpRight } from 'react-icons/fi'
import { profile, socials } from '../data/portfolio'
import { CopyEmail } from '../components/CopyEmail'

export function Contact() {
  return (
    <section id="contact" className="section container">
      <div className="contact reveal">
        <p className="eyebrow"><span>05</span>Contact</p>
        <h2 className="contact-title">Let’s build something worth using.</h2>
        <p className="contact-lede">Have a role, a project or an idea worth exploring? I’m always up for a good conversation — the inbox is open.</p>

        <div className="contact-actions">
          <a className="btn btn-accent btn-lg" href={`mailto:${profile.email}`}>
            Say hello <FiArrowUpRight aria-hidden="true" />
          </a>
          <CopyEmail />
        </div>

        <ul className="contact-socials">
          {socials.map((social) => (
            <li key={social.label}>
              <a href={social.href} target="_blank" rel="noopener noreferrer">{social.label} <FiArrowUpRight aria-hidden="true" /></a>
            </li>
          ))}
          <li>
            <a href={profile.resume} target="_blank" rel="noopener noreferrer">Résumé <FiArrowUpRight aria-hidden="true" /></a>
          </li>
        </ul>
      </div>
    </section>
  )
}

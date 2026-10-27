import { FiArrowUpRight, FiCheck, FiCopy } from 'react-icons/fi'
import { useState } from 'react'
import { profile, socials } from '../data/portfolio'
import { Magnetic } from '../components/Magnetic'
import { Reveal } from '../components/Reveal'

export function Contact({ onToast }: { onToast: (message: string) => void }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      onToast('Email copied to clipboard')
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section id="contact" className="section contact">
      <div className="contact-glow" aria-hidden="true" />
      <div className="container">
        <Reveal className="section-tag" variant="fade">
          <span className="mono-label">(06)</span>
          <span className="mono-label">Contact</span>
        </Reveal>

        <Reveal as="h2" className="contact-title" variant="clip">
          Let’s build<br />something <em>worth</em><br />using.
        </Reveal>

        <div className="contact-row">
          <Reveal className="contact-copy" delay={100}>
            <p>Have a role, a project or an idea worth exploring? I’m always up for a good conversation — the inbox is open.</p>
            <div className="contact-email">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <button type="button" className="icon-button" onClick={copy} aria-label="Copy email address">
                {copied ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
              </button>
            </div>
            <ul className="contact-socials">
              {socials.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer">{social.label} <FiArrowUpRight aria-hidden="true" /></a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="contact-cta" delay={200}>
            <Magnetic strength={0.4}>
              <a className="orb-button" href={`mailto:${profile.email}`}>
                <span>Say hello</span>
                <FiArrowUpRight aria-hidden="true" />
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

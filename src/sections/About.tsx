import { useEffect, useRef } from 'react'
import { principles, profile } from '../data/portfolio'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { Reveal } from '../components/Reveal'

const statement =
  'I build software that takes real work off people’s plates — from AI agents that process orders, to full-stack platforms for growing businesses, to interfaces that make a product feel alive. I care about the whole picture: the data, the workflow and the last pixel.'

const now = [
  { label: 'Studying', value: `${profile.degree} · ${profile.university}` },
  { label: 'Building', value: 'Purchase Assistant & Shweta Drug Distributors' },
  { label: 'Exploring', value: 'AI agents, startups & 3D on the web' },
]

export function About() {
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const node = textRef.current
    if (!node || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        node.querySelectorAll('.word'),
        { opacity: 0.14 },
        { opacity: 1, stagger: 0.08, ease: 'none', scrollTrigger: { trigger: node, start: 'top 80%', end: 'bottom 55%', scrub: true } },
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="section about">
      <div className="container">
        <Reveal className="section-tag" variant="fade">
          <span className="mono-label">(01)</span>
          <span className="mono-label">About</span>
        </Reveal>

        <p ref={textRef} className="about-statement">
          {statement.split(' ').map((word, index) => (
            <span className="word" key={index}>{word} </span>
          ))}
        </p>

        <div className="about-grid">
          <Reveal className="about-now">
            <p className="mono-label">Right now</p>
            <ul>
              {now.map((item) => (
                <li key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="principles">
            {principles.map((principle, index) => (
              <Reveal key={principle.title} className="principle" delay={index * 100}>
                <span className="principle-index">0{index + 1}</span>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

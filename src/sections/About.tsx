import type { CSSProperties } from 'react'
import { principles, profile } from '../data/portfolio'
import { SectionHead } from '../components/SectionHead'

const now = [
  { label: 'Studying', value: `${profile.degree} · ${profile.university}` },
  { label: 'Building', value: 'Purchase Assistant & Shweta Drug Distributors' },
  { label: 'Exploring', value: 'AI agents, startups & 3D on the web' },
]

export function About() {
  return (
    <section id="about" className="section container">
      <SectionHead index="02" label="About" title={<>The whole picture.</>} />

      <div className="about-grid">
        <p className="about-statement reveal">
          I build software that takes real work off people’s plates — from <mark>AI agents</mark> that process orders, to
          <mark> full-stack platforms</mark> for growing businesses, to <mark>interfaces</mark> that make a product feel alive.
          I care about the data, the workflow and the last pixel.
        </p>

        <dl className="now-list tile reveal">
          <p className="eyebrow">Right now</p>
          {now.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <ol className="principles">
        {principles.map((principle, index) => (
          <li key={principle.title} className="tile reveal" style={{ '--d': `${index * 80}ms` } as CSSProperties}>
            <span className="principle-num">0{index + 1}</span>
            <h3>{principle.title}</h3>
            <p>{principle.body}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

import type { CSSProperties } from 'react'
import { FiArrowDown, FiArrowUpRight } from 'react-icons/fi'
import { experience, profile, stats } from '../data/portfolio'
import { useLocalTime } from '../hooks/useLocalTime'
import { useSectionNav } from '../hooks/useSectionNav'

export function Hero() {
  const time = useLocalTime()
  const goTo = useSectionNav()
  const job = experience[0]

  return (
    <section id="top" className="hero container">
      <div className="hero-grid">
        <div className="hero-intro tile">
          <p className="status-pill load" style={{ '--i': 0 } as CSSProperties}>
            <span className="live-dot" /> Open to opportunities
          </p>
          <h1 className="hero-title load" style={{ '--i': 1 } as CSSProperties}>
            Turning ideas into software people <mark>love</mark> to use.
          </h1>
          <div className="hero-foot load" style={{ '--i': 2 } as CSSProperties}>
            <p className="hero-lede">
              I’m <strong>{profile.name}</strong> — a software developer working across full-stack, frontend and AI.
              {' '}{profile.year} {profile.degree.replace('B.Tech, ', '')} student at {profile.university}.
            </p>
            <div className="hero-actions">
              <button type="button" className="btn btn-accent" onClick={() => goTo('work')}>
                See the work <FiArrowDown aria-hidden="true" />
              </button>
              <a className="btn btn-line" href={profile.resume} target="_blank" rel="noopener noreferrer">
                Résumé <FiArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <figure className="hero-portrait tile load" style={{ '--i': 1 } as CSSProperties}>
          <img
            src="/assets/sankalp.webp"
            srcSet="/assets/sankalp-520.webp 520w, /assets/sankalp.webp 900w"
            sizes="(max-width: 900px) 90vw, 420px"
            width="900"
            height="1073"
            alt="Portrait of Sankalp M Tellur"
            fetchPriority="high"
            decoding="async"
          />
          <figcaption>
            <span>{profile.role}</span>
            <span>{profile.location} · {time}</span>
          </figcaption>
        </figure>

        <div className="hero-now tile load" style={{ '--i': 2 } as CSSProperties}>
          <p className="eyebrow">Previously</p>
          <p className="hero-now-role">{job.role}</p>
          <p className="hero-now-meta">{job.company} · {job.period}</p>
        </div>

        <dl className="hero-stats tile load" style={{ '--i': 3 } as CSSProperties}>
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.value}{stat.suffix}</dt>
              <dd>{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

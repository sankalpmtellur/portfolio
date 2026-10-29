import { useEffect } from 'react'
import type { CSSProperties } from 'react'
import { Link, useParams } from 'react-router'
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from 'react-icons/fi'
import { projects } from '../data/portfolio'
import { ProjectMedia } from '../components/ProjectMedia'
import { NotFound } from './NotFound'

export function ProjectPage() {
  const { slug } = useParams()
  const index = projects.findIndex((project) => project.slug === slug)
  const project = projects[index]

  useEffect(() => {
    if (project) document.title = `${project.title} — Case study · Sankalp M Tellur`
  }, [project])

  if (!project) return <NotFound />
  const next = projects[(index + 1) % projects.length]

  return (
    <article className="case container" style={{ '--tone': project.tone } as CSSProperties}>
      <Link to="/#work" className="case-back load" style={{ '--i': 0 } as CSSProperties}>
        <FiArrowLeft aria-hidden="true" /> All work
      </Link>

      <header className="case-head">
        <p className="eyebrow load" style={{ '--i': 0 } as CSSProperties}><span>{project.index}</span>{project.category}</p>
        <h1 className="case-title load" style={{ '--i': 1 } as CSSProperties}>{project.title}</h1>
        <p className="case-summary load" style={{ '--i': 2 } as CSSProperties}>{project.summary}</p>
      </header>

      <dl className="case-meta load" style={{ '--i': 3 } as CSSProperties}>
        <div><dt>Platform</dt><dd>{project.platform}</dd></div>
        <div><dt>Stack</dt><dd>{project.stack.join(', ')}</dd></div>
        <div><dt>Status</dt><dd>{project.status}</dd></div>
        <div>
          <dt>Link</dt>
          <dd>
            {project.url ? (
              <a href={project.url} target="_blank" rel="noopener noreferrer">Visit live site <FiArrowUpRight aria-hidden="true" /></a>
            ) : (
              'Private deployment'
            )}
          </dd>
        </div>
      </dl>

      <div className="case-media load" style={{ '--i': 4 } as CSSProperties}>
        {project.url ? (
          <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} live site in a new tab`}>
            <ProjectMedia project={project} sizes="(max-width: 1280px) 100vw, 1200px" eager />
          </a>
        ) : (
          <ProjectMedia project={project} sizes="100vw" eager />
        )}
      </div>

      <section className="case-body">
        <div className="reveal">
          <p className="eyebrow">Overview</p>
          <p className="case-overview">{project.overview}</p>
        </div>
        <div className="reveal">
          <p className="eyebrow">What I focused on</p>
          <ol className="case-focus">
            {project.focus.map((item, i) => (
              <li key={item}><span>0{i + 1}</span>{item}</li>
            ))}
          </ol>
          {project.url && (
            <a className="btn btn-accent" href={project.url} target="_blank" rel="noopener noreferrer">
              Visit live site <FiArrowUpRight aria-hidden="true" />
            </a>
          )}
        </div>
      </section>

      <Link to={`/work/${next.slug}`} className="case-next tile reveal" style={{ '--tone': next.tone } as CSSProperties}>
        <span className="eyebrow">Next project</span>
        <span className="case-next-title">{next.title}</span>
        <span className="case-next-cat">{next.category}</span>
        <span className="case-next-arrow" aria-hidden="true"><FiArrowRight /></span>
      </Link>
    </article>
  )
}

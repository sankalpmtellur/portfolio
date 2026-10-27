import { useEffect } from 'react'
import type { CSSProperties } from 'react'
import { Link, useParams } from 'react-router'
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from 'react-icons/fi'
import { projects } from '../data/portfolio'
import { ProjectMedia } from '../components/ProjectMedia'
import { Reveal } from '../components/Reveal'
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
    <article className="case" style={{ '--tone': project.tone } as CSSProperties}>
      <header className="container case-hero">
        <Link to="/" state={{ scrollTo: 'work' }} className="link-arrow case-back intro-fade">
          <FiArrowLeft aria-hidden="true" /> All work
        </Link>
        <div className="case-kicker intro-fade">
          <span className="work-index">{project.index}</span>
          <span className="mono-label">{project.category}</span>
          <span className="work-status is-inline"><span className="status-dot" />{project.status}</span>
        </div>
        <h1 className="case-title">
          <span className="line"><span>{project.title}</span></span>
        </h1>
        <p className="case-summary intro-fade">{project.summary}</p>

        <dl className="case-meta intro-fade">
          <div><dt>Platform</dt><dd>{project.platform}</dd></div>
          <div><dt>Stack</dt><dd>{project.stack.join(', ')}</dd></div>
          <div><dt>Status</dt><dd>{project.status}</dd></div>
          <div>
            <dt>Link</dt>
            <dd>
              {project.url ? (
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="link-arrow">Visit live site <FiArrowUpRight aria-hidden="true" /></a>
              ) : (
                'Private deployment'
              )}
            </dd>
          </div>
        </dl>
      </header>

      <div className="container">
        <Reveal className="case-media" variant="clip">
          {project.url ? (
            <a href={project.url} target="_blank" rel="noopener noreferrer" data-cursor="Visit" aria-label={`Open ${project.title} live site in a new tab`}>
              <ProjectMedia project={project} sizes="(max-width: 1280px) 100vw, 1240px" eager />
            </a>
          ) : (
            <ProjectMedia project={project} sizes="100vw" eager />
          )}
        </Reveal>
      </div>

      <section className="container case-body">
        <Reveal className="case-col">
          <p className="mono-label">Overview</p>
          <p className="case-overview">{project.overview}</p>
        </Reveal>
        <Reveal className="case-col" delay={120}>
          <p className="mono-label">What I focused on</p>
          <ol className="case-focus">
            {project.focus.map((item, i) => (
              <li key={item}><span>0{i + 1}</span>{item}</li>
            ))}
          </ol>
          {project.url && (
            <a className="btn btn-primary" href={project.url} target="_blank" rel="noopener noreferrer">
              Visit live site <FiArrowUpRight aria-hidden="true" />
            </a>
          )}
        </Reveal>
      </section>

      <Link to={`/work/${next.slug}`} className="case-next" style={{ '--tone': next.tone } as CSSProperties} data-cursor="Next">
        <div className="container">
          <p className="mono-label">Next project</p>
          <p className="case-next-title">
            {next.title} <FiArrowRight aria-hidden="true" />
          </p>
          <p className="case-next-cat">{next.category}</p>
        </div>
      </Link>
    </article>
  )
}

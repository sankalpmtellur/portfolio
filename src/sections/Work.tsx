import type { CSSProperties } from 'react'
import { Link } from 'react-router'
import { FiArrowUpRight } from 'react-icons/fi'
import { projects } from '../data/portfolio'
import { ProjectMedia } from '../components/ProjectMedia'
import { SectionHead } from '../components/SectionHead'

export function Work() {
  return (
    <section id="work" className="section container">
      <SectionHead
        index="01"
        label="Selected work"
        title={<>Things I’ve made real.</>}
        aside={<p>AI automation, full-stack business platforms and expressive frontends — each built for a real client or a real question.</p>}
      />

      <div className="work-grid">
        {projects.map((project, index) => (
          <Link
            key={project.slug}
            to={`/work/${project.slug}`}
            className={`work-card reveal work-card-${index + 1}`}
            style={{ '--tone': project.tone } as CSSProperties}
          >
            <div className="work-media">
              <ProjectMedia project={project} sizes="(max-width: 900px) 92vw, 60vw" />
            </div>
            <div className="work-body">
              <div className="work-meta">
                <span>{project.index}</span>
                <span>{project.category}</span>
                <span className="work-status"><span className="status-dot" />{project.status}</span>
              </div>
              <h3 className="work-title">
                {project.title}
                <span className="work-arrow" aria-hidden="true"><FiArrowUpRight /></span>
              </h3>
              <p className="work-summary">{project.summary}</p>
              <ul className="tags" aria-label="Stack">
                {project.stack.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

import { FiMapPin } from 'react-icons/fi'
import { experience } from '../data/portfolio'
import { SectionHead } from '../components/SectionHead'

export function Experience() {
  return (
    <section id="experience" className="section container">
      <SectionHead
        index="03"
        label="Experience"
        title={<>Where I’ve shipped.</>}
        aside={<p>Product UI, backend workflows and design — learned by building alongside a team.</p>}
      />

      {experience.map((job) => (
        <article key={job.company} className="job tile reveal">
          <header className="job-head">
            <div>
              <p className="eyebrow">{job.period}</p>
              <h3 className="job-title">{job.role} <span>at {job.company}</span></h3>
            </div>
            <p className="job-mode"><FiMapPin aria-hidden="true" /> {job.mode}</p>
          </header>

          <div className="job-body">
            <div>
              <p className="job-summary">{job.summary}</p>
              <ul className="job-points">
                {job.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
              <ul className="tags" aria-label="Tools used">
                {job.stack.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="job-figure" aria-hidden="true">
              <span>20+</span>
              <p>languages supported in one i18n rollout</p>
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}

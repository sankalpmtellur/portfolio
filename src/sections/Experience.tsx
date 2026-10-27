import { FiMapPin } from 'react-icons/fi'
import { experience } from '../data/portfolio'
import { Reveal } from '../components/Reveal'
import { SectionHead } from '../components/SectionHead'

export function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="container">
        <SectionHead
          index="02"
          label="Experience"
          title={<>Where I’ve <em>shipped.</em></>}
          aside={<p>Product UI, backend workflows and design — learned by building alongside a team.</p>}
        />

        {experience.map((job) => (
          <Reveal as="article" key={job.company} className="job">
            <div className="job-side">
              <p className="mono-label">{job.period}</p>
              <p className="job-mode"><FiMapPin aria-hidden="true" /> {job.mode}</p>
            </div>
            <div className="job-main">
              <h3 className="job-title">{job.role} <span>@ {job.company}</span></h3>
              <p className="job-summary">{job.summary}</p>
              <ul className="job-points">
                {job.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
              <ul className="chips" aria-label="Tools used">
                {job.stack.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="job-highlight" aria-hidden="true">
              <span className="job-highlight-num">20+</span>
              <span className="mono-label">languages<br />supported</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

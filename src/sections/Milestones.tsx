import { FiArrowUpRight, FiAward } from 'react-icons/fi'
import { education, links } from '../data/portfolio'
import { Reveal } from '../components/Reveal'
import { SectionHead } from '../components/SectionHead'

export function Milestones() {
  return (
    <section id="milestones" className="section milestones">
      <div className="container">
        <SectionHead index="05" label="Milestones" title={<>Consistency <em>compounds.</em></>} />

        <div className="milestones-grid">
          <Reveal as="article" className="award-card">
            <div className="award-top">
              <span className="award-icon"><FiAward aria-hidden="true" /></span>
              <span className="mono-label">Problem solving</span>
            </div>
            <p className="award-num">150<span>+</span></p>
            <h3>LeetCode problems solved</h3>
            <p>Earned the <strong>100 Days Badge</strong> for showing up every day — consistent coding, one problem at a time.</p>
            <div className="award-links">
              <a className="btn btn-primary btn-sm" href={links.leetcodeCertificate} target="_blank" rel="noopener noreferrer">
                View certificate <FiArrowUpRight aria-hidden="true" />
              </a>
              <a className="btn btn-ghost btn-sm" href={links.leetcode} target="_blank" rel="noopener noreferrer">
                LeetCode profile <FiArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          <div className="education">
            <Reveal as="p" className="mono-label education-label" variant="fade">Education</Reveal>
            <ol>
              {education.map((item, index) => (
                <Reveal as="li" key={item.school} className={`edu ${index === 0 ? 'is-current' : ''}`} delay={index * 100}>
                  <span className="edu-dot" aria-hidden="true" />
                  <p className="mono-label">{item.period}</p>
                  <h3>{item.school}</h3>
                  <p className="edu-detail">{item.detail}</p>
                  <span className="edu-note">{item.note}</span>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

import type { CSSProperties } from 'react'
import { FiArrowUpRight, FiAward } from 'react-icons/fi'
import { education, links, skillGroups } from '../data/portfolio'
import { SectionHead } from '../components/SectionHead'

export function Toolkit() {
  return (
    <section id="toolkit" className="section container">
      <SectionHead
        index="04"
        label="Toolkit & milestones"
        title={<>Tools I reach for daily.</>}
        aside={<p>A focused stack — chosen to take an idea from a Figma frame to a deployed product.</p>}
      />

      <div className="skill-grid">
        {skillGroups.map((group, index) => (
          <div key={group.title} className="skill-group tile reveal" style={{ '--d': `${index * 60}ms` } as CSSProperties}>
            <p className="eyebrow">{group.title}</p>
            <ul>
              {group.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <div className="milestone-grid">
        <article className="award tile reveal">
          <div className="award-head">
            <span className="award-icon"><FiAward aria-hidden="true" /></span>
            <p className="eyebrow">Problem solving</p>
          </div>
          <p className="award-num">150+</p>
          <h3>LeetCode problems solved</h3>
          <p>Earned the <strong>100 Days Badge</strong> for showing up every day — consistent coding, one problem at a time.</p>
          <div className="award-links">
            <a className="btn btn-accent btn-sm" href={links.leetcodeCertificate} target="_blank" rel="noopener noreferrer">
              Certificate <FiArrowUpRight aria-hidden="true" />
            </a>
            <a className="btn btn-line btn-sm" href={links.leetcode} target="_blank" rel="noopener noreferrer">
              Profile <FiArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </article>

        <div className="education tile reveal">
          <p className="eyebrow">Education</p>
          <ol>
            {education.map((item, index) => (
              <li key={item.school} className={index === 0 ? 'is-current' : ''}>
                <span className="edu-period">{item.period}</span>
                <div>
                  <h3>{item.school}</h3>
                  <p>{item.detail}</p>
                </div>
                <span className="edu-note">{item.note}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

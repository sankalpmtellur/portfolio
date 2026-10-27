import { skillGroups } from '../data/portfolio'
import { Marquee } from '../components/Marquee'
import { Reveal } from '../components/Reveal'
import { SectionHead } from '../components/SectionHead'

const allSkills = skillGroups.flatMap((group) => group.items)
const half = Math.ceil(allSkills.length / 2)

export function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <SectionHead
          index="04"
          label="Toolkit"
          title={<>Tools I reach for <em>daily.</em></>}
          aside={<p>A focused stack — chosen to take an idea from a Figma frame to a deployed product.</p>}
        />
      </div>

      <div className="skills-marquees" aria-hidden="true">
        <Marquee items={allSkills.slice(0, half)} speed={48} className="marquee-xl" />
        <Marquee items={allSkills.slice(half)} speed={52} reverse className="marquee-xl marquee-outline" />
      </div>

      <div className="container">
        <div className="skill-groups">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} className="skill-group" delay={index * 90}>
              <p className="mono-label">0{index + 1} — {group.title}</p>
              <ul>
                {group.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

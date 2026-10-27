import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

export function SectionHead({ index, label, title, aside }: { index: string; label: string; title: ReactNode; aside?: ReactNode }) {
  return (
    <div className="section-head">
      <Reveal className="section-tag" variant="fade">
        <span className="mono-label">({index})</span>
        <span className="mono-label">{label}</span>
      </Reveal>
      <div className="section-head-row">
        <Reveal as="h2" className="section-title" variant="clip">{title}</Reveal>
        {aside && <Reveal className="section-aside" delay={120}>{aside}</Reveal>}
      </div>
    </div>
  )
}

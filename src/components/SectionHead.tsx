import type { ReactNode } from 'react'

export function SectionHead({ index, label, title, aside }: { index: string; label: string; title: ReactNode; aside?: ReactNode }) {
  return (
    <div className="section-head reveal">
      <p className="eyebrow"><span>{index}</span>{label}</p>
      <h2 className="section-title">{title}</h2>
      {aside && <div className="section-aside">{aside}</div>}
    </div>
  )
}

import type { Project } from '../data/portfolio'

/** Illustrated stand-in for the Purchase Assistant desktop app, which has no public screenshots. */
function PurchaseAssistantArt() {
  const rows = [
    { id: 'PO-2041', item: 'Order details captured', state: 'verified' },
    { id: 'PO-2042', item: 'Line items extracted', state: 'verified' },
    { id: 'PO-2043', item: 'Awaiting human review', state: 'review' },
    { id: 'PO-2044', item: 'Queued for processing', state: 'queued' },
  ]
  const stateLabel: Record<string, string> = { verified: '✓ Verified', review: 'Review', queued: 'Queued' }

  return (
    <div
      className="pa-art"
      role="img"
      aria-label="Illustration of the Purchase Assistant Windows app: orders are captured, then held for human verification before the database updates."
    >
      <div className="pa-window">
        <div className="pa-titlebar">
          <span className="pa-icon">PA</span>
          Purchase Assistant
          <span className="pa-controls"><i /><i /><i /></span>
        </div>
        <div className="pa-agent">
          <span className="pa-pulse" />
          <div>
            <b>Agent is processing orders</b>
            <small>Every change waits for a human</small>
          </div>
        </div>
        <ul className="pa-rows">
          {rows.map((row) => (
            <li key={row.id} className={`is-${row.state}`}>
              <span className="pa-id">{row.id}</span>
              <span className="pa-item">{row.item}</span>
              <span className="pa-state">{stateLabel[row.state]}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function ProjectMedia({ project, sizes, eager = false }: { project: Project; sizes: string; eager?: boolean }) {
  if (!project.image) return <PurchaseAssistantArt />
  const { src, small, width, height } = project.image
  return (
    <img
      className="project-img"
      src={src}
      srcSet={`${small} 800w, ${src} 1600w`}
      sizes={sizes}
      width={width}
      height={height}
      alt={`${project.title} — ${project.category} website preview`}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  )
}

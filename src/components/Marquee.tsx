import type { CSSProperties, ReactNode } from 'react'

type MarqueeProps = {
  items: ReactNode[]
  reverse?: boolean
  speed?: number
  className?: string
  separator?: ReactNode
}

export function Marquee({ items, reverse = false, speed = 40, className = '', separator = <span className="marquee-sep">✦</span> }: MarqueeProps) {
  const group = (hidden: boolean, key: string) => (
    <div className="marquee-group" aria-hidden={hidden} key={key}>
      {items.map((item, index) => (
        <span className="marquee-item" key={index}>
          {item}
          {separator}
        </span>
      ))}
    </div>
  )

  return (
    <div className={`marquee ${reverse ? 'marquee-reverse' : ''} ${className}`} style={{ '--marquee-duration': `${speed}s` } as CSSProperties}>
      <div className="marquee-track">
        {group(false, 'a')}
        {group(true, 'b')}
      </div>
    </div>
  )
}

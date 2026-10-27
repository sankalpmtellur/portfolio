import { useEffect, useRef } from 'react'
import type { CSSProperties, ElementType, ReactNode } from 'react'
import { ScrollTrigger } from '../lib/motion'

type RevealProps = {
  children: ReactNode
  as?: ElementType
  className?: string
  delay?: number
  variant?: 'up' | 'fade' | 'clip'
}

export function Reveal({ children, as: Tag = 'div', className = '', delay = 0, variant = 'up' }: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    // ScrollTrigger (not IntersectionObserver): clip-path hides the element from IO, and
    // `once` still fires when a fast scroll jumps straight past the element.
    const trigger = ScrollTrigger.create({
      trigger: node,
      start: 'top 92%',
      once: true,
      onEnter: () => node.classList.add('is-in'),
    })
    return () => trigger.kill()
  }, [])

  return (
    <Tag ref={ref} className={`reveal reveal-${variant} ${className}`} style={{ '--delay': `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  )
}

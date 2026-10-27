import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'

/** Gently pulls its child toward the pointer while hovered. */
export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node || prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return
    const xTo = gsap.quickTo(node, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    const yTo = gsap.quickTo(node, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    const move = (event: PointerEvent) => {
      const bounds = node.getBoundingClientRect()
      xTo((event.clientX - (bounds.left + bounds.width / 2)) * strength)
      yTo((event.clientY - (bounds.top + bounds.height / 2)) * strength)
    }
    const leave = () => {
      xTo(0)
      yTo(0)
    }
    node.addEventListener('pointermove', move)
    node.addEventListener('pointerleave', leave)
    return () => {
      node.removeEventListener('pointermove', move)
      node.removeEventListener('pointerleave', leave)
    }
  }, [strength])

  return <span ref={ref} className="magnetic">{children}</span>
}

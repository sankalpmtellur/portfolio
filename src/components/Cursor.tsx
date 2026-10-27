import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'

/** Custom dot + ring cursor for fine pointers. Elements with data-cursor="label" show that label. */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !ring || !label || prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return

    document.documentElement.classList.add('has-cursor')
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' })

    const move = (event: PointerEvent) => {
      dotX(event.clientX)
      dotY(event.clientY)
      ringX(event.clientX)
      ringY(event.clientY)
      ring.classList.add('is-visible')
      dot.classList.add('is-visible')
    }

    const over = (event: PointerEvent) => {
      const target = event.target as HTMLElement
      const labelled = target.closest<HTMLElement>('[data-cursor]')
      const interactive = target.closest('a, button, input, [role="button"]')
      ring.classList.toggle('is-label', Boolean(labelled))
      ring.classList.toggle('is-hover', Boolean(interactive) && !labelled)
      dot.classList.toggle('is-hidden', Boolean(labelled))
      label.textContent = labelled?.dataset.cursor ?? ''
    }

    const leave = () => {
      ring.classList.remove('is-visible')
      dot.classList.remove('is-visible')
    }

    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', over, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true"><span ref={labelRef} /></div>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}

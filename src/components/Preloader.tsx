import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'

const seenKey = 'smt-intro-seen'

function hasSeenIntro() {
  try {
    return sessionStorage.getItem(seenKey) === '1'
  } catch {
    return false
  }
}

/** Short first-visit intro: a counter and name wipe, then the page is marked ready. */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [skip] = useState(() => hasSeenIntro() || prefersReducedMotion())
  const rootRef = useRef<HTMLDivElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)
  const [gone, setGone] = useState(skip)

  useEffect(() => {
    if (skip) {
      onDone()
      return
    }
    const root = rootRef.current
    const count = countRef.current
    if (!root || !count) return
    const counter = { value: 0 }
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          onComplete: () => {
            try {
              sessionStorage.setItem(seenKey, '1')
            } catch {
              /* storage unavailable */
            }
            setGone(true)
          },
        })
        .from('.preloader-word > span', { yPercent: 110, duration: 0.8, ease: 'power4.out', stagger: 0.06 })
        .to(counter, { value: 100, duration: 1.1, ease: 'power2.inOut', onUpdate: () => { count.textContent = String(Math.round(counter.value)).padStart(3, '0') } }, 0)
        .to('.preloader-bar i', { scaleX: 1, duration: 1.1, ease: 'power2.inOut' }, 0)
        .to('.preloader-word > span', { yPercent: -110, duration: 0.6, ease: 'power3.in', stagger: 0.04 }, '+=0.1')
        .add(onDone, '-=0.15')
        .to(root, { clipPath: 'inset(0 0 100% 0)', duration: 0.8, ease: 'power4.inOut' }, '-=0.25')
    }, root)
    return () => ctx.revert()
  }, [skip, onDone])

  if (gone) return null

  return (
    <div ref={rootRef} className="preloader" aria-hidden="true">
      <div className="preloader-inner">
        <p className="preloader-word"><span>Sankalp</span> <span><em>M</em></span> <span>Tellur</span></p>
        <div className="preloader-meta">
          <span>Software Developer</span>
          <span ref={countRef} className="preloader-count">000</span>
        </div>
        <div className="preloader-bar"><i /></div>
      </div>
    </div>
  )
}

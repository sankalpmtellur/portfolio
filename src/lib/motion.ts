import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

let lenis: Lenis | null = null

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function initSmoothScroll() {
  if (lenis || prefersReducedMotion()) return
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis?.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
}

export function scrollToTarget(target: string | number, options: { immediate?: boolean } = {}) {
  const element = typeof target === 'string' ? document.getElementById(target) : null
  if (typeof target === 'string' && !element) return
  if (lenis) {
    lenis.scrollTo(element ?? (target as number), { offset: 0, immediate: options.immediate, duration: 1.4 })
    return
  }
  if (element) element.scrollIntoView({ behavior: options.immediate ? 'auto' : 'smooth' })
  else window.scrollTo({ top: target as number, behavior: options.immediate ? 'auto' : 'smooth' })
}

export function setScrollLocked(locked: boolean) {
  if (locked) lenis?.stop()
  else lenis?.start()
  document.documentElement.classList.toggle('is-locked', locked)
}

import { useCallback, useSyncExternalStore } from 'react'
import { flushSync } from 'react-dom'
import { prefersReducedMotion } from '../lib/motion'

export type Theme = 'light' | 'dark'

const listeners = new Set<() => void>()

const readTheme = (): Theme => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0c0c0d' : '#f4f2ec')
  try {
    localStorage.setItem('theme', theme)
  } catch {
    /* storage unavailable */
  }
  listeners.forEach((listener) => listener())
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => 'dark' as Theme)

  const toggle = useCallback((origin?: { x: number; y: number }) => {
    const next: Theme = readTheme() === 'dark' ? 'light' : 'dark'
    if (!document.startViewTransition || prefersReducedMotion()) {
      applyTheme(next)
      return
    }
    const x = origin?.x ?? window.innerWidth - 40
    const y = origin?.y ?? 40
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    const transition = document.startViewTransition(() => flushSync(() => applyTheme(next)))
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 700, easing: 'cubic-bezier(0.7, 0, 0.25, 1)', pseudoElement: '::view-transition-new(root)' },
      )
    })
  }, [])

  return { theme, toggle }
}

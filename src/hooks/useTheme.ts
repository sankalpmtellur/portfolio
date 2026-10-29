import { useCallback, useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'

export const themeColors: Record<Theme, string> = { light: '#f2f0e9', dark: '#0f1012' }

const listeners = new Set<() => void>()

const readTheme = (): Theme => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColors[theme])
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
  const theme = useSyncExternalStore(subscribe, readTheme, () => 'light' as Theme)

  const toggle = useCallback(() => {
    const next: Theme = readTheme() === 'dark' ? 'light' : 'dark'
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (document.startViewTransition && !reduced) document.startViewTransition(() => applyTheme(next))
    else applyTheme(next)
  }, [])

  return { theme, toggle }
}

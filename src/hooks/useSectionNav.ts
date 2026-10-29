import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router'

/** Scrolls to a home-page section, navigating home first when on another page. */
export function useSectionNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return useCallback(
    (id: string) => {
      if (pathname !== '/') {
        navigate(`/#${id}`)
        return
      }
      const target = id === 'top' ? document.body : document.getElementById(id)
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.history.replaceState(null, '', id === 'top' ? '/' : `/#${id}`)
    },
    [navigate, pathname],
  )
}

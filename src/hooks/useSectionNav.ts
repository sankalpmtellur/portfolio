import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { scrollToTarget } from '../lib/motion'

/** Scrolls to a home-page section, navigating home first when on another page. */
export function useSectionNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return useCallback(
    (id: string) => {
      if (pathname === '/') scrollToTarget(id)
      else navigate('/', { state: { scrollTo: id } })
    },
    [navigate, pathname],
  )
}

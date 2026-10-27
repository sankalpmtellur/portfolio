import { useEffect, useState } from 'react'
import { profile } from '../data/portfolio'

const formatter = new Intl.DateTimeFormat('en-IN', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
  timeZone: profile.timeZone,
})

export function useLocalTime() {
  const [time, setTime] = useState(() => formatter.format(new Date()))
  useEffect(() => {
    const id = window.setInterval(() => setTime(formatter.format(new Date())), 15_000)
    return () => window.clearInterval(id)
  }, [])
  return time.toUpperCase()
}

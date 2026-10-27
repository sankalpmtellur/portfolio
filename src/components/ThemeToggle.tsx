import { FiMoon, FiSun } from 'react-icons/fi'
import { useTheme } from '../hooks/useTheme'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      className="icon-button theme-toggle"
      onClick={(event) => toggle({ x: event.clientX, y: event.clientY })}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <span className={`theme-icon ${isDark ? 'is-dark' : 'is-light'}`}>
        <FiSun aria-hidden="true" />
        <FiMoon aria-hidden="true" />
      </span>
    </button>
  )
}

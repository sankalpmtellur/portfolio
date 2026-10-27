import { useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { FiArrowRight, FiArrowUpRight, FiCopy, FiFileText, FiHash, FiMoon, FiSearch } from 'react-icons/fi'
import { links, navItems, profile, projects } from '../data/portfolio'
import { useSectionNav } from '../hooks/useSectionNav'
import { useTheme } from '../hooks/useTheme'
import { setScrollLocked } from '../lib/motion'

type Command = { id: string; group: string; label: string; hint?: string; icon: ReactNode; run: () => void }

export function CommandPalette({ open, onClose, onToast }: { open: boolean; onClose: () => void; onToast: (message: string) => void }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const goTo = useSectionNav()
  const navigate = useNavigate()
  const { toggle } = useTheme()

  const commands = useMemo<Command[]>(() => {
    const external = (href: string) => () => window.open(href, '_blank', 'noopener,noreferrer')
    return [
      ...navItems.map((item) => ({ id: `nav-${item.target}`, group: 'Navigate', label: item.label, icon: <FiHash />, run: () => goTo(item.target) })),
      ...projects.map((project) => ({ id: `project-${project.slug}`, group: 'Projects', label: project.title, hint: project.category, icon: <FiArrowRight />, run: () => navigate(`/work/${project.slug}`) })),
      { id: 'theme', group: 'Actions', label: 'Toggle light / dark theme', icon: <FiMoon />, run: () => toggle() },
      {
        id: 'copy-email',
        group: 'Actions',
        label: 'Copy email address',
        hint: profile.email,
        icon: <FiCopy />,
        run: () => navigator.clipboard.writeText(profile.email).then(() => onToast('Email copied to clipboard')),
      },
      { id: 'resume', group: 'Links', label: 'Open résumé', hint: 'PDF', icon: <FiFileText />, run: external(profile.resume) },
      { id: 'linkedin', group: 'Links', label: 'LinkedIn', icon: <FiArrowUpRight />, run: external(links.linkedin) },
      { id: 'leetcode', group: 'Links', label: 'LeetCode', icon: <FiArrowUpRight />, run: external(links.leetcode) },
      { id: 'github', group: 'Links', label: 'GitHub', icon: <FiArrowUpRight />, run: external(links.github) },
    ]
  }, [goTo, navigate, toggle, onToast])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter((command) => `${command.label} ${command.hint ?? ''} ${command.group}`.toLowerCase().includes(q))
  }, [commands, query])

  useEffect(() => {
    setScrollLocked(open)
    if (!open) return
    setQuery('')
    setActive(0)
    inputRef.current?.focus()
  }, [open])

  useEffect(() => setActive(0), [query])

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const runCommand = (command: Command | undefined) => {
    if (!command) return
    onClose()
    window.setTimeout(command.run, 60)
  }

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActive((index) => (index + 1) % Math.max(filtered.length, 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActive((index) => (index - 1 + filtered.length) % Math.max(filtered.length, 1))
    } else if (event.key === 'Enter') {
      event.preventDefault()
      runCommand(filtered[active])
    } else if (event.key === 'Escape') {
      onClose()
    }
  }

  let lastGroup = ''

  return (
    <div className={`palette ${open ? 'is-open' : ''}`} aria-hidden={!open} inert={!open}>
      <div className="palette-backdrop" onClick={onClose} />
      <div className="palette-panel" role="dialog" aria-modal="true" aria-label="Command menu" onKeyDown={onKeyDown}>
        <div className="palette-search">
          <FiSearch aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search sections, projects, links…"
            aria-label="Search commands"
            aria-controls="palette-list"
            aria-activedescendant={filtered[active] ? `cmd-${filtered[active].id}` : undefined}
          />
          <kbd>ESC</kbd>
        </div>
        <ul id="palette-list" ref={listRef} className="palette-list" role="listbox">
          {filtered.length === 0 && <li className="palette-empty">No results for “{query}”</li>}
          {filtered.map((command, index) => {
            const showGroup = command.group !== lastGroup
            lastGroup = command.group
            return (
              <li key={command.id} role="presentation">
                {showGroup && <p className="palette-group">{command.group}</p>}
                <button
                  type="button"
                  id={`cmd-${command.id}`}
                  role="option"
                  aria-selected={index === active}
                  data-index={index}
                  className={index === active ? 'is-active' : ''}
                  onMouseMove={() => setActive(index)}
                  onClick={() => runCommand(command)}
                >
                  <span className="palette-icon" aria-hidden="true">{command.icon}</span>
                  <span className="palette-label">{command.label}</span>
                  {command.hint && <span className="palette-hint">{command.hint}</span>}
                </button>
              </li>
            )
          })}
        </ul>
        <div className="palette-foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> open</span>
          <span><kbd>⌘</kbd><kbd>K</kbd> toggle</span>
        </div>
      </div>
    </div>
  )
}

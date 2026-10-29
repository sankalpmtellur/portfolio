import { useState } from 'react'
import { FiCheck, FiCopy } from 'react-icons/fi'
import { profile } from '../data/portfolio'

export function CopyEmail() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <div className="copy-email">
      <a href={`mailto:${profile.email}`}>{profile.email}</a>
      <button type="button" className="icon-button" onClick={copy} aria-label="Copy email address">
        {copied ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
      </button>
      <span className={`copy-note ${copied ? 'is-visible' : ''}`} role="status" aria-live="polite">{copied ? 'Copied' : ''}</span>
    </div>
  )
}

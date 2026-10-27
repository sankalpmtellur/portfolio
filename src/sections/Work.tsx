import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router'
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi'
import { projects } from '../data/portfolio'
import { gsap, scrollToTarget, ScrollTrigger } from '../lib/motion'
import { ProjectMedia } from '../components/ProjectMedia'

export function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)
  const [current, setCurrent] = useState(1)

  // The card whose centre is closest to the viewport centre is the "current" one.
  const syncCurrent = () => {
    const cards = trackRef.current?.querySelectorAll('.work-card')
    if (!cards) return
    let best = 0
    let bestDistance = Infinity
    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect()
      const distance = Math.abs(rect.left + rect.width / 2 - window.innerWidth / 2)
      if (distance < bestDistance) {
        bestDistance = distance
        best = index
      }
    })
    setCurrent(best + 1)
  }

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const mm = gsap.matchMedia()
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const distance = () => Math.max(track.scrollWidth - window.innerWidth, 0)
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            progressRef.current?.style.setProperty('transform', `scaleX(${self.progress})`)
            syncCurrent()
          },
        },
      })

      gsap.utils.toArray<HTMLElement>('.work-card .project-img, .work-card .pa-window').forEach((media) => {
        gsap.fromTo(media, { xPercent: -6 }, {
          xPercent: 6,
          ease: 'none',
          scrollTrigger: { trigger: media, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
        })
      })
    })

    // Images and fonts change the track width after first layout.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh)
    return () => {
      window.removeEventListener('load', refresh)
      mm.revert()
    }
  }, [])

  // Mobile: native horizontal scroll drives the counter.
  const onNativeScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const el = event.currentTarget
    if (window.innerWidth >= 900) return
    const ratio = el.scrollLeft / Math.max(el.scrollWidth - el.clientWidth, 1)
    progressRef.current?.style.setProperty('transform', `scaleX(${ratio})`)
    syncCurrent()
  }

  return (
    <section id="work" ref={sectionRef} className="work" aria-label="Selected work">
      <div className="work-viewport" onScroll={onNativeScroll}>
        <div ref={trackRef} className="work-track">
          <div className="work-intro">
            <div className="section-tag">
              <span className="mono-label">(03)</span>
              <span className="mono-label">Selected work</span>
            </div>
            <h2 className="work-heading">Things I’ve<br /><em>made real.</em></h2>
            <p className="work-lede">AI automation, full-stack business platforms and expressive frontends — each built for a real client or a real question.</p>
            <p className="work-hint mono-label"><span className="work-hint-line" /> Scroll or swipe to explore</p>
          </div>

          {projects.map((project) => (
            <article key={project.slug} className="work-card" style={{ '--tone': project.tone } as CSSProperties}>
              <Link to={`/work/${project.slug}`} className="work-media" data-cursor="View" aria-label={`${project.title} case study`}>
                <ProjectMedia project={project} sizes="(max-width: 900px) 85vw, 52vw" eager />
                <span className="work-status"><span className="status-dot" />{project.status}</span>
              </Link>
              <div className="work-info">
                <div className="work-info-top">
                  <span className="work-index">{project.index}</span>
                  <span className="mono-label">{project.category}</span>
                </div>
                <h3 className="work-title"><Link to={`/work/${project.slug}`}>{project.title}</Link></h3>
                <p className="work-summary">{project.summary}</p>
                <ul className="chips">
                  {project.stack.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <div className="work-links">
                  <Link to={`/work/${project.slug}`} className="link-arrow">Case study <FiArrowRight aria-hidden="true" /></Link>
                  {project.url ? (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="link-arrow">Live site <FiArrowUpRight aria-hidden="true" /></a>
                  ) : (
                    <span className="link-muted">{project.platform}</span>
                  )}
                </div>
              </div>
            </article>
          ))}

          <div className="work-outro">
            <p className="mono-label">More on the way</p>
            <p className="work-outro-title">Got an idea that<br />needs <em>building?</em></p>
            <a className="btn btn-primary" href="#contact" onClick={(event) => { event.preventDefault(); scrollToTarget('contact') }}>
              Let’s talk <FiArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="container work-hud">
        <span className="mono-label work-counter">
          <b>{String(current).padStart(2, '0')}</b> / {String(projects.length).padStart(2, '0')}
        </span>
        <span className="work-progress"><span ref={progressRef} /></span>
      </div>
    </section>
  )
}

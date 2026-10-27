import { useEffect, useRef } from 'react'
import { FiArrowDownRight, FiArrowUpRight } from 'react-icons/fi'
import { profile, stats } from '../data/portfolio'
import { useLocalTime } from '../hooks/useLocalTime'
import { gsap, prefersReducedMotion, scrollToTarget, ScrollTrigger } from '../lib/motion'
import { Magnetic } from '../components/Magnetic'
import { Marquee } from '../components/Marquee'

const ringText = 'FULL-STACK · FRONTEND · AI · OPEN TO OPPORTUNITIES · '

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const node = ref.current
    if (!node || prefersReducedMotion()) return
    const state = { n: 0 }
    node.textContent = '0'
    const tween = gsap.to(state, {
      n: value,
      duration: 1.8,
      ease: 'power3.out',
      paused: true,
      onUpdate: () => { node.textContent = String(Math.round(state.n)) },
    })
    const trigger = ScrollTrigger.create({ trigger: node, start: 'top 92%', once: true, onEnter: () => tween.play() })
    return () => {
      trigger.kill()
      tween.kill()
    }
  }, [value])
  return <><span ref={ref}>{value}</span>{suffix}</>
}

export function Hero() {
  const time = useLocalTime()
  const portraitRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const portrait = portraitRef.current
    if (!portrait || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.to('.hero-portrait img', {
        yPercent: 12,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="top" className="hero">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid-lines" />
        <div className="hero-aurora" />
      </div>

      <div className="container hero-inner">
        <div className="hero-topline intro-fade">
          <span className="status-pill"><span className="live-dot" /> Open to opportunities</span>
          <span className="mono-label hero-clock">{time} · IST, {profile.location}</span>
        </div>

        <div className="hero-main">
          <h1 className="hero-title" aria-label="Software that does real work, built with intent.">
            <span className="line" aria-hidden="true"><span>Software that</span></span>
            <span className="line" aria-hidden="true"><span>does <em>real</em> work,</span></span>
            <span className="line" aria-hidden="true"><span>built with <em>intent.</em></span></span>
          </h1>

          <div ref={portraitRef} className="hero-portrait intro-scale">
            <div className="hero-portrait-frame">
              <img
                src="/assets/sankalp.webp"
                srcSet="/assets/sankalp-520.webp 520w, /assets/sankalp.webp 900w"
                sizes="(max-width: 900px) 60vw, 340px"
                width="900"
                height="1073"
                alt="Portrait of Sankalp M Tellur"
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <svg className="hero-ring" viewBox="0 0 200 200" aria-hidden="true">
              <defs>
                <path id="ring-path" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <text>
                <textPath href="#ring-path">{ringText}</textPath>
              </text>
            </svg>
            <span className="hero-ring-core" aria-hidden="true"><FiArrowDownRight /></span>
          </div>
        </div>

        <div className="hero-bottom">
          <p className="hero-lede intro-fade">
            I’m <strong>Sankalp M Tellur</strong> — a software developer working across full-stack, frontend and AI.
            Third-year CS &amp; AI student at {profile.university}, previously a software engineer intern at AgroEdge.
          </p>
          <div className="hero-actions intro-fade">
            <Magnetic>
              <button type="button" className="btn btn-primary" onClick={() => scrollToTarget('work')}>
                View selected work <FiArrowDownRight aria-hidden="true" />
              </button>
            </Magnetic>
            <Magnetic>
              <a className="btn btn-ghost" href={profile.resume} target="_blank" rel="noopener noreferrer">
                Résumé <FiArrowUpRight aria-hidden="true" />
              </a>
            </Magnetic>
          </div>
        </div>

        <dl className="hero-stats intro-fade">
          {stats.map((stat) => (
            <div key={stat.label} className="hero-stat">
              <dt><Counter value={stat.value} suffix={stat.suffix} /></dt>
              <dd>{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <Marquee
        className="hero-marquee"
        speed={36}
        items={['Full-stack development', 'Frontend systems', 'AI-powered tools', 'Product-minded engineering', 'Interfaces with motion']}
      />
    </section>
  )
}

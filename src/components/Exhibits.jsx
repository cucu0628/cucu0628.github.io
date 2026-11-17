import { useEffect, useRef, useState } from 'react'
import { EXHIBITS } from '../data.js'
import SectionHead from './SectionHead.jsx'

const pad = (n) => String(n).padStart(2, '0')

// The work whose text crosses the middle of the screen is the one on the easel.
function useActiveWork(listRef) {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const items = listRef.current?.querySelectorAll('[data-index]') ?? []
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number(entry.target.dataset.index))
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    for (const el of items) observer.observe(el)
    return () => observer.disconnect()
  }, [listRef])
  return active
}

function Links({ exhibit, repo }) {
  const { live } = exhibit
  return (
    <p className="work__links">
      {live && (
        <a href={live.href} target="_blank" rel="noreferrer" className="btn btn--solid">
          {live.label} ↗
        </a>
      )}
      {repo && (
        <a href={repo.html_url} target="_blank" rel="noreferrer" className="btn">
          Source ↗
        </a>
      )}
      {repo?.stargazers_count > 0 && (
        <span className="work__stars" title="GitHub stars">
          ★ {repo.stargazers_count}
        </span>
      )}
    </p>
  )
}

export default function Exhibits({ repos }) {
  const byName = Object.fromEntries(repos.map((r) => [r.name, r]))
  const listRef = useRef(null)
  const active = useActiveWork(listRef)
  const current = EXHIBITS[active]
  const href = (e) => e.live?.href ?? byName[e.repo]?.html_url

  const goTo = (i) =>
    listRef.current?.querySelector(`[data-index="${i}"]`)?.scrollIntoView({ block: 'center' })

  return (
    <section id="projects" className="section wrap">
      <SectionHead ws={2} title="Projects">
        Things I've built, hung in the order I'd show them.
      </SectionHead>

      <div className="gallery">
        {/* Desktop: one framed picture that stays put while the labels scroll past. */}
        <div className="gallery__stage">
          <a className="frame gallery__frame" href={href(current)} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden="true">
            {EXHIBITS.map((e, i) => (
              <img
                key={e.repo}
                src={e.image}
                alt=""
                decoding="async"
                className={i === active ? 'is-on' : undefined}
                style={e.focus && { objectPosition: e.focus }}
              />
            ))}
          </a>
          <div className="gallery__meta">
            <span className="gallery__count">
              <b key={active}>{pad(active + 1)}</b> / {pad(EXHIBITS.length)}
            </span>
            <span className="gallery__ticks">
              {EXHIBITS.map((e, i) => (
                <button
                  key={e.repo}
                  type="button"
                  className={i === active ? 'is-on' : undefined}
                  aria-label={`Show ${e.title}`}
                  onClick={() => goTo(i)}
                />
              ))}
            </span>
          </div>
        </div>

        <ol className="gallery__list" ref={listRef}>
          {EXHIBITS.map((exhibit, i) => {
            const repo = byName[exhibit.repo]
            return (
              <li key={exhibit.repo} data-index={i} className={`work${i === active ? ' is-active' : ''}`}>
                <a className="frame work__shot" href={href(exhibit)} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden="true" data-reveal>
                  <img src={exhibit.image} alt={exhibit.alt} loading="lazy" decoding="async" />
                </a>
                <div className="work__label" data-reveal>
                  <p className="work__no">No. {pad(i + 1)}</p>
                  <h3 className="work__title">{exhibit.title}</h3>
                  <p className="work__medium">
                    {exhibit.year} · {exhibit.medium}
                  </p>
                  <p className="work__text">{exhibit.text}</p>
                  <Links exhibit={exhibit} repo={repo} />
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

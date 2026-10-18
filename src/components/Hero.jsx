import { useEffect, useRef, useState } from 'react'
import { GITHUB_USER, PAINTINGS } from '../data.js'
import { timeAgo } from '../useRepos.js'

const CYCLE_MS = 12_000

// Starts on a random painting and crossfades to the next one every few seconds,
// but only once the next image has loaded and while the hero is on screen.
function usePaintings() {
  const [state, setState] = useState(() => {
    const start = Math.floor(Math.random() * PAINTINGS.length)
    return { index: start, loaded: [start] }
  })

  const current = useRef(state)
  useEffect(() => {
    current.current = state
  }, [state])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      if (document.hidden || window.scrollY > window.innerHeight * 0.6) return
      const next = (current.current.index + 1) % PAINTINGS.length
      if (current.current.loaded.includes(next)) {
        setState((s) => ({ ...s, index: next }))
        return
      }
      const img = new Image()
      img.onload = () => setState((s) => ({ index: next, loaded: [...s.loaded, next] }))
      img.src = `/paintings/${PAINTINGS[next].file}.webp`
    }, CYCLE_MS)
    return () => clearInterval(id)
  }, [])

  return state
}

export default function Hero({ repos }) {
  const own = repos.filter((r) => !r.fork && r.name !== GITHUB_USER)
  const latest = [...own].sort((a, b) => b.pushed_at.localeCompare(a.pushed_at))[0]
  const languages = new Set(own.map((r) => r.language).filter(Boolean))
  const { index, loaded } = usePaintings()
  const painting = PAINTINGS[index]

  return (
    <section id="kezdo" className="hero">
      {loaded.map((i) => (
        <div
          key={PAINTINGS[i].file}
          className={`hero__paint${i === index ? ' is-on' : ''}`}
          style={{
            backgroundImage: `url(/paintings/${PAINTINGS[i].file}.webp)`,
            backgroundPosition: PAINTINGS[i].focus,
          }}
          aria-hidden="true"
        />
      ))}
      <div className="hero__shade" aria-hidden="true" />

      <div className="hero__inner wrap">
        <p className="kicker">Portfólió</p>
        <h1 className="hero__name">
          Asked<span className="hero__dot">.</span>
        </h1>
        <p className="hero__lead">
          Linuxos desktop programokat és játékokat fejlesztek. Főleg QML, C++ és TypeScript.
        </p>
        <p className="hero__roles">
          <span>fejlesztő</span>
          <span>gamer</span>
        </p>
      </div>

      <div className="wrap">
        <div className="hero__foot">
          <dl className="hero__facts">
            {latest && (
              <div>
                <dt>Legutóbb</dt>
                <dd>
                  <a href={latest.html_url} target="_blank" rel="noreferrer">
                    {latest.name}
                  </a>{' '}
                  <span className="dim">· {timeAgo(latest.pushed_at)}</span>
                </dd>
              </div>
            )}
            <div>
              <dt>Repók</dt>
              <dd>{own.length} publikus</dd>
            </div>
            <div>
              <dt>Nyelvek</dt>
              <dd>{[...languages].join(', ')}</dd>
            </div>
          </dl>

          <figure className="placard--small">
            <figcaption key={painting.file}>
              <strong>{painting.artist}</strong>
              <em>{painting.title}</em>, {painting.year}
              <span>Olaj, vászon</span>
            </figcaption>
          </figure>
        </div>
      </div>

      <a href="#projektek" className="hero__cue">
        projektek <span aria-hidden="true">↓</span>
      </a>
    </section>
  )
}

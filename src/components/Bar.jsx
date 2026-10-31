import { useEffect, useRef, useState } from 'react'
import { GITHUB_USER, SECTIONS } from '../data.js'

// Tracks whether the page has left the top, and writes the scroll progress
// straight into a CSS variable so the progress line doesn't re-render React.
function useScrollState(ref) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0
      ref.current?.style.setProperty('--progress', progress.toFixed(4))
      setScrolled(window.scrollY > 8)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ref])
  return scrolled
}

export default function Bar({ active }) {
  const ref = useRef(null)
  const scrolled = useScrollState(ref)

  return (
    <header ref={ref} className={`bar${scrolled ? ' is-scrolled' : ''}`}>
      <nav className="bar__left" aria-label="Sections">
        <a href="#home" className="bar__logo" aria-label="Asked, back to top">
          A<span className="bar__logo-rest">sked</span>
          <span className="bar__logo-dot">.</span>
        </a>
        <ol className="bar__ws">
          {SECTIONS.map(({ id, label }, i) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={active === id ? 'is-active' : undefined}
                aria-current={active === id ? 'location' : undefined}
              >
                <span className="bar__num">{i + 1}</span>
                <span className="bar__label">{label}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="bar__right">
        <a className="bar__gh" href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer">
          GitHub <span aria-hidden="true">↗</span>
        </a>
      </div>

      <span className="bar__progress" aria-hidden="true" />
    </header>
  )
}

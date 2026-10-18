import { useEffect, useState } from 'react'
import { GITHUB_USER, SECTIONS } from '../data.js'

const clockFormat = new Intl.DateTimeFormat('hu-HU', {
  weekday: 'long',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Europe/Budapest',
})

function useClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15_000)
    return () => clearInterval(id)
  }, [])
  return clockFormat.format(now)
}

export default function Bar({ active }) {
  const clock = useClock()

  return (
    <header className="bar">
      <nav className="bar__left" aria-label="Szakaszok">
        <a href="#kezdo" className="bar__logo" aria-label="Asked — vissza a tetejére">
          A
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

      <div className="bar__clock" aria-label="Helyi idő Budapesten">
        <span className="bar__dots" aria-hidden="true">
          ⋯
        </span>
        {clock}
      </div>

      <div className="bar__right">
        <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer">
          github ↗
        </a>
      </div>
    </header>
  )
}

import { GITHUB_USER, LIVE_LINKS } from '../data.js'
import { useCountUp } from '../useReveal.js'
import SectionHead from './SectionHead.jsx'

const STACK = [
  ['Desktop', 'Hyprland, Quickshell, Omarchy'],
  ['Languages', 'QML, C++, TypeScript, Python, Rust'],
  ['Tools', 'Qt 6, CMake, Vite, React, Canvas 2D'],
]

function Stat({ value, label, delay }) {
  const [ref, shown] = useCountUp(value)
  return (
    <div className="stat" ref={ref} data-reveal style={{ '--d': delay }}>
      <dt>{label}</dt>
      <dd>{shown}</dd>
    </div>
  )
}

export default function About({ repos }) {
  const own = repos.filter((r) => !r.fork && r.name !== GITHUB_USER)
  const stars = own.reduce((sum, r) => sum + r.stargazers_count, 0)
  const languages = new Set(own.map((r) => r.language).filter(Boolean)).size
  const live = own.filter((r) => LIVE_LINKS[r.name] ?? r.homepage).length

  return (
    <section id="about" className="section wrap">
      <SectionHead ws={4} title="About" />

      <div className="about">
        <p className="about__lead" data-reveal>
          I'm Asked, <span className="mono">cucu0628</span> on GitHub. I mostly write software for my
          own Linux desktop: a shell, Omarchy plugins, a music player. On the side I make games.
        </p>

        <dl className="workshop" data-reveal style={{ '--d': 2 }}>
          {STACK.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <dl className="stats">
        <Stat value={own.length} label="Public repos" delay={0} />
        <Stat value={stars} label="Stars" delay={1} />
        <Stat value={languages} label="Languages" delay={2} />
        <Stat value={live} label="Live sites" delay={3} />
      </dl>
    </section>
  )
}

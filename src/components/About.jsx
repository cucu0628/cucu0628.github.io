import SectionHead from './SectionHead.jsx'

const STACK = [
  ['Desktop', 'Hyprland, Quickshell, Omarchy'],
  ['Languages', 'QML, C++, TypeScript, Python, Rust'],
  ['Tools', 'Qt 6, CMake, Vite, React, Canvas 2D'],
]

export default function About() {
  return (
    <section id="about" className="section wrap">
      <SectionHead ws={4} title="About" />

      <div className="about">
        <div className="about__body">
          <p>
            I'm Asked, <span className="mono">cucu0628</span> on GitHub. I mostly write software for
            my own Linux desktop: a shell, Omarchy plugins, a music player. On the side I make
            games.
          </p>
        </div>

        <dl className="workshop">
          {STACK.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

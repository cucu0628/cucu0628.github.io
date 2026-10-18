import SectionHead from './SectionHead.jsx'

const STACK = [
  ['Desktop', 'Hyprland, Quickshell, Omarchy'],
  ['Nyelvek', 'QML, C++, TypeScript, Python, Rust'],
  ['Eszközök', 'Qt 6, CMake, Vite, React, Canvas 2D'],
]

export default function About() {
  return (
    <section id="rolam" className="section wrap">
      <SectionHead ws={4} title="Rólam" />

      <div className="about">
        <div className="about__body">
          <p>
            Asked vagyok, GitHubon <span className="mono">cucu0628</span>. Főleg a saját Linuxos
            desktopomhoz írok programokat: shellt, Omarchy-pluginokat, zenelejátszót. Mellette
            játékot is fejlesztek.
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

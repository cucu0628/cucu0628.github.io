import { GITHUB_USER, LIVE_LINKS, TERMINAL_COLORS } from '../data.js'

export default function About({ repos, painting }) {
  const own = repos.filter((r) => !r.fork && r.name !== GITHUB_USER)
  const stars = own.reduce((sum, r) => sum + r.stargazers_count, 0)
  const live = own.filter((r) => LIVE_LINKS[r.name] ?? r.homepage).length

  // fastfetch, but about me.
  const fetch = [
    ['Desktop', 'Hyprland, Quickshell, Omarchy'],
    ['Languages', 'QML, C++, TypeScript, Python, Rust'],
    ['Tools', 'Qt 6, CMake, Vite, React, Canvas 2D'],
    ['Theme', 'Varnished Horizon'],
    ['Wallpaper', `${painting.title} (${painting.year})`],
    ['Repos', `${own.length} public, ${stars} ${stars === 1 ? 'star' : 'stars'}`],
    ['Live sites', String(live)],
  ]

  return (
    <section id="about" className="ws ws--about" aria-labelledby="about-h">
      <div className="win about" data-win="About">
        <h2 id="about-h" className="ws__h">
          About
        </h2>
        <p className="about__lead">
          I'm Asked, <span className="mono about__handle">{GITHUB_USER}</span> on GitHub. I mostly write
          software for my own Linux desktop: a shell, Omarchy plugins, a music player. On the side I make
          games.
        </p>
      </div>

      <div className="win fetch mono" data-win="fastfetch">
        <p className="fetch__host">
          <b>asked</b>@<b>github</b>
        </p>
        <p className="fetch__rule" aria-hidden="true">
          ------------
        </p>
        <dl>
          {fetch.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <p className="fetch__colors" aria-hidden="true">
          {TERMINAL_COLORS.map((c) => (
            <span key={c} style={{ background: c }} />
          ))}
        </p>
      </div>
    </section>
  )
}

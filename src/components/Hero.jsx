import { EXHIBITS, GITHUB_USER, REPO_NOTES } from '../data.js'
import { timeAgo } from '../useRepos.js'

const LAUNCH = EXHIBITS.filter((e) => e.live)

export default function Hero({ repos }) {
  const own = repos.filter((r) => !r.fork && r.name !== GITHUB_USER)
  const recent = [...own].sort((a, b) => b.pushed_at.localeCompare(a.pushed_at)).slice(0, 3)

  return (
    <section id="home" className="ws ws--home">
      <div className="win hero__main" data-win="Asked, portfolio" style={{ '--i': 0 }}>
        <div>
          <p className="hero__roles">Developer and gamer</p>
          <h1 className="hero__name">Asked</h1>
          <p className="hero__lead">
            I build Linux desktop software and games, mostly in QML, C++ and TypeScript.
          </p>
        </div>
      </div>

      <nav className="win hero__launch" data-win="Open in your browser" aria-labelledby="launch-h" style={{ '--i': 1 }}>
        <h2 id="launch-h" className="win__h">
          Open in your browser
        </h2>
        <ul className="launch">
          {LAUNCH.map((e) => (
            <li key={e.repo}>
              <a href={e.live.href} target="_blank" rel="noreferrer">
                <span className="launch__name">{e.title}</span>
                <span className="launch__host mono">{new URL(e.live.href).host}</span>
                <span className="launch__verb">{e.live.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="win hero__latest" data-win="Recent pushes" style={{ '--i': 2 }}>
        <h2 className="win__h">Recent pushes</h2>
        <ul className="pushes">
          {recent.map((r) => (
            <li key={r.name}>
              <a className="mono" href={r.html_url} target="_blank" rel="noreferrer">
                {r.name}
              </a>
              <time dateTime={r.pushed_at}>{timeAgo(r.pushed_at)}</time>
              <span className="pushes__note">{REPO_NOTES[r.name] ?? r.description}</span>
            </li>
          ))}
        </ul>
        <a className="latest__all" href="#repos">
          See all {own.length} public repos
        </a>
      </div>
    </section>
  )
}

import { EXHIBITS } from '../data.js'

const slug = (e) => `p-${e.repo.toLowerCase()}`

// Jumping from the index focuses the window, so it takes the active border.
function jump(e, exhibit) {
  const el = document.getElementById(slug(exhibit))
  if (!el) return
  e.preventDefault()
  const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ block: 'center', behavior: smooth ? 'smooth' : 'auto' })
  el.focus({ preventScroll: true })
  history.replaceState(null, '', `#${slug(exhibit)}`)
}

function Links({ exhibit, repo }) {
  const { live } = exhibit
  return (
    <p className="proj__links">
      {live && (
        <a href={live.href} target="_blank" rel="noreferrer" className="btn btn--solid">
          {live.label}
        </a>
      )}
      {repo && (
        <a href={repo.html_url} target="_blank" rel="noreferrer" className="btn">
          Source
        </a>
      )}
      {repo?.stargazers_count > 0 && (
        <span className="proj__stars" title="GitHub stars">
          ★ {repo.stargazers_count}
        </span>
      )}
    </p>
  )
}

export default function Exhibits({ repos }) {
  const byName = Object.fromEntries(repos.map((r) => [r.name, r]))

  return (
    <section id="projects" className="ws ws--projects" aria-labelledby="projects-h">
      <nav className="win proj-index" data-win="Projects" aria-labelledby="projects-h">
        <h2 id="projects-h" className="ws__h">
          Projects
        </h2>
        <p className="ws__intro">Things I've built, in the order I'd show them.</p>
        <ul>
          {EXHIBITS.map((e) => (
            <li key={e.repo}>
              <a href={`#${slug(e)}`} onClick={(ev) => jump(ev, e)}>
                {e.title}
              </a>
              <span>{e.medium}</span>
            </li>
          ))}
        </ul>
      </nav>

      {EXHIBITS.map((exhibit) => {
        const repo = byName[exhibit.repo]
        const href = exhibit.live?.href ?? repo?.html_url
        return (
          <article
            key={exhibit.repo}
            id={slug(exhibit)}
            tabIndex={-1}
            className="win proj"
            data-win={`${exhibit.title}, ${exhibit.medium}`}
            aria-labelledby={`${slug(exhibit)}-h`}
          >
            <a className="proj__shot" href={href} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden="true">
              <img src={exhibit.image} alt="" loading="lazy" decoding="async" />
            </a>
            <div className="proj__body">
              <h3 id={`${slug(exhibit)}-h`} className="proj__title">
                {exhibit.title}
              </h3>
              <p className="proj__meta">
                {exhibit.medium}, {exhibit.year}
              </p>
              <p className="proj__text">{exhibit.text}</p>
              <Links exhibit={exhibit} repo={repo} />
            </div>
          </article>
        )
      })}
    </section>
  )
}

import { EXHIBITS } from '../data.js'
import SectionHead from './SectionHead.jsx'

function Exhibit({ exhibit, index, repo }) {
  const { title, year, medium, image, alt, focus, text, live, size } = exhibit
  const no = String(index + 1).padStart(2, '0')

  return (
    <article className={`exhibit exhibit--${size}`}>
      <a
        className="frame"
        href={live?.href ?? repo?.html_url}
        target="_blank"
        rel="noreferrer"
        tabIndex={-1}
        aria-hidden="true"
      >
        <img src={image} alt={alt} loading="lazy" decoding="async" style={focus && { objectPosition: focus }} />
      </a>

      <div className="placard">
        <p className="placard__no">No. {no}</p>
        <h3 className="placard__title">{title}</h3>
        <p className="placard__medium">
          {year} · {medium}
        </p>
        <p className="placard__text">{text}</p>
        <p className="placard__links">
          {live && (
            <a href={live.href} target="_blank" rel="noreferrer" className="btn btn--solid">
              {live.label} ↗
            </a>
          )}
          {repo && (
            <a href={repo.html_url} target="_blank" rel="noreferrer" className="btn">
              Forrás ↗
            </a>
          )}
          {repo?.stargazers_count > 0 && (
            <span className="placard__stars" title="GitHub csillagok">
              ★ {repo.stargazers_count}
            </span>
          )}
        </p>
      </div>
    </article>
  )
}

export default function Exhibits({ repos }) {
  const byName = Object.fromEntries(repos.map((r) => [r.name, r]))

  return (
    <section id="projektek" className="section wrap">
      <SectionHead ws={2} title="Projektek" />

      <div className="exhibits">
        {EXHIBITS.map((exhibit, i) => (
          <Exhibit key={exhibit.repo} exhibit={exhibit} index={i} repo={byName[exhibit.repo]} />
        ))}
      </div>
    </section>
  )
}

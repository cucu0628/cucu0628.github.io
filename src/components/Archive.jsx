import { useMemo, useState } from 'react'
import { GITHUB_USER, LANG_COLORS, LIVE_LINKS, REPO_NOTES } from '../data.js'
import { timeAgo } from '../useRepos.js'
import SectionHead from './SectionHead.jsx'

const ALL = 'all'
const SORTS = {
  recent: (a, b) => b.pushed_at.localeCompare(a.pushed_at),
  stars: (a, b) => b.stargazers_count - a.stargazers_count || SORTS.recent(a, b),
  'a–z': (a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }),
}

function Lang({ name }) {
  if (!name) return <span className="lang lang--none">—</span>
  return (
    <span className="lang">
      <i style={{ background: LANG_COLORS[name] ?? 'var(--muted)' }} aria-hidden="true" />
      {name}
    </span>
  )
}

export default function Archive({ repos, live }) {
  const [lang, setLang] = useState(ALL)
  const [sort, setSort] = useState('recent')

  const languages = useMemo(() => {
    const counts = {}
    for (const r of repos) if (r.language) counts[r.language] = (counts[r.language] ?? 0) + 1
    return Object.entries(counts).sort((a, b) => b[1] - a[1])
  }, [repos])

  const rows = repos
    .filter((r) => lang === ALL || r.language === lang)
    .sort(SORTS[sort])

  return (
    <section id="repos" className="section wrap">
      <SectionHead ws={3} title="Repos">
        Every public repo of mine, live from GitHub.
      </SectionHead>

      <div className="ledger__tools">
        <div className="chips" role="group" aria-label="Filter by language">
          {[[ALL, repos.length], ...languages].map(([name, count]) => (
            <button
              key={name}
              type="button"
              className="chip"
              aria-pressed={lang === name}
              onClick={() => setLang(name)}
            >
              {name} <span className="dim">{count}</span>
            </button>
          ))}
        </div>
        <div className="chips" role="group" aria-label="Sort">
          <span className="dim">sort:</span>
          {Object.keys(SORTS).map((key) => (
            <button
              key={key}
              type="button"
              className="chip chip--quiet"
              aria-pressed={sort === key}
              onClick={() => setSort(key)}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      <div className="ledger" role="table" aria-label="Repos">
        <div className="ledger__row ledger__row--head" role="row">
          <span role="columnheader">#</span>
          <span role="columnheader">Name</span>
          <span role="columnheader">Description</span>
          <span role="columnheader">Language</span>
          <span role="columnheader">★</span>
          <span role="columnheader">Last push</span>
        </div>

        {rows.map((repo, i) => {
          const liveUrl = LIVE_LINKS[repo.name] ?? repo.homepage
          return (
            <div className="ledger__row" role="row" key={repo.name}>
              <span role="cell" className="ledger__no">
                {String(i + 1).padStart(3, '0')}
              </span>
              <span role="cell" className="ledger__name">
                <a href={repo.html_url} target="_blank" rel="noreferrer">
                  {repo.name}
                </a>
                {repo.fork && <span className="tag">fork</span>}
                {liveUrl && (
                  <a className="tag tag--live" href={liveUrl} target="_blank" rel="noreferrer">
                    live ↗
                  </a>
                )}
              </span>
              <span role="cell" className="ledger__desc">
                {REPO_NOTES[repo.name] ?? repo.description ?? '—'}
              </span>
              <span role="cell">
                <Lang name={repo.language} />
              </span>
              <span role="cell" className={`ledger__stars${repo.stargazers_count ? '' : ' is-zero'}`}>
                {repo.stargazers_count || <span className="dim">·</span>}
              </span>
              <span role="cell" className="ledger__date">
                <time dateTime={repo.pushed_at}>{timeAgo(repo.pushed_at)}</time>
              </span>
            </div>
          )
        })}
      </div>

      <p className="ledger__note dim">
        {live ? 'Live data from the GitHub API.' : 'Cached snapshot (the GitHub API is unreachable right now).'}{' '}
        <a href={`https://github.com/${GITHUB_USER}?tab=repositories`} target="_blank" rel="noreferrer">
          GitHub profile ↗
        </a>
      </p>
    </section>
  )
}

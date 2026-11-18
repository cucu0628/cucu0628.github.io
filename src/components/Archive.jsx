import { useMemo, useState } from 'react'
import { GITHUB_USER, LANG_COLORS, LIVE_LINKS, REPO_NOTES } from '../data.js'
import { timeAgo } from '../useRepos.js'

const ALL = 'All languages'
const SORTS = {
  Recent: (a, b) => b.pushed_at.localeCompare(a.pushed_at),
  Stars: (a, b) => b.stargazers_count - a.stargazers_count || SORTS.Recent(a, b),
  'A–Z': (a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }),
}

function Lang({ name }) {
  if (!name) return <span className="lang lang--none">None</span>
  return (
    <span className="lang">
      <i style={{ background: LANG_COLORS[name] ?? 'var(--dim)' }} aria-hidden="true" />
      {name}
    </span>
  )
}

export default function Archive({ repos, live }) {
  const [lang, setLang] = useState(ALL)
  const [sort, setSort] = useState('Recent')

  const languages = useMemo(() => {
    const counts = {}
    for (const r of repos) if (r.language) counts[r.language] = (counts[r.language] ?? 0) + 1
    return Object.entries(counts).sort((a, b) => b[1] - a[1])
  }, [repos])

  const rows = repos.filter((r) => lang === ALL || r.language === lang).sort(SORTS[sort])

  return (
    <section id="repos" className="ws ws--repos" aria-labelledby="repos-h">
      <div className="win repos__side" data-win="Repos, filters">
        <h2 id="repos-h" className="ws__h">
          Repos
        </h2>
        <p className="ws__intro">Every public repo of mine, live from GitHub.</p>

        <div className="pick pick--langs" role="group" aria-label="Show language">
          {[[ALL, repos.length], ...languages].map(([name, count]) => (
            <button key={name} type="button" aria-pressed={lang === name} onClick={() => setLang(name)}>
              <span>{name}</span>
              <span className="pick__count">{count}</span>
            </button>
          ))}
        </div>

        <div className="pick pick--sort" role="group" aria-label="Sort by">
          {Object.keys(SORTS).map((key) => (
            <button key={key} type="button" aria-pressed={sort === key} onClick={() => setSort(key)}>
              {key}
            </button>
          ))}
        </div>

        <p className="repos__note">
          {live ? 'Live data from the GitHub API.' : 'Saved copy: the GitHub API is not answering right now.'}{' '}
          <a href={`https://github.com/${GITHUB_USER}?tab=repositories`} target="_blank" rel="noreferrer">
            Open on GitHub
          </a>
        </p>
      </div>

      <div className="win repos__list" data-win={`Repos, ${lang.toLowerCase()}`} role="table" aria-label="Repos">
        <div className="row row--head" role="row">
          <span role="columnheader">Name</span>
          <span role="columnheader">Description</span>
          <span role="columnheader">Language</span>
          <span role="columnheader">Stars</span>
          <span role="columnheader">Last push</span>
        </div>

        <div role="rowgroup" key={`${lang}-${sort}`} className="rows">
          {rows.map((repo, i) => {
            const liveUrl = LIVE_LINKS[repo.name] ?? repo.homepage
            return (
              <div className="row" role="row" key={repo.name} style={{ '--i': Math.min(i, 10) }}>
                <span role="cell" className="row__name">
                  <a className="mono" href={repo.html_url} target="_blank" rel="noreferrer">
                    {repo.name}
                  </a>
                  {repo.fork && <span className="tag">fork</span>}
                  {liveUrl && (
                    <a className="tag tag--live" href={liveUrl} target="_blank" rel="noreferrer">
                      live
                    </a>
                  )}
                </span>
                <span role="cell" className="row__desc">
                  {REPO_NOTES[repo.name] ?? repo.description ?? <span className="dim">No description</span>}
                </span>
                <span role="cell" className="row__lang">
                  <Lang name={repo.language} />
                </span>
                <span role="cell" className={`row__stars${repo.stargazers_count ? '' : ' is-zero'}`}>
                  {repo.stargazers_count ? `★ ${repo.stargazers_count}` : '0'}
                </span>
                <span role="cell" className="row__date">
                  <time dateTime={repo.pushed_at}>{timeAgo(repo.pushed_at)}</time>
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

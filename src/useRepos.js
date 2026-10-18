import { useEffect, useState } from 'react'
import { GITHUB_USER } from './data.js'
import fallback from './repos.fallback.json'

const CACHE_KEY = 'asked:repos'
const CACHE_MS = 10 * 60 * 1000

function readCache() {
  try {
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY))
    if (cached && Date.now() - cached.at < CACHE_MS) return cached.repos
  } catch {
    // storage may be unavailable; just fetch
  }
  return null
}

// Live repo list from the GitHub API; falls back to a build-time snapshot
// when the API is unreachable or rate limited.
export function useRepos() {
  const [state, setState] = useState(() => {
    const cached = readCache()
    return { repos: cached ?? fallback, live: Boolean(cached) }
  })

  useEffect(() => {
    if (state.live) return
    const ctrl = new AbortController()
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`, {
      signal: ctrl.signal,
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((repos) => {
        setState({ repos, live: true })
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), repos }))
        } catch {
          // ignore
        }
      })
      .catch(() => {})
    return () => ctrl.abort()
  }, [state.live])

  return state
}

const rtf = new Intl.RelativeTimeFormat('hu', { numeric: 'auto' })
const STEPS = [
  ['year', 365 * 24 * 3600],
  ['month', 30 * 24 * 3600],
  ['week', 7 * 24 * 3600],
  ['day', 24 * 3600],
  ['hour', 3600],
  ['minute', 60],
]

export function timeAgo(iso) {
  const secs = (new Date(iso).getTime() - Date.now()) / 1000
  for (const [unit, size] of STEPS) {
    if (Math.abs(secs) >= size) return rtf.format(Math.round(secs / size), unit)
  }
  return 'épp most'
}

import { useCallback, useEffect, useRef, useState } from 'react'
import { PAINTINGS, SECTIONS } from './data.js'

const WALL_KEY = 'asked:wallpaper'
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function storedWallpaper() {
  try {
    const i = PAINTINGS.findIndex((p) => p.file === localStorage.getItem(WALL_KEY))
    if (i >= 0) return i
  } catch {
    // storage may be blocked; pick one at random
  }
  return Math.floor(Math.random() * PAINTINGS.length)
}

export const paintingSrc = (p) => `/paintings/${p.file}.webp`

// The wallpaper. `next` loads the following painting, then starts a transition
// from the current one; the Wallpaper component plays Vellum Shell's ink shader
// and calls `done`. The choice is remembered per browser.
export function useWallpaper() {
  const [state, setState] = useState(() => ({ index: storedWallpaper(), transition: null }))
  const busy = useRef(false)
  const current = useRef(state.index)

  const done = useCallback(() => {
    setState((s) => ({ ...s, transition: null }))
    busy.current = false
  }, [])

  const next = useCallback(() => {
    if (busy.current) return
    busy.current = true
    const from = current.current
    const to = (from + 1) % PAINTINGS.length
    try {
      localStorage.setItem(WALL_KEY, PAINTINGS[to].file)
    } catch {
      // not remembered then
    }
    const img = new Image()
    img.src = paintingSrc(PAINTINGS[to])
    img
      .decode()
      .catch(() => {})
      .then(() => {
        current.current = to
        if (reduced()) {
          setState({ index: to, transition: null })
          busy.current = false
        } else {
          setState({ index: to, transition: { from, to } })
        }
      })
  }, [])

  return { ...state, painting: PAINTINGS[state.index], next, done }
}

// Focus follows mouse: the window under the pointer (or holding keyboard focus)
// gets the active border, and its title goes to the bar.
export function useWindowFocus() {
  const [title, setTitle] = useState('')
  useEffect(() => {
    let current = null
    const focus = (el) => {
      if (!el || el === current) return
      current?.removeAttribute('data-focused')
      el.setAttribute('data-focused', '')
      current = el
      setTitle(el.dataset.win)
    }
    const onEvent = (e) => focus(e.target.closest?.('[data-win]'))
    focus(document.querySelector('[data-win]'))
    document.addEventListener('pointerover', onEvent)
    document.addEventListener('focusin', onEvent)
    return () => {
      document.removeEventListener('pointerover', onEvent)
      document.removeEventListener('focusin', onEvent)
    }
  }, [])
  return title
}

// Windows below the first workspace pop in (Hyprland's popin) the first time
// they scroll into view. Windows arriving together open one after another,
// left to right and top to bottom. Without JS or with reduced motion they are
// simply there.
export function useWindowPopin() {
  useEffect(() => {
    if (reduced() || !('IntersectionObserver' in window)) return
    const windows = [...document.querySelectorAll('.ws:not(.ws--home) > .win')]
    const fold = window.innerHeight * 0.9
    const closed = windows.filter((w) => w.getBoundingClientRect().top > fold)
    for (const w of closed) w.setAttribute('data-closed', '')

    const observer = new IntersectionObserver(
      (entries) => {
        const opening = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left)
        opening.forEach(({ target }, k) => {
          target.style.setProperty('--d', `${k * 80}ms`)
          target.removeAttribute('data-closed')
          observer.unobserve(target)
        })
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    for (const w of closed) observer.observe(w)
    return () => {
      observer.disconnect()
      for (const w of closed) w.removeAttribute('data-closed')
    }
  }, [])
}

// The workspace that crosses the middle of the screen is the active one.
export function useActiveWorkspace() {
  const [active, setActive] = useState(SECTIONS[0].id)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const { id } of SECTIONS) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])
  return active
}

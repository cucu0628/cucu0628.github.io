import { useEffect, useLayoutEffect, useRef } from 'react'
import { PAINTINGS } from '../data.js'
import { paintingSrc } from '../useDesktop.js'
import { parseFocus, playInk } from '../inkTransition.js'

async function loaded(p) {
  const image = new Image()
  image.src = paintingSrc(p)
  await image.decode()
  return { image, focus: parseFocus(p.focus) }
}

// The current painting is an <img>. During a change the old one stays on top
// of it and the canvas plays the ink transition over both; when it is done the
// old image goes and the canvas hides, leaving the new painting underneath.
export default function Wallpaper({ index, transition, onDone }) {
  const canvas = useRef(null)

  useEffect(() => {
    if (!transition) return
    let cancelled = false
    const run = async () => {
      try {
        const [from, to] = await Promise.all([loaded(PAINTINGS[transition.from]), loaded(PAINTINGS[transition.to])])
        if (cancelled) return
        await playInk(canvas.current, from, to, () => canvas.current.classList.add('is-on'))
      } catch {
        // no WebGL (or a painting failed to decode): just swap
      }
      if (!cancelled) onDone()
    }
    run()
    return () => {
      cancelled = true
    }
  }, [transition, onDone])

  // Hide the canvas only after the old <img> is gone, before the next paint.
  useLayoutEffect(() => {
    if (!transition) canvas.current?.classList.remove('is-on')
  }, [transition])

  const shown = transition ? [transition.to, transition.from] : [index]

  return (
    <div className="wall" aria-hidden="true">
      {shown.map((i) => (
        <img
          key={PAINTINGS[i].file}
          src={paintingSrc(PAINTINGS[i])}
          alt=""
          decoding="async"
          style={{ objectPosition: PAINTINGS[i].focus }}
        />
      ))}
      <canvas ref={canvas} className="wall__ink" />
    </div>
  )
}

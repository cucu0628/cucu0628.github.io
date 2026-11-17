import { GITHUB_USER, PAINTINGS } from '../data.js'
import SectionHead from './SectionHead.jsx'

// The page closes on a horizon, the same way the hero opens on one.
const FINALE = PAINTINGS.find((p) => p.file === 'twilight')

export default function Contact() {
  return (
    <section id="contact" className="section finale">
      <img
        className="finale__scene"
        src={`/paintings/${FINALE.file}.webp`}
        alt=""
        loading="lazy"
        decoding="async"
      />
      <div className="finale__shade" aria-hidden="true" />

      <div className="wrap">
        <SectionHead ws={5} title="Contact" />

        <div className="contact" data-reveal>
          <p className="contact__lead">You can reach me on GitHub. Bugs and ideas are welcome as issues.</p>
          <a className="contact__big" href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer">
            github.com/{GITHUB_USER} <span aria-hidden="true">↗</span>
          </a>
        </div>

        <footer className="colophon" data-reveal>
          <p>
            Type: Fraunces, IBM Plex Mono. Colors and paintings: Varnished Horizon (public-domain
            19th-century landscapes). Closing scene: {FINALE.artist}, <em>{FINALE.title}</em>,{' '}
            {FINALE.year}.
          </p>
          <p>
            © {new Date().getFullYear()} Asked · <a href="/privacy.html">Privacy</a>
          </p>
        </footer>
      </div>
    </section>
  )
}

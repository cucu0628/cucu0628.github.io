import { GITHUB_USER } from '../data.js'
import SectionHead from './SectionHead.jsx'

export default function Contact() {
  return (
    <section id="contact" className="section section--last wrap">
      <SectionHead ws={5} title="Contact" />

      <div className="contact">
        <p className="contact__lead">You can reach me on GitHub. Bugs and ideas are welcome as issues.</p>
        <a className="contact__big" href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer">
          github.com/{GITHUB_USER} <span aria-hidden="true">↗</span>
        </a>
      </div>

      <footer className="colophon">
        <p>
          Type: Fraunces, IBM Plex Mono. Colors and paintings: Varnished Horizon (public-domain
          19th-century landscapes).
        </p>
        <p className="dim">
          © {new Date().getFullYear()} Asked · <a href="/privacy.html">Privacy</a>
        </p>
      </footer>
    </section>
  )
}

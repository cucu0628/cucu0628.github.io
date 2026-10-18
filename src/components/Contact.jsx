import { GITHUB_USER } from '../data.js'
import SectionHead from './SectionHead.jsx'

export default function Contact() {
  return (
    <section id="kapcsolat" className="section section--last wrap">
      <SectionHead ws={5} title="Kapcsolat" />

      <div className="contact">
        <p className="contact__lead">GitHubon érsz el. Hibát vagy ötletet issue-ként tudsz küldeni.</p>
        <a className="contact__big" href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer">
          github.com/{GITHUB_USER} <span aria-hidden="true">↗</span>
        </a>
      </div>

      <footer className="colophon">
        <p>
          Betűk: Fraunces, IBM Plex Mono. Színek és festmények: Varnished Horizon (közkincs, 19.
          századi tájképek).
        </p>
        <p className="dim">© {new Date().getFullYear()} Asked</p>
      </footer>
    </section>
  )
}

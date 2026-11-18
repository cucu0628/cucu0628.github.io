import { GITHUB_USER } from '../data.js'

// The last workspace is left nearly empty, so the page ends on the wallpaper.
export default function Contact({ painting }) {
  return (
    <section id="contact" className="ws ws--contact" aria-labelledby="contact-h">
      <div className="win contact" data-win="Contact">
        <h2 id="contact-h" className="ws__h">
          Contact
        </h2>
        <p className="contact__lead">You can reach me on GitHub. Bugs and ideas are welcome as issues.</p>
        <a className="contact__big" href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer">
          github.com/{GITHUB_USER}
        </a>

        <footer className="colophon">
          <p>
            Set in Recursive. Colors and wallpapers come from Varnished Horizon, a theme built on
            public-domain 19th-century landscapes. On the wallpaper now: {painting.artist},{' '}
            <em>{painting.title}</em>, {painting.year}.
          </p>
          <p>
            © {new Date().getFullYear()} Asked. <a href="/privacy.html">Privacy</a>
          </p>
        </footer>
      </div>
    </section>
  )
}

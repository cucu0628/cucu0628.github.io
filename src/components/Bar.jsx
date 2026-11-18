import { GITHUB_USER, SECTIONS } from '../data.js'

export default function Bar({ active, title, painting, onWallpaper }) {
  return (
    <header className="bar">
      <nav aria-label="Workspaces">
        <ol className="bar__ws">
          {SECTIONS.map(({ id, label }, i) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={active === id ? 'is-active' : undefined}
                aria-current={active === id ? 'location' : undefined}
              >
                <span className="bar__num">{i + 1}</span>
                <span className="bar__label">{label}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <p className="bar__title" aria-hidden="true">
        {title}
      </p>

      <div className="bar__right">
        <button
          type="button"
          className="bar__btn"
          onClick={onWallpaper}
          aria-label={`Change wallpaper. Now showing ${painting.title} by ${painting.artist}.`}
          title={`${painting.artist}, ${painting.title}, ${painting.year}`}
        >
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
            <rect x="1.5" y="2.5" width="13" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="1.3" />
            <path d="M2 12l3.6-4.2 2.6 2.8 1.8-1.9L14 12.4" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
            <circle cx="11" cy="5.6" r="1.2" fill="currentColor" />
          </svg>
          <span className="bar__wall-name">{painting.title}</span>
        </button>
        <a className="bar__btn" href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer">
          GitHub
        </a>
      </div>
    </header>
  )
}

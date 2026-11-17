export default function SectionHead({ ws, title, children }) {
  return (
    <header className="shead" data-reveal>
      <p className="shead__no" aria-hidden="true">
        {String(ws).padStart(2, '0')}
      </p>
      <h2 className="shead__title">
        <span>{title}</span>
      </h2>
      {children && <p className="shead__intro">{children}</p>}
    </header>
  )
}

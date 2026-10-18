export default function SectionHead({ ws, title, children }) {
  return (
    <header className="shead">
      <p className="kicker">
        <span className="shead__ws">[{ws}]</span>
      </p>
      <h2 className="shead__title">{title}</h2>
      {children && <p className="shead__intro">{children}</p>}
    </header>
  )
}

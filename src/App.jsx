import { useEffect, useState } from 'react'
import Bar from './components/Bar.jsx'
import Hero from './components/Hero.jsx'
import Exhibits from './components/Exhibits.jsx'
import Archive from './components/Archive.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import { SECTIONS } from './data.js'
import { useRepos } from './useRepos.js'

function useActiveSection() {
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

export default function App() {
  const { repos, live } = useRepos()
  const active = useActiveSection()

  return (
    <>
      <Bar active={active} />
      <main>
        <Hero repos={repos} />
        <Exhibits repos={repos} />
        <Archive repos={repos} live={live} />
        <About />
        <Contact />
      </main>
    </>
  )
}

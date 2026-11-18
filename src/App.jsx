import Bar from './components/Bar.jsx'
import Wallpaper from './components/Wallpaper.jsx'
import Hero from './components/Hero.jsx'
import Exhibits from './components/Exhibits.jsx'
import Archive from './components/Archive.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import { useRepos } from './useRepos.js'
import { useActiveWorkspace, useWallpaper, useWindowFocus, useWindowPopin } from './useDesktop.js'

export default function App() {
  const { repos, live } = useRepos()
  const wallpaper = useWallpaper()
  const active = useActiveWorkspace()
  const title = useWindowFocus()
  useWindowPopin()

  return (
    <>
      <Wallpaper index={wallpaper.index} transition={wallpaper.transition} onDone={wallpaper.done} />
      <Bar active={active} title={title} painting={wallpaper.painting} onWallpaper={wallpaper.next} />
      <main className="desktop">
        <Hero repos={repos} />
        <Exhibits repos={repos} />
        <Archive repos={repos} live={live} />
        <About repos={repos} painting={wallpaper.painting} />
        <Contact painting={wallpaper.painting} />
      </main>
    </>
  )
}

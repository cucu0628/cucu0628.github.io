export const GITHUB_USER = 'cucu0628'

// The sections double as "workspaces" in the top bar, like Hyprland's 1–5.
export const SECTIONS = [
  { id: 'kezdo', label: 'kezdő' },
  { id: 'projektek', label: 'projektek' },
  { id: 'repok', label: 'repók' },
  { id: 'rolam', label: 'rólam' },
  { id: 'kapcsolat', label: 'kapcsolat' },
]

// Hero backgrounds: the darker Varnished Horizon wallpapers (all public domain).
// `focus` is the background-position that keeps the subject in frame.
export const PAINTINGS = [
  { file: 'twilight', artist: 'Frederic Edwin Church', title: 'Alkonyat a vadonban', year: '1860', focus: 'center 30%' },
  { file: 'storm-rockies', artist: 'Albert Bierstadt', title: 'Vihar a Sziklás-hegységben', year: '1866', focus: 'center 40%' },
  { file: 'abbey-oakwood', artist: 'Caspar David Friedrich', title: 'Apátság a tölgyesben', year: '1809–1810', focus: 'center 45%' },
  { file: 'aurora', artist: 'Frederic Edwin Church', title: 'Sarki fény', year: '1865', focus: 'center 35%' },
  { file: 'dresden-moonlight', artist: 'Johan Christian Dahl', title: 'Drezda holdfényben', year: '1839', focus: 'center 40%' },
  { file: 'desolation', artist: 'Thomas Cole', title: 'A birodalom útja: Pusztulás', year: '1836', focus: 'center 35%' },
  { file: 'savage-state', artist: 'Thomas Cole', title: 'A birodalom útja: A vad állapot', year: '1834', focus: 'center 40%' },
]

// Hand-picked exhibits. `repo` links them to live GitHub data (stars, last push).
export const EXHIBITS = [
  {
    repo: 'slopfall',
    title: 'Nightfall Survivors',
    year: '2026',
    medium: 'TypeScript · Canvas 2D',
    image: '/shots/slopfall.webp',
    alt: 'Nightfall Survivors játékmenet: a lovag denevérek és zombik között egy temetőben',
    text: 'Böngészős survivor roguelite (Vampire Survivors-szerű). 6 hős, 10 fegyver evolúciókkal, bossok, mobilos irányítás. A grafika teljesen procedurális, Canvas 2D-ben.',
    live: { href: 'https://game.asked.hu', label: 'Játék' },
    size: 'hero',
  },
  {
    repo: 'vellum_shell',
    title: 'Vellum Shell',
    year: '2026',
    medium: 'QML · Rust · Hyprland',
    image: '/shots/vellum.webp',
    alt: 'A Vellum Shell dashboardja egy lila tóparti háttérképen',
    text: 'Desktop shell Hyprlandhez, Quickshellben írva. Bar, alkalmazásindító, értesítésközpont, médiavezérlés, beállítások és témaszerkesztő.',
    size: 'wide',
  },
  {
    repo: 'Hibiki',
    title: 'Hibiki',
    year: '2026',
    medium: 'C++ · Qt 6 · QML',
    image: '/shots/hibiki.webp',
    alt: 'A Hibiki zenelejátszó könyvtár nézete',
    text: 'Qt 6 zenelejátszó Linuxra. YouTube-ról tölt le Opus formátumban, helyi könyvtár borítókkal, MPRIS és Discord Rich Presence. A Vellum Shell témáját használja.',
    size: 'narrow',
  },
  {
    repo: 'omarchy-deskmate',
    title: 'Deskmate',
    year: '2026',
    medium: 'QML · Quickshell · Wayland',
    image: '/shots/deskmate.webp',
    alt: 'Deskmate az asztalon, a jobb klikkes menüvel és a beállítások panellel',
    focus: 'center bottom',
    text: 'Animált asztali karakter Omarchyhoz. Sétál a képernyő alján, reagál a kattintásra és a hibás parancsokra, és át lehet húzni másik monitorra.',
    size: 'narrow',
  },
  {
    repo: 'omarchy-dashboard',
    title: 'Asked Dashboard',
    year: '2026',
    medium: 'QML · MPRIS · Open-Meteo',
    image: '/shots/dashboard.webp',
    alt: 'Az Asked Dashboard áttekintő nézete naptárral, lejátszóval és rendszerterheléssel',
    text: 'Bar-widget az Omarchy shellhez. Az órára kattintva naptár, médialejátszó, rendszerterhelés és időjárás nézet nyílik.',
    size: 'wide',
  },
  {
    repo: 'varnished-horizon',
    title: 'Varnished Horizon',
    year: '2026',
    medium: 'Téma · 19. századi tájképek',
    image: '/shots/varnished.webp',
    alt: 'A Varnished Horizon téma: Hibiki, btop, terminál és fájlkezelő meleg tónusokban',
    text: 'Sötét téma Omarchyhoz, 19. századi tájképek színeivel és háttérképeivel.',
    size: 'hero flip',
  },
]

// Hungarian blurbs for the archive; the API description is used when missing.
export const REPO_NOTES = {
  slopfall: 'Nightfall Survivors, böngészős roguelite.',
  Hibiki: 'Qt 6 zenelejátszó Linuxra, MPRIS-szel és helyi könyvtárral.',
  cucu0628: 'A GitHub-profilom README-je.',
  vellum_shell: 'Desktop shell Hyprlandhez (Quickshell).',
  'varnished-horizon': 'Sötét téma Omarchyhoz.',
  'omarchy-deskmate': 'Animált asztali karakter Omarchyhoz.',
  'omarchy-betterlockscreen': 'Többmonitoros zárolóképernyő-plugin Omarchyhoz.',
  'omarchy-dashboard': 'Óra és dashboard widget az Omarchy barba.',
  tetelek: 'Érettségi tételek weboldalként.',
  omarchy: 'Omarchy fork.',
  'cucu0628.github.io': 'Ez a weboldal.',
  eretsegi: 'AI kvízgenerátor érettségihez (Groq API).',
  mozi: 'Mozi — Python projekt.',
  py_calculator: 'Számológép Pythonban.',
}

export const LIVE_LINKS = {
  slopfall: 'https://game.asked.hu',
  eretsegi: 'https://cucu0628.github.io/eretsegi/',
  tetelek: 'https://cucu0628.github.io/tetelek/',
}

export const LANG_COLORS = {
  QML: '#a4b982',
  'C++': '#c96355',
  TypeScript: '#7899b0',
  JavaScript: '#d9b568',
  Python: '#67a4a1',
  HTML: '#d5894d',
  Rust: '#a0715a',
}

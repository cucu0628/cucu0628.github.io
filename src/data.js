export const GITHUB_USER = 'cucu0628'

// The sections double as "workspaces" in the top bar, like Hyprland's 1–5.
export const SECTIONS = [
  { id: 'home', label: 'home' },
  { id: 'projects', label: 'projects' },
  { id: 'repos', label: 'repos' },
  { id: 'about', label: 'about' },
  { id: 'contact', label: 'contact' },
]

// Hero backgrounds: the darker Varnished Horizon wallpapers (all public domain).
// `focus` is the background-position that keeps the subject in frame.
export const PAINTINGS = [
  { file: 'twilight', artist: 'Frederic Edwin Church', title: 'Twilight in the Wilderness', year: '1860', focus: 'center 30%' },
  { file: 'storm-rockies', artist: 'Albert Bierstadt', title: 'A Storm in the Rocky Mountains', year: '1866', focus: 'center 40%' },
  { file: 'abbey-oakwood', artist: 'Caspar David Friedrich', title: 'The Abbey in the Oakwood', year: '1809–1810', focus: 'center 45%' },
  { file: 'aurora', artist: 'Frederic Edwin Church', title: 'Aurora Borealis', year: '1865', focus: 'center 35%' },
  { file: 'dresden-moonlight', artist: 'Johan Christian Dahl', title: 'Dresden by Moonlight', year: '1839', focus: 'center 40%' },
  { file: 'desolation', artist: 'Thomas Cole', title: 'The Course of Empire: Desolation', year: '1836', focus: 'center 35%' },
  { file: 'savage-state', artist: 'Thomas Cole', title: 'The Course of Empire: The Savage State', year: '1834', focus: 'center 40%' },
]

// Hand-picked exhibits. `repo` links them to live GitHub data (stars, last push).
export const EXHIBITS = [
  {
    repo: 'slopfall',
    title: 'Nightfall Survivors',
    year: '2026',
    medium: 'TypeScript · Canvas 2D',
    image: '/shots/slopfall.webp',
    alt: 'Nightfall Survivors gameplay: the knight surrounded by bats and zombies in a graveyard',
    text: 'A browser survivor roguelite in the vein of Vampire Survivors. 6 heroes, 10 weapons with evolutions, bosses and touch controls. All the art is procedural, drawn in Canvas 2D.',
    live: { href: 'https://game.asked.hu', label: 'Play' },
    size: 'hero',
  },
  {
    repo: 'deep-debt',
    title: 'Deep Debt',
    year: '2026',
    medium: 'TypeScript · React · Canvas 2D',
    image: '/shots/deep-debt.webp',
    alt: 'Deep Debt: the pixel-art mining town with the mine, market, saloon and the Company bank',
    text: 'A pixel-art mining roguelite with idle elements. Chain reactions, daily shafts with mutators, ever-growing debt and rebirths. Runs in the browser, with optional rewarded ads.',
    live: { href: 'https://miner.asked.hu', label: 'Play' },
    size: 'hero flip',
  },
  {
    repo: 'vellum_shell',
    title: 'Vellum Shell',
    year: '2026',
    medium: 'QML · Rust · Hyprland',
    image: '/shots/vellum.webp',
    alt: 'The Vellum Shell dashboard with calendar, weather and system load over a rainy race-track wallpaper',
    text: 'A desktop shell for Hyprland, written in Quickshell. Bar, app launcher, notification center, media controls, settings and a theme editor.',
    size: 'wide',
  },
  {
    repo: 'Hibiki',
    title: 'Hibiki',
    year: '2026',
    medium: 'C++ · Qt 6 · QML',
    image: '/shots/hibiki.webp',
    alt: 'The library view of the Hibiki music player',
    text: 'A Qt 6 music player for Linux. Downloads from YouTube as Opus, local library with cover art, MPRIS and Discord Rich Presence. Uses the Vellum Shell theme.',
    size: 'narrow',
  },
  {
    repo: 'omarchy-deskmate',
    title: 'Deskmate',
    year: '2026',
    medium: 'QML · Quickshell · Wayland',
    image: '/shots/deskmate.webp',
    alt: 'Deskmate on the desktop, with its right-click menu and settings panel',
    focus: 'center bottom',
    text: 'An animated desktop companion for Omarchy. Walks along the bottom of the screen, reacts to clicks and failed commands, and can be dragged to another monitor.',
    size: 'narrow',
  },
  {
    repo: 'omarchy-dashboard',
    title: 'Asked Dashboard',
    year: '2026',
    medium: 'QML · MPRIS · Open-Meteo',
    image: '/shots/dashboard.webp',
    alt: 'The Asked Dashboard overview with calendar, media player and system load',
    text: 'A bar widget for the Omarchy shell. Clicking the clock opens calendar, media player, system load and weather views.',
    size: 'wide',
  },
  {
    repo: 'varnished-horizon',
    title: 'Varnished Horizon',
    year: '2026',
    medium: 'Theme · 19th-century landscapes',
    image: '/shots/varnished.webp',
    alt: 'The Varnished Horizon theme: Hibiki, btop, a terminal and a file manager in warm tones',
    text: 'A dark theme for Omarchy, with colors and wallpapers taken from 19th-century landscape paintings.',
    size: 'hero',
  },
]

// Short blurbs for the archive; the API description is used when missing.
export const REPO_NOTES = {
  slopfall: 'Nightfall Survivors, a browser roguelite.',
  'deep-debt': 'Deep Debt, a pixel-art mining roguelite.',
  Hibiki: 'Qt 6 music player for Linux, with MPRIS and a local library.',
  cucu0628: 'My GitHub profile README.',
  vellum_shell: 'Desktop shell for Hyprland (Quickshell).',
  'varnished-horizon': 'Dark theme for Omarchy.',
  'omarchy-deskmate': 'Animated desktop companion for Omarchy.',
  'omarchy-betterlockscreen': 'Multi-monitor lock screen plugin for Omarchy.',
  'omarchy-dashboard': 'Clock and dashboard widget for the Omarchy bar.',
  tetelek: 'Hungarian final exam (érettségi) topics as a website.',
  omarchy: 'Omarchy fork.',
  'cucu0628.github.io': 'This website.',
  eretsegi: 'AI quiz generator for the Hungarian final exams (Groq API).',
  mozi: 'Mozi, a Python project.',
  py_calculator: 'Calculator in Python.',
}

export const LIVE_LINKS = {
  slopfall: 'https://game.asked.hu',
  'deep-debt': 'https://miner.asked.hu',
  eretsegi: 'https://asked.hu/eretsegi/',
  tetelek: 'https://asked.hu/tetelek/',
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

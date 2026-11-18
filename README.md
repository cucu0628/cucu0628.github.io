# cucu0628.github.io

Asked portfóliója — React + Vite. Élesben: https://asked.hu

- **Projektek** – kézzel válogatott projektek (`src/data.js` → `EXHIBITS`), képek a `public/shots/` mappában.
- **Repók** – minden publikus repó élőben a GitHub API-ból. Ha az API nem válaszol
  (pl. rate limit), a `src/repos.fallback.json` pillanatképet mutatja.

Az oldal egy Hyprland-asztal: a tartalom tile-olt ablakokban ül, az egér alatti ablak kapja a
fókuszkeretet, a szekciók az 1–5 workspace-ek. Betűtípus: Recursive (casual a címekhez, mono a kódhoz).

Színek a [Varnished Horizon](https://github.com/cucu0628/varnished-horizon) témából, a háttérképek
is onnan valók (`public/paintings/`, közkincs; lista: `PAINTINGS` a `src/data.js`-ben). A barban
lehet váltani köztük; az átmenet a Vellum Shell tus-shadere (`wallpaper-ink.frag`), WebGL-re
portolva a `src/inkTransition.js`-ben. A választást a böngésző megjegyzi.

## Fejlesztés

```bash
npm install
npm run dev      # helyi szerver
npm run build    # production build a dist/ mappába
npm run deploy   # build + feltöltés a gh-pages ágra
```

Új kiemelt projekt: tegyél egy képet a `public/shots/` mappába, és adj hozzá egy elemet az
`EXHIBITS` listához. A pillanatkép frissítése:

```bash
gh api "users/cucu0628/repos?per_page=100&sort=pushed" > src/repos.fallback.json
```

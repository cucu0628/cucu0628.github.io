# cucu0628.github.io

Asked portfóliója — React + Vite. Élesben: https://cucu0628.github.io

- **Projektek** – kézzel válogatott projektek (`src/data.js` → `EXHIBITS`), képek a `public/shots/` mappában.
- **Repók** – minden publikus repó élőben a GitHub API-ból. Ha az API nem válaszol
  (pl. rate limit), a `src/repos.fallback.json` pillanatképet mutatja.

Színek a [Varnished Horizon](https://github.com/cucu0628/varnished-horizon) témából,
a hero festményei is onnan valók (`public/paintings/`, közkincs; lista: `PAINTINGS` a `src/data.js`-ben).

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

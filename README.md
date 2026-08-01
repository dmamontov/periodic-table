# Periodic Table of Elements

An interactive periodic table built with Vue 3 + TypeScript: element cards packed with dozens of reference properties, and — the standout feature — a personal physical **Mamontov element collection** with sample photos, purity, isotopic composition, and gamma spectra recorded with a RadiaCode dosimeter.

## Features

- **Full periodic table** — all 118 elements, including the f-block (lanthanides/actinides), with a responsive layout for desktop and mobile
- **Element card** — 12+ dedicated sections: overview, physical and thermodynamic properties, atomic and electromagnetic characteristics, crystal lattice, reactivity, natural abundance, applications
- **Element collection** — sample state and container, purity, isotope, origin (direct source / decay product with chain), photos, an interactive gamma spectrum with the original XML available for download
- **Radioactivity** — radioactive elements flagged on the table, NFPA 704 and GHS pictogram cards, isotope and half-life data
- **Multilingual** — Russian, English, Chinese (instant switching, browser language auto-detection)
- **Dark/light theme** — manual or system-based
- **PWA** — installable on device, works offline (Workbox precache)

## Tech stack

- [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`) + [Vue Router 4](https://router.vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/), [Vite 8](https://vitejs.dev/)
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) (Workbox) — offline mode and auto-update
- Custom lightweight composables for i18n and theming (no external libraries like vue-i18n/Pinia)
- ESLint + typescript-eslint

## Quick start

Requires Node.js 22+ and [pnpm](https://pnpm.io/).

```bash
pnpm install
pnpm dev
```

The app will be available at `http://localhost:5173`.

## Scripts

| Command | Purpose |
|---|---|
| `pnpm dev` | Dev server with hot reload |
| `pnpm build` | Type check (`vue-tsc`) + production build |
| `pnpm preview` | Preview the production build locally |
| `pnpm typecheck` | Type check only |
| `pnpm lint` / `pnpm lint:fix` | Lint (ESLint) |
| `pnpm check` | `typecheck` + `lint` |

### Data updates

A separate pipeline of scripts (`scripts/*.mjs`) fetches and rebuilds reference data from external sources — run manually, not part of the regular build:

| Command | Purpose |
|---|---|
| `pnpm data:details` | Element properties → `src/data/details.json` |
| `pnpm data:details:optimize` | Optimize/minify `details.json` |
| `pnpm data:images` | Element photos → `src/assets/element-images/` |
| `pnpm data:spectra` | Element emission spectra → `src/assets/element-spectra/` |
| `pnpm data:grids` | Crystal lattice illustrations → `src/assets/grid-structures/` |
| `pnpm data:nfpa:apply` | NFPA ratings → `details.json` |
| `pnpm data:nfpa:validate` | Validate `scripts/data/nfpa-element-ratings.json` |
| `pnpm data:ghs` | GHS pictograms → `src/data/element-ghs.json` |
| `pnpm data:youtube` | Thoisoi video links → `src/data/thoisoi-youtube.json` |
| `pnpm data:spectrum:convert` | Convert a RadiaCode XML spectrum → JSON for the collection |

Some scripts call an external API and require a `VITE_PT_API_TOKEN` token in `.env.local` (see the comment in `scripts/fetch-element-details.mjs`).

## Project structure

```
src/
├── components/     # UI components (table, element card, filters, heatmap…)
├── composables/     # reusable logic (useElementDetail)
├── data/            # element data, reference tables, collection spectra
├── locales/         # translations (ru/en/zh) and localization dictionaries
├── router/          # routes (/, /element/:symbol)
├── theme/           # theme handling (light/dark/auto)
├── types/           # element data types
├── utils/           # formatting, heatmaps, isotopes, GHS/NFPA
└── views/           # app screens
scripts/             # offline data-update pipeline
```

## Docker

```bash
docker build -t periodic-table .
docker run -p 3000:3000 periodic-table
```

Multi-stage build: `node:22-alpine` builds the production bundle, the final image is `nginx:alpine` serving the static files (see `Dockerfile`, `nginx.conf`). See `docker-compose.yml` for a Compose example.

## Data & attribution

Element reference properties, GHS pictograms, and sample photos are aggregated from public sources (PubChem, Wikipedia, periodic-table.tech, and others) via the scripts in `scripts/`; NFPA 704 ratings and the collection's gamma spectra are the author's own measurements and verification. The data is intended for educational and personal-project use.

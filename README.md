**English** | [Русский](README.ru.md) | [中文](README.zh.md)

# Periodic Table of Elements

An interactive periodic table built with Vue 3 + TypeScript: element cards packed with dozens of reference properties, and — the standout feature — a personal physical **Mamontov element collection** with sample photos, purity, isotopic composition, and gamma spectra recorded with a RadiaCode dosimeter.

## Demo

Live site: **[periodic.mamontov.tech](https://periodic.mamontov.tech)**

<table>
<tr>
<td><a href="docs/screenshots/demo-en.jpg"><img src="docs/screenshots/demo-en.jpg" width="270" alt="Periodic table"></a></td>
<td><a href="docs/screenshots/demo-en-element.jpg"><img src="docs/screenshots/demo-en-element.jpg" width="270" alt="Element card"></a></td>
<td><a href="docs/screenshots/demo-en-collection.jpg"><img src="docs/screenshots/demo-en-collection.jpg" width="270" alt="Collection sidebar"></a></td>
</tr>
</table>

## Features

- **Full periodic table** — all 118 elements, including the f-block (lanthanides/actinides), with a responsive layout for desktop and mobile
- **Element card** — 12+ dedicated sections: overview, physical and thermodynamic properties, atomic and electromagnetic characteristics, crystal lattice, reactivity, natural abundance, applications
- **Element collection** — sample state and container, purity, isotope, origin (direct source / decay product with chain), photos, an interactive gamma spectrum with the original XML available for download
- **Radioactivity** — radioactive elements flagged on the table, NFPA 704 and GHS pictogram cards, isotope and half-life data
- **Multilingual** — Russian, English, Chinese (instant switching, browser language auto-detection)
- **Dark/light theme** — manual or system-based
- **PWA** — installable on device, works offline (Workbox precache)

<details>
<summary><strong>Full list of element card properties</strong> (click to expand)</summary>

**Overview** — Latin name, English name, year of discovery, discoverer, country of discovery, CAS number, color, electron shell

**Description** — free-text summary

**Applications** — free-text overview of practical uses

**Properties** — atomic number, atomic mass, density, melting point, boiling point, valence, period, group, block, position on the periodic table (mini map), emission spectrum (image)

**Atomic properties** — electron configuration, ion charge, ionization potential, atomic radius, covalent radius, Van der Waals radius, oxidation states

**Reactivity** — electronegativity, valence, electron affinity

**Thermodynamic properties** — state of matter, molar heat of fusion, specific heat capacity, thermal expansion, molar heat of vaporization

**Electromagnetic properties** — electrical conductivity, electrical type, magnetic type, volume/mass/molar magnetic susceptibility, resistivity, superconductivity temperature

**Crystal lattice** — lattice structure, lattice parameters, ratio, Debye temperature, space group, space group number, lattice structure image

**Additional information** — CID number, RTEC number, Brinell/Mohs/Vickers hardness, bulk modulus, Young's modulus, liquid density, molar volume, Poisson's ratio, shear modulus, speed of sound, refractive index, thermal conductivity

**Nuclear properties** — radioactivity, main isotopes, decay mode, half-life, lifetime, neutron cross section, RadiaCode isotope reference (for radioactive elements)

**NFPA 704** — flammability, health hazard, reactivity, special hazard

**GHS hazard pictograms**

**Abundance** — share by mass in the universe, the Sun, the ocean, the human body, Earth's crust, and meteorites

</details>

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

## Make it your own collection

Forked this to track your own elements? Everything you need to change lives in **one file**: [`src/data/myCollection.ts`](src/data/myCollection.ts). No need to touch `elements.json` or the locale files.

- `collectionName` / `siteTitle` / `siteUrl` — rename the collection and point it at your own domain.
- `myElements` — a `symbol → details` map. Add a key to mark an element as yours; `{}` alone is enough ("I have it, no details yet"). Fill in `sampleState`, `container`, `purity`, `isotope`, `sourceType`, `decayParent`, `spectrum` as you go — all optional.
- If the built-in `sampleState`/`container` vocabulary (in [`src/locales/collection.ts`](src/locales/collection.ts)) doesn't cover your sample, either add a new entry there, or skip it entirely and put ready-made text straight into an element's `description` field — see the radioactive elements in `myCollection.ts` for an example. `sourceType` is fixed to `'primary'` / `'secondary'`.
- Every text field accepts either a plain string (shown in all three UI languages) or `{ ru, en, zh }` if you want it translated.

Gamma spectra (the `spectrum`/`spectrumFilename` fields) are optional — only set them if you actually have measurement files to drop into `src/data/spectra/`.

## Scripts

| Command | Purpose |
|---|---|
| `pnpm dev` | Dev server with hot reload |
| `pnpm build` | Type check (`vue-tsc`) + production build |
| `pnpm preview` | Preview the production build locally |
| `pnpm typecheck` | Type check only |
| `pnpm lint` / `pnpm lint:fix` | Lint (ESLint) |
| `pnpm check` | `typecheck` + `lint` |

### Scripts

`scripts/` only holds two standalone tools, neither run automatically except the first:

| Command | Purpose |
|---|---|
| `pnpm build` | Also regenerates `public/sitemap.xml` from `src/data/elements.json` (via `scripts/build-sitemap.mjs`) before the type check and bundle |
| `pnpm data:spectrum:convert` | Convert a RadiaCode XML spectrum → JSON for the collection |

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
scripts/             # sitemap generation, RadiaCode spectrum conversion
```

## Docker

```bash
docker build -t periodic-table .
docker run -p 3000:3000 periodic-table
```

Multi-stage build: `node:22-alpine` builds the production bundle, the final image is `nginx:alpine` serving the static files (see `Dockerfile`, `nginx.conf`). See `docker-compose.yml` for a Compose example.

## Data & attribution

Element reference properties, GHS pictograms, sample photos, and NFPA 704 ratings were aggregated from public sources (PubChem, Wikipedia, and others); the collection's gamma spectra are the author's own measurements. The data is intended for educational and personal-project use.

## License

The code in this repository is licensed under the [MIT License](LICENSE). Third-party reference data and images (see [Data & attribution](#data--attribution)) may be subject to their original sources' own terms.

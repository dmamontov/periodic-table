import type { ElementCollection, WishlistEntry } from '../types/collection/collection';
import type { LocalizedLabel } from '../utils/localizedLabel';

/**
 * THIS IS THE MAIN FILE FOR YOUR OWN COLLECTION.
 * Forked the repo and want to track your own element collection?
 * Edit only this file — nothing else needs to change.
 *
 * 1. collectionName / siteTitle / siteUrl — your site's name and address.
 * 2. myElements — which elements you have and what's known about them.
 *    The key is the chemical symbol. An empty object `{}` already means
 *    "I have it"; the rest can be filled in gradually or left out entirely.
 *    Each entry is grouped by ElementCollection:
 *      - physical — sampleState/container/purity/description (any physical sample)
 *      - radioactive — isotope/sourceType/decayParent (omit entirely if not radioactive)
 *      - spectrum — id/filename/annotations (omit entirely if you have no measurement)
 * 3. If the standard sampleState/container values aren't enough to describe
 *    a sample — either add your own "code: label" pair to
 *    src/locales/collection.ts, or just put the ready-made text
 *    straight into physical.description (see the radioactive elements below
 *    for an example) — that's simpler and doesn't require touching the
 *    dictionaries at all. sourceType only ever takes 'primary' or 'secondary'
 *    (see ElementCollectionRadioactive).
 */

/** Collection name — used in the panel, the element detail card, and the category filter. */
export const collectionName: LocalizedLabel = {
  ru: 'Коллекция Мамонтова',
  en: 'Mamontov Collection',
  zh: '马蒙托夫收藏',
};

/** Site title (browser tab, SEO). */
export const siteTitle: LocalizedLabel = {
  ru: 'Мамонтов — коллекция элементов',
  en: 'Mamontov — Element Collection',
  zh: '马蒙托夫 — 元素收藏',
};

/** Site address — used for canonical/OpenGraph links. */
export const siteUrl = 'https://periodic.mamontov.tech';

export const myElements: Record<string, ElementCollection> = {
  H: {
    physical: { sampleState: 'gas', container: 'dischargeAmpoule', purity: { value: 999 }, acquiredDate: '2021-07-31' },
  },
  He: {
    physical: {
      sampleState: 'gas',
      container: 'dischargeAmpoule',
      purity: { value: 9999 },
      acquiredDate: '2021-07-31',
    },
  },
  Li: {
    physical: {
      sampleState: 'metal',
      container: 'ampoule',
      purity: { value: 999 },
      weight: { mg: 60, approx: true },
      acquiredDate: '2026-08-24',
    },
    history: [
      {
        physical: {
          sampleState: 'metal',
          container: 'ampoule',
          purity: { value: 999 },
          weight: { mg: 60, approx: true },
          acquiredDate: '2022-02-14',
        },
        retained: true,
        reason: 'betterSample',
      },
    ],
  },
  Be: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 999 },
      weight: { mg: 1850, approx: true },
      acquiredDate: '2024-08-26',
    },
  },
  B: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 999 },
      weight: { mg: 2340, approx: true },
      acquiredDate: '2024-10-09',
    },
    history: [
      {
        physical: {
          sampleState: 'powder',
          container: 'acrylicBox',
          purity: { value: 997 },
          weight: { mg: 1000, approx: true },
          acquiredDate: '2022-02-21',
        },
        retained: true,
        reason: 'betterSample',
      },
      {
        physical: {
          sampleState: 'powder',
          container: 'ampoule',
          purity: { value: 999 },
          weight: { mg: 100, approx: true },
          acquiredDate: '2024-08-26',
        },
        retained: true,
        reason: 'betterSample',
      },
    ],
  },
  C: {
    physical: {
      sampleState: 'cubicIngot',
      allotrope: { ru: 'Графит', en: 'Graphite', zh: '石墨' },
      purity: { value: 999 },
      weight: { mg: 2270, approx: true },
      acquiredDate: '2021-05-01',
    },
  },
  N: {
    physical: { sampleState: 'gas', container: 'dischargeAmpoule', purity: { value: 999 }, acquiredDate: '2021-07-31' },
  },
  O: {
    physical: { sampleState: 'gas', container: 'dischargeAmpoule', purity: { value: 995 }, acquiredDate: '2021-07-31' },
  },
  F: {
    physical: {
      description: { ru: 'Куб фторопласта (C₂F₄)', en: 'PTFE (C₂F₄) cube', zh: '聚四氟乙烯（C₂F₄）立方体' },
      purity: { value: 7598 },
      acquiredDate: '2024-09-07',
    },
    history: [
      {
        physical: {
          description: { ru: 'Смесь газов F₂/N₂', en: 'F₂/N₂ gas mixture', zh: 'F₂/N₂ 混合气体' },
          container: 'ampoule',
          purity: { value: 50 },
          acquiredDate: '2022-02-14',
        },
        retained: true,
        reason: 'betterSample',
      },
    ],
  },
  Ne: {
    physical: {
      sampleState: 'gas',
      container: 'dischargeAmpoule',
      purity: { value: 99994 },
      acquiredDate: '2021-07-31',
    },
  },
  Na: {
    physical: {
      sampleState: 'metal',
      container: 'ampoule',
      purity: { value: 9999 },
      weight: { mg: 50, approx: true },
      acquiredDate: '2024-09-23',
    },
  },
  Mg: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 9999 },
      weight: { mg: 1740, approx: true },
      acquiredDate: '2021-05-01',
    },
  },
  Al: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 9999 },
      weight: { mg: 2700, approx: true },
      acquiredDate: '2024-09-16',
    },
    history: [
      {
        physical: {
          sampleState: 'cubicIngot',
          purity: { value: 9999 },
          weight: { mg: 2700, approx: true },
          acquiredDate: '2021-05-17',
        },
        retained: false,
        reason: 'betterSample',
      },
    ],
  },
  Si: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 999999 },
      weight: { mg: 2330, approx: true },
      acquiredDate: '2021-11-13',
    },
  },
  P: {
    physical: {
      sampleState: 'pressedPowder',
      allotrope: { ru: 'Красный фосфор', en: 'Red phosphorus', zh: '红磷' },
      container: 'acrylicBox',
      purity: { value: 987 },
      weight: { mg: 2340, approx: true },
      acquiredDate: '2024-09-03',
    },
    history: [
      {
        physical: {
          sampleState: 'pressedPowder',
          allotrope: { ru: 'Красный фосфор', en: 'Red phosphorus', zh: '红磷' },
          container: 'acrylicBox',
          purity: { value: 987 },
          weight: { mg: 2340, approx: true },
          acquiredDate: '2022-02-21',
        },
        retained: false,
        reason: 'degradedStorage',
      },
    ],
  },
  S: {
    physical: {
      sampleState: 'pressedPowder',
      allotrope: { ru: 'Ромбическая сера', en: 'Rhombic sulfur', zh: '斜方硫' },
      container: 'acrylicBox',
      purity: { value: 999 },
      weight: { mg: 2070, approx: true },
      acquiredDate: '2024-08-26',
    },
    history: [
      {
        physical: {
          sampleState: 'powder',
          container: 'acrylicBox',
          purity: { value: 999 },
          weight: { mg: 2000, approx: true },
          acquiredDate: '2022-02-21',
        },
        retained: true,
        reason: 'betterSample',
      },
    ],
  },
  Cl: {
    physical: { sampleState: 'liquefiedGas', container: 'ampoule', purity: { value: 99 }, acquiredDate: '2024-09-03' },
    history: [
      {
        physical: { sampleState: 'gas', container: 'ampoule', purity: { value: 99 }, acquiredDate: '2022-02-14' },
        retained: true,
        reason: 'betterSample',
      },
    ],
  },
  Ar: {
    physical: {
      sampleState: 'gas',
      container: 'dischargeAmpoule',
      purity: { value: 99998 },
      acquiredDate: '2021-07-31',
    },
  },
  K: {
    physical: {
      sampleState: 'metal',
      container: 'ampoule',
      purity: { value: 9999 },
      weight: { mg: 50, approx: true },
      acquiredDate: '2026-05-23',
    },
    history: [
      {
        physical: {
          sampleState: 'metal',
          container: 'ampoule',
          purity: { value: 9999 },
          weight: { mg: 50, approx: true },
          acquiredDate: '2024-09-23',
        },
        retained: true,
        reason: 'betterSample',
      },
    ],
  },
  Ca: {
    physical: {
      sampleState: 'granules',
      container: 'ampoule',
      purity: { value: 999 },
      weight: { mg: 100, approx: true },
      acquiredDate: '2026-05-21',
    },
  },
  Sc: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 9995 },
      weight: { mg: 2990, approx: true },
      acquiredDate: '2024-09-16',
    },
  },
  Ti: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 995 },
      weight: { mg: 4510, approx: true },
      acquiredDate: '2024-09-07',
    },
    history: [
      {
        physical: {
          sampleState: 'cubicIngot',
          purity: { value: 995 },
          weight: { mg: 4510, approx: true },
          acquiredDate: '2021-07-26',
        },
        retained: false,
        reason: 'betterSample',
      },
    ],
  },
  V: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 999 },
      weight: { mg: 6110, approx: true },
      acquiredDate: '2022-01-02',
    },
  },
  Cr: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 997 },
      weight: { mg: 7150, approx: true },
      acquiredDate: '2021-07-26',
    },
  },
  Mn: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 997 },
      weight: { mg: 7210, approx: true },
      acquiredDate: '2024-09-07',
    },
    history: [
      {
        physical: {
          sampleState: 'metal',
          container: 'acrylicBox',
          purity: { value: 998 },
          weight: { mg: 5000 },
          acquiredDate: '2022-02-21',
        },
        retained: true,
        reason: 'betterSample',
      },
    ],
  },
  Fe: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 9999 },
      weight: { mg: 7870, approx: true },
      acquiredDate: '2024-09-26',
    },
    history: [
      {
        physical: {
          sampleState: 'cubicIngot',
          purity: { value: 9999 },
          weight: { mg: 7870, approx: true },
          acquiredDate: '2021-05-01',
        },
        retained: false,
        reason: 'degradedStorage',
      },
    ],
  },
  Co: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 9996 },
      weight: { mg: 8900, approx: true },
      acquiredDate: '2021-05-05',
    },
  },
  Ni: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 996 },
      weight: { mg: 8910, approx: true },
      acquiredDate: '2021-05-09',
    },
  },
  Cu: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 9995 },
      weight: { mg: 8960, approx: true },
      acquiredDate: '2024-09-07',
    },
    history: [
      {
        physical: {
          sampleState: 'cubicIngot',
          purity: { value: 9995 },
          weight: { mg: 8960, approx: true },
          acquiredDate: '2021-05-09',
        },
        retained: false,
        reason: 'degradedStorage',
      },
    ],
  },
  Zn: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 9999 },
      weight: { mg: 7130, approx: true },
      acquiredDate: '2024-09-16',
    },
    history: [
      {
        physical: {
          sampleState: 'cubicIngot',
          purity: { value: 9999 },
          weight: { mg: 7130, approx: true },
          acquiredDate: '2021-05-17',
        },
        retained: false,
        reason: 'betterSample',
      },
    ],
  },
  Ga: {
    physical: {
      sampleState: 'metal',
      container: 'acrylicBox',
      purity: { value: 9999 },
      weight: { mg: 5910, approx: true },
      acquiredDate: '2022-01-09',
    },
  },
  Ge: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 99999 },
      weight: { mg: 5320, approx: true },
      acquiredDate: '2026-05-21',
    },
  },
  As: {
    physical: {
      sampleState: 'powder',
      container: 'ampoule',
      purity: { value: 999 },
      weight: { mg: 100, approx: true },
      acquiredDate: '2026-06-22',
    },
    history: [
      {
        physical: {
          sampleState: 'powder',
          container: 'ampoule',
          purity: { value: 999 },
          weight: { mg: 100, approx: true },
          acquiredDate: '2024-08-26',
        },
        retained: false,
        reason: 'degradedStorage',
      },
    ],
  },
  Se: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 999, approx: true },
      weight: { mg: 4810, approx: true },
      acquiredDate: '2024-09-03',
    },
  },
  Br: {
    physical: {
      sampleState: 'liquid',
      container: 'ampoule',
      purity: { value: 99 },
      weight: { mg: 250, approx: true },
      acquiredDate: '2024-09-23',
    },
    history: [
      {
        physical: {
          sampleState: 'liquid',
          container: 'ampoule',
          purity: { value: 99 },
          weight: { mg: 250, approx: true },
          acquiredDate: '2022-02-01',
        },
        retained: true,
        reason: 'betterSample',
      },
    ],
  },
  Kr: {
    physical: {
      sampleState: 'gas',
      container: 'dischargeAmpoule',
      purity: { value: 9999 },
      acquiredDate: '2021-07-31',
    },
  },
  Rb: {
    physical: {
      sampleState: 'metal',
      container: 'ampoule',
      purity: { value: 9999 },
      weight: { mg: 200, approx: true },
      acquiredDate: '2026-08-25',
    },
    history: [
      {
        physical: {
          sampleState: 'metal',
          container: 'ampoule',
          purity: { value: 9999 },
          weight: { mg: 2000, approx: true },
          acquiredDate: '2024-09-23',
        },
        retained: true,
        reason: 'wrongSize',
      },
      {
        physical: {
          sampleState: 'metal',
          container: 'ampoule',
          purity: { value: 9999 },
          weight: { mg: 120, approx: true },
          acquiredDate: '2026-06-16',
        },
        retained: true,
        reason: 'betterSample',
      },
    ],
  },
  Sr: {
    physical: {
      sampleState: 'metal',
      container: 'ampoule',
      purity: { value: 999 },
      weight: { mg: 200, approx: true },
      acquiredDate: '2026-06-22',
    },
  },
  Y: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 999 },
      weight: { mg: 4470, approx: true },
      acquiredDate: '2022-01-09',
    },
  },
  Zr: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 992 },
      weight: { mg: 6520, approx: true },
      acquiredDate: '2021-07-28',
    },
  },
  Nb: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 9995 },
      weight: { mg: 8570, approx: true },
      acquiredDate: '2021-09-01',
    },
  },
  Mo: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 9995 },
      weight: { mg: 10280, approx: true },
      acquiredDate: '2022-01-09',
    },
  },
  Ru: {
    physical: {
      sampleState: 'bead',
      container: 'acrylicBox',
      purity: { value: 9998 },
      weight: { mg: 500, approx: true },
      acquiredDate: '2026-06-28',
    },
    history: [
      {
        physical: {
          sampleState: 'powder',
          container: 'substrate',
          purity: { value: 999 },
          weight: { mg: 10, approx: true },
          acquiredDate: '2026-05-23',
        },
        retained: true,
        reason: 'betterSample',
      },
    ],
  },
  Rh: {
    physical: {
      sampleState: 'bead',
      container: 'acrylicBox',
      purity: { value: 9995 },
      weight: { mg: 300, approx: true },
      acquiredDate: '2026-07-19',
    },
    history: [
      {
        physical: {
          sampleState: 'powder',
          container: 'substrate',
          purity: { value: 9995 },
          weight: { mg: 10, approx: true },
          acquiredDate: '2026-05-23',
        },
        retained: true,
        reason: 'betterSample',
      },
    ],
  },
  Pd: {
    physical: {
      sampleState: 'plate',
      purity: { value: 9995 },
      weight: { mg: 130, approx: true },
      acquiredDate: '2026-06-14',
    },
    history: [
      {
        physical: {
          sampleState: 'foil',
          container: 'substrate',
          purity: { value: 999 },
          weight: { mg: 10, approx: true },
          acquiredDate: '2026-05-23',
        },
        retained: true,
        reason: 'betterSample',
      },
    ],
  },
  Ag: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 9999 },
      weight: { mg: 10490, approx: true },
      acquiredDate: '2021-09-01',
    },
  },
  Cd: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 99995 },
      weight: { mg: 8650, approx: true },
      acquiredDate: '2024-09-03',
    },
  },
  In: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 99995 },
      weight: { mg: 7310, approx: true },
      acquiredDate: '2022-02-06',
    },
  },
  Sn: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 9999 },
      weight: { mg: 7290, approx: true },
      acquiredDate: '2021-05-17',
    },
  },
  Sb: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 999 },
      weight: { mg: 6700, approx: true },
      acquiredDate: '2021-05-09',
    },
  },
  Te: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 9999 },
      weight: { mg: 6240, approx: true },
      acquiredDate: '2021-07-28',
    },
  },
  I: {
    physical: {
      sampleState: 'granules',
      container: 'ampoule',
      purity: { value: 999 },
      weight: { mg: 200, approx: true },
      acquiredDate: '2022-02-01',
    },
  },
  Xe: {
    physical: {
      sampleState: 'gas',
      container: 'dischargeAmpoule',
      purity: { value: 9999 },
      acquiredDate: '2021-07-31',
    },
  },
  Cs: {
    physical: {
      sampleState: 'metal',
      container: 'ampoule',
      purity: { value: 9999 },
      weight: { mg: 50, approx: true },
      acquiredDate: '2026-05-21',
    },
    history: [
      {
        physical: {
          sampleState: 'metal',
          container: 'ampoule',
          purity: { value: 9999 },
          weight: { mg: 2000, approx: true },
          acquiredDate: '2024-09-23',
        },
        retained: true,
        reason: 'wrongSize',
      },
    ],
  },
  Ba: {
    physical: {
      sampleState: 'metal',
      container: 'ampoule',
      purity: { value: 999 },
      weight: { mg: 100, approx: true },
      acquiredDate: '2024-08-26',
    },
  },
  La: {
    physical: {
      sampleState: 'metal',
      container: 'ampoule',
      purity: { value: 999 },
      weight: { mg: 500, approx: true },
      acquiredDate: '2026-08-24',
    },
    history: [
      {
        physical: {
          sampleState: 'metal',
          container: 'ampoule',
          purity: { value: 999 },
          weight: { mg: 500, approx: true },
          acquiredDate: '2026-05-21',
        },
        retained: true,
        reason: 'betterSample',
      },
    ],
  },
  Ce: {
    physical: {
      sampleState: 'metal',
      container: 'ampoule',
      purity: { value: 999 },
      weight: { mg: 500, approx: true },
      acquiredDate: '2026-08-24',
    },
    history: [
      {
        physical: {
          sampleState: 'metal',
          container: 'ampoule',
          purity: { value: 999 },
          weight: { mg: 500, approx: true },
          acquiredDate: '2026-05-21',
        },
        retained: true,
        reason: 'betterSample',
      },
    ],
  },
  Pr: {
    physical: {
      sampleState: 'metal',
      container: 'ampoule',
      purity: { value: 999 },
      weight: { mg: 500, approx: true },
      acquiredDate: '2026-08-24',
    },
    history: [
      {
        physical: {
          sampleState: 'metal',
          container: 'ampoule',
          purity: { value: 999 },
          weight: { mg: 500, approx: true },
          acquiredDate: '2026-05-21',
        },
        retained: true,
        reason: 'betterSample',
      },
    ],
  },
  Nd: {
    physical: {
      sampleState: 'metal',
      container: 'ampoule',
      purity: { value: 999 },
      weight: { mg: 500, approx: true },
      acquiredDate: '2026-08-24',
    },
    history: [
      {
        physical: {
          sampleState: 'metal',
          container: 'ampoule',
          purity: { value: 999 },
          weight: { mg: 500, approx: true },
          acquiredDate: '2026-06-05',
        },
        retained: true,
        reason: 'betterSample',
      },
    ],
  },
  Sm: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 9995 },
      weight: { mg: 7520, approx: true },
      acquiredDate: '2022-01-09',
    },
  },
  Eu: {
    physical: {
      sampleState: 'metal',
      container: 'ampoule',
      purity: { value: 9999 },
      weight: { mg: 200, approx: true },
      acquiredDate: '2026-05-21',
    },
  },
  Gd: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 9999 },
      weight: { mg: 7900, approx: true },
      acquiredDate: '2022-01-09',
    },
  },
  Tb: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 9995 },
      weight: { mg: 8230, approx: true },
      acquiredDate: '2024-09-26',
    },
  },
  Dy: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 999 },
      weight: { mg: 8540, approx: true },
      acquiredDate: '2024-09-16',
    },
  },
  Ho: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 999 },
      weight: { mg: 8790, approx: true },
      acquiredDate: '2022-02-06',
    },
  },
  Er: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 999 },
      weight: { mg: 9070, approx: true },
      acquiredDate: '2022-02-06',
    },
  },
  Tm: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 9999 },
      weight: { mg: 9320, approx: true },
      acquiredDate: '2024-09-16',
    },
  },
  Yb: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 9999 },
      weight: { mg: 6900, approx: true },
      acquiredDate: '2024-09-16',
    },
  },
  Lu: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 9995 },
      weight: { mg: 9840, approx: true },
      acquiredDate: '2024-09-16',
    },
  },
  Hf: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 999 },
      weight: { mg: 13310, approx: true },
      acquiredDate: '2024-09-03',
    },
  },
  Ta: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 9995 },
      weight: { mg: 16690, approx: true },
      acquiredDate: '2022-10-07',
    },
  },
  W: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 9995 },
      weight: { mg: 19250, approx: true },
      acquiredDate: '2021-09-01',
    },
  },
  Re: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 999 },
      weight: { mg: 21020, approx: true },
      acquiredDate: '2024-09-03',
    },
  },
  Os: {
    physical: {
      sampleState: 'bead',
      container: 'acrylicBox',
      purity: { value: 9995 },
      weight: { mg: 1000, approx: true },
      acquiredDate: '2026-06-28',
    },
    history: [
      {
        physical: {
          sampleState: 'powder',
          container: 'substrate',
          purity: { value: 999 },
          weight: { mg: 10, approx: true },
          acquiredDate: '2026-05-23',
        },
        retained: true,
        reason: 'betterSample',
      },
    ],
  },
  Ir: {
    physical: {
      sampleState: 'powder',
      container: 'substrate',
      purity: { value: 9998 },
      weight: { mg: 10, approx: true },
      acquiredDate: '2026-05-23',
    },
  },
  Pt: {
    physical: {
      sampleState: 'plate',
      purity: { value: 9995 },
      weight: { mg: 220, approx: true },
      acquiredDate: '2026-06-04',
    },
    history: [
      {
        physical: {
          sampleState: 'foil',
          container: 'substrate',
          purity: { value: 999 },
          weight: { mg: 20, approx: true },
          acquiredDate: '2026-05-23',
        },
        retained: true,
        reason: 'betterSample',
      },
    ],
  },
  Au: {
    physical: {
      sampleState: 'plate',
      purity: { value: 9999 },
      weight: { mg: 190, approx: true },
      acquiredDate: '2026-06-19',
    },
    history: [
      {
        physical: {
          sampleState: 'foil',
          container: 'substrate',
          purity: { value: 999 },
          weight: { mg: 20, approx: true },
          acquiredDate: '2026-05-23',
        },
        retained: true,
        reason: 'betterSample',
      },
    ],
  },
  Hg: {
    physical: {
      sampleState: 'metal',
      container: 'ampoule',
      purity: { value: 9999995 },
      weight: { mg: 1000, approx: true },
      acquiredDate: '2022-02-14',
    },
  },
  Tl: {
    physical: {
      sampleState: 'metal',
      container: 'ampoule',
      purity: { value: 999, approx: true },
      acquiredDate: '2026-05-25',
    },
  },
  Pb: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 9999 },
      weight: { mg: 11340, approx: true },
      acquiredDate: '2021-05-13',
    },
  },
  Bi: {
    physical: {
      sampleState: 'cubicIngot',
      purity: { value: 9999 },
      weight: { mg: 9780, approx: true },
      acquiredDate: '2021-05-13',
    },
  },
  Po: {
    physical: {
      description: {
        ru: 'Источник из антистатической щётки Staticmaster',
        en: 'Source from a Staticmaster antistatic brush',
        zh: 'Staticmaster 防静电刷辐射源',
      },
      container: 'acrylicCoinCapsule',
      acquiredDate: '2026-06-27',
    },
    radioactive: {
      isotope: '210',
      sourceType: 'secondary',
      decayParent: [
        { symbol: 'Pb', isotope: '210' },
        { symbol: 'Bi', isotope: '210' },
      ],
    },
    spectrum: {
      id: 'po-84-staticmaster',
      filename: { ru: 'Po-210 (Staticmaster).xml', en: 'Po-210 (Staticmaster).xml', zh: 'Po-210 (Staticmaster).xml' },
      leadShielded: true,
      backgroundSpectrumId: 'bg-lead-shield',
      annotations: [
        { energy: 47.4, label: 'Pb-210' },
        { energy: 78.3, label: 'Pb Kα/Kβ' },
        { energy: 183.7, label: 'Ra-226' },
        { energy: 288.3, label: 'Pb-214' },
        { energy: 342.4, label: 'Pb-214' },
        { energy: 596.1, label: 'Bi-214' },
      ],
      note: {
        ru: 'Po-210 почти не даёт гамма-линий; видна собственная линия его предшественника Pb-210 (47 кэВ).',
        en: "Po-210 emits almost no gammas of its own; its precursor Pb-210's own line (47 keV) is visible.",
        zh: 'Po-210几乎不发出伽马射线；可见其前体Pb-210的自身特征峰（47 keV）。',
      },
    },
  },
  Rn: {
    physical: {
      description: { ru: 'Светосостав постоянного действия', en: 'Self-luminous compound', zh: '夜光涂料' },
      container: 'ampoule',
      acquiredDate: '2026-06-02',
    },
    radioactive: {
      isotope: '222',
      sourceType: 'secondary',
      decayParent: [{ symbol: 'Ra', isotope: '226' }],
    },
    spectrum: {
      id: 'rn-86-spd',
      filename: { ru: 'Rn-222 (СПД).xml', en: 'Rn-222 (SPD).xml', zh: 'Rn-222 (SPD).xml' },
      leadShielded: true,
      backgroundSpectrumId: 'bg-lead-shield',
      annotations: [
        { energy: 78.3, label: 'Pb Kα/Kβ' },
        { energy: 181.3, label: 'Ra-226' },
        { energy: 237, label: 'Pb-214' },
        { energy: 290.8, label: 'Pb-214' },
        { energy: 342.4, label: 'Pb-214' },
        { energy: 593.5, label: 'Bi-214' },
      ],
      note: {
        ru: 'Радон гамма-неактивен; видна цепочка его продуктов распада.',
        en: 'Radon itself emits no useful gammas; its decay-product chain is visible.',
        zh: '氡本身无有效伽马射线；可见其衰变产物链。',
      },
    },
  },
  Ra: {
    physical: {
      description: {
        ru: 'Стрелки часов со светосоставом постоянного действия',
        en: 'Clock hands with self-luminous paint',
        zh: '带夜光涂料的钟表指针',
      },
      container: 'ampoule',
      acquiredDate: '2026-06-02',
    },
    radioactive: {
      isotope: '226',
      sourceType: 'primary',
    },
    spectrum: {
      id: 'ra-88-spd',
      filename: { ru: 'Ra-226 (СПД).xml', en: 'Ra-226 (SPD).xml', zh: 'Ra-226 (SPD).xml' },
      leadShielded: true,
      backgroundSpectrumId: 'bg-lead-shield',
      annotations: [
        { energy: 78.3, label: 'Pb Kα/Kβ' },
        { energy: 181.3, label: 'Ra-226' },
        { energy: 237, label: 'Pb-214' },
        { energy: 288.3, label: 'Pb-214' },
        { energy: 342.4, label: 'Pb-214' },
        { energy: 593.5, label: 'Bi-214' },
      ],
      note: {
        ru: 'Собственная линия Ra-226 (184 кэВ) и вся цепочка распада.',
        en: "Ra-226's own line (184 keV) plus the full decay chain.",
        zh: '可见Ra-226自身特征峰（184 keV）及完整衰变链。',
      },
    },
  },
  Th: {
    physical: {
      description: { ru: 'Торированные электроды WT-20', en: 'WT-20 thoriated electrodes', zh: 'WT-20 钍钨电极' },
      container: 'ampoule',
      purity: { value: 2, approx: true },
      acquiredDate: '2026-06-03',
    },
    history: [
      {
        physical: {
          description: { ru: 'Кулон скалярной энергии', en: 'Scalar energy pendant', zh: '量子能量吊坠' },
          acquiredDate: '2026-05-21',
        },
        radioactive: {
          isotope: '232',
          sourceType: 'primary',
        },
        spectrum: {
          id: 'th-90-pendant',
          filename: { ru: 'Th-232 (Медальон).xml', en: 'Th-232 (Pendant).xml', zh: 'Th-232 (吊坠).xml' },
          leadShielded: true,
          backgroundSpectrumId: 'bg-lead-shield',
          annotations: [
            { energy: 78.3, label: 'Pb Kα/Kβ' },
            { energy: 232.2, label: 'Pb-212' },
            { energy: 327.6, label: 'Ac-228' },
            { energy: 568, label: 'Tl-208' },
          ],
          note: {
            ru: 'Видны Pb-212 (238,6 кэВ) и Ac-228 (328 кэВ) — реальные продукты цепочки распада Th-232.',
            en: 'Pb-212 (238.6 keV) and Ac-228 (328 keV) are visible — real Th-232 decay-chain products.',
            zh: '可见Pb-212（238.6 keV）和Ac-228（328 keV）——真实的Th-232衰变链产物。',
          },
        },
        retained: true,
        reason: 'betterSample',
      },
    ],
    radioactive: {
      isotope: '232',
      sourceType: 'primary',
    },
    spectrum: {
      id: 'th-90-wt20',
      filename: { ru: 'Th-232 (WT-20).xml', en: 'Th-232 (WT-20).xml', zh: 'Th-232 (WT-20).xml' },
      leadShielded: true,
      backgroundSpectrumId: 'bg-lead-shield',
      annotations: [
        { energy: 64, label: 'W Kα/Kβ' },
        { energy: 232.2, label: 'Pb-212' },
        { energy: 327.6, label: 'Ac-228' },
        { energy: 568, label: 'Tl-208' },
      ],
      note: {
        ru: 'Видны Pb-212 (238,6 кэВ) и Ac-228 (328 кэВ) — реальные продукты цепочки распада Th-232.',
        en: 'Pb-212 (238.6 keV) and Ac-228 (328 keV) are visible — real Th-232 decay-chain products.',
        zh: '可见Pb-212（238.6 keV）和Ac-228（328 keV）——真实的Th-232衰变链产物。',
      },
    },
  },
  U: {
    physical: {
      description: {
        ru: 'Бисер из урансодержащего стекла',
        en: 'Beads from uranium-containing glass',
        zh: '含铀玻璃珠',
      },
      container: 'ampoule',
      purity: { value: 2, approx: true },
      acquiredDate: '2021-11-18',
    },
    radioactive: {
      isotope: '238',
      sourceType: 'primary',
    },
    spectrum: {
      id: 'u-92-glass',
      filename: {
        ru: 'U-238 (Бисер из ураносодержащего стекла).xml',
        en: 'U-238 (Uranium glass beads).xml',
        zh: 'U-238（含铀玻璃珠）.xml',
      },
      leadShielded: true,
      backgroundSpectrumId: 'bg-lead-shield',
      annotations: [
        { energy: 66.4, label: 'Th-234' },
        { energy: 92.6, label: 'Th-234' },
        { energy: 181.3, label: 'U-235' },
      ],
      note: {
        ru: 'Дублет Th-234 и линия U-235 — надёжное подтверждение природного урана.',
        en: "The Th-234 doublet plus U-235's own line reliably confirm natural uranium.",
        zh: 'Th-234双峰及U-235自身特征峰，可靠确认天然铀。',
      },
    },
  },
  Np: {
    physical: {
      description: {
        ru: 'Источник из дымового детектора HIS-07',
        en: 'Source from HIS-07 smoke detector',
        zh: 'HIS-07 烟雾探测器辐射源',
      },
      container: 'acrylicCoinCapsule',
      acquiredDate: '2026-06-27',
    },
    radioactive: {
      isotope: '237',
      sourceType: 'secondary',
      decayParent: [{ symbol: 'Am', isotope: '241' }],
    },
    spectrum: {
      id: 'np-93-his07',
      filename: { ru: 'Np-237 (HIS-07).xml', en: 'Np-237 (HIS-07).xml', zh: 'Np-237 (HIS-07).xml' },
      leadShielded: true,
      backgroundSpectrumId: 'bg-lead-shield',
      annotations: [
        { energy: 19.1, label: 'Np Lα (Am-241)' },
        { energy: 61.7, label: 'Am-241' },
      ],
      note: {
        ru: 'Видна только линия Am-241 (60 кэВ) — Np-237 нарастает из него, но из-за огромного периода полураспада его активность ничтожна и в спектре не проявляется.',
        en: "Only Am-241's line (60 keV) is visible — Np-237 grows in from it, but its huge half-life keeps its activity negligible, so it never shows up in the spectrum.",
        zh: '只能看到Am-241的谱线（60 keV）——Np-237由其衰变而来，但因半衰期极长，活度可忽略不计，谱图中不会显现。',
      },
    },
  },
  Pu: {
    physical: {
      description: {
        ru: 'Источник из дымового извещателя РИД-6М',
        en: 'Source from RID-6M smoke detector',
        zh: 'RID-6M 烟雾探测器辐射源',
      },
      container: 'acrylicBox',
      acquiredDate: '2026-07-11',
    },
    radioactive: {
      isotope: '239',
      sourceType: 'primary',
    },
    spectrum: {
      id: 'pu-94-rid6m',
      filename: { ru: 'Pu-239 (РИД-6М).xml', en: 'Pu-239 (RID-6M).xml', zh: 'Pu-239 (RID-6M).xml' },
      leadShielded: true,
      backgroundSpectrumId: 'bg-lead-shield',
      annotations: [
        { energy: 16.7, label: 'U Lα (Pu-239)' },
        { energy: 61.7, label: 'Am-241' },
      ],
      note: {
        ru: 'Доминирует Am-241 — реакторный Pu-239 содержит примесь Pu-241, которая за десятилетия распадается в Am-241 и забивает слабый сигнал самого Pu-239.',
        en: "Am-241 dominates — reactor-grade Pu-239 contains a Pu-241 impurity that decays into Am-241 over decades, swamping Pu-239's own weak signal.",
        zh: '谱图由Am-241主导——反应堆级Pu-239含有Pu-241杂质，数十年间衰变为Am-241，掩盖了Pu-239本身微弱的信号。',
      },
    },
  },
  Am: {
    physical: {
      description: {
        ru: 'Источник из дымового детектора HIS-07',
        en: 'Source from HIS-07 smoke detector',
        zh: 'HIS-07 烟雾探测器辐射源',
      },
      container: 'acrylicCoinCapsule',
      acquiredDate: '2026-06-06',
    },
    radioactive: {
      isotope: '241',
      sourceType: 'primary',
    },
    spectrum: {
      id: 'am-95-his07',
      filename: { ru: 'Am-241 (HIS-07).xml', en: 'Am-241 (HIS-07).xml', zh: 'Am-241 (HIS-07).xml' },
      leadShielded: true,
      backgroundSpectrumId: 'bg-lead-shield',
      annotations: [
        { energy: 19.1, label: 'Np Lα (Am-241)' },
        { energy: 61.7, label: 'Am-241' },
      ],
      note: {
        ru: 'Собственная линия Am-241 (60 кэВ) — однозначно.',
        en: "Am-241's own line (60 keV) — unambiguous.",
        zh: 'Am-241自身特征峰（60 keV）——明确无误。',
      },
    },
  },
};

/**
 * Elements you don't have yet, or already have but in a meaningfully worse state —
 * keyed by symbol, one entry each. Each WishlistEntry:
 *   - isotope — mass number(s) as sold, e.g. "227" or "242/243/244" for a mixed
 *     sample; leave '' for a stable element sold without isotope enrichment.
 *   - links — where to get it; an array, since one element may end up with more
 *     than one seller over time. Each link is `{ label, url }`.
 *   - decayParent — only set this if the seller's own listing describes a parent
 *     isotope physically co-located in the same product, decaying into the sold
 *     isotope in situ right now — not just "this is how it was manufactured."
 *     Same shape as ElementCollectionDecayParent, most distant ancestor first.
 *   - upgrade — true if this entry replaces an existing myElements sample rather
 *     than adding a brand-new element.
 */
export const wishlist: Record<string, WishlistEntry> = {
  Pm: {
    isotope: '147',
    links: [{ label: 'Luciteria', url: 'https://luciteria.com/products/promethium-lucite-cube-pm2x2' }],
  },
  Tc: {
    isotope: '99',
    links: [
      {
        label: 'Luciteria',
        url: 'https://luciteria.com/collections/lucite/products/technetium-50mm-lucite-cube-tc2x2',
      },
    ],
  },
  Ac: {
    isotope: '227',
    links: [{ label: 'Luciteria', url: 'https://luciteria.com/products/actinium-50mm-lucite-cube-ac2x2' }],
  },
  Pa: {
    isotope: '231',
    links: [{ label: 'Luciteria', url: 'https://luciteria.com/products/protactinium-50mm-lucite-cube' }],
  },
  Fr: {
    isotope: '223',
    links: [{ label: 'Luciteria', url: 'https://luciteria.com/products/francium-50mm-lucite-cube-fr2x2' }],
    decayParent: [{ symbol: 'Ac', isotope: '227' }],
  },
  At: {
    isotope: '219',
    links: [{ label: 'Luciteria', url: 'https://luciteria.com/products/astatine-lucite-cube-at2x2' }],
    decayParent: [
      { symbol: 'Ac', isotope: '227' },
      { symbol: 'Fr', isotope: '223' },
    ],
  },
  Cm: {
    isotope: '242/243/244',
    links: [{ label: 'Luciteria', url: 'https://luciteria.com/products/curium-50mm-lucite-cube-cm2x2' }],
  },
  Bk: {
    isotope: '249',
    links: [{ label: 'Luciteria', url: 'https://luciteria.com/products/berkelium-50mm-lucite-cube-bk2x2' }],
  },
  Cf: {
    isotope: '249',
    links: [{ label: 'Luciteria', url: 'https://luciteria.com/products/californium-50mm-lucite-cube-cf2x2' }],
    decayParent: [{ symbol: 'Bk', isotope: '249' }],
  },
  Es: {
    isotope: '254',
    links: [{ label: 'Luciteria', url: 'https://luciteria.com/products/einsteinium-50mm-lucite-cube-es2x2' }],
  },
  Th: {
    isotope: '232',
    links: [{ label: 'Luciteria', url: 'https://www.luciteria.com/element-cubes/p/thorium-cube' }],
    upgrade: true,
  },
  U: {
    isotope: '238',
    links: [{ label: 'Luciteria', url: 'https://luciteria.com/products/uranium-metal-99-9-depleted-u238' }],
    upgrade: true,
  },
  Ir: {
    isotope: '',
    links: [
      {
        label: 'AliExpress',
        url: 'https://aliexpress.ru/item/1005011884567298.html?sku_id=12000056887903501',
      },
    ],
    upgrade: true,
  },
  Np: {
    isotope: '237',
    links: [{ label: 'eBay', url: 'https://www.ebay.com/itm/227286127570' }],
    decayParent: [{ symbol: 'Am', isotope: '241' }],
    upgrade: true,
  },
};

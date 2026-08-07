import type { ElementCollection } from '../types/element'
import type { LocalizedLabel } from '../utils/localizedLabel'

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
}

/** Site title (browser tab, SEO). */
export const siteTitle: LocalizedLabel = {
  ru: 'Мамонтов — коллекция элементов',
  en: 'Mamontov — Element Collection',
  zh: '马蒙托夫 — 元素收藏',
}

/** Site address — used for canonical/OpenGraph links. */
export const siteUrl = 'https://periodic.mamontov.tech'

export const myElements: Record<string, ElementCollection> = {
  H: {
    physical: { sampleState: 'gas', container: 'dischargeAmpoule', purity: '999' },
  },
  He: {
    physical: { sampleState: 'gas', container: 'dischargeAmpoule', purity: '9999' },
  },
  Li: {
    physical: { sampleState: 'metal', container: 'ampoule', purity: '999' },
  },
  Be: {
    physical: { sampleState: 'cubicIngot', purity: '999' },
  },
  B: {
    physical: { sampleState: 'cubicIngot', purity: '999' },
  },
  C: {
    physical: { sampleState: 'cubicIngot', purity: '999' },
  },
  N: {
    physical: { sampleState: 'gas', container: 'dischargeAmpoule', purity: '999' },
  },
  O: {
    physical: { sampleState: 'gas', container: 'dischargeAmpoule', purity: '995' },
  },
  F: {
    physical: { sampleState: 'cubicIngot', purity: '7598' },
  },
  Ne: {
    physical: { sampleState: 'gas', container: 'dischargeAmpoule', purity: '99994' },
  },
  Na: {
    physical: { sampleState: 'metal', container: 'ampoule', purity: '9999' },
  },
  Mg: {
    physical: { sampleState: 'cubicIngot', purity: '9999' },
  },
  Al: {
    physical: { sampleState: 'cubicIngot', purity: '9999' },
  },
  Si: {
    physical: { sampleState: 'cubicIngot', purity: '6N' },
  },
  P: {
    physical: { sampleState: 'pressedPowder', container: 'acrylicBox', purity: '987' },
  },
  S: {
    physical: { sampleState: 'pressedPowder', container: 'acrylicBox', purity: '999' },
  },
  Cl: {
    physical: { sampleState: 'liquefiedGas', container: 'ampoule', purity: '99' },
  },
  Ar: {
    physical: { sampleState: 'gas', container: 'dischargeAmpoule', purity: '99998' },
  },
  K: {
    physical: { sampleState: 'metal', container: 'ampoule', purity: '9999' },
  },
  Ca: {
    physical: { sampleState: 'granules', container: 'ampoule', purity: '999' },
  },
  Sc: {
    physical: { sampleState: 'cubicIngot', purity: '9995' },
  },
  Ti: {
    physical: { sampleState: 'cubicIngot', purity: '995' },
  },
  V: {
    physical: { sampleState: 'cubicIngot', purity: '999' },
  },
  Cr: {
    physical: { sampleState: 'cubicIngot', purity: '997' },
  },
  Mn: {
    physical: { sampleState: 'cubicIngot', purity: '997' },
  },
  Fe: {
    physical: { sampleState: 'cubicIngot', purity: '9999' },
  },
  Co: {
    physical: { sampleState: 'cubicIngot', purity: '9996' },
  },
  Ni: {
    physical: { sampleState: 'cubicIngot', purity: '996' },
  },
  Cu: {
    physical: { sampleState: 'cubicIngot', purity: '9995' },
  },
  Zn: {
    physical: { sampleState: 'cubicIngot', purity: '9999' },
  },
  Ga: {
    physical: { sampleState: 'metal', container: 'acrylicBox', purity: '9999' },
  },
  Ge: {
    physical: { sampleState: 'cubicIngot', purity: '5N' },
  },
  As: {
    physical: { sampleState: 'powder', container: 'ampoule', purity: '999' },
  },
  Se: {
    physical: { sampleState: 'cubicIngot', purity: '~999' },
  },
  Br: {
    physical: { sampleState: 'liquid', container: 'ampoule', purity: '99' },
  },
  Kr: {
    physical: { sampleState: 'gas', container: 'dischargeAmpoule', purity: '9999' },
  },
  Rb: {
    physical: { sampleState: 'metal', container: 'ampoule', purity: '9999' },
  },
  Sr: {
    physical: { sampleState: 'metal', container: 'ampoule', purity: '999' },
  },
  Y: {
    physical: { sampleState: 'cubicIngot', purity: '999' },
  },
  Zr: {
    physical: { sampleState: 'cubicIngot', purity: '992' },
  },
  Nb: {
    physical: { sampleState: 'cubicIngot', purity: '9995' },
  },
  Mo: {
    physical: { sampleState: 'cubicIngot', purity: '9995' },
  },
  Ru: {
    physical: { sampleState: 'bead', container: 'acrylicBox', purity: '9998' },
  },
  Rh: {
    physical: { sampleState: 'bead', container: 'acrylicBox', purity: '9995' },
  },
  Pd: {
    physical: { sampleState: 'plate', purity: '9995' },
  },
  Ag: {
    physical: { sampleState: 'cubicIngot', purity: '9999' },
  },
  Cd: {
    physical: { sampleState: 'cubicIngot', purity: '99995' },
  },
  In: {
    physical: { sampleState: 'cubicIngot', purity: '99995' },
  },
  Sn: {
    physical: { sampleState: 'cubicIngot', purity: '9999' },
  },
  Sb: {
    physical: { sampleState: 'cubicIngot', purity: '999' },
  },
  Te: {
    physical: { sampleState: 'cubicIngot', purity: '9999' },
  },
  I: {
    physical: { sampleState: 'granules', container: 'ampoule', purity: '999' },
  },
  Xe: {
    physical: { sampleState: 'gas', container: 'dischargeAmpoule', purity: '9999' },
  },
  Cs: {
    physical: { sampleState: 'metal', container: 'ampoule', purity: '9999' },
  },
  Ba: {
    physical: { sampleState: 'metal', container: 'ampoule', purity: '999' },
  },
  La: {
    physical: { sampleState: 'metal', container: 'ampoule', purity: '999' },
  },
  Ce: {
    physical: { sampleState: 'metal', container: 'ampoule', purity: '999' },
  },
  Pr: {
    physical: { sampleState: 'metal', container: 'ampoule', purity: '999' },
  },
  Nd: {
    physical: { sampleState: 'metal', container: 'ampoule', purity: '999' },
  },
  Sm: {
    physical: { sampleState: 'cubicIngot', purity: '9995' },
  },
  Eu: {
    physical: { sampleState: 'metal', container: 'ampoule', purity: '9999' },
  },
  Gd: {
    physical: { sampleState: 'cubicIngot', purity: '9999' },
  },
  Tb: {
    physical: { sampleState: 'cubicIngot', purity: '9995' },
  },
  Dy: {
    physical: { sampleState: 'cubicIngot', purity: '999' },
  },
  Ho: {
    physical: { sampleState: 'cubicIngot', purity: '999' },
  },
  Er: {
    physical: { sampleState: 'cubicIngot', purity: '999' },
  },
  Tm: {
    physical: { sampleState: 'cubicIngot', purity: '9999' },
  },
  Yb: {
    physical: { sampleState: 'cubicIngot', purity: '9999' },
  },
  Lu: {
    physical: { sampleState: 'cubicIngot', purity: '9995' },
  },
  Hf: {
    physical: { sampleState: 'cubicIngot', purity: '999' },
  },
  Ta: {
    physical: { sampleState: 'cubicIngot', purity: '9995' },
  },
  W: {
    physical: { sampleState: 'cubicIngot', purity: '9995' },
  },
  Re: {
    physical: { sampleState: 'cubicIngot', purity: '999' },
  },
  Os: {
    physical: { sampleState: 'bead', container: 'acrylicBox', purity: '9995' },
  },
  Ir: {
    physical: { sampleState: 'powder', container: 'substrate', purity: '9998' },
  },
  Pt: {
    physical: { sampleState: 'plate', purity: '9995' },
  },
  Au: {
    physical: { sampleState: 'plate', purity: '9999' },
  },
  Hg: {
    physical: { sampleState: 'metal', container: 'ampoule', purity: '9999995' },
  },
  Tl: {
    physical: { sampleState: 'metal', container: 'ampoule', purity: '~999' },
  },
  Pb: {
    physical: { sampleState: 'cubicIngot', purity: '9999' },
  },
  Bi: {
    physical: { sampleState: 'cubicIngot', purity: '9999' },
  },
  Po: {
    physical: {
      description: { ru: 'Источник из антистатической щётки Staticmaster', en: 'Source from a Staticmaster antistatic brush', zh: 'Staticmaster 防静电刷辐射源' },
      container: 'acrylicCoinCapsule',
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
      annotations: [
        { energy: 46.5, label: 'Pb-210' },
        { energy: 75.0, label: 'Pb/Bi Kα' },
      ],
    },
  },
  Rn: {
    physical: {
      description: { ru: 'Светосостав постоянного действия', en: 'Self-luminous compound', zh: '夜光涂料' },
      container: 'ampoule',
    },
    radioactive: {
      isotope: '222',
      sourceType: 'secondary',
      decayParent: [{ symbol: 'Ra', isotope: '226' }],
    },
  },
  Ra: {
    physical: {
      description: { ru: 'Стрелки часов со светосоставом постоянного действия', en: 'Clock hands with self-luminous paint', zh: '带夜光涂料的钟表指针' },
      container: 'ampoule',
    },
    radioactive: {
      isotope: '226',
      sourceType: 'primary',
    },
    spectrum: {
      id: 'ra-88-spd',
      filename: { ru: 'Ra-226 (СПД).xml', en: 'Ra-226 (SPD).xml', zh: 'Ra-226 (SPD).xml' },
      annotations: [
        { energy: 186.2, label: 'Ra-226' },
        { energy: 351.9, label: 'Pb-214' },
        { energy: 609.3, label: 'Bi-214' },
      ],
    },
  },
  Th: {
    physical: {
      description: { ru: 'Торированные электроды WT-20', en: 'WT-20 thoriated electrodes', zh: 'WT-20 钍钨电极' },
      container: 'ampoule',
      purity: '~2%',
    },
    radioactive: {
      isotope: '232',
      sourceType: 'primary',
    },
    spectrum: {
      id: 'th-90-wt20',
      filename: { ru: 'Th-232 (WT-20).xml', en: 'Th-232 (WT-20).xml', zh: 'Th-232 (WT-20).xml' },
      annotations: [{ energy: 238.6, label: 'Pb-212' }],
    },
  },
  U: {
    physical: {
      description: { ru: 'Бисер из урансодержащего стекла', en: 'Beads from uranium-containing glass', zh: '含铀玻璃珠' },
      container: 'ampoule',
      purity: '~2%',
    },
    radioactive: {
      isotope: '238',
      sourceType: 'primary',
    },
    spectrum: {
      id: 'u-92-glass',
      filename: { ru: 'U-238 (Бисер из ураносодержащего стекла).xml', en: 'U-238 (Uranium glass beads).xml', zh: 'U-238（含铀玻璃珠）.xml' },
      annotations: [
        { energy: 63.3, label: 'Th-234' },
        { energy: 92.6, label: 'Th-234' },
        { energy: 185.7, label: 'U-235' },
      ],
    },
  },
  Pu: {
    physical: {
      description: { ru: 'Источник из дымового извещателя РИД-6М', en: 'Source from RID-6M smoke detector', zh: 'RID-6M 烟雾探测器辐射源' },
      container: 'acrylicBox',
    },
    radioactive: {
      isotope: '239',
      sourceType: 'primary',
    },
    spectrum: {
      id: 'pu-94-rid6m',
      filename: { ru: 'Pu-239 (РИД-6М).xml', en: 'Pu-239 (RID-6M).xml', zh: 'Pu-239 (RID-6M).xml' },
      annotations: [{ energy: 17.2, label: 'U Lα (Pu-239)' }],
    },
  },
  Am: {
    physical: {
      description: { ru: 'Источник из дымового детектора HIS-07', en: 'Source from HIS-07 smoke detector', zh: 'HIS-07 烟雾探测器辐射源' },
      container: 'acrylicCoinCapsule',
    },
    radioactive: {
      isotope: '241',
      sourceType: 'primary',
    },
    spectrum: {
      id: 'am-95-his07',
      filename: { ru: 'Am-241 (HIS-07).xml', en: 'Am-241 (HIS-07).xml', zh: 'Am-241 (HIS-07).xml' },
      annotations: [
        { energy: 59.5, label: 'Am-241' },
        { energy: 26.3, label: 'Am-241' },
      ],
    },
  },
}

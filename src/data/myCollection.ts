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
 *    "I have it"; the rest of the fields can be filled in gradually or
 *    left out entirely. Every field but the symbol is optional.
 * 3. If the standard sampleState/container values aren't enough to describe
 *    a sample — either add your own "code: label" pair to
 *    src/locales/collection.ts, or just put the ready-made text
 *    straight into description (see the radioactive elements below for an
 *    example) — that's simpler and doesn't require touching the dictionaries at all.
 *    sourceType only ever takes 'primary' or 'secondary' (see ElementCollection).
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
    sampleState: 'gas',
    container: 'dischargeAmpoule',
    purity: '999',
  },
  He: {
    sampleState: 'gas',
    container: 'dischargeAmpoule',
    purity: '9999',
  },
  Li: {
    sampleState: 'metal',
    container: 'ampoule',
    purity: '999',
  },
  Be: {
    sampleState: 'cubicIngot',
    purity: '999',
  },
  B: {
    sampleState: 'cubicIngot',
    purity: '999',
  },
  C: {
    sampleState: 'cubicIngot',
    purity: '999',
  },
  N: {
    sampleState: 'gas',
    container: 'dischargeAmpoule',
    purity: '999',
  },
  O: {
    sampleState: 'gas',
    container: 'dischargeAmpoule',
    purity: '995',
  },
  F: {
    sampleState: 'cubicIngot',
    purity: '7598',
  },
  Ne: {
    sampleState: 'gas',
    container: 'dischargeAmpoule',
    purity: '99994',
  },
  Na: {
    sampleState: 'metal',
    container: 'ampoule',
    purity: '9999',
  },
  Mg: {
    sampleState: 'cubicIngot',
    purity: '9999',
  },
  Al: {
    sampleState: 'cubicIngot',
    purity: '9999',
  },
  Si: {
    sampleState: 'cubicIngot',
    purity: '6N',
  },
  P: {
    sampleState: 'pressedPowder',
    container: 'acrylicBox',
    purity: '987',
  },
  S: {
    sampleState: 'pressedPowder',
    container: 'acrylicBox',
    purity: '999',
  },
  Cl: {
    sampleState: 'liquefiedGas',
    container: 'ampoule',
    purity: '99',
  },
  Ar: {
    sampleState: 'gas',
    container: 'dischargeAmpoule',
    purity: '99998',
  },
  K: {
    sampleState: 'metal',
    container: 'ampoule',
    purity: '9999',
  },
  Ca: {
    sampleState: 'granules',
    container: 'ampoule',
    purity: '999',
  },
  Sc: {
    sampleState: 'cubicIngot',
    purity: '9995',
  },
  Ti: {
    sampleState: 'cubicIngot',
    purity: '995',
  },
  V: {
    sampleState: 'cubicIngot',
    purity: '999',
  },
  Cr: {
    sampleState: 'cubicIngot',
    purity: '997',
  },
  Mn: {
    sampleState: 'cubicIngot',
    purity: '997',
  },
  Fe: {
    sampleState: 'cubicIngot',
    purity: '9999',
  },
  Co: {
    sampleState: 'cubicIngot',
    purity: '9996',
  },
  Ni: {
    sampleState: 'cubicIngot',
    purity: '996',
  },
  Cu: {
    sampleState: 'cubicIngot',
    purity: '9995',
  },
  Zn: {
    sampleState: 'cubicIngot',
    purity: '9999',
  },
  Ga: {
    sampleState: 'metal',
    container: 'acrylicBox',
    purity: '9999',
  },
  Ge: {
    sampleState: 'cubicIngot',
    purity: '5N',
  },
  As: {
    sampleState: 'powder',
    container: 'ampoule',
    purity: '999',
  },
  Se: {
    sampleState: 'cubicIngot',
    purity: '~999',
  },
  Br: {
    sampleState: 'liquid',
    container: 'ampoule',
    purity: '99',
  },
  Kr: {
    sampleState: 'gas',
    container: 'dischargeAmpoule',
    purity: '9999',
  },
  Rb: {
    sampleState: 'metal',
    container: 'ampoule',
    purity: '9999',
  },
  Sr: {
    sampleState: 'metal',
    container: 'ampoule',
    purity: '999',
  },
  Y: {
    sampleState: 'cubicIngot',
    purity: '999',
  },
  Zr: {
    sampleState: 'cubicIngot',
    purity: '992',
  },
  Nb: {
    sampleState: 'cubicIngot',
    purity: '9995',
  },
  Mo: {
    sampleState: 'cubicIngot',
    purity: '9995',
  },
  Ru: {
    sampleState: 'bead',
    container: 'acrylicBox',
    purity: '9998',
  },
  Rh: {
    sampleState: 'bead',
    container: 'acrylicBox',
    purity: '9995',
  },
  Pd: {
    sampleState: 'plate',
    purity: '9995',
  },
  Ag: {
    sampleState: 'cubicIngot',
    purity: '9999',
  },
  Cd: {
    sampleState: 'cubicIngot',
    purity: '99995',
  },
  In: {
    sampleState: 'cubicIngot',
    purity: '99995',
  },
  Sn: {
    sampleState: 'cubicIngot',
    purity: '9999',
  },
  Sb: {
    sampleState: 'cubicIngot',
    purity: '999',
  },
  Te: {
    sampleState: 'cubicIngot',
    purity: '9999',
  },
  I: {
    sampleState: 'granules',
    container: 'ampoule',
    purity: '999',
  },
  Xe: {
    sampleState: 'gas',
    container: 'dischargeAmpoule',
    purity: '9999',
  },
  Cs: {
    sampleState: 'metal',
    container: 'ampoule',
    purity: '9999',
  },
  Ba: {
    sampleState: 'metal',
    container: 'ampoule',
    purity: '999',
  },
  La: {
    sampleState: 'metal',
    container: 'ampoule',
    purity: '999',
  },
  Ce: {
    sampleState: 'metal',
    container: 'ampoule',
    purity: '999',
  },
  Pr: {
    sampleState: 'metal',
    container: 'ampoule',
    purity: '999',
  },
  Nd: {
    sampleState: 'metal',
    container: 'ampoule',
    purity: '999',
  },
  Sm: {
    sampleState: 'cubicIngot',
    purity: '9995',
  },
  Eu: {
    sampleState: 'metal',
    container: 'ampoule',
    purity: '9999',
  },
  Gd: {
    sampleState: 'cubicIngot',
    purity: '9999',
  },
  Tb: {
    sampleState: 'cubicIngot',
    purity: '9995',
  },
  Dy: {
    sampleState: 'cubicIngot',
    purity: '999',
  },
  Ho: {
    sampleState: 'cubicIngot',
    purity: '999',
  },
  Er: {
    sampleState: 'cubicIngot',
    purity: '999',
  },
  Tm: {
    sampleState: 'cubicIngot',
    purity: '9999',
  },
  Yb: {
    sampleState: 'cubicIngot',
    purity: '9999',
  },
  Lu: {
    sampleState: 'cubicIngot',
    purity: '9995',
  },
  Hf: {
    sampleState: 'cubicIngot',
    purity: '999',
  },
  Ta: {
    sampleState: 'cubicIngot',
    purity: '9995',
  },
  W: {
    sampleState: 'cubicIngot',
    purity: '9995',
  },
  Re: {
    sampleState: 'cubicIngot',
    purity: '999',
  },
  Os: {
    sampleState: 'bead',
    container: 'acrylicBox',
    purity: '9995',
  },
  Ir: {
    sampleState: 'powder',
    container: 'substrate',
    purity: '9998',
  },
  Pt: {
    sampleState: 'plate',
    purity: '9995',
  },
  Au: {
    sampleState: 'plate',
    purity: '9999',
  },
  Hg: {
    sampleState: 'metal',
    container: 'ampoule',
    purity: '9999995',
  },
  Tl: {
    sampleState: 'metal',
    container: 'ampoule',
    purity: '~999',
  },
  Pb: {
    sampleState: 'cubicIngot',
    purity: '9999',
  },
  Bi: {
    sampleState: 'cubicIngot',
    purity: '9999',
  },
  Rn: {
    description: { ru: 'Светосостав постоянного действия', en: 'Self-luminous compound', zh: '夜光涂料' },
    container: 'ampoule',
    isotope: '222',
    sourceType: 'secondary',
    decayParent: { symbol: 'Ra', isotope: '226' },
  },
  Ra: {
    description: { ru: 'Стрелки часов со светосоставом постоянного действия', en: 'Clock hands with self-luminous paint', zh: '带夜光涂料的钟表指针' },
    container: 'ampoule',
    isotope: '226',
    sourceType: 'primary',
    spectrum: 'ra-88-spd',
    spectrumFilename: { ru: 'Ra-226 (СПД).xml', en: 'Ra-226 (SPD).xml', zh: 'Ra-226 (SPD).xml' },
  },
  Th: {
    description: { ru: 'Торированные электроды WT-20', en: 'WT-20 thoriated electrodes', zh: 'WT-20 钍钨电极' },
    container: 'ampoule',
    purity: '~2%',
    isotope: '232',
    sourceType: 'primary',
    spectrum: 'th-90-wt20',
    spectrumFilename: { ru: 'Th-232 (WT-20).xml', en: 'Th-232 (WT-20).xml', zh: 'Th-232 (WT-20).xml' },
  },
  U: {
    description: { ru: 'Бисер из урансодержащего стекла', en: 'Beads from uranium-containing glass', zh: '含铀玻璃珠' },
    container: 'ampoule',
    purity: '~2%',
    isotope: '238',
    sourceType: 'primary',
    spectrum: 'u-92-glass',
    spectrumFilename: { ru: 'U-238 (Бисер из ураносодержащего стекла).xml', en: 'U-238 (Uranium glass beads).xml', zh: 'U-238（含铀玻璃珠）.xml' },
  },
  Pu: {
    description: { ru: 'Источник из дымового извещателя РИД-6М', en: 'Source from RID-6M smoke detector', zh: 'RID-6M 烟雾探测器辐射源' },
    container: 'acrylicBox',
    isotope: '239',
    sourceType: 'primary',
    spectrum: 'pu-94-rid6m',
    spectrumFilename: { ru: 'Pu-239 (РИД-6М).xml', en: 'Pu-239 (RID-6M).xml', zh: 'Pu-239 (RID-6M).xml' },
  },
  Am: {
    description: { ru: 'Источник из дымового детектора HIS-07', en: 'Source from HIS-07 smoke detector', zh: 'HIS-07 烟雾探测器辐射源' },
    container: 'acrylicCoinCapsule',
    isotope: '241',
    sourceType: 'primary',
    spectrum: 'am-95-his07',
    spectrumFilename: { ru: 'Am-241 (HIS-07).xml', en: 'Am-241 (HIS-07).xml', zh: 'Am-241 (HIS-07).xml' },
  },
}

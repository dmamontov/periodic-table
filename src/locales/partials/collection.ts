import type { Locale } from '../types'

export interface CollectionLocaleStrings {
  sampleStates: Record<string, string>
  containers: Record<string, string>
  sourceTypes: Record<string, string>
  samples: Record<string, string>
  spectrumFiles: Record<string, string>
  spectrumMinutes: string
}

const collectionRu: CollectionLocaleStrings = {
  sampleStates: {
    gas: 'Газ',
    liquefiedGas: 'Сжиженный газ',
    liquid: 'Жидкость',
    metal: 'Металл',
    cubicIngot: 'Кубический слиток',
    pressedPowder: 'Спрессованный порошок',
    granules: 'Гранулы',
    powder: 'Порошок',
    plate: 'Пластина',
    bead: 'Бусина',
  },
  containers: {
    dischargeAmpoule: 'Разрядная ампула',
    ampoule: 'Ампула',
    acrylicBox: 'Акриловая коробка',
    acrylicCoinCapsule: 'Акриловая капсула',
    substrate: 'Подложка',
  },
  sourceTypes: {
    primary: 'Прямой источник',
    secondary: 'Продукт распада',
  },
  samples: {
    ra88: 'Стрелки часов со светосоставом постоянного действия',
    th90: 'Торированные электроды WT-20',
    u92: 'Бисер из урансодержащего стекла',
    am95: 'Источник из дымового детектора HIS-07',
    pu94: 'Источник из дымового извещателя РИД-6М',
    rn86: 'Светосостав постоянного действия',
  },
  spectrumFiles: {
    'th-90-wt20': 'Th-232 (WT-20).xml',
    'ra-88-spd': 'Ra-226 (СПД).xml',
    'am-95-his07': 'Am-241 (HIS-07).xml',
    'u-92-glass': 'U-238 (Бисер из ураносодержащего стекла).xml',
    'pu-94-rid6m': 'Pu-239 (РИД-6М).xml',
  },
  spectrumMinutes: 'мин',
}

const collectionEn: CollectionLocaleStrings = {
  sampleStates: {
    gas: 'Gas',
    liquefiedGas: 'Liquefied gas',
    liquid: 'Liquid',
    metal: 'Metal',
    cubicIngot: 'Cubic ingot',
    pressedPowder: 'Pressed powder',
    granules: 'Granules',
    powder: 'Powder',
    plate: 'Plate',
    bead: 'Bead',
  },
  containers: {
    dischargeAmpoule: 'Discharge ampoule',
    ampoule: 'Ampoule',
    acrylicBox: 'Acrylic box',
    acrylicCoinCapsule: 'Acrylic capsule',
    substrate: 'Substrate',
  },
  sourceTypes: {
    primary: 'Direct source',
    secondary: 'Decay product',
  },
  samples: {
    ra88: 'Clock hands with self-luminous paint',
    th90: 'WT-20 thoriated electrodes',
    u92: 'Beads from uranium-containing glass',
    am95: 'Source from HIS-07 smoke detector',
    pu94: 'Source from RID-6M smoke detector',
    rn86: 'Self-luminous compound',
  },
  spectrumFiles: {
    'th-90-wt20': 'Th-232 (WT-20).xml',
    'ra-88-spd': 'Ra-226 (SPD).xml',
    'am-95-his07': 'Am-241 (HIS-07).xml',
    'u-92-glass': 'U-238 (Uranium glass beads).xml',
    'pu-94-rid6m': 'Pu-239 (RID-6M).xml',
  },
  spectrumMinutes: 'min',
}

const collectionZh: CollectionLocaleStrings = {
  sampleStates: {
    gas: '气体',
    liquefiedGas: '液化气体',
    liquid: '液体',
    metal: '金属',
    cubicIngot: '立方锭',
    pressedPowder: '压制粉末',
    granules: '颗粒',
    powder: '粉末',
    plate: '板材',
    bead: '圆珠',
  },
  containers: {
    dischargeAmpoule: '放电安瓿',
    ampoule: '安瓿',
    acrylicBox: '亚克力盒',
    acrylicCoinCapsule: '亚克力胶囊',
    substrate: '基底',
  },
  sourceTypes: {
    primary: '直接来源',
    secondary: '衰变产物',
  },
  samples: {
    ra88: '带夜光涂料的钟表指针',
    th90: 'WT-20 钍钨电极',
    u92: '含铀玻璃珠',
    am95: 'HIS-07 烟雾探测器辐射源',
    pu94: 'RID-6M 烟雾探测器辐射源',
    rn86: '夜光涂料',
  },
  spectrumFiles: {
    'th-90-wt20': 'Th-232 (WT-20).xml',
    'ra-88-spd': 'Ra-226 (SPD).xml',
    'am-95-his07': 'Am-241 (HIS-07).xml',
    'u-92-glass': 'U-238（含铀玻璃珠）.xml',
    'pu-94-rid6m': 'Pu-239 (RID-6M).xml',
  },
  spectrumMinutes: '分钟',
}

export const collectionLabels: Record<Locale, CollectionLocaleStrings> = {
  ru: collectionRu,
  en: collectionEn,
  zh: collectionZh,
}

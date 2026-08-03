import type { LocalizedLabel } from '../utils/localizedLabel'

/**
 * Generic vocabulary for describing collection samples. Add a new key here
 * whenever `myCollection.ts` needs a sample state / container / source type
 * that isn't listed yet. A plain string is shown in every UI language; use
 * `{ ru, en, zh }` only if you want it translated.
 */
export const sampleStateLabels: Record<string, LocalizedLabel> = {
  gas: { ru: 'Газ', en: 'Gas', zh: '气体' },
  liquefiedGas: { ru: 'Сжиженный газ', en: 'Liquefied gas', zh: '液化气体' },
  liquid: { ru: 'Жидкость', en: 'Liquid', zh: '液体' },
  metal: { ru: 'Металл', en: 'Metal', zh: '金属' },
  cubicIngot: { ru: 'Кубический слиток', en: 'Cubic ingot', zh: '立方锭' },
  pressedPowder: { ru: 'Спрессованный порошок', en: 'Pressed powder', zh: '压制粉末' },
  granules: { ru: 'Гранулы', en: 'Granules', zh: '颗粒' },
  powder: { ru: 'Порошок', en: 'Powder', zh: '粉末' },
  plate: { ru: 'Пластина', en: 'Plate', zh: '板材' },
  bead: { ru: 'Бусина', en: 'Bead', zh: '圆珠' },
}

export const containerLabels: Record<string, LocalizedLabel> = {
  dischargeAmpoule: { ru: 'Разрядная ампула', en: 'Discharge ampoule', zh: '放电安瓿' },
  ampoule: { ru: 'Ампула', en: 'Ampoule', zh: '安瓿' },
  acrylicBox: { ru: 'Акриловая коробка', en: 'Acrylic box', zh: '亚克力盒' },
  acrylicCoinCapsule: { ru: 'Акриловая капсула', en: 'Acrylic capsule', zh: '亚克力胶囊' },
  substrate: { ru: 'Подложка', en: 'Substrate', zh: '基底' },
}

export const sourceTypeLabels: Record<string, LocalizedLabel> = {
  primary: { ru: 'Прямой источник', en: 'Direct source', zh: '直接来源' },
  secondary: { ru: 'Продукт распада', en: 'Decay product', zh: '衰变产物' },
}

export const spectrumMinutesLabel: LocalizedLabel = { ru: 'мин', en: 'min', zh: '分钟' }

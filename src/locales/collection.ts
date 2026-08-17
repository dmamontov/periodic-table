import type { LocalizedLabel } from '../utils/localizedLabel'

/** Generic vocabulary for describing collection samples — add a key here when data/collection.ts needs one not listed yet. */
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
  foil: { ru: 'Фольга', en: 'Foil', zh: '箔' },
  bead: { ru: 'Бусина', en: 'Bead', zh: '圆珠' },
}

export const containerLabels: Record<string, LocalizedLabel> = {
  dischargeAmpoule: { ru: 'Разрядная ампула', en: 'Discharge ampoule', zh: '放电安瓿' },
  ampoule: { ru: 'Ампула', en: 'Ampoule', zh: '安瓿' },
  acrylicBox: { ru: 'Акриловая коробка', en: 'Acrylic box', zh: '亚克力盒' },
  acrylicCoinCapsule: { ru: 'Акриловая капсула', en: 'Acrylic capsule', zh: '亚克力胶囊' },
  substrate: { ru: 'Подложка', en: 'Substrate', zh: '基底' },
}

/** Standardized reasons a `history` entry was replaced — add a key here rather than free text on the entry. */
export const reasonLabels: Record<string, LocalizedLabel> = {
  degradedStorage: { ru: 'Испортился при хранении', en: 'Degraded in storage', zh: '存放变质' },
  wrongSize: { ru: 'Не подходит размер', en: 'Wrong size', zh: '尺寸不合适' },
  betterSample: { ru: 'Апгрейд на лучший образец', en: 'Upgraded to a better sample', zh: '升级为更好的样品' },
}

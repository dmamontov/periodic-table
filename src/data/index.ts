import type { Element } from '../types/element/element'
import type { ElementDetail, StoredElementDetail } from '../types/element/detail'
import type { CategoryId } from '../types/element/category'
import type { GhsPictogramId } from '../types/element/ghs'
import type { CollectionSpectrumData, RadiacodeIsotopeRef } from '../types/collection/spectrum'
import rawElements from './elements/elements.json'
import detailsFile from './elements/details.json'
import { myElements } from './collection'
import type { LocalizedLabel } from '../utils/localizedLabel'
import { CATEGORY_COLORS } from '../theme/colors'

type RawElement = Omit<Element, 'category' | 'inCollection' | 'collection'>

export const storedElementDetails = detailsFile.elements as Record<string, StoredElementDetail>

export function getCategoryColor(category: CategoryId): string {
  return CATEGORY_COLORS[category]
}

export const allCategories: { id: CategoryId; color: string }[] = [
  { id: 'alkali', color: CATEGORY_COLORS.alkali },
  { id: 'alkaline-earth', color: CATEGORY_COLORS['alkaline-earth'] },
  { id: 'transition', color: CATEGORY_COLORS.transition },
  { id: 'post-transition', color: CATEGORY_COLORS['post-transition'] },
  { id: 'metalloid', color: CATEGORY_COLORS.metalloid },
  { id: 'nonmetal', color: CATEGORY_COLORS.nonmetal },
  { id: 'halogen', color: CATEGORY_COLORS.halogen },
  { id: 'noble-gas', color: CATEGORY_COLORS['noble-gas'] },
  { id: 'lanthanides', color: CATEGORY_COLORS.lanthanides },
  { id: 'actinides', color: CATEGORY_COLORS.actinides },
]

const metalloidNumbers = new Set([5, 14, 32, 33, 51, 52])
const nonmetalNumbers = new Set([1, 6, 7, 8, 15, 16, 34])
const postTransitionNumbers = new Set([
  13, 31, 49, 50, 81, 82, 83, 84, 113, 114, 115, 116,
])

export function getElementCategory(
  number: number,
  oldGroup: string,
  row: number,
): CategoryId {
  if (row === 8 || number === 57) return 'lanthanides'
  if (row === 9 || number === 89) return 'actinides'
  if (nonmetalNumbers.has(number)) return 'nonmetal'
  if (metalloidNumbers.has(number)) return 'metalloid'
  if (postTransitionNumbers.has(number)) return 'post-transition'

  const [roman, subgroup] = oldGroup.split(' ')

  if (subgroup === 'B') return 'transition'
  if (roman === 'I' && subgroup === 'A') return 'alkali'
  if (roman === 'II' && subgroup === 'A') return 'alkaline-earth'
  if (roman === 'VII' && subgroup === 'A') return 'halogen'
  if (roman === 'VIII' && subgroup === 'A') return 'noble-gas'
  if (oldGroup === 'lanthanides') return 'lanthanides'
  if (oldGroup === 'actinides') return 'actinides'

  return 'transition'
}

export const elements: Element[] = (rawElements as RawElement[]).map((el) => {
  const category = getElementCategory(el.number, el.oldGroup, el.row)
  const collection = myElements[el.symbol] ?? null
  return {
    ...el,
    category,
    color: getCategoryColor(category),
    inCollection: collection !== null,
    collection,
  }
})

/** spectrumId → download filename, assembled from collection.ts */
export const collectionSpectrumFilenames: Record<string, LocalizedLabel> = Object.fromEntries(
  Object.values(myElements)
    .filter((entry) => entry.spectrum?.filename)
    .map((entry) => [entry.spectrum!.id, entry.spectrum!.filename!]),
)

export const mainElements = elements.filter((el) => el.row <= 7)
export const fBlockElements = elements.filter((el) => el.row >= 8)
export const lanthanides = fBlockElements.filter((el) => el.row === 8)
export const actinides = fBlockElements.filter((el) => el.row === 9)

const elementBySymbol = new Map(
  elements.map((el) => [el.symbol.toLowerCase(), el]),
)

export function getElementBySymbol(symbol: string): Element | null {
  return elementBySymbol.get(symbol.toLowerCase()) ?? null
}

export function getElementRouteSymbol(symbol: string): string {
  return symbol.toLowerCase()
}

export function getTopRowByCol(): Map<number, number> {
  const map = new Map<number, number>()
  for (const el of mainElements) {
    const prev = map.get(el.col)
    if (prev === undefined || el.row < prev) {
      map.set(el.col, el.row)
    }
  }
  return map
}

export function isColumnHead(element: Element, topRowByCol: Map<number, number>): boolean {
  return topRowByCol.get(element.col) === element.row
}

export function getElementPeriod(element: Element): number {
  if (element.row === 8) return 6
  if (element.row === 9) return 7
  return element.row
}

const occupancy = new Set(
  elements.map((el) => `${el.row},${el.col}`),
)

function hasMainCell(row: number, col: number): boolean {
  return row >= 1 && row <= 7 && occupancy.has(`${row},${col}`)
}

function hasFBlockCell(row: number, col: number): boolean {
  return (row === 8 || row === 9) && col >= 4 && col <= 18 && occupancy.has(`${row},${col}`)
}

interface CornerFlags {
  tl: boolean
  tr: boolean
  bl: boolean
  br: boolean
}

function computeOuterCorners(
  hasCell: (row: number, col: number) => boolean,
  row: number,
  col: number,
): CornerFlags {
  const left = !hasCell(row, col - 1)
  const right = !hasCell(row, col + 1)
  const up = !hasCell(row - 1, col)
  const down = !hasCell(row + 1, col)

  return {
    tl: left && up,
    tr: right && up,
    bl: left && down,
    br: right && down,
  }
}

function cornersToRadius(corners: CornerFlags): string | undefined {
  if (!corners.tl && !corners.tr && !corners.br && !corners.bl) return undefined

  const radius = 'var(--cell-corner-radius, calc(var(--cell-size, 76px) * 0.09))'
  const none = '0'

  return `${corners.tl ? radius : none} ${corners.tr ? radius : none} ${corners.br ? radius : none} ${corners.bl ? radius : none}`
}

export function getCellBorderRadius(element: Element, singleRow = false): string | undefined {
  const { row, col } = element

  if (singleRow || row >= 8) {
    return cornersToRadius(computeOuterCorners(hasFBlockCell, row, col))
  }

  return cornersToRadius(computeOuterCorners(hasMainCell, row, col))
}

const elementMetaByNumber = new Map(
  elements.map((el) => [el.number, el]),
)

export function getSymbolByNumber(number: number): string | null {
  return elementMetaByNumber.get(number)?.symbol ?? null
}

const elementDetails = storedElementDetails

const imageModules = import.meta.glob('../assets/element-images/*.jpg', {
  eager: true,
  import: 'default',
})

const spectrumModules = import.meta.glob('../assets/element-spectra/*.webp', {
  eager: true,
  import: 'default',
})

const gridStructureModules = import.meta.glob('../assets/grid-structures/*.gif', {
  eager: true,
  import: 'default',
})

const elementImages = new Map<number, string>()
for (const [path, url] of Object.entries(imageModules)) {
  const match = /(\d+)\.jpg$/.exec(path)
  if (match?.[1]) elementImages.set(Number(match[1]), String(url))
}

const elementSpectra = new Map<number, string>()
for (const [path, url] of Object.entries(spectrumModules)) {
  const match = /(\d+)\.webp$/.exec(path)
  if (match?.[1]) elementSpectra.set(Number(match[1]), String(url))
}

const gridStructureImages = new Map<number, string>()
for (const [path, url] of Object.entries(gridStructureModules)) {
  const match = /(\d+)\.gif$/.exec(path)
  if (match?.[1]) gridStructureImages.set(Number(match[1]), String(url))
}

const RADIOACTIVE_ELEMENT_NUMBERS = new Set<number>([
  43,
  61,
  ...Array.from({ length: 118 - 84 + 1 }, (_, i) => 84 + i),
])

const WEAKLY_RADIOACTIVE_ELEMENT_NUMBERS = new Set<number>([75, 78, 83])

export function isElementWeaklyRadioactive(number: number): boolean {
  return WEAKLY_RADIOACTIVE_ELEMENT_NUMBERS.has(number)
}

export function isElementRadioactive(number: number): boolean {
  return (
    RADIOACTIVE_ELEMENT_NUMBERS.has(number) ||
    WEAKLY_RADIOACTIVE_ELEMENT_NUMBERS.has(number)
  )
}

export function getElementDetail(number: number): ElementDetail | null {
  const meta = elementMetaByNumber.get(number)
  if (!meta) return null
  const raw = elementDetails[meta.symbol]
  if (!raw) return null
  return {
    ...raw,
    number,
    symbol: meta.symbol,
    name: raw.OverviewCommon?.englishName ?? '',
  }
}

export function hasElementImage(number: number): boolean {
  const symbol = getSymbolByNumber(number)
  return symbol ? elementDetails[symbol]?.OverviewCommon?.hasImage === true : false
}

export function getElementImageUrl(number: number): string | null {
  if (!hasElementImage(number)) return null
  return elementImages.get(number) ?? null
}

export function hasElementSpectrum(number: number): boolean {
  const symbol = getSymbolByNumber(number)
  return symbol ? elementDetails[symbol]?.OverviewCommon?.hasSpectre === true : false
}

export function getElementSpectrumUrl(number: number): string | null {
  if (!hasElementSpectrum(number)) return null
  return elementSpectra.get(number) ?? null
}

export function parseGridStructureNum(value: string | null | undefined): number | null {
  if (!value) return null
  const trimmed = value.trim()
  if (!/^\d+$/.test(trimmed)) return null
  const num = Number(trimmed)
  return num >= 1 && num <= 12 ? num : null
}

export function getPrimaryGridStructureNum(
  gridStructureNum: string | null | undefined,
): number | null {
  if (!gridStructureNum) return null
  const first = gridStructureNum.split('|')[0]?.trim()
  return parseGridStructureNum(first)
}

export function getGridStructureImageUrlByNum(num: number | null | undefined): string | null {
  if (num === null || num === undefined) return null
  return gridStructureImages.get(num) ?? null
}

export function getGridStructureImageUrl(
  gridStructureNum: string | null | undefined,
): string | null {
  return getGridStructureImageUrlByNum(getPrimaryGridStructureNum(gridStructureNum))
}

/** Lazy-loaded by spectrum id so a spectrum's data only enters the bundle once its element is opened. */
const spectrumLoaders = import.meta.glob<{ default: CollectionSpectrumData }>('./spectra/*.json')

const spectrumLoaderById = new Map<string, () => Promise<{ default: CollectionSpectrumData }>>()
for (const [path, loader] of Object.entries(spectrumLoaders)) {
  const match = /([^/]+)\.json$/.exec(path)
  if (match?.[1]) spectrumLoaderById.set(match[1], loader)
}

export async function getCollectionSpectrum(
  id: string | null | undefined,
): Promise<CollectionSpectrumData | null> {
  if (!id) return null
  const loader = spectrumLoaderById.get(id)
  if (!loader) return null
  const module = await loader()
  return module.default
}

export function getCollectionSpectrumXmlHref(id: string | null | undefined): string | null {
  if (!id || !spectrumLoaderById.has(id)) return null
  return `/collection-spectra/${id}.xml`
}

export function getElementRadiacodeIsotope(number: number): RadiacodeIsotopeRef | null {
  const symbol = getSymbolByNumber(number)
  if (!symbol) return null
  const entry = (detailsFile.radiacodeIsotope as Record<string, RadiacodeIsotopeRef>)[symbol]
  return entry ?? null
}

export function getRadiacodeIsotopeUrl(slug: string): string {
  return `https://radiacode.com/isotope/${slug}`
}

export function getElementGhsPictograms(number: number): GhsPictogramId[] {
  const symbol = getSymbolByNumber(number)
  if (!symbol) return []
  const list = (detailsFile.ghs as Record<string, GhsPictogramId[]>)[symbol]
  return list ?? []
}

export function channelToEnergy(
  channel: number,
  calibration: CollectionSpectrumData['calibration'],
): number {
  const [c0, c1, c2] = calibration
  return c0 + c1 * channel + c2 * channel * channel
}

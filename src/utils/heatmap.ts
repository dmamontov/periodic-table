import type { Locale, LocaleMessages, DecayModeKey } from '../locales/types'
import { localeMessages } from '../locales'
import detailsFile from '../data/elements/details.json'
import { elements, storedElementDetails, getSymbolByNumber } from '../data'
import type { StoredElementDetail } from '../types/element/detail'
import type { HeatmapId, HeatmapGroupId, HeatmapDefinition, HeatmapDataset } from '../types/heatmap'
import { formatDecayType } from './element/isotopes'
import { HEATMAP_ACCENT_COLORS } from '../theme/colors'

export const HEATMAP_GROUP_ORDER: HeatmapGroupId[] = ['atomic', 'trends', 'physical', 'nuclear', 'other']

/** Order within groups follows periodic-table conventions (mass/radii → trends → T → nuclear → abundance). */
export const HEATMAP_DEFINITIONS: HeatmapDefinition[] = [
  { id: 'atomicMass', group: 'atomic', labelKey: 'atomicMass', unitKey: 'gPerMol', accent: HEATMAP_ACCENT_COLORS.atomicMass },
  { id: 'atomicRadius', group: 'atomic', labelKey: 'atomicRadius', unitKey: 'pm', accent: HEATMAP_ACCENT_COLORS.atomicRadius },
  { id: 'covalentRadius', group: 'atomic', labelKey: 'covalentRadius', unitKey: 'pm', accent: HEATMAP_ACCENT_COLORS.covalentRadius },
  { id: 'electronegativity', group: 'trends', labelKey: 'electronegativity', accent: HEATMAP_ACCENT_COLORS.electronegativity },
  { id: 'ionizationEnergy', group: 'trends', labelKey: 'ionizationEnergy', unitKey: 'eV', accent: HEATMAP_ACCENT_COLORS.ionizationEnergy },
  { id: 'electronAffinity', group: 'trends', labelKey: 'electronAffinity', unitKey: 'eV', accent: HEATMAP_ACCENT_COLORS.electronAffinity },
  { id: 'density', group: 'physical', labelKey: 'density', unitKey: 'gPerCm3', accent: HEATMAP_ACCENT_COLORS.density },
  { id: 'meltingPoint', group: 'physical', labelKey: 'meltingPoint', unitKey: 'celsius', accent: HEATMAP_ACCENT_COLORS.meltingPoint },
  { id: 'boilingPoint', group: 'physical', labelKey: 'boilingPoint', unitKey: 'celsius', accent: HEATMAP_ACCENT_COLORS.boilingPoint },
  { id: 'decayMode', group: 'nuclear', labelKey: 'decayMode', accent: HEATMAP_ACCENT_COLORS.decayMode },
  { id: 'halfLife', group: 'nuclear', labelKey: 'halfLife', accent: HEATMAP_ACCENT_COLORS.halfLife, scale: 'log' },
  { id: 'lifetime', group: 'nuclear', labelKey: 'lifetime', accent: HEATMAP_ACCENT_COLORS.lifetime, scale: 'log' },
  { id: 'earthAbundance', group: 'other', labelKey: 'earthAbundance', accent: HEATMAP_ACCENT_COLORS.earthAbundance, scale: 'log' },
  { id: 'meteoriteAbundance', group: 'other', labelKey: 'meteoriteAbundance', accent: HEATMAP_ACCENT_COLORS.meteoriteAbundance, scale: 'log' },
  { id: 'rarity', group: 'other', labelKey: 'rarity', accent: HEATMAP_ACCENT_COLORS.rarity, scale: 'log', invertIntensity: true },
]

const BRIGHTNESS_MIN = 0.52
const BRIGHTNESS_MAX = 1.02

/** Half-life units in elements/details.json: value/unitCode */
const HALF_LIFE_UNIT_SECONDS: Record<number, number> = {
  1: 365.25 * 24 * 3600,
  2: 24 * 3600,
  3: 3600,
  4: 60,
  5: 1,
}

const elementDetails = storedElementDetails
const halfLifeRawByNumber = new Map<number, string>()
const lifetimeRawByNumber = new Map<number, string>()
const isotopeData = detailsFile.isotopes as Record<string, { decay: DecayModeKey }>

const DECAY_MODE_SCORE: Record<DecayModeKey, number> = {
  stable: 0,
  isomeric: 1,
  electronCapture: 2,
  betaPlus: 2,
  betaMinus: 3,
  alpha: 4,
  alphaBeta: 5,
  spontaneousFission: 6,
}

const DECAY_SCORE_TO_MODE = Object.entries(DECAY_MODE_SCORE).reduce<Record<number, DecayModeKey>>(
  (acc, [mode, score]) => {
    acc[score] ??= mode as DecayModeKey
    return acc
  },
  {},
)

const DECAY_CELL_LABEL: Record<DecayModeKey, string> = {
  stable: '—',
  alpha: 'α',
  betaMinus: 'β⁻',
  betaPlus: 'β⁺',
  electronCapture: 'ε',
  spontaneousFission: 'SF',
  alphaBeta: 'αβ',
  isomeric: 'IT',
}

function getDecayModeScore(number: number): number | null {
  const symbol = getSymbolByNumber(number)
  const mode = symbol ? isotopeData[symbol]?.decay : undefined
  return mode ? DECAY_MODE_SCORE[mode] ?? null : null
}

function formatDecayModeLabel(mode: DecayModeKey, locale: string): string {
  const loc = locale as Locale
  return localeMessages[loc].decay[mode] ?? localeMessages.ru.decay[mode] ?? mode
}

export function parseDetailNumeric(raw: string | null | undefined): number | null {
  if (raw == null || raw === '') return null

  const cleaned = raw
    .replace(/<[^>]+>/g, '')
    .replace(/⋅/g, '*')
    .replace(/,/g, '.')
    .replace(/\s+/g, '')

  const sciMatch = cleaned.match(/^([+-]?\d*\.?\d+)\*10(?:\^?([-+]?\d+))?$/)
  if (sciMatch?.[1]) {
    const mantissa = Number.parseFloat(sciMatch[1])
    const exp = sciMatch[2] ? Number.parseInt(sciMatch[2], 10) : 0
    if (Number.isFinite(mantissa)) return mantissa * 10 ** exp
  }

  const num = Number.parseFloat(cleaned.replace(/[^\d.+eE-]/g, ''))
  return Number.isFinite(num) ? num : null
}

function parseAtomicMass(mass: string): number | null {
  const normalized = mass.replace(',', '.')
  const num = Number.parseFloat(normalized)
  return Number.isFinite(num) ? num : null
}

export function parseHalfLifeToSeconds(raw: string | null | undefined): number | null {
  if (raw == null || raw === '') return null
  if (raw === '∞') return Number.POSITIVE_INFINITY

  const match = /^([+-]?\d*\.?\d+)\/(\d+)$/.exec(raw)
  if (!match?.[1] || !match[2]) return null

  const value = Number.parseFloat(match[1])
  const unitCode = Number.parseInt(match[2], 10)
  const factor = HALF_LIFE_UNIT_SECONDS[unitCode]
  if (!factor || !Number.isFinite(value) || value < 0) return null
  return value * factor
}

function extractNucleusDurationValue(
  detail: StoredElementDetail | null,
  field: 'halfLife' | 'lifetime',
): number | null {
  const raw = detail?.NucleusPro?.[field]
  if (raw == null || raw === '' || raw === '∞') return null
  const seconds = parseHalfLifeToSeconds(raw)
  if (seconds == null || !Number.isFinite(seconds) || seconds <= 0) return null
  return seconds
}

function extractHalfLifeValue(detail: StoredElementDetail | null): number | null {
  return extractNucleusDurationValue(detail, 'halfLife')
}

function extractLifetimeValue(detail: StoredElementDetail | null): number | null {
  return extractNucleusDurationValue(detail, 'lifetime')
}

/** Minimum % among all known reservoirs (universe, Sun, ocean, body, crust, meteorites). */
function extractGlobalRarityValue(detail: StoredElementDetail | null): number | null {
  const pr = detail?.PrevalenceCommon
  if (!pr) return null

  const abundances = [
    pr.prevalence1,
    pr.prevalence2,
    pr.prevalence3,
    pr.prevalence4,
    pr.prevalence5,
    pr.prevalence6,
  ]
    .map(parseDetailNumeric)
    .filter((value): value is number => value != null && value > 0)

  if (!abundances.length) return null
  return Math.min(...abundances)
}

function extractPrevalenceValue(
  detail: StoredElementDetail | null,
  key: keyof NonNullable<StoredElementDetail['PrevalenceCommon']>,
): number | null {
  const value = parseDetailNumeric(detail?.PrevalenceCommon?.[key])
  return value != null && value > 0 ? value : null
}

function extractHeatmapValue(
  id: HeatmapId,
  number: number,
  detail: StoredElementDetail | null,
  atomicMass: string,
): number | null {
  if (!detail) {
    if (id === 'atomicMass') return parseAtomicMass(atomicMass)
    if (id === 'decayMode') return getDecayModeScore(number)
    return null
  }

  switch (id) {
    case 'electronegativity':
      return parseDetailNumeric(detail.ReactivityCommon?.electronegativity)
    case 'atomicRadius':
      return parseDetailNumeric(detail.AtomicCommon?.atomicRadius)
    case 'ionizationEnergy':
      return parseDetailNumeric(detail.AtomicCommon?.ionizationPotential)
    case 'electronAffinity':
      return parseDetailNumeric(detail.ReactivityCommon?.atomElectronEnergy)
    case 'density':
      return parseDetailNumeric(detail.PropertiesCommon?.elementDensity)
    case 'meltingPoint':
      return parseDetailNumeric(detail.PropertiesCommon?.elementMeltingPoint)
    case 'boilingPoint':
      return parseDetailNumeric(detail.PropertiesCommon?.elementBoilingPoint)
    case 'atomicMass':
      return parseDetailNumeric(detail.PropertiesCommon?.elementMasse) ?? parseAtomicMass(atomicMass)
    case 'covalentRadius':
      return parseDetailNumeric(detail.AtomicCommon?.covalentRadius)
    case 'halfLife':
      return extractHalfLifeValue(detail)
    case 'lifetime':
      return extractLifetimeValue(detail)
    case 'decayMode':
      return getDecayModeScore(number)
    case 'earthAbundance':
      return extractPrevalenceValue(detail, 'prevalence5')
    case 'meteoriteAbundance':
      return extractPrevalenceValue(detail, 'prevalence6')
    case 'rarity':
      return extractGlobalRarityValue(detail)
    default:
      return null
  }
}

function buildDataset(id: HeatmapId): HeatmapDataset {
  const values = new Map<number, number | null>()
  const finite: number[] = []
  let withData = 0

  for (const element of elements) {
    const detail = elementDetails[element.symbol] ?? null
    const value = extractHeatmapValue(id, element.number, detail, element.mass)
    values.set(element.number, value)

    if (id === 'halfLife' || id === 'lifetime') {
      const field = id === 'halfLife' ? 'halfLife' : 'lifetime'
      const rawMap = id === 'halfLife' ? halfLifeRawByNumber : lifetimeRawByNumber
      const raw = detail?.NucleusPro?.[field]
      if (raw != null && raw !== '' && raw !== '∞' && value != null) {
        rawMap.set(element.number, raw)
        withData += 1
        finite.push(value)
      }
      continue
    }

    if (value != null) {
      withData += 1
      finite.push(value)
    }
  }

  return {
    values,
    min: finite.length ? Math.min(...finite) : 0,
    max: finite.length ? Math.max(...finite) : 0,
    withData,
  }
}

const heatmapDatasets = Object.fromEntries(
  HEATMAP_DEFINITIONS.map((def) => [def.id, buildDataset(def.id)]),
) as Record<HeatmapId, HeatmapDataset>

export function getHeatmapDataset(id: HeatmapId): HeatmapDataset {
  return heatmapDatasets[id]
}

function valueToIntensity(
  value: number,
  min: number,
  max: number,
  scale: 'linear' | 'log' = 'linear',
  invert = false,
): number {
  if (max <= min) return invert ? 0 : 1
  if (scale === 'log' && value <= 0) return invert ? 1 : 0

  let t: number
  if (scale === 'log') {
    t = (Math.log10(value) - Math.log10(min)) / (Math.log10(max) - Math.log10(min))
  } else {
    t = (value - min) / (max - min)
  }

  if (invert) t = 1 - t
  return Math.pow(Math.min(1, Math.max(0, t)), 0.62)
}

/** Normalized heatmap strength 0–1; null = no data. Higher = visually brighter. */
export function getHeatmapIntensity(id: HeatmapId, number: number): number | null {
  const def = HEATMAP_DEFINITIONS.find((item) => item.id === id)
  const dataset = heatmapDatasets[id]
  const value = dataset.values.get(number) ?? null
  if (value == null) return null
  return valueToIntensity(
    value,
    dataset.min,
    dataset.max,
    def?.scale ?? 'linear',
    def?.invertIntensity ?? false,
  )
}

export function intensityToBrightness(intensity: number): number {
  return BRIGHTNESS_MIN + intensity * (BRIGHTNESS_MAX - BRIGHTNESS_MIN)
}

export function formatHeatmapValue(value: number, locale: string): string {
  const abs = Math.abs(value)
  if (abs >= 10000 || (abs > 0 && abs < 0.001)) {
    return formatSciSuperscript(value, locale)
  }
  if (abs >= 100) {
    return formatNumberLocale(value, locale, {
      maximumFractionDigits: 0,
    })
  }
  return formatNumberLocale(value, locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
}

function integerToSuperscript(value: number): string {
  if (value === 0) return '⁰'
  const sign = value < 0 ? '⁻' : ''
  const digits = String(Math.abs(value)).replace(
    /\d/g,
    (digit) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[Number(digit)] ?? digit,
  )
  return `${sign}${digits}`
}

function formatNumberLocale(value: number, locale: string, options: Intl.NumberFormatOptions): string {
  return value.toLocaleString(locale === 'zh' ? 'zh-CN' : locale, options)
}

/** e.g. 7.2e-8 → «7,2·10⁻⁸» (no E-notation). */
function formatSciSuperscript(value: number, locale: string, sigDigits = 3): string {
  if (value === 0) return '0'

  const abs = Math.abs(value)
  const exponent = Math.floor(Math.log10(abs))
  const mantissa = value / 10 ** exponent
  const roundedMantissa = Number(mantissa.toPrecision(sigDigits))
  const mantissaText = formatNumberLocale(roundedMantissa, locale, {
    maximumSignificantDigits: sigDigits,
  })

  return `${mantissaText}·10${integerToSuperscript(exponent)}`
}

function formatPercentAbundance(value: number, locale: string): string {
  const abs = Math.abs(value)

  if (abs >= 0.01) {
    return `${formatNumberLocale(value, locale, { maximumFractionDigits: 2 })}%`
  }
  if (abs >= 0.0001) {
    return `${formatNumberLocale(value, locale, { maximumFractionDigits: 4 })}%`
  }
  if (abs > 0) {
    return `${formatSciSuperscript(value, locale)}%`
  }
  return '0%'
}

type DurationUnitKey = keyof LocaleMessages['heatmap']['durationUnits']

function formatDurationSeconds(
  seconds: number,
  locale: string,
  units: LocaleMessages['heatmap']['durationUnits'],
): string {
  const loc = locale === 'zh' ? 'zh-CN' : locale
  const formatNum = (value: number, digits: number) =>
    value.toLocaleString(loc, { maximumFractionDigits: digits })

  const year = 365.25 * 24 * 3600
  const billionYears = 1e9 * year

  if (seconds >= billionYears) {
    return `${formatNum(seconds / billionYears, 2)} ${units.billionYears}`
  }
  if (seconds >= year) {
    return `${formatNum(seconds / year, 2)} ${units.years}`
  }
  if (seconds >= 24 * 3600) {
    return `${formatNum(seconds / (24 * 3600), 2)} ${units.days}`
  }
  if (seconds >= 3600) {
    return `${formatNum(seconds / 3600, 2)} ${units.hours}`
  }
  if (seconds >= 60) {
    return `${formatNum(seconds / 60, 2)} ${units.minutes}`
  }
  return `${formatNum(seconds, 3)} ${units.seconds}`
}

function formatNucleusDurationRaw(
  raw: string,
  locale: string,
  messages: LocaleMessages,
): string | null {
  if (raw === '∞') return null

  const match = /^([+-]?\d*\.?\d+)\/(\d+)$/.exec(raw)
  if (!match?.[1] || !match[2]) return raw

  const value = Number.parseFloat(match[1])
  const unitCode = Number.parseInt(match[2], 10)
  if (!Number.isFinite(value)) return raw

  const unitMap: Record<number, DurationUnitKey> = {
    1: 'years',
    2: 'days',
    3: 'hours',
    4: 'minutes',
    5: 'seconds',
  }
  const unitKey = unitMap[unitCode]
  if (!unitKey) return raw

  const loc = locale === 'zh' ? 'zh-CN' : locale

  if (unitKey === 'years' && Math.abs(value) >= 100_000_000) {
    return `${formatSciSuperscript(value, loc)} ${messages.heatmap.durationUnits[unitKey]}`
  }

  const formatted = value.toLocaleString(loc, { maximumFractionDigits: 4 })
  return `${formatted} ${messages.heatmap.durationUnits[unitKey]}`
}

/** Same human-readable units as heatmap cell labels (years, days, seconds, …). */
export function formatNucleusDurationDisplay(
  raw: string | null | undefined,
  locale: string,
  messages: LocaleMessages,
): string {
  if (raw == null || raw === '') return ''
  if (raw === '∞') return messages.heatmap.stable
  return formatNucleusDurationRaw(raw, locale, messages) ?? raw
}

export function formatHeatmapElementValue(
  id: HeatmapId,
  number: number,
  locale: string,
  messages: LocaleMessages,
): string | null {
  if (id === 'halfLife') {
    const raw = halfLifeRawByNumber.get(number)
    if (!raw) return null
    const formatted = formatNucleusDurationDisplay(raw, locale, messages)
    return formatted || null
  }

  if (id === 'lifetime') {
    const raw = lifetimeRawByNumber.get(number)
    if (!raw) return null
    const formatted = formatNucleusDurationDisplay(raw, locale, messages)
    return formatted || null
  }

  if (id === 'decayMode') {
    const symbol = getSymbolByNumber(number)
    const mode = symbol ? isotopeData[symbol]?.decay : undefined
    if (!mode) return null
    if (mode === 'stable') return messages.heatmap.stable
    return formatDecayType(number, locale as Locale)
  }

  const value = heatmapDatasets[id].values.get(number) ?? null
  if (value == null) return null
  if (id === 'rarity' || id === 'earthAbundance' || id === 'meteoriteAbundance') {
    return formatPercentAbundance(value, locale)
  }
  return formatHeatmapValue(value, locale)
}

export function formatHeatmapRangeValue(
  id: HeatmapId,
  value: number,
  locale: string,
  messages: LocaleMessages,
): string {
  if (id === 'halfLife' || id === 'lifetime') {
    return formatDurationSeconds(value, locale, messages.heatmap.durationUnits)
  }
  if (id === 'rarity' || id === 'earthAbundance' || id === 'meteoriteAbundance') {
    return formatPercentAbundance(value, locale)
  }
  if (id === 'decayMode') {
    const mode = DECAY_SCORE_TO_MODE[value]
    if (!mode) return formatHeatmapValue(value, locale)
    if (mode === 'stable') return messages.heatmap.stable
    return formatDecayModeLabel(mode, locale)
  }
  return formatHeatmapValue(value, locale)
}

/** Compact value for the bottom line of element cells. */
export function formatHeatmapCellDisplay(
  id: HeatmapId,
  number: number,
  locale: string,
  messages: LocaleMessages,
): string {
  const formatted = formatHeatmapElementValue(id, number, locale, messages)
  if (!formatted) return '—'

  const def = HEATMAP_DEFINITIONS.find((item) => item.id === id)
  if (!def?.unitKey) {
    if (id === 'decayMode') {
      const symbol = getSymbolByNumber(number)
      const mode = symbol ? isotopeData[symbol]?.decay : undefined
      if (!mode) return '—'
      if (mode === 'stable') return messages.heatmap.stable
      return DECAY_CELL_LABEL[mode] ?? formatted
    }
    return formatted
  }

  if (def.unitKey === 'celsius') return `${formatted}°`

  return formatted
}

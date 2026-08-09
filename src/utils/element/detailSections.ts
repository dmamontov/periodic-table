import type { LocaleMessages } from '../../locales/types'
import type { Locale } from '../../locales/types'
import type { Element } from '../../types/element'
import type {
  AggregationState,
  DetailProp,
  DetailSection,
  ElementDetail,
  GridPro,
  MagneticType,
} from '../../types/elementDetail'
import { getElementPeriod } from '../../data'
import {
  getElementRadiacodeIsotope,
  getElementSpectrumUrl,
  getRadiacodeIsotopeUrl,
  isElementRadioactive,
  isElementWeaklyRadioactive,
} from '../../data'
import {
  resolveCollectionLabel,
  resolveCollectionSampleState,
  resolveSourceType,
  formatCollectionPurity,
} from '../collection/labels'
import {
  formatIonChargeHtml,
  formatOpener,
  getElementSampleColorFinish,
  getElementSampleColorHex,
} from './formatters'
import { getPubChemUrl } from '../external-links/pubchem'
import {
  formatDecayChainHtml,
  formatDecayType,
  formatIsotopeHtml,
  formatMainIsotopesHtml,
} from './isotopes'
import { formatNucleusDurationDisplay } from '../heatmap'
import { getElementApplications, getElementDescription } from '../../locales'
import { collectionName } from '../../data/collection'
import { resolveLocalizedLabel } from '../localizedLabel'

const SECTION_COLORS: Record<DetailSection['id'], string> = {
  overview: '#f6511d',
  description: '#6f42c1',
  collection: '#c9a227',
  properties: '#00a878',
  thermodynamic: '#3f84e5',
  atomic: '#ce2d4f',
  electromagnetic: '#258ea6',
  grid: '#ce2d4f',
  additional: '#e94f37',
  reactivity: '#53a548',
  nuclear: '#ce2d4f',
  nfpa: '#e76f2a',
  ghs: '#c0392b',
  prevalence: '#0e63a5',
  applications: '#5b4b8a',
}

const GRID_STRUCTURES: Record<string, keyof LocaleMessages['sidebar']['gridStructures']> = {
  '1': 'hexagonal',
  '2': 'hcp',
  '3': 'bcc',
  '4': 'fcc',
  '5': 'rhombohedral',
  '6': 'simpleHexagonal',
  '7': 'cubic',
  '8': 'diamondCubic',
  '9': 'orthorhombic',
  '10': 'tetragonal',
  '11': 'doubleHcp',
  '12': 'monoclinic',
}

const COUNTRY_FLAGS: Record<string, string> = {
  GB: '🇬🇧',
  US: '🇺🇸',
  FR: '🇫🇷',
  DE: '🇩🇪',
  SE: '🇸🇪',
  RU: '🇷🇺',
  IT: '🇮🇹',
  ES: '🇪🇸',
  CH: '🇨🇭',
  AT: '🇦🇹',
  DK: '🇩🇰',
  FI: '🇫🇮',
  MX: '🇲🇽',
  RO: '🇷🇴',
  PE: '🇵🇪',
  EG: '🇪🇬',
}

const EMPTY = '----'

const HTML_TAG = /<\/?[a-z][\s\S]*?>/i

function containsHtml(value: string): boolean {
  return HTML_TAG.test(value)
}

function fmt(value: string | number | null | undefined): string {
  if (value === null || value === undefined || value === '') return EMPTY
  return String(value)
}

function fmtTemp(celsius: string | null | undefined, labels: LocaleMessages['sidebar']['units']): string {
  if (!celsius || celsius === EMPTY) return EMPTY
  const c = Number(celsius)
  if (Number.isNaN(c)) return celsius
  const f = c * 9 / 5 + 32
  const k = c + 273.15
  return `${celsius}${labels.celsius} = ${f.toFixed(2)}${labels.fahrenheit} = ${k.toFixed(2)}${labels.kelvin}`
}

function fmtDebyeTemp(kelvin: string | null | undefined, labels: LocaleMessages['sidebar']['units']): string {
  if (!kelvin || kelvin === EMPTY) return EMPTY
  const k = Number(kelvin)
  if (Number.isNaN(k) || k === 0) return EMPTY
  const c = k - 273.15
  const f = c * 9 / 5 + 32
  const kLabel = Number.isInteger(k) ? String(k) : kelvin
  return `${kLabel}${labels.kelvin} = ${c.toFixed(2)}${labels.celsius} = ${f.toFixed(2)}${labels.fahrenheit}`
}

function pickDebyeTemp(values: string[], index: number): string | undefined {
  const raw = pickGridField(values, index)
  if (raw === undefined || raw === '0' || !raw.trim()) return undefined
  return raw
}

function prop(label: string, value: string, html?: boolean): DetailProp {
  const empty = !value || value === EMPTY
  const rendered = empty ? EMPTY : value
  return {
    label,
    value: rendered,
    html: html ?? (!empty && containsHtml(rendered)),
    empty,
  }
}

function propLink(label: string, value: string, href: string | null): DetailProp {
  const empty = !value || value === EMPTY || !href
  return {
    label,
    value: empty ? EMPTY : value,
    href: empty ? null : href,
    empty,
  }
}

function propMiniTable(): DetailProp {
  return {
    label: '',
    value: '',
    kind: 'miniTable',
    empty: false,
  }
}

function propColor(
  label: string,
  colorHex: string | null,
  colorFinish?: DetailProp['colorFinish'],
): DetailProp {
  return {
    label,
    value: EMPTY,
    colorHex,
    colorFinish: colorHex ? colorFinish : undefined,
    empty: !colorHex,
  }
}

function propImage(label: string, imageUrl: string | null): DetailProp {
  return {
    label,
    value: EMPTY,
    imageUrl,
    empty: !imageUrl,
  }
}

function propCollectionSpectrum(
  label: string,
  spectrumId: string | null | undefined,
): DetailProp {
  return {
    label,
    value: EMPTY,
    collectionSpectrumId: spectrumId ?? null,
    empty: !spectrumId,
  }
}

function blockLabel(
  block: string | null | undefined,
  messages: LocaleMessages,
): string {
  if (!block) return EMPTY
  const key = block.toLowerCase() as keyof LocaleMessages['sidebar']['blocks']
  return messages.sidebar.blocks[key] ?? `${block} - ${messages.sidebar.blockSuffix}`
}

function aggregationLabel(
  state: AggregationState | null | undefined,
  messages: LocaleMessages,
): string {
  if (!state) return EMPTY
  return messages.sidebar.aggregationState[state] ?? EMPTY
}

function magneticLabel(
  type: MagneticType | null | undefined,
  messages: LocaleMessages,
): string {
  if (!type) return EMPTY
  return messages.sidebar.magneticType[type] ?? type
}

function formatSingleCountry(
  code: string,
  messages: LocaleMessages,
): string {
  const flag = COUNTRY_FLAGS[code] ?? ''
  const name = messages.sidebar.countries[code]
  if (!name) return flag ? `${flag} — ${code}` : code
  return flag ? `${flag} — ${name}` : name
}

function countryLabel(
  code: string | null | undefined,
  messages: LocaleMessages,
): string {
  if (!code) return EMPTY
  const parts = code.split(',').map((part) => part.trim()).filter(Boolean)
  if (parts.length === 0) return EMPTY
  return parts.map((part) => formatSingleCountry(part, messages)).join(', ')
}

function splitGridField(value: string | null | undefined): string[] {
  if (!value?.trim()) return []
  return value.split('|').map((part) => part.trim())
}

function fmtGridField(value: string | undefined): string {
  if (!value || value === '0') return EMPTY
  return value
}

function pickGridField(values: string[], index: number, singleFallback = false): string | undefined {
  const raw = values[index]
  if (raw?.trim()) return raw
  if (singleFallback && values.length === 1 && values[0]?.trim()) return values[0]
  return undefined
}

function gridStructureLabel(
  num: string | null | undefined,
  messages: LocaleMessages,
): string {
  if (!num) return EMPTY
  const key = GRID_STRUCTURES[num.trim()]
  return key ? messages.sidebar.gridStructures[key] : num
}

function buildGridSections(
  g: GridPro | undefined,
  messages: LocaleMessages,
  s: LocaleMessages['sidebar'],
  u: LocaleMessages['sidebar']['units'],
): DetailSection[] {
  const structureNums = splitGridField(g?.gridStructureNum)
  const params = splitGridField(g?.gridParams)
  const ratios = splitGridField(g?.ratio)
  const debyeTemps = splitGridField(g?.debyeTemperature)

  if (structureNums.length === 0) {
    return [{
      id: 'grid',
      sectionKey: 'grid',
      title: s.sections.grid,
      color: SECTION_COLORS.grid,
      gridStructureNum: null,
      items: [
        prop(s.props.gridStructure, EMPTY),
        prop(s.props.gridParams, EMPTY),
        prop(s.props.gridRatio, EMPTY),
        prop(s.props.debyeTemp, EMPTY),
      ],
    }]
  }

  const multiple = structureNums.length > 1

  return structureNums.map((numStr, index) => {
    const structureNum = Number(numStr)
    const variant = index + 1
    const items: DetailProp[] = [
      prop(s.props.gridStructure, gridStructureLabel(numStr, messages)),
      prop(s.props.gridParams, fmtGridField(pickGridField(params, index, true))),
      prop(s.props.gridRatio, fmtGridField(pickGridField(ratios, index, true))),
      prop(
        s.props.debyeTemp,
        fmtDebyeTemp(pickDebyeTemp(debyeTemps, index), u),
      ),
    ]

    if (index === 0) {
      if (g?.space1) {
        items.push(prop(s.props.spaceGroup, fmt(g.space1), true))
      }
      if (g?.space2) {
        items.push(prop(s.props.spaceGroupNumber, fmt(g.space2)))
      }
    }

    return {
      id: 'grid' as const,
      sectionKey: multiple ? `grid-${variant}` : 'grid',
      title: multiple
        ? s.sections.gridNumbered.replace('{{n}}', String(variant))
        : s.sections.grid,
      color: SECTION_COLORS.grid,
      gridStructureNum: Number.isFinite(structureNum) ? structureNum : null,
      items,
    }
  })
}

function withSectionKey(section: DetailSection): DetailSection {
  return {
    ...section,
    sectionKey: section.sectionKey ?? section.id,
  }
}

function withUnit(value: string | null | undefined, unit: string): string {
  const v = fmt(value)
  return v === EMPTY ? EMPTY : `${v} ${unit}`
}

export function buildElementSections(
  detail: ElementDetail,
  element: Element,
  messages: LocaleMessages,
  elementName: string,
  locale: Locale,
): DetailSection[] {
  const s = messages.sidebar
  const u = s.units
  const o = detail.OverviewCommon
  const p = detail.PropertiesCommon
  const t = detail.ThermoPro
  const a = detail.AtomicCommon
  const e = detail.ElectromagneticCommon
  const g = detail.GridPro
  const add = detail.AdditionalPro
  const r = detail.ReactivityCommon
  const n = detail.NucleusPro
  const pr = detail.PrevalenceCommon
  const period = getElementPeriod(element)

  const overviewSection: DetailSection = {
    id: 'overview',
    title: s.sections.overview,
    color: SECTION_COLORS.overview,
    items: [
      prop(s.props.latinName, fmt(o?.latinName)),
      prop(s.props.englishName, fmt(o?.englishName)),
      prop(s.props.discoveryYear, fmt(o?.elementOpenedYear)),
      prop(s.props.discoveryOpener, formatOpener(o?.elementOpener, locale)),
      prop(s.props.discoveryCountry, countryLabel(o?.countryOpener, messages)),
      prop(s.props.casNumber, fmt(o?.casNumber)),
      propColor(
        s.props.color,
        getElementSampleColorHex(detail.number),
        getElementSampleColorFinish(detail.number),
      ),
      prop(s.props.electronShell, fmt(o?.elementShell)),
    ],
  }

  const showRadioactiveCollectionFields =
    isElementRadioactive(detail.number) && !isElementWeaklyRadioactive(detail.number)

  const collectionItems: DetailProp[] = []

  const purity = prop(
    s.props.collectionPurity,
    fmt(formatCollectionPurity(element.collection?.physical?.purity)),
  )
  if (!purity.empty) collectionItems.push(purity)

  collectionItems.push(
    prop(
      s.props.collectionSampleState,
      fmt(resolveCollectionSampleState(locale, element.collection)),
    ),
    prop(
      s.props.collectionContainer,
      fmt(resolveCollectionLabel(locale, 'containers', element.collection?.physical?.container)),
    ),
  )

  if (showRadioactiveCollectionFields) {
    const radioactive = element.collection?.radioactive

    collectionItems.push(
      prop(
        s.props.collectionIsotope,
        formatIsotopeHtml(element.symbol, radioactive?.isotope),
        true,
      ),
    )

    if (radioactive?.sourceType === 'secondary') {
      collectionItems.push(
        prop(
          s.props.collectionSourceType,
          fmt(resolveSourceType(locale, radioactive?.sourceType)),
        ),
      )
    }

    const decayParent = prop(
      s.props.collectionDecayParent,
      formatDecayChainHtml(element.symbol, radioactive?.isotope, radioactive?.decayParent),
      true,
    )
    if (!decayParent.empty) collectionItems.push(decayParent)

    const spectrum = propCollectionSpectrum(
      s.props.collectionSpectrum,
      element.collection?.spectrum?.id,
    )
    if (!spectrum.empty) collectionItems.push(spectrum)
  }

  const collectionSection: DetailSection = {
    id: 'collection',
    title: resolveLocalizedLabel(collectionName, locale),
    color: SECTION_COLORS.collection,
    items: collectionItems,
  }

  const applicationsSection: DetailSection = {
    id: 'applications',
    title: s.sections.applications,
    color: SECTION_COLORS.applications,
    items: [prop('', getElementApplications(detail.number, locale))],
  }

  const descriptionSection: DetailSection = {
    id: 'description',
    title: s.sections.description,
    color: SECTION_COLORS.description,
    items: [prop('', getElementDescription(detail.number, locale))],
  }

  const sections: DetailSection[] = [
    ...(element.inCollection ? [collectionSection] : []),
    overviewSection,
    descriptionSection,
    applicationsSection,
    {
      id: 'properties',
      title: s.sections.properties,
      color: SECTION_COLORS.properties,
      items: [
        prop(s.props.atomicNumber, String(detail.number)),
        prop(s.props.atomicMass, withUnit(p?.elementMasse, u.gPerMol)),
        prop(s.props.density, withUnit(p?.elementDensity, u.gPerCm3)),
        prop(s.props.meltingPoint, fmtTemp(p?.elementMeltingPoint, u)),
        prop(s.props.boilingPoint, fmtTemp(p?.elementBoilingPoint, u)),
        prop(s.props.valence, fmt(p?.elValence)),
        prop(s.props.period, String(period)),
        prop(s.props.group, fmt(p?.elementGroup)),
        prop(s.props.block, blockLabel(p?.elementBlock, messages)),
        propMiniTable(),
        propImage(s.props.emissionSpectrum, getElementSpectrumUrl(detail.number)),
      ],
    },
    {
      id: 'atomic',
      title: s.sections.atomic,
      color: SECTION_COLORS.atomic,
      items: [
        prop(s.props.electronConfig, fmt(o?.elementConfiguration)),
        prop(
          s.props.ionCharge,
          formatIonChargeHtml(element.symbol, a?.ionCharge),
          true,
        ),
        prop(s.props.ionizationPotential, withUnit(a?.ionizationPotential, u.eV)),
        prop(s.props.atomicRadius, withUnit(a?.atomicRadius, u.pm)),
        prop(s.props.covalentRadius, withUnit(a?.covalentRadius, u.pm)),
        prop(s.props.vanDerWaalsRadius, withUnit(a?.vanDerWaalsRadius, u.pm)),
      ],
    },
    {
      id: 'reactivity',
      title: s.sections.reactivity,
      color: SECTION_COLORS.reactivity,
      items: [
        prop(s.props.electronegativity, fmt(r?.electronegativity)),
        prop(s.props.valence, fmt(p?.elValence)),
        prop(s.props.electronAffinity, withUnit(r?.atomElectronEnergy, u.kjPerMol)),
      ],
    },
    {
      id: 'thermodynamic',
      title: s.sections.thermodynamic,
      color: SECTION_COLORS.thermodynamic,
      items: [
        prop(s.props.aggregationState, aggregationLabel(p?.aggregationState, messages)),
        prop(s.props.fusionHeat, withUnit(t?.fusionHeat, u.kjPerMol)),
        prop(s.props.specificHeat, withUnit(t?.specificHeat, u.jPerKgK)),
        prop(s.props.thermalExpansion, fmt(t?.thermalExpansion)),
        prop(s.props.vaporizationHeat, withUnit(t?.vaporizationHeat, u.kjPerMol)),
      ],
    },
    {
      id: 'electromagnetic',
      title: s.sections.electromagnetic,
      color: SECTION_COLORS.electromagnetic,
      items: [
        prop(s.props.electroConductivity, fmt(e?.es_electro)),
        prop(s.props.electricType, fmt(e?.es_etype)),
        prop(s.props.magneticType, magneticLabel(e?.es_mtype, messages)),
        prop(s.props.volumeMagneticSusceptibility, fmt(e?.es_omvospr), true),
        prop(s.props.massMagneticSusceptibility, fmt(e?.es_umvospr), true),
        prop(s.props.molarMagneticSusceptibility, fmt(e?.es_mmvospr), true),
        prop(s.props.resistivity, fmt(e?.es_udel)),
        prop(s.props.superconductivityTemp, fmt(e?.es_temp)),
      ],
    },
    ...buildGridSections(g, messages, s, u),
    {
      id: 'additional',
      title: s.sections.additional,
      color: SECTION_COLORS.additional,
      items: [
        propLink(s.props.cid, fmt(add?.numberCID), getPubChemUrl(add?.numberCID)),
        prop(s.props.rtec, fmt(add?.numberRTEC)),
        prop(s.props.brinellHardness, fmt(add?.brinellHardness)),
        prop(s.props.mohsHardness, fmt(add?.mohsHardness)),
        prop(s.props.vickersHardness, fmt(add?.vickersHardness)),
        prop(s.props.bulkModulus, fmt(add?.bulkModulus)),
        prop(s.props.youngModulus, fmt(add?.youngModulus)),
        prop(s.props.liquidDensity, fmt(add?.liquidDensity)),
        prop(s.props.molarVolume, withUnit(add?.molarValue, u.cm3PerMol)),
        prop(s.props.poissonRatio, fmt(add?.poissonRatio)),
        prop(s.props.shearModulus, fmt(add?.shearModulus)),
        prop(s.props.soundSpeed, withUnit(add?.soundSpeed, u.mPerS)),
        prop(s.props.refractiveIndex, fmt(add?.refractiveIndex)),
        prop(s.props.thermalConductivity, withUnit(add?.thermalConductivity, u.wPerMK)),
      ],
    },
    (() => {
      const nuclearItems: DetailProp[] = [
        prop(
          s.props.radioactive,
          isElementWeaklyRadioactive(detail.number)
            ? messages.sidebar.weakRadioactiveYes
            : isElementRadioactive(detail.number)
              ? messages.sidebar.yes
              : messages.sidebar.no,
        ),
        prop(
          s.props.mainIsotopes,
          formatMainIsotopesHtml(element.symbol),
          true,
        ),
        prop(s.props.decayType, formatDecayType(detail.number, locale)),
        prop(s.props.halfLife, formatNucleusDurationDisplay(n?.halfLife, locale, messages) || EMPTY),
        prop(s.props.lifetime, formatNucleusDurationDisplay(n?.lifetime, locale, messages) || EMPTY),
        prop(s.props.neutronCrossSection, n?.neutronCrossSection ? `${n.neutronCrossSection} (b)` : EMPTY),
      ]

      if (isElementRadioactive(detail.number)) {
        const rc = getElementRadiacodeIsotope(detail.number)
        if (rc) {
          nuclearItems.push(
            propLink(s.props.spectrum, rc.isotope, getRadiacodeIsotopeUrl(rc.slug)),
          )
        }
      }

      return {
        id: 'nuclear' as const,
        title: s.sections.nuclear,
        color: SECTION_COLORS.nuclear,
        items: nuclearItems,
      }
    })(),
    {
      id: 'nfpa',
      title: s.sections.nfpa,
      color: SECTION_COLORS.nfpa,
      items: [],
    },
    {
      id: 'ghs',
      title: s.sections.ghs,
      color: SECTION_COLORS.ghs,
      items: [],
    },
    {
      id: 'prevalence',
      title: s.sections.prevalence,
      color: SECTION_COLORS.prevalence,
      items: [
        prop(s.prevalence.universe.replace('%s', elementName), pr?.prevalence1 ? `${pr.prevalence1}%` : EMPTY),
        prop(s.prevalence.sun.replace('%s', elementName), pr?.prevalence2 ? `${pr.prevalence2}%` : EMPTY),
        prop(s.prevalence.ocean.replace('%s', elementName), pr?.prevalence3 ? `${pr.prevalence3}%` : EMPTY),
        prop(s.prevalence.human.replace('%s', elementName), pr?.prevalence4 ? `${pr.prevalence4}%` : EMPTY),
        prop(s.prevalence.crust.replace('%s', elementName), pr?.prevalence5 ? `${pr.prevalence5}%` : EMPTY),
        prop(s.prevalence.meteorites.replace('%s', elementName), pr?.prevalence6 ? `${pr.prevalence6}%` : EMPTY),
      ],
    },
  ]

  return sections.map(withSectionKey)
}

export interface SectionEmptyContext {
  nfpaDisplay: unknown
  ghsDisplay: unknown[]
  oxidationStates: OxidationStateRows | null
  elementShell?: string | null
  elementE?: string | null
  elementP?: string | null
  elementN?: string | null
}

function hasOxidationContent(rows: OxidationStateRows | null): boolean {
  if (!rows) return false
  return [...rows.negative, ...rows.positive].some((cell) => cell.variant !== 'empty')
}

export function isSectionEmpty(section: DetailSection, context: SectionEmptyContext): boolean {
  switch (section.id) {
    case 'nfpa':
      return !context.nfpaDisplay
    case 'ghs':
      return !context.ghsDisplay?.length
    case 'grid':
      return section.items.every((item) => item.empty) && !section.gridStructureNum
    case 'atomic':
      return section.items.every((item) => item.empty) && !hasOxidationContent(context.oxidationStates)
    case 'overview':
      return (
        section.items.every((item) => item.empty) &&
        !context.elementShell &&
        !context.elementE &&
        !context.elementP &&
        !context.elementN
      )
    case 'applications':
    case 'description':
      return section.items.every((item) => item.empty)
    default:
      return section.items.every((item) => item.empty)
  }
}

export interface OxidationCell {
  label: string
  variant: 'empty' | 'zero' | 'negative' | 'positive'
}

export interface OxidationStateRows {
  negative: OxidationCell[]
  positive: OxidationCell[]
}

function negativeCellVariant(value: string): OxidationCell['variant'] {
  if (value === '-') return 'empty'
  if (value === '0') return 'zero'
  return 'negative'
}

function positiveCellVariant(value: string): OxidationCell['variant'] {
  if (value === '-') return 'empty'
  if (value === '0') return 'zero'
  return 'positive'
}

/** Laid out like on periodic-table.tech: 6 negative + 9 positive slots */
export function parseOxidationStates(raw: string | null | undefined): OxidationStateRows | null {
  if (!raw) return null
  const parts = raw.split(',').map((s) => s.trim())
  if (!parts.length) return null

  const get = (index: number) => parts[index] ?? '-'
  const c = get(0)
  const s = get(1)
  const l = get(2)
  const i = get(3)
  const r = get(4)
  const a = get(5)

  const negative: OxidationCell[] = [
    { label: a, variant: negativeCellVariant(a) },
    { label: r !== '-' ? `-${r}` : r, variant: negativeCellVariant(r) },
    { label: i !== '-' ? `-${i}` : i, variant: negativeCellVariant(i) },
    { label: l !== '-' ? `-${l}` : l, variant: negativeCellVariant(l) },
    { label: s !== '-' ? `-${s}` : s, variant: negativeCellVariant(s) },
    { label: c !== '-' ? `-${c}` : c, variant: negativeCellVariant(c) },
  ]

  const positive: OxidationCell[] = [6, 7, 8, 9, 10, 11, 12, 13, 14].map((index) => {
    const value = get(index)
    return {
      label: value !== '-' ? `+${value}` : value,
      variant: positiveCellVariant(value),
    }
  })

  return { negative, positive }
}

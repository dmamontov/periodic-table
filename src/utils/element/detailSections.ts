import type { LocaleMessages } from '../../locales/types'
import type { Locale } from '../../locales/types'
import type { Element } from '../../types/element/element'
import type {
  Additional,
  AggregationState,
  Atomic,
  Electromagnetic,
  ElementDetail,
  Grid,
  MagneticType,
  Nucleus,
  Overview,
  Prevalence,
  Properties,
  Reactivity,
  Thermo,
} from '../../types/element/detail'
import type { DetailProp, DetailSection } from '../../types/element/section'
import { getElementPeriod } from '../../data'
import {
  getElementProductionCountries,
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
  formatCollectionAcquiredDate,
  formatCollectionPurity,
  formatCollectionWeight,
} from '../collection/labels'
import {
  formatIonChargeHtml,
  formatOpener,
  getElementSampleColorFinish,
  getElementSampleColorHex,
} from './formatters'
import { getPubChemUrl } from '../external-links/pubchem'
import { SECTION_COLORS } from '../../theme/colors'
import {
  formatDecayChainHtml,
  formatDecayType,
  formatIsotopeHtml,
  formatMainIsotopesHtml,
} from './isotopes'
import { formatNucleusDurationDisplay } from '../heatmap'
import { getElementApplications, getElementDescription, getElementProductionNote } from '../../locales'
import { collectionName } from '../../data/collection'
import { resolveLocalizedLabel } from '../localizedLabel'

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

function propCountryMap(countries: string[]): DetailProp {
  return {
    label: '',
    value: '',
    kind: 'countryMap',
    mapCountries: countries,
    empty: false,
  }
}

const ISO_COUNTRY_CODE = /^[A-Z]{2}$/

function discoveryMapCountries(code: string | null | undefined): string[] {
  if (!code) return []
  return code
    .split(',')
    .map((part) => part.trim())
    .filter((part) => ISO_COUNTRY_CODE.test(part))
    .map((part) => part.toLowerCase())
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
  g: Grid | undefined,
  messages: LocaleMessages,
  s: LocaleMessages['sidebar'],
  u: LocaleMessages['sidebar']['units'],
): DetailSection[] {
  const structureNums = splitGridField(g?.structureCode)
  const params = splitGridField(g?.gridParams)
  const ratios = splitGridField(g?.axialRatio)
  const debyeTemps = splitGridField(g?.debyeTemperature)

  if (structureNums.length === 0) {
    return [{
      id: 'grid',
      sectionKey: 'grid',
      title: s.sections.grid,
      color: SECTION_COLORS.grid,
      structureCode: null,
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
      if (g?.spaceGroup) {
        items.push(prop(s.props.spaceGroup, fmt(g.spaceGroup)))
      }
      if (g?.spaceGroupNumber) {
        items.push(prop(s.props.spaceGroupNumber, fmt(g.spaceGroupNumber)))
      }
    }

    return {
      id: 'grid' as const,
      sectionKey: multiple ? `grid-${variant}` : 'grid',
      title: multiple
        ? s.sections.gridNumbered.replace('{{n}}', String(variant))
        : s.sections.grid,
      color: SECTION_COLORS.grid,
      structureCode: Number.isFinite(structureNum) ? structureNum : null,
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

interface SectionBuildContext {
  detail: ElementDetail
  element: Element
  messages: LocaleMessages
  elementName: string
  locale: Locale
  s: LocaleMessages['sidebar']
  u: LocaleMessages['sidebar']['units']
  o?: Overview
  p?: Properties
  t?: Thermo
  a?: Atomic
  e?: Electromagnetic
  g?: Grid
  add?: Additional
  r?: Reactivity
  n?: Nucleus
  pr?: Prevalence
  period: number
}

function buildOverviewSection(ctx: SectionBuildContext): DetailSection {
  const { detail, messages, locale, s, o } = ctx
  const discoveryCountries = discoveryMapCountries(o?.discoveryCountry)
  return {
    id: 'overview',
    title: s.sections.overview,
    color: SECTION_COLORS.overview,
    items: [
      prop(s.props.latinName, fmt(o?.latinName)),
      prop(s.props.englishName, fmt(o?.englishName)),
      prop(s.props.discoveryYear, fmt(o?.discoveryYear)),
      prop(s.props.discoveryOpener, formatOpener(o?.discoverer, locale)),
      prop(s.props.discoveryCountry, countryLabel(o?.discoveryCountry, messages)),
      ...(discoveryCountries.length > 0 ? [propCountryMap(discoveryCountries)] : []),
      prop(s.props.casNumber, fmt(o?.casNumber)),
      propColor(
        s.props.color,
        getElementSampleColorHex(detail.number),
        getElementSampleColorFinish(detail.number),
      ),
      prop(s.props.electronShell, fmt(o?.electronShellConfig)),
    ],
  }
}

function buildCollectionSection(ctx: SectionBuildContext): DetailSection {
  const { detail, element, locale, s, u } = ctx
  const showRadioactiveCollectionFields =
    isElementRadioactive(detail.number) && !isElementWeaklyRadioactive(detail.number)

  const collectionItems: DetailProp[] = []

  const purity = prop(
    s.props.collectionPurity,
    fmt(formatCollectionPurity(element.collection?.physical?.purity)),
  )
  if (!purity.empty) collectionItems.push(purity)

  const weight = prop(
    s.props.collectionWeight,
    fmt(formatCollectionWeight(element.collection?.physical?.weight, u.gram)),
  )
  if (!weight.empty) collectionItems.push(weight)

  collectionItems.push(
    prop(
      s.props.collectionSampleState,
      fmt(resolveCollectionSampleState(locale, element.collection)),
    ),
  )

  const allotrope = prop(
    s.props.collectionAllotrope,
    fmt(resolveLocalizedLabel(element.collection?.physical?.allotrope, locale)),
  )
  if (!allotrope.empty) collectionItems.push(allotrope)

  collectionItems.push(
    prop(
      s.props.collectionContainer,
      fmt(resolveCollectionLabel(locale, 'containers', element.collection?.physical?.container)),
    ),
  )

  const acquiredDate = prop(
    s.props.collectionAcquiredDate,
    fmt(formatCollectionAcquiredDate(element.collection?.physical?.acquiredDate, locale)),
  )
  if (!acquiredDate.empty) collectionItems.push(acquiredDate)

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

  return {
    id: 'collection',
    title: resolveLocalizedLabel(collectionName, locale),
    color: SECTION_COLORS.collection,
    items: collectionItems,
  }
}

function buildApplicationsSection(ctx: SectionBuildContext): DetailSection {
  const { detail, locale, s } = ctx
  return {
    id: 'applications',
    title: s.sections.applications,
    color: SECTION_COLORS.applications,
    items: [prop('', getElementApplications(detail.number, locale))],
  }
}

function buildDescriptionSection(ctx: SectionBuildContext): DetailSection {
  const { detail, locale, s } = ctx
  return {
    id: 'description',
    title: s.sections.description,
    color: SECTION_COLORS.description,
    items: [prop('', getElementDescription(detail.number, locale))],
  }
}

function buildMiningSection(ctx: SectionBuildContext): DetailSection {
  const { detail, locale, s } = ctx
  return {
    id: 'mining',
    title: s.sections.mining,
    color: SECTION_COLORS.mining,
    items: [],
    miningCountries: getElementProductionCountries(detail.number),
    miningNote: getElementProductionNote(detail.number, locale),
  }
}

function buildPropertiesSection(ctx: SectionBuildContext): DetailSection {
  const { detail, messages, s, u, p, period } = ctx
  return {
    id: 'properties',
    title: s.sections.properties,
    color: SECTION_COLORS.properties,
    items: [
      prop(s.props.atomicNumber, String(detail.number)),
      prop(s.props.atomicMass, withUnit(p?.atomicMass, u.gPerMol)),
      prop(s.props.density, withUnit(p?.density, u.gPerCm3)),
      prop(s.props.meltingPoint, fmtTemp(p?.meltingPoint, u)),
      prop(s.props.boilingPoint, fmtTemp(p?.boilingPoint, u)),
      prop(s.props.valence, fmt(p?.valence)),
      prop(s.props.period, String(period)),
      prop(s.props.group, fmt(p?.group)),
      prop(s.props.block, blockLabel(p?.block, messages)),
      propMiniTable(),
      propImage(s.props.emissionSpectrum, getElementSpectrumUrl(detail.number)),
    ],
  }
}

function buildAtomicSection(ctx: SectionBuildContext): DetailSection {
  const { element, s, u, o, a } = ctx
  return {
    id: 'atomic',
    title: s.sections.atomic,
    color: SECTION_COLORS.atomic,
    items: [
      prop(s.props.electronConfig, fmt(o?.electronConfiguration)),
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
  }
}

function buildReactivitySection(ctx: SectionBuildContext): DetailSection {
  const { s, u, p, r } = ctx
  return {
    id: 'reactivity',
    title: s.sections.reactivity,
    color: SECTION_COLORS.reactivity,
    items: [
      prop(s.props.electronegativity, fmt(r?.electronegativity)),
      prop(s.props.valence, fmt(p?.valence)),
      prop(s.props.electronAffinity, withUnit(r?.electronAffinity, u.kjPerMol)),
    ],
  }
}

function buildThermodynamicSection(ctx: SectionBuildContext): DetailSection {
  const { messages, s, u, p, t } = ctx
  return {
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
  }
}

function buildElectromagneticSection(ctx: SectionBuildContext): DetailSection {
  const { messages, s, e } = ctx
  return {
    id: 'electromagnetic',
    title: s.sections.electromagnetic,
    color: SECTION_COLORS.electromagnetic,
    items: [
      prop(s.props.electroConductivity, fmt(e?.electricalConductivity)),
      prop(s.props.electricType, fmt(e?.electricalType)),
      prop(s.props.magneticType, magneticLabel(e?.magneticType, messages)),
      prop(s.props.volumeMagneticSusceptibility, fmt(e?.volumeMagneticSusceptibility)),
      prop(s.props.massMagneticSusceptibility, fmt(e?.massMagneticSusceptibility)),
      prop(s.props.molarMagneticSusceptibility, fmt(e?.molarMagneticSusceptibility)),
      prop(s.props.resistivity, fmt(e?.electricalResistivity)),
      prop(s.props.superconductivityTemp, fmt(e?.superconductingTemperature)),
    ],
  }
}

function buildAdditionalSection(ctx: SectionBuildContext): DetailSection {
  const { s, u, add } = ctx
  return {
    id: 'additional',
    title: s.sections.additional,
    color: SECTION_COLORS.additional,
    items: [
      propLink(s.props.cid, fmt(add?.pubchemCid), getPubChemUrl(add?.pubchemCid)),
      prop(s.props.rtec, fmt(add?.rtecsNumber)),
      prop(s.props.brinellHardness, fmt(add?.brinellHardness)),
      prop(s.props.mohsHardness, fmt(add?.mohsHardness)),
      prop(s.props.vickersHardness, fmt(add?.vickersHardness)),
      prop(s.props.bulkModulus, fmt(add?.bulkModulus)),
      prop(s.props.youngModulus, fmt(add?.youngModulus)),
      prop(s.props.liquidDensity, fmt(add?.liquidDensity)),
      prop(s.props.molarVolume, withUnit(add?.molarVolume, u.cm3PerMol)),
      prop(s.props.poissonRatio, fmt(add?.poissonRatio)),
      prop(s.props.shearModulus, fmt(add?.shearModulus)),
      prop(s.props.soundSpeed, withUnit(add?.soundSpeed, u.mPerS)),
      prop(s.props.refractiveIndex, fmt(add?.refractiveIndex)),
      prop(s.props.thermalConductivity, withUnit(add?.thermalConductivity, u.wPerMK)),
    ],
  }
}

function buildNuclearSection(ctx: SectionBuildContext): DetailSection {
  const { detail, element, messages, locale, s, n } = ctx
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
    id: 'nuclear',
    title: s.sections.nuclear,
    color: SECTION_COLORS.nuclear,
    items: nuclearItems,
  }
}

function buildNfpaSection(ctx: SectionBuildContext): DetailSection {
  return {
    id: 'nfpa',
    title: ctx.s.sections.nfpa,
    color: SECTION_COLORS.nfpa,
    items: [],
  }
}

function buildGhsSection(ctx: SectionBuildContext): DetailSection {
  return {
    id: 'ghs',
    title: ctx.s.sections.ghs,
    color: SECTION_COLORS.ghs,
    items: [],
  }
}

function buildPrevalenceSection(ctx: SectionBuildContext): DetailSection {
  const { elementName, s, pr } = ctx
  return {
    id: 'prevalence',
    title: s.sections.prevalence,
    color: SECTION_COLORS.prevalence,
    items: [
      prop(s.prevalence.universe.replace('%s', elementName), pr?.universe ? `${pr.universe}%` : EMPTY),
      prop(s.prevalence.sun.replace('%s', elementName), pr?.sun ? `${pr.sun}%` : EMPTY),
      prop(s.prevalence.ocean.replace('%s', elementName), pr?.ocean ? `${pr.ocean}%` : EMPTY),
      prop(s.prevalence.human.replace('%s', elementName), pr?.humanBody ? `${pr.humanBody}%` : EMPTY),
      prop(s.prevalence.crust.replace('%s', elementName), pr?.crust ? `${pr.crust}%` : EMPTY),
      prop(s.prevalence.meteorites.replace('%s', elementName), pr?.meteorites ? `${pr.meteorites}%` : EMPTY),
    ],
  }
}

export function buildElementSections(
  detail: ElementDetail,
  element: Element,
  messages: LocaleMessages,
  elementName: string,
  locale: Locale,
): DetailSection[] {
  const ctx: SectionBuildContext = {
    detail,
    element,
    messages,
    elementName,
    locale,
    s: messages.sidebar,
    u: messages.sidebar.units,
    o: detail.overview,
    p: detail.properties,
    t: detail.thermo,
    a: detail.atomic,
    e: detail.electromagnetic,
    g: detail.grid,
    add: detail.additional,
    r: detail.reactivity,
    n: detail.nucleus,
    pr: detail.prevalence,
    period: getElementPeriod(element),
  }

  const sections: DetailSection[] = [
    ...(element.inCollection ? [buildCollectionSection(ctx)] : []),
    buildOverviewSection(ctx),
    buildDescriptionSection(ctx),
    buildApplicationsSection(ctx),
    buildPropertiesSection(ctx),
    buildAtomicSection(ctx),
    buildReactivitySection(ctx),
    buildThermodynamicSection(ctx),
    buildElectromagneticSection(ctx),
    ...buildGridSections(ctx.g, ctx.messages, ctx.s, ctx.u),
    buildAdditionalSection(ctx),
    buildNuclearSection(ctx),
    buildNfpaSection(ctx),
    buildGhsSection(ctx),
    buildPrevalenceSection(ctx),
    buildMiningSection(ctx),
  ]

  return sections.map(withSectionKey)
}

export interface SectionEmptyContext {
  nfpaDisplay: unknown
  ghsDisplay: unknown[]
  oxidationStates: OxidationStateRows | null
  electronShellConfig?: string | null
  electronCount?: string | null
  protonCount?: string | null
  neutronCount?: string | null
}

function hasOxidationContent(rows: OxidationStateRows | null): boolean {
  if (!rows) return false
  return [...rows.negative, ...rows.positive].some((cell) => cell.variant !== 'empty')
}

export function isSectionEmpty(section: DetailSection, context: SectionEmptyContext): boolean {
  switch (section.id) {
    case 'mining':
      return false
    case 'nfpa':
      return !context.nfpaDisplay
    case 'ghs':
      return !context.ghsDisplay?.length
    case 'grid':
      return section.items.every((item) => item.empty) && !section.structureCode
    case 'atomic':
      return section.items.every((item) => item.empty) && !hasOxidationContent(context.oxidationStates)
    case 'overview':
      return (
        section.items.every((item) => item.empty) &&
        !context.electronShellConfig &&
        !context.electronCount &&
        !context.protonCount &&
        !context.neutronCount
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

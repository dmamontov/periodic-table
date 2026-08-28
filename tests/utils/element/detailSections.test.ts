import { describe, expect, it, vi } from 'vitest';
import {
  buildElementSections,
  isSectionEmpty,
  parseOxidationStates,
  type SectionEmptyContext,
} from '../../../src/utils/element/detailSections';
import { localeMessages } from '../../../src/locales';
import { hasElementSpectrum } from '../../../src/utils/element/assets';
import type { Element } from '../../../src/types/element/element';
import type { ElementDetail } from '../../../src/types/element/detail';
import type { DetailSection } from '../../../src/types/element/section';

const messages = localeMessages.ru;

function findNumberWithSpectrum(): number {
  for (let n = 1; n <= 118; n++) if (hasElementSpectrum(n)) return n;
  throw new Error('No element with a spectrum found in test data');
}

function findNumberWithoutSpectrum(): number {
  for (let n = 1; n <= 118; n++) if (!hasElementSpectrum(n)) return n;
  throw new Error('Every element has a spectrum in test data');
}

function makeElement(overrides: Partial<Element> = {}): Element {
  return {
    number: 1,
    symbol: 'Xx',
    mass: '10.000',
    group: 1,
    oldGroup: 'IA',
    row: 1,
    col: 1,
    periodEnd: false,
    color: '#fff',
    category: 'nonmetal',
    inCollection: false,
    ...overrides,
  };
}

const FULL_DETAIL: ElementDetail = {
  number: 1,
  symbol: 'Xx',
  name: 'Xenium',
  overview: {
    latinName: 'Xenium',
    englishName: 'Xenium',
    discoveryYear: '1900',
    casNumber: 'CAS0000-00-0',
    discoverer: { ru: 'Тест', en: 'Test', zh: '测试' },
    discoveryCountry: 'GB, FR',
    sampleColors: [{ hex: '#112233', finish: 'metallic', label: { ru: 'Металл', en: 'Metal', zh: '金属' } }],
    electronShellConfig: 'K2-L1',
    electronCount: '3',
    protonCount: '3',
    neutronCount: '4',
    hasImage: true,
    hasSpectre: true,
    electronConfiguration: '1s2 2s1',
  },
  description: { ru: 'Описание', en: 'Description', zh: '描述' },
  applications: { ru: 'Применение', en: 'Applications', zh: '应用' },
  properties: {
    atomicMass: '10.811',
    density: '2.34',
    meltingPoint: '100',
    boilingPoint: '200',
    valence: '3',
    group: '13/III',
    block: 's',
    aggregationState: 'solid',
  },
  thermo: {
    fusionHeat: '50.2',
    specificHeat: '1026',
    thermalExpansion: '5 ⋅ 10⁻⁶',
    vaporizationHeat: '480',
  },
  atomic: {
    oxidationState: '3,2,1,0,-1,-2,-3',
    ionCharge: '3+',
    ionizationPotential: '8.298',
    atomicRadius: '90',
    covalentRadius: '84',
    vanDerWaalsRadius: '192',
  },
  electromagnetic: {
    electricalConductivity: '1 ⋅ 10⁷',
    electricalType: 'conductor',
    magneticType: 'diamagnetic',
    volumeMagneticSusceptibility: '-1 ⋅ 10⁻⁵',
    massMagneticSusceptibility: '-6 ⋅ 10⁻⁹',
    molarMagneticSusceptibility: '-7 ⋅ 10⁻¹¹',
    electricalResistivity: '1 ⋅ 10⁻⁶',
    superconductingTemperature: '0.01',
  },
  grid: {
    structureCode: '7',
    gridParams: 'a=5.43 Å',
    axialRatio: '1',
    debyeTemperature: '470',
    spaceGroup: 'Fd-3m',
    spaceGroupNumber: '227',
  },
  additional: {
    pubchemCid: 'CID5462224',
    rtecsNumber: 'RTECS0000000',
    brinellHardness: '2350',
    mohsHardness: '9.5',
    vickersHardness: '2160',
    bulkModulus: '320',
    youngModulus: '440',
    liquidDensity: '2.08',
    molarVolume: '4.39',
    poissonRatio: '0.21',
    shearModulus: '190',
    soundSpeed: '16200',
    refractiveIndex: '2.4',
    thermalConductivity: '27',
  },
  reactivity: {
    electronegativity: '2.04',
    electronAffinity: '26.7',
  },
  nucleus: {
    halfLife: '∞',
    lifetime: '∞',
    neutronCrossSection: '767',
    nfpaCube: '1,0,0,-',
  },
  prevalence: {
    universe: '0.001',
    sun: '0.002',
    ocean: '0.003',
    humanBody: '0.004',
    crust: '0.005',
    meteorites: '0.006',
  },
  ghs: [],
  isotopes: { decay: 'stable', isotopes: [{ mass: 11, abundance: '80.1' }] },
  productionCountries: [{ country: 'us', share: '50' }],
  productionNote: { ru: 'Добывается', en: 'Mined', zh: '开采' },
};

describe('buildElementSections', () => {
  it('builds every section, in order, for an element not in the collection', () => {
    const element = makeElement({ inCollection: false });
    const sections = buildElementSections(FULL_DETAIL, element, messages, 'Xenium', 'ru');
    expect(sections.map((s) => s.id)).toEqual([
      'overview',
      'description',
      'applications',
      'properties',
      'atomic',
      'reactivity',
      'thermodynamic',
      'electromagnetic',
      'grid',
      'additional',
      'nuclear',
      'nfpa',
      'ghs',
      'prevalence',
      'mining',
    ]);
    for (const section of sections) {
      expect(section.sectionKey).toBeTruthy();
      expect(section.color).toBeTruthy();
      expect(section.title).toBeTruthy();
    }
  });

  it('prepends the collection section when the element is in the collection', () => {
    const element = makeElement({
      inCollection: true,
      collection: {
        physical: { sampleState: 'metal', purity: { value: 999 }, weight: { mg: 500 }, container: 'ampoule' },
      },
    });
    const sections = buildElementSections(FULL_DETAIL, element, messages, 'Xenium', 'ru');
    expect(sections[0]!.id).toBe('collection');
    expect(sections[0]!.title).not.toBe('');
  });

  it('resolves a real localized country name with its flag for a known discovery country', () => {
    const element = makeElement();
    const detail: ElementDetail = { ...FULL_DETAIL, overview: { ...FULL_DETAIL.overview, discoveryCountry: 'GB' } };
    const sections = buildElementSections(detail, element, messages, 'Xenium', 'ru');
    const overview = sections.find((s) => s.id === 'overview')!;
    const countryProp = overview.items.find((i) => i.label === messages.sidebar.props.discoveryCountry)!;
    expect(countryProp.value).toContain(messages.sidebar.countries.GB);
    expect(countryProp.value).toContain('🇬🇧');
  });

  it('renders the plain localized name for a known country with no flag on file', () => {
    const element = makeElement();
    const detail: ElementDetail = { ...FULL_DETAIL, overview: { ...FULL_DETAIL.overview, discoveryCountry: 'AR' } };
    const sections = buildElementSections(detail, element, messages, 'Xenium', 'ru');
    const overview = sections.find((s) => s.id === 'overview')!;
    const countryProp = overview.items.find((i) => i.label === messages.sidebar.props.discoveryCountry)!;
    expect(countryProp.value).toBe(messages.sidebar.countries.AR);
  });

  it('renders the empty placeholder when the country code has no real entries after splitting', () => {
    const element = makeElement();
    const detail: ElementDetail = { ...FULL_DETAIL, overview: { ...FULL_DETAIL.overview, discoveryCountry: ', ,' } };
    const sections = buildElementSections(detail, element, messages, 'Xenium', 'ru');
    const overview = sections.find((s) => s.id === 'overview')!;
    const countryProp = overview.items.find((i) => i.label === messages.sidebar.props.discoveryCountry)!;
    expect(countryProp.value).toBe('----');
  });

  it('falls back to the flag-only label for an unnamed country code', () => {
    const element = makeElement();
    const detail: ElementDetail = { ...FULL_DETAIL, overview: { ...FULL_DETAIL.overview, discoveryCountry: 'ZZ' } };
    const sections = buildElementSections(detail, element, messages, 'Xenium', 'ru');
    const overview = sections.find((s) => s.id === 'overview')!;
    const countryProp = overview.items.find((i) => i.label === messages.sidebar.props.discoveryCountry)!;
    expect(countryProp.value).toBe('ZZ');
  });

  it('falls back to the flag-plus-code label for a flagged country with no localized name', () => {
    const element = makeElement();
    const detail: ElementDetail = { ...FULL_DETAIL, overview: { ...FULL_DETAIL.overview, discoveryCountry: 'GB' } };
    const noNameMessages = {
      ...messages,
      sidebar: { ...messages.sidebar, countries: { ...messages.sidebar.countries } },
    };
    delete (noNameMessages.sidebar.countries as Record<string, string>).GB;
    const sections = buildElementSections(detail, element, noNameMessages, 'Xenium', 'ru');
    const overview = sections.find((s) => s.id === 'overview')!;
    const countryProp = overview.items.find((i) => i.label === messages.sidebar.props.discoveryCountry)!;
    expect(countryProp.value).toBe('🇬🇧 — GB');
  });

  it('adds a discovery country map only for real two-letter ISO codes, not antiquity placeholders', () => {
    const element = makeElement();
    const withIso = buildElementSections(
      { ...FULL_DETAIL, overview: { ...FULL_DETAIL.overview, discoveryCountry: 'GB, FR' } },
      element,
      messages,
      'Xenium',
      'ru',
    );
    const overviewWithIso = withIso.find((s) => s.id === 'overview')!;
    expect(overviewWithIso.items.some((i) => i.kind === 'countryMap')).toBe(true);

    const withAntiquity = buildElementSections(
      { ...FULL_DETAIL, overview: { ...FULL_DETAIL.overview, discoveryCountry: 'Anatolia' } },
      element,
      messages,
      'Xenium',
      'ru',
    );
    const overviewAntiquity = withAntiquity.find((s) => s.id === 'overview')!;
    expect(overviewAntiquity.items.some((i) => i.kind === 'countryMap')).toBe(false);
  });

  it('omits the discovery country map when there is no discovery country at all', () => {
    const element = makeElement();
    const detail: ElementDetail = { ...FULL_DETAIL, overview: { ...FULL_DETAIL.overview, discoveryCountry: null } };
    const sections = buildElementSections(detail, element, messages, 'Xenium', 'ru');
    const overview = sections.find((s) => s.id === 'overview')!;
    expect(overview.items.some((i) => i.kind === 'countryMap')).toBe(false);
    const countryProp = overview.items.find((i) => i.label === messages.sidebar.props.discoveryCountry)!;
    expect(countryProp.empty).toBe(true);
  });

  it('renders empty overview fields as the empty placeholder', () => {
    const element = makeElement();
    const detail: ElementDetail = { number: 1, symbol: 'Xx', name: 'Xenium' };
    const sections = buildElementSections(detail, element, messages, 'Xenium', 'ru');
    const overview = sections.find((s) => s.id === 'overview')!;
    expect(overview.items.every((i) => i.empty)).toBe(true);
    expect(overview.items[0]!.value).toBe('----');
  });

  it('resolves sample colors with a missing finish and a missing label to undefined', () => {
    const element = makeElement();
    const detail: ElementDetail = {
      ...FULL_DETAIL,
      overview: { ...FULL_DETAIL.overview, sampleColors: [{ hex: '#abcdef' }] },
    };
    const sections = buildElementSections(detail, element, messages, 'Xenium', 'ru');
    const overview = sections.find((s) => s.id === 'overview')!;
    const colorProp = overview.items.find((i) => i.label === messages.sidebar.props.color)!;
    expect(colorProp.colors![0]!.finish).toBeUndefined();
    expect(colorProp.colors![0]!.label).toBeUndefined();
  });

  it('detects an HTML-bearing ionCharge value and marks it as html', () => {
    const element = makeElement({ symbol: 'Fe' });
    const sections = buildElementSections(FULL_DETAIL, element, messages, 'Xenium', 'ru');
    const atomic = sections.find((s) => s.id === 'atomic')!;
    const ionChargeProp = atomic.items.find((i) => i.label === messages.sidebar.props.ionCharge)!;
    expect(ionChargeProp.html).toBe(true);
    expect(ionChargeProp.value).toContain('<sup>');
  });

  it('formats the melting/boiling point with all three temperature units', () => {
    const element = makeElement();
    const sections = buildElementSections(FULL_DETAIL, element, messages, 'Xenium', 'ru');
    const properties = sections.find((s) => s.id === 'properties')!;
    const meltingProp = properties.items.find((i) => i.label === messages.sidebar.props.meltingPoint)!;
    expect(meltingProp.value).toContain(messages.sidebar.units.celsius);
    expect(meltingProp.value).toContain(messages.sidebar.units.fahrenheit);
    expect(meltingProp.value).toContain(messages.sidebar.units.kelvin);
  });

  it('returns a non-numeric temperature value unchanged', () => {
    const element = makeElement();
    const detail: ElementDetail = { ...FULL_DETAIL, properties: { ...FULL_DETAIL.properties, meltingPoint: 'n/a' } };
    const sections = buildElementSections(detail, element, messages, 'Xenium', 'ru');
    const properties = sections.find((s) => s.id === 'properties')!;
    const meltingProp = properties.items.find((i) => i.label === messages.sidebar.props.meltingPoint)!;
    expect(meltingProp.value).toBe('n/a');
  });

  it('renders the empty placeholder for a missing temperature value', () => {
    const element = makeElement();
    const detail: ElementDetail = { ...FULL_DETAIL, properties: { ...FULL_DETAIL.properties, meltingPoint: null } };
    const sections = buildElementSections(detail, element, messages, 'Xenium', 'ru');
    const properties = sections.find((s) => s.id === 'properties')!;
    const meltingProp = properties.items.find((i) => i.label === messages.sidebar.props.meltingPoint)!;
    expect(meltingProp.value).toBe('----');
  });

  it('shows an image prop for an element with a real emission spectrum, and none for one without', () => {
    const withNumber = findNumberWithSpectrum();
    const withoutNumber = findNumberWithoutSpectrum();

    const withSections = buildElementSections(
      { ...FULL_DETAIL, number: withNumber },
      makeElement({ number: withNumber }),
      messages,
      'X',
      'ru',
    );
    const withProps = withSections.find((s) => s.id === 'properties')!;
    const withImage = withProps.items.find((i) => i.label === messages.sidebar.props.emissionSpectrum)!;
    expect(withImage.empty).toBe(false);
    expect(withImage.imageUrl).toBeTruthy();

    const withoutSections = buildElementSections(
      { ...FULL_DETAIL, number: withoutNumber },
      makeElement({ number: withoutNumber }),
      messages,
      'X',
      'ru',
    );
    const withoutProps = withoutSections.find((s) => s.id === 'properties')!;
    const withoutImage = withoutProps.items.find((i) => i.label === messages.sidebar.props.emissionSpectrum)!;
    expect(withoutImage.empty).toBe(true);
  });

  it('uses the block suffix fallback for an unrecognized block code', () => {
    const element = makeElement();
    const detail: ElementDetail = { ...FULL_DETAIL, properties: { ...FULL_DETAIL.properties, block: 'zz' } };
    const sections = buildElementSections(detail, element, messages, 'Xenium', 'ru');
    const properties = sections.find((s) => s.id === 'properties')!;
    const blockProp = properties.items.find((i) => i.label === messages.sidebar.props.block)!;
    expect(blockProp.value).toBe(`zz - ${messages.sidebar.blockSuffix}`);
  });

  it('renders the empty placeholder for a missing block', () => {
    const element = makeElement();
    const detail: ElementDetail = { ...FULL_DETAIL, properties: { ...FULL_DETAIL.properties, block: null } };
    const sections = buildElementSections(detail, element, messages, 'Xenium', 'ru');
    const properties = sections.find((s) => s.id === 'properties')!;
    const blockProp = properties.items.find((i) => i.label === messages.sidebar.props.block)!;
    expect(blockProp.value).toBe('----');
  });

  it('maps a known aggregation state and falls back to the placeholder for a missing one', () => {
    const element = makeElement();
    const known = buildElementSections(FULL_DETAIL, element, messages, 'Xenium', 'ru');
    const knownThermo = known.find((s) => s.id === 'thermodynamic')!;
    const knownAgg = knownThermo.items.find((i) => i.label === messages.sidebar.props.aggregationState)!;
    expect(knownAgg.value).toBe(messages.sidebar.aggregationState.solid);

    const missing = buildElementSections(
      { ...FULL_DETAIL, properties: { ...FULL_DETAIL.properties, aggregationState: null } },
      element,
      messages,
      'Xenium',
      'ru',
    );
    const missingThermo = missing.find((s) => s.id === 'thermodynamic')!;
    const missingAgg = missingThermo.items.find((i) => i.label === messages.sidebar.props.aggregationState)!;
    expect(missingAgg.value).toBe('----');
  });

  it('falls back to the empty placeholder for an aggregation state outside the known set (noUncheckedIndexedAccess guard)', () => {
    const element = makeElement();
    const sections = buildElementSections(
      { ...FULL_DETAIL, properties: { ...FULL_DETAIL.properties, aggregationState: 'bogus' as never } },
      element,
      messages,
      'Xenium',
      'ru',
    );
    const thermo = sections.find((s) => s.id === 'thermodynamic')!;
    const agg = thermo.items.find((i) => i.label === messages.sidebar.props.aggregationState)!;
    expect(agg.value).toBe('----');
  });

  it('maps a known magnetic type, falls back to the raw code for an unknown one, and to the placeholder when missing', () => {
    const element = makeElement();
    const known = buildElementSections(FULL_DETAIL, element, messages, 'Xenium', 'ru');
    const knownEm = known.find((s) => s.id === 'electromagnetic')!;
    const knownMag = knownEm.items.find((i) => i.label === messages.sidebar.props.magneticType)!;
    expect(knownMag.value).toBe(messages.sidebar.magneticType.diamagnetic);

    const unknown = buildElementSections(
      { ...FULL_DETAIL, electromagnetic: { ...FULL_DETAIL.electromagnetic, magneticType: 'bogus' as never } },
      element,
      messages,
      'Xenium',
      'ru',
    );
    const unknownEm = unknown.find((s) => s.id === 'electromagnetic')!;
    const unknownMag = unknownEm.items.find((i) => i.label === messages.sidebar.props.magneticType)!;
    expect(unknownMag.value).toBe('bogus');

    const missing = buildElementSections(
      { ...FULL_DETAIL, electromagnetic: { ...FULL_DETAIL.electromagnetic, magneticType: null } },
      element,
      messages,
      'Xenium',
      'ru',
    );
    const missingEm = missing.find((s) => s.id === 'electromagnetic')!;
    const missingMag = missingEm.items.find((i) => i.label === messages.sidebar.props.magneticType)!;
    expect(missingMag.value).toBe('----');
  });

  describe('grid section', () => {
    it('renders a single placeholder grid section with no structure code', () => {
      const element = makeElement();
      const detail: ElementDetail = { ...FULL_DETAIL, grid: undefined };
      const sections = buildElementSections(detail, element, messages, 'Xenium', 'ru');
      const gridSections = sections.filter((s) => s.id === 'grid');
      expect(gridSections).toHaveLength(1);
      expect(gridSections[0]!.structureCode).toBeNull();
      expect(gridSections[0]!.items.every((i) => i.empty)).toBe(true);
    });

    it('renders one grid section with the space group props on the first (only) variant', () => {
      const element = makeElement();
      const sections = buildElementSections(FULL_DETAIL, element, messages, 'Xenium', 'ru');
      const gridSections = sections.filter((s) => s.id === 'grid');
      expect(gridSections).toHaveLength(1);
      expect(gridSections[0]!.structureCode).toBe(7);
      expect(gridSections[0]!.title).toBe(messages.sidebar.sections.grid);
      const spaceGroupProp = gridSections[0]!.items.find((i) => i.label === messages.sidebar.props.spaceGroup);
      expect(spaceGroupProp).toBeDefined();
    });

    it('renders a numbered grid section per "|"-separated structure, sharing single values across variants', () => {
      const element = makeElement();
      const detail: ElementDetail = {
        ...FULL_DETAIL,
        grid: {
          structureCode: '7 | 2',
          gridParams: 'shared-params',
          axialRatio: 'a1 | a2',
          debyeTemperature: '470',
          spaceGroup: 'Fd-3m',
          spaceGroupNumber: '227',
        },
      };
      const sections = buildElementSections(detail, element, messages, 'Xenium', 'ru');
      const gridSections = sections.filter((s) => s.id === 'grid');
      expect(gridSections).toHaveLength(2);
      expect(gridSections[0]!.sectionKey).toBe('grid-1');
      expect(gridSections[1]!.sectionKey).toBe('grid-2');
      expect(gridSections[0]!.title).toBe(messages.sidebar.sections.gridNumbered.replace('{{n}}', '1'));

      const firstParams = gridSections[0]!.items.find((i) => i.label === messages.sidebar.props.gridParams)!;
      const secondParams = gridSections[1]!.items.find((i) => i.label === messages.sidebar.props.gridParams)!;
      expect(firstParams.value).toBe('shared-params');
      expect(secondParams.value).toBe('shared-params');

      const secondSpaceGroup = gridSections[1]!.items.find((i) => i.label === messages.sidebar.props.spaceGroup);
      expect(secondSpaceGroup).toBeUndefined();
    });

    it('maps a known structure number to its label and passes through an unknown one raw', () => {
      const element = makeElement();
      const known = buildElementSections(FULL_DETAIL, element, messages, 'Xenium', 'ru');
      const knownGrid = known.find((s) => s.id === 'grid')!;
      const knownStructureProp = knownGrid.items.find((i) => i.label === messages.sidebar.props.gridStructure)!;
      expect(knownStructureProp.value).toBe(messages.sidebar.gridStructures.cubic);

      const unknown = buildElementSections(
        { ...FULL_DETAIL, grid: { ...FULL_DETAIL.grid, structureCode: '99' } },
        element,
        messages,
        'Xenium',
        'ru',
      );
      const unknownGrid = unknown.find((s) => s.id === 'grid')!;
      const unknownStructureProp = unknownGrid.items.find((i) => i.label === messages.sidebar.props.gridStructure)!;
      expect(unknownStructureProp.value).toBe('99');
    });

    it('formats a Debye temperature with all three units, using the raw string for a non-integer kelvin value', () => {
      const element = makeElement();
      const integerKelvin = buildElementSections(FULL_DETAIL, element, messages, 'Xenium', 'ru');
      const integerGrid = integerKelvin.find((s) => s.id === 'grid')!;
      const integerDebye = integerGrid.items.find((i) => i.label === messages.sidebar.props.debyeTemp)!;
      expect(integerDebye.value).toContain(messages.sidebar.units.kelvin);
      expect(integerDebye.value).toContain(messages.sidebar.units.celsius);
      expect(integerDebye.value).toContain(messages.sidebar.units.fahrenheit);
      expect(integerDebye.value.startsWith('470')).toBe(true);

      const nonInteger = buildElementSections(
        { ...FULL_DETAIL, grid: { ...FULL_DETAIL.grid, debyeTemperature: '470.5' } },
        element,
        messages,
        'Xenium',
        'ru',
      );
      const nonIntegerGrid = nonInteger.find((s) => s.id === 'grid')!;
      const nonIntegerDebye = nonIntegerGrid.items.find((i) => i.label === messages.sidebar.props.debyeTemp)!;
      expect(nonIntegerDebye.value.startsWith('470.5')).toBe(true);
    });

    it('treats a zero or missing Debye temperature as empty', () => {
      const element = makeElement();
      const zero = buildElementSections(
        { ...FULL_DETAIL, grid: { ...FULL_DETAIL.grid, debyeTemperature: '0' } },
        element,
        messages,
        'Xenium',
        'ru',
      );
      const zeroGrid = zero.find((s) => s.id === 'grid')!;
      const zeroDebye = zeroGrid.items.find((i) => i.label === messages.sidebar.props.debyeTemp)!;
      expect(zeroDebye.value).toBe('----');

      const missing = buildElementSections(
        { ...FULL_DETAIL, grid: { ...FULL_DETAIL.grid, debyeTemperature: undefined } },
        element,
        messages,
        'Xenium',
        'ru',
      );
      const missingGrid = missing.find((s) => s.id === 'grid')!;
      const missingDebye = missingGrid.items.find((i) => i.label === messages.sidebar.props.debyeTemp)!;
      expect(missingDebye.value).toBe('----');
    });

    it('treats a Debye temperature that is numerically zero (but not the literal string "0") as empty', () => {
      const element = makeElement();
      const sections = buildElementSections(
        { ...FULL_DETAIL, grid: { ...FULL_DETAIL.grid, debyeTemperature: '0.0' } },
        element,
        messages,
        'Xenium',
        'ru',
      );
      const grid = sections.find((s) => s.id === 'grid')!;
      const debye = grid.items.find((i) => i.label === messages.sidebar.props.debyeTemp)!;
      expect(debye.value).toBe('----');
    });

    it('treats a non-numeric Debye temperature as empty', () => {
      const element = makeElement();
      const sections = buildElementSections(
        { ...FULL_DETAIL, grid: { ...FULL_DETAIL.grid, debyeTemperature: 'abc' } },
        element,
        messages,
        'Xenium',
        'ru',
      );
      const grid = sections.find((s) => s.id === 'grid')!;
      const debye = grid.items.find((i) => i.label === messages.sidebar.props.debyeTemp)!;
      expect(debye.value).toBe('----');
    });

    it('renders an empty grid-params placeholder and an empty structure label for a blank "|"-separated segment, and null structureCode for a non-numeric one', () => {
      const element = makeElement();
      const detail: ElementDetail = {
        ...FULL_DETAIL,
        grid: { structureCode: '7|abc|', axialRatio: '1', debyeTemperature: '470' },
      };
      const sections = buildElementSections(detail, element, messages, 'Xenium', 'ru');
      const gridSections = sections.filter((s) => s.id === 'grid');
      expect(gridSections).toHaveLength(3);

      const paramsProp = gridSections[0]!.items.find((i) => i.label === messages.sidebar.props.gridParams)!;
      expect(paramsProp.value).toBe('----');

      const secondStructureProp = gridSections[1]!.items.find((i) => i.label === messages.sidebar.props.gridStructure)!;
      expect(secondStructureProp.value).toBe('abc');
      expect(gridSections[1]!.structureCode).toBeNull();

      const thirdStructureProp = gridSections[2]!.items.find((i) => i.label === messages.sidebar.props.gridStructure)!;
      expect(thirdStructureProp.value).toBe('----');
    });

    it('omits the space group props when absent', () => {
      const element = makeElement();
      const detail: ElementDetail = {
        ...FULL_DETAIL,
        grid: { structureCode: '7', gridParams: 'p', axialRatio: '1', debyeTemperature: '0' },
      };
      const sections = buildElementSections(detail, element, messages, 'Xenium', 'ru');
      const grid = sections.find((s) => s.id === 'grid')!;
      expect(grid.items.find((i) => i.label === messages.sidebar.props.spaceGroup)).toBeUndefined();
      expect(grid.items.find((i) => i.label === messages.sidebar.props.spaceGroupNumber)).toBeUndefined();
    });
  });

  describe('collection section', () => {
    it('shows radioactive collection fields for a fully radioactive (non-weak) element', () => {
      const element = makeElement({
        number: 84,
        inCollection: true,
        collection: {
          physical: { sampleState: 'metal' },
          radioactive: { isotope: '210', sourceType: 'primary' },
        },
      });
      const sections = buildElementSections({ ...FULL_DETAIL, number: 84 }, element, messages, 'Po', 'ru');
      const collection = sections.find((s) => s.id === 'collection')!;
      expect(collection.items.some((i) => i.label === messages.sidebar.props.collectionIsotope)).toBe(true);
    });

    it('hides radioactive collection fields for a weakly radioactive element', () => {
      const element = makeElement({
        number: 75,
        inCollection: true,
        collection: { physical: { sampleState: 'metal' }, radioactive: { isotope: '186', sourceType: 'primary' } },
      });
      const sections = buildElementSections({ ...FULL_DETAIL, number: 75 }, element, messages, 'Re', 'ru');
      const collection = sections.find((s) => s.id === 'collection')!;
      expect(collection.items.some((i) => i.label === messages.sidebar.props.collectionIsotope)).toBe(false);
    });

    it('shows the source-type prop only for a secondary source', () => {
      const element = makeElement({
        number: 84,
        inCollection: true,
        collection: { radioactive: { isotope: '210', sourceType: 'secondary' } },
      });
      const sections = buildElementSections({ ...FULL_DETAIL, number: 84 }, element, messages, 'Po', 'ru');
      const collection = sections.find((s) => s.id === 'collection')!;
      expect(collection.items.some((i) => i.label === messages.sidebar.props.collectionSourceType)).toBe(true);
    });

    it('omits the source-type prop for a primary source', () => {
      const element = makeElement({
        number: 84,
        inCollection: true,
        collection: { radioactive: { isotope: '210', sourceType: 'primary' } },
      });
      const sections = buildElementSections({ ...FULL_DETAIL, number: 84 }, element, messages, 'Po', 'ru');
      const collection = sections.find((s) => s.id === 'collection')!;
      expect(collection.items.some((i) => i.label === messages.sidebar.props.collectionSourceType)).toBe(false);
    });

    it('renders a decay chain and spectrum prop when present, and omits them when absent', () => {
      const withChain = makeElement({
        number: 84,
        inCollection: true,
        collection: {
          radioactive: { isotope: '210', decayParent: [{ symbol: 'Pb', isotope: '210' }] },
          spectrum: { id: 'po-210' },
        },
      });
      const withSections = buildElementSections({ ...FULL_DETAIL, number: 84 }, withChain, messages, 'Po', 'ru');
      const withCollection = withSections.find((s) => s.id === 'collection')!;
      expect(withCollection.items.some((i) => i.label === messages.sidebar.props.collectionDecayParent)).toBe(true);
      expect(withCollection.items.some((i) => i.label === messages.sidebar.props.collectionSpectrum)).toBe(true);

      const without = makeElement({ number: 84, inCollection: true, collection: { radioactive: { isotope: '210' } } });
      const withoutSections = buildElementSections({ ...FULL_DETAIL, number: 84 }, without, messages, 'Po', 'ru');
      const withoutCollection = withoutSections.find((s) => s.id === 'collection')!;
      expect(withoutCollection.items.some((i) => i.label === messages.sidebar.props.collectionDecayParent)).toBe(false);
      expect(withoutCollection.items.some((i) => i.label === messages.sidebar.props.collectionSpectrum)).toBe(false);
    });

    it('omits purity/weight/allotrope/manufactureDate/acquiredDate props when absent, and shows them when present', () => {
      const bare = makeElement({ inCollection: true, collection: { physical: { sampleState: 'metal' } } });
      const bareSections = buildElementSections(FULL_DETAIL, bare, messages, 'Xenium', 'ru');
      const bareCollection = bareSections.find((s) => s.id === 'collection')!;
      expect(bareCollection.items.some((i) => i.label === messages.sidebar.props.collectionPurity)).toBe(false);
      expect(bareCollection.items.some((i) => i.label === messages.sidebar.props.collectionWeight)).toBe(false);
      expect(bareCollection.items.some((i) => i.label === messages.sidebar.props.collectionAllotrope)).toBe(false);
      expect(bareCollection.items.some((i) => i.label === messages.sidebar.props.collectionManufactureDate)).toBe(
        false,
      );
      expect(bareCollection.items.some((i) => i.label === messages.sidebar.props.collectionAcquiredDate)).toBe(false);

      const full = makeElement({
        inCollection: true,
        collection: {
          physical: {
            sampleState: 'metal',
            purity: { value: 999 },
            weight: { mg: 500 },
            allotrope: { ru: 'Форма', en: 'Form', zh: '形式' },
            manufactureDate: '2020',
            acquiredDate: '2021-01-01',
          },
        },
      });
      const fullSections = buildElementSections(FULL_DETAIL, full, messages, 'Xenium', 'ru');
      const fullCollection = fullSections.find((s) => s.id === 'collection')!;
      expect(fullCollection.items.some((i) => i.label === messages.sidebar.props.collectionPurity)).toBe(true);
      expect(fullCollection.items.some((i) => i.label === messages.sidebar.props.collectionWeight)).toBe(true);
      expect(fullCollection.items.some((i) => i.label === messages.sidebar.props.collectionAllotrope)).toBe(true);
      expect(fullCollection.items.some((i) => i.label === messages.sidebar.props.collectionManufactureDate)).toBe(true);
      expect(fullCollection.items.some((i) => i.label === messages.sidebar.props.collectionAcquiredDate)).toBe(true);
    });
  });

  describe('nuclear section', () => {
    it('labels a fully radioactive element, a weakly radioactive one, and a stable one distinctly', () => {
      const strong = buildElementSections(
        { ...FULL_DETAIL, number: 84 },
        makeElement({ number: 84 }),
        messages,
        'Po',
        'ru',
      );
      const strongNuclear = strong.find((s) => s.id === 'nuclear')!;
      expect(strongNuclear.items.find((i) => i.label === messages.sidebar.props.radioactive)!.value).toBe(
        messages.sidebar.yes,
      );

      const weak = buildElementSections(
        { ...FULL_DETAIL, number: 75 },
        makeElement({ number: 75 }),
        messages,
        'Re',
        'ru',
      );
      const weakNuclear = weak.find((s) => s.id === 'nuclear')!;
      expect(weakNuclear.items.find((i) => i.label === messages.sidebar.props.radioactive)!.value).toBe(
        messages.sidebar.weakRadioactiveYes,
      );

      const stable = buildElementSections(
        { ...FULL_DETAIL, number: 1 },
        makeElement({ number: 1 }),
        messages,
        'H',
        'ru',
      );
      const stableNuclear = stable.find((s) => s.id === 'nuclear')!;
      expect(stableNuclear.items.find((i) => i.label === messages.sidebar.props.radioactive)!.value).toBe(
        messages.sidebar.no,
      );
    });

    it('renders a neutron cross-section value with its barn unit, and the placeholder when missing', () => {
      const element = makeElement();
      const withValue = buildElementSections(FULL_DETAIL, element, messages, 'Xenium', 'ru');
      const withNuclear = withValue.find((s) => s.id === 'nuclear')!;
      const withCross = withNuclear.items.find((i) => i.label === messages.sidebar.props.neutronCrossSection)!;
      expect(withCross.value).toBe('767 (b)');

      const withoutValue = buildElementSections(
        { ...FULL_DETAIL, nucleus: { ...FULL_DETAIL.nucleus, neutronCrossSection: null } },
        element,
        messages,
        'Xenium',
        'ru',
      );
      const withoutNuclear = withoutValue.find((s) => s.id === 'nuclear')!;
      const withoutCross = withoutNuclear.items.find((i) => i.label === messages.sidebar.props.neutronCrossSection)!;
      expect(withoutCross.value).toBe('----');
    });
  });

  it('always includes a non-empty mining section with country and note data', () => {
    const element = makeElement();
    const sections = buildElementSections(FULL_DETAIL, element, messages, 'Xenium', 'ru');
    const mining = sections.find((s) => s.id === 'mining')!;
    expect(mining.items).toEqual([]);
    expect(mining.miningCountries).toBeDefined();
    expect(mining.miningNote).toBeDefined();
  });

  it('substitutes the element name into the prevalence labels and shows a placeholder for a zero/missing value', () => {
    const element = makeElement();
    const withValue = buildElementSections(FULL_DETAIL, element, messages, 'Xenium', 'ru');
    const prevalence = withValue.find((s) => s.id === 'prevalence')!;
    expect(prevalence.items[0]!.label).toContain('Xenium');
    expect(prevalence.items[0]!.value).toBe('0.001%');

    const zeroed = buildElementSections(
      { ...FULL_DETAIL, prevalence: { universe: null } },
      element,
      messages,
      'Xenium',
      'ru',
    );
    const zeroedPrevalence = zeroed.find((s) => s.id === 'prevalence')!;
    expect(zeroedPrevalence.items[0]!.value).toBe('----');
  });
});

describe('isSectionEmpty', () => {
  const emptyContext: SectionEmptyContext = {
    nfpaDisplay: null,
    ghsDisplay: [],
    oxidationStates: null,
  };

  function section(id: DetailSection['id'], overrides: Partial<DetailSection> = {}): DetailSection {
    return { id, title: 't', color: '#fff', items: [], ...overrides };
  }

  it('treats mining as never empty', () => {
    expect(isSectionEmpty(section('mining', { items: [] }), emptyContext)).toBe(false);
  });

  it('treats nfpa as empty exactly when there is no nfpaDisplay', () => {
    expect(isSectionEmpty(section('nfpa'), emptyContext)).toBe(true);
    expect(isSectionEmpty(section('nfpa'), { ...emptyContext, nfpaDisplay: {} })).toBe(false);
  });

  it('treats ghs as empty exactly when ghsDisplay has no entries', () => {
    expect(isSectionEmpty(section('ghs'), emptyContext)).toBe(true);
    expect(isSectionEmpty(section('ghs'), { ...emptyContext, ghsDisplay: [{}] })).toBe(false);
  });

  it('treats grid as empty when every item is empty and there is no structure code', () => {
    const empty = section('grid', { items: [{ label: 'x', value: '-', empty: true }], structureCode: null });
    expect(isSectionEmpty(empty, emptyContext)).toBe(true);

    const withCode = section('grid', { items: [{ label: 'x', value: '-', empty: true }], structureCode: 7 });
    expect(isSectionEmpty(withCode, emptyContext)).toBe(false);

    const withItem = section('grid', { items: [{ label: 'x', value: 'v', empty: false }], structureCode: null });
    expect(isSectionEmpty(withItem, emptyContext)).toBe(false);
  });

  it('treats atomic as empty when every item is empty and there is no oxidation content', () => {
    const empty = section('atomic', { items: [{ label: 'x', value: '-', empty: true }] });
    expect(isSectionEmpty(empty, emptyContext)).toBe(true);

    const withOxidation = parseOxidationStates('3,2,1,0,-1,-2,-3')!;
    expect(isSectionEmpty(empty, { ...emptyContext, oxidationStates: withOxidation })).toBe(false);
  });

  it('treats overview as empty when every item is empty and no electron-shell fields are set', () => {
    const empty = section('overview', { items: [{ label: 'x', value: '-', empty: true }] });
    expect(isSectionEmpty(empty, emptyContext)).toBe(true);
    expect(isSectionEmpty(empty, { ...emptyContext, electronShellConfig: 'K2' })).toBe(false);
    expect(isSectionEmpty(empty, { ...emptyContext, electronCount: '2' })).toBe(false);
    expect(isSectionEmpty(empty, { ...emptyContext, protonCount: '2' })).toBe(false);
    expect(isSectionEmpty(empty, { ...emptyContext, neutronCount: '2' })).toBe(false);
  });

  it('treats applications/description as empty exactly when every item is empty', () => {
    expect(
      isSectionEmpty(section('applications', { items: [{ label: '', value: '-', empty: true }] }), emptyContext),
    ).toBe(true);
    expect(
      isSectionEmpty(section('description', { items: [{ label: '', value: 'v', empty: false }] }), emptyContext),
    ).toBe(false);
  });

  it('falls back to the every-item-empty check for any other section id', () => {
    expect(
      isSectionEmpty(section('properties', { items: [{ label: '', value: '-', empty: true }] }), emptyContext),
    ).toBe(true);
    expect(
      isSectionEmpty(section('properties', { items: [{ label: '', value: 'v', empty: false }] }), emptyContext),
    ).toBe(false);
  });
});

describe('parseOxidationStates', () => {
  it('returns null for a missing or empty raw value', () => {
    expect(parseOxidationStates(null)).toBeNull();
    expect(parseOxidationStates(undefined)).toBeNull();
  });

  it('parses a full 6-part sequence into 6 negative and 9 positive cells', () => {
    const rows = parseOxidationStates('3,2,1,0,-1,-2')!;
    expect(rows.negative).toHaveLength(6);
    expect(rows.positive).toHaveLength(9);
  });

  it('marks "-" cells as empty, "0" as zero, and defaults missing trailing parts to "-"', () => {
    const rows = parseOxidationStates('0,-')!;
    expect(rows.negative[5]!.variant).toBe('zero'); // c = '0'
    expect(rows.negative[4]!.variant).toBe('empty'); // s = '-'
    expect(rows.negative[0]!.variant).toBe('empty'); // a defaults to '-'
    expect(rows.positive[0]!.variant).toBe('empty'); // index 6 defaults to '-'
  });

  it('prefixes negative and positive non-empty, non-zero labels with their sign', () => {
    const rows = parseOxidationStates('3,2,1,0,-1,-2,1,2,3,4,5,6,7,8,9')!;
    expect(rows.negative[0]!.label).toBe('-2');
    expect(rows.negative[0]!.variant).toBe('negative');
    expect(rows.positive.some((c) => c.variant === 'positive' && c.label === '+1')).toBe(true);
    expect(rows.positive.every((c) => c.variant === 'positive')).toBe(true);
  });

  it('marks a positive cell with value "0" as zero', () => {
    const rows = parseOxidationStates('-,-,-,-,-,-,0')!;
    expect(rows.positive[0]!.variant).toBe('zero');
    expect(rows.positive[0]!.label).toBe('+0');
  });

  it('renders the leading (most distant, "a") slot without a sign prefix even when it is "-"', () => {
    const rows = parseOxidationStates('-')!;
    expect(rows.negative[5]!.label).toBe('-');
    expect(rows.negative[5]!.variant).toBe('empty');
  });

  it('never produces zero parts once the raw value is non-empty (noUncheckedIndexedAccess guard)', () => {
    // eslint-disable-next-line @typescript-eslint/unbound-method -- always invoked via .call(this, ...) below
    const originalSplit = String.prototype.split as (separator: string, limit?: number) => string[];
    vi.spyOn(String.prototype, 'split').mockImplementation(function (this: string, separator?: string, limit?: number) {
      if (this === 'MARKER' && separator === ',') return [];
      return originalSplit.call(this, separator!, limit);
    } as unknown as typeof String.prototype.split);

    expect(parseOxidationStates('MARKER')).toBeNull();
    vi.restoreAllMocks();
  });
});

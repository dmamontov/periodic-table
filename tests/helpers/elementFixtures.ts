import type { Element } from '../../src/types/element/element';

/**
 * Synthetic element fixtures for component tests. Deliberately independent of the real personal
 * collection in src/data/collection.ts, so component tests never depend on or embed its contents -
 * mock '../../src/data' with these (or a local variant) rather than importing the real module.
 */
export const MOCK_ELEMENTS: Element[] = [
  {
    number: 1,
    symbol: 'H',
    mass: '1.008',
    group: 1,
    oldGroup: 'IA',
    row: 1,
    col: 1,
    periodEnd: false,
    color: '#4caf50',
    category: 'nonmetal',
    inCollection: false,
  },
  {
    number: 2,
    symbol: 'He',
    mass: '4.0026',
    group: 18,
    oldGroup: 'VIIIA',
    row: 1,
    col: 18,
    periodEnd: true,
    color: '#7e57c2',
    category: 'noble-gas',
    inCollection: false,
  },
  {
    number: 26,
    symbol: 'Fe',
    mass: '55.845',
    group: 8,
    oldGroup: 'VIIIB',
    row: 4,
    col: 8,
    periodEnd: false,
    color: '#8d6e63',
    category: 'transition',
    inCollection: true,
    collection: { physical: { sampleState: 'metal' } },
  },
  {
    number: 84,
    symbol: 'Po',
    mass: '(209)',
    group: 16,
    oldGroup: 'VIA',
    row: 6,
    col: 16,
    periodEnd: false,
    color: '#ef5350',
    category: 'metalloid',
    inCollection: true,
    collection: { physical: { sampleState: 'powder' }, radioactive: { isotope: '210', sourceType: 'primary' } },
  },
];

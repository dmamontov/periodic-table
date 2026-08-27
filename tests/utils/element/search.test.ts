import { describe, expect, it } from 'vitest';
import { searchElements } from '../../../src/utils/element/search';
import type { Element } from '../../../src/types/element/element';
import type { LocaleMessages } from '../../../src/locales/types';

function makeElement(number: number, symbol: string): Element {
  return {
    number,
    symbol,
    mass: '0',
    group: null,
    oldGroup: '',
    row: 1,
    col: 1,
    periodEnd: false,
    color: '#fff',
    category: 'nonmetal',
    inCollection: false,
  };
}

const fixtureElements: Element[] = [
  makeElement(21, 'Aa'), // exact symbol match
  makeElement(22, 'Zz'), // symbol prefix match
  makeElement(23, 'Bb'), // name prefix match
  makeElement(24, 'Cc'), // name substring match
  makeElement(50, 'Ee'), // exact atomic-number match
  makeElement(501, 'Ff'), // atomic-number prefix match
  makeElement(502, 'Gg'), // atomic-number prefix match (later number, for tie-break ordering)
  makeElement(6, 'Hh'), // matches nothing
];

const fixtureMessages = {
  elements: {
    Aa: 'alpha',
    Zz: 'zulu',
    Bb: 'aardvark',
    Cc: 'banana',
    Ee: 'echo',
    Ff: 'foxtrot',
    Gg: 'golf',
    Hh: 'hotel',
  },
} as unknown as LocaleMessages;

describe('searchElements', () => {
  it('returns an empty array for a blank or whitespace-only query', () => {
    expect(searchElements('', fixtureElements, fixtureMessages)).toEqual([]);
    expect(searchElements('   ', fixtureElements, fixtureMessages)).toEqual([]);
  });

  it('ranks an exact symbol match above everything else', () => {
    const results = searchElements('aa', fixtureElements, fixtureMessages);
    expect(results[0]!.symbol).toBe('Aa');
  });

  it('ranks an exact atomic-number match above prefix matches', () => {
    const results = searchElements('50', fixtureElements, fixtureMessages);
    expect(results[0]!.number).toBe(50);
  });

  it('matches by symbol prefix', () => {
    const results = searchElements('z', fixtureElements, fixtureMessages);
    expect(results.map((e) => e.symbol)).toContain('Zz');
  });

  it('matches by localized name prefix', () => {
    const results = searchElements('aar', fixtureElements, fixtureMessages);
    expect(results.map((e) => e.symbol)).toEqual(['Bb']);
  });

  it('matches by localized name substring', () => {
    const results = searchElements('anan', fixtureElements, fixtureMessages);
    expect(results.map((e) => e.symbol)).toEqual(['Cc']);
  });

  it('matches by atomic-number prefix', () => {
    const results = searchElements('50', fixtureElements, fixtureMessages);
    const symbols = results.map((e) => e.symbol);
    expect(symbols).toContain('Ff');
    expect(symbols).toContain('Gg');
  });

  it('excludes elements matching none of the ranking rules', () => {
    const results = searchElements('qqqqq', fixtureElements, fixtureMessages);
    expect(results).toEqual([]);
  });

  it('falls back to an empty localized name when the locale table has no entry for a symbol', () => {
    const results = searchElements('aa', fixtureElements, { elements: {} } as LocaleMessages);
    expect(results.some((e) => e.symbol === 'Aa')).toBe(true);
  });

  it('sorts by rank first, then by atomic number within the same rank', () => {
    const results = searchElements('50', fixtureElements, fixtureMessages);
    const symbols = results.map((e) => e.symbol);
    expect(symbols[0]).toBe('Ee');
    expect(symbols.indexOf('Ff')).toBeLessThan(symbols.indexOf('Gg'));
  });

  it('caps results at 8', () => {
    const many = Array.from({ length: 12 }, (_, i) => makeElement(100 + i, `X${i}`));
    const manyMessages = {
      elements: Object.fromEntries(many.map((e) => [e.symbol, 'xylophone'])),
    } as unknown as LocaleMessages;
    const results = searchElements('x', many, manyMessages);
    expect(results.length).toBe(8);
  });
});

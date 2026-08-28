import { describe, expect, it, vi } from 'vitest';
import type { Element } from '../../../src/types/element/element';

function el(row: number, col: number): Element {
  return {
    number: row * 100 + col,
    symbol: `E${row}${col}`,
    mass: '1',
    group: 1,
    oldGroup: 'IA',
    row,
    col,
    periodEnd: false,
    color: '#fff',
    category: 'nonmetal',
    inCollection: false,
  };
}

// Corner-radius geometry: a 2x2 block (A,B,C,D) plus E to B's right (making B fully surrounded),
// plus an isolated G far away (fully exposed on all 4 sides).
const A = el(1, 1);
const B = el(1, 2);
const C = el(2, 1);
const D = el(2, 2);
const E = el(1, 3);
const G = el(3, 50);
const FBLOCK = el(8, 4);
const MAIN_FOR_SINGLE_ROW = el(2, 20);

// getTopRowByCol fixtures: col 5 gets three rows inserted out of order; col 9 gets a single entry.
const COL5_ROW2 = el(2, 5);
const COL5_ROW1 = el(1, 5);
const COL5_ROW3 = el(3, 5);
const COL9_ROW1 = el(1, 9);

const ELEMENTS = [A, B, C, D, E, G, FBLOCK, MAIN_FOR_SINGLE_ROW, COL5_ROW2, COL5_ROW1, COL5_ROW3, COL9_ROW1];
const MAIN_ELEMENTS = [COL5_ROW2, COL5_ROW1, COL5_ROW3, COL9_ROW1];

vi.mock('../../../src/data', () => ({
  elements: ELEMENTS,
  mainElements: MAIN_ELEMENTS,
}));

const { getTopRowByCol, isColumnHead, getElementPeriod, getCellBorderRadius } =
  await import('../../../src/utils/element/layout');

describe('getTopRowByCol', () => {
  it('keeps the smallest row seen per column, regardless of insertion order', () => {
    const map = getTopRowByCol();
    expect(map.get(5)).toBe(1); // 2, then 1 (replaces), then 3 (does not replace)
    expect(map.get(9)).toBe(1); // single entry, first-insert branch
  });
});

describe('isColumnHead', () => {
  it('is true for the element at the top row of its column', () => {
    const topRowByCol = getTopRowByCol();
    expect(isColumnHead(COL5_ROW1, topRowByCol)).toBe(true);
  });

  it('is false for an element below the top row of its column', () => {
    const topRowByCol = getTopRowByCol();
    expect(isColumnHead(COL5_ROW3, topRowByCol)).toBe(false);
  });
});

describe('getElementPeriod', () => {
  it('maps row 8 to period 6', () => {
    expect(getElementPeriod(FBLOCK)).toBe(6);
  });

  it('maps row 9 to period 7', () => {
    expect(getElementPeriod(el(9, 4))).toBe(7);
  });

  it('returns the row itself for main-table rows', () => {
    expect(getElementPeriod(A)).toBe(1);
  });
});

describe('getCellBorderRadius', () => {
  it('rounds every corner for a fully isolated cell', () => {
    expect(getCellBorderRadius(G)).toBe(
      'var(--cell-corner-radius, calc(var(--cell-size, 76px) * 0.09)) ' +
        'var(--cell-corner-radius, calc(var(--cell-size, 76px) * 0.09)) ' +
        'var(--cell-corner-radius, calc(var(--cell-size, 76px) * 0.09)) ' +
        'var(--cell-corner-radius, calc(var(--cell-size, 76px) * 0.09))',
    );
  });

  it('rounds only the top-left corner for a cell with neighbors to its right and below', () => {
    expect(getCellBorderRadius(A)).toBe('var(--cell-corner-radius, calc(var(--cell-size, 76px) * 0.09)) 0 0 0');
  });

  it('rounds only the bottom-right corner for a cell with neighbors to its left and above', () => {
    expect(getCellBorderRadius(D)).toBe('0 0 var(--cell-corner-radius, calc(var(--cell-size, 76px) * 0.09)) 0');
  });

  it('returns undefined for a cell fully surrounded on all four sides', () => {
    expect(getCellBorderRadius(B)).toBeUndefined();
  });

  it('uses the f-block corner set for a row >= 8 element', () => {
    expect(getCellBorderRadius(FBLOCK)).toBeDefined();
  });

  it('uses the f-block corner set for any element when singleRow is true', () => {
    expect(getCellBorderRadius(MAIN_FOR_SINGLE_ROW, true)).toBeDefined();
  });
});

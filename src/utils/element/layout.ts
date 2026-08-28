import type { Element } from '../../types/element/element';
import { elements, mainElements } from '../../data';

export function getTopRowByCol(): Map<number, number> {
  const map = new Map<number, number>();
  for (const el of mainElements) {
    const prev = map.get(el.col);
    if (prev === undefined || el.row < prev) {
      map.set(el.col, el.row);
    }
  }
  return map;
}

export function isColumnHead(element: Element, topRowByCol: Map<number, number>): boolean {
  return topRowByCol.get(element.col) === element.row;
}

export function getElementPeriod(element: Element): number {
  if (element.row === 8) return 6;
  if (element.row === 9) return 7;
  return element.row;
}

const occupancy = new Set(elements.map((el) => `${el.row},${el.col}`));

function hasMainCell(row: number, col: number): boolean {
  return row >= 1 && row <= 7 && occupancy.has(`${row},${col}`);
}

function hasFBlockCell(row: number, col: number): boolean {
  return (row === 8 || row === 9) && col >= 4 && col <= 18 && occupancy.has(`${row},${col}`);
}

interface CornerFlags {
  tl: boolean;
  tr: boolean;
  bl: boolean;
  br: boolean;
}

function computeOuterCorners(hasCell: (row: number, col: number) => boolean, row: number, col: number): CornerFlags {
  const left = !hasCell(row, col - 1);
  const right = !hasCell(row, col + 1);
  const up = !hasCell(row - 1, col);
  const down = !hasCell(row + 1, col);

  return {
    tl: left && up,
    tr: right && up,
    bl: left && down,
    br: right && down,
  };
}

function cornersToRadius(corners: CornerFlags): string | undefined {
  if (!corners.tl && !corners.tr && !corners.br && !corners.bl) return undefined;

  const radius = 'var(--cell-corner-radius, calc(var(--cell-size, 76px) * 0.09))';
  const none = '0';

  return `${corners.tl ? radius : none} ${corners.tr ? radius : none} ${corners.br ? radius : none} ${corners.bl ? radius : none}`;
}

export function getCellBorderRadius(element: Element, singleRow = false): string | undefined {
  const { row, col } = element;

  if (singleRow || row >= 8) {
    return cornersToRadius(computeOuterCorners(hasFBlockCell, row, col));
  }

  return cornersToRadius(computeOuterCorners(hasMainCell, row, col));
}

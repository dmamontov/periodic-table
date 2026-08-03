import type { CategoryId } from '../data'
import { allCategories, elements, isElementRadioactive } from '../data'
import { formatCollectionPurity } from './collectionLabels'

export interface PurestSample {
  number: number
  symbol: string
  color: string
  purityRaw: string
  purityPercent: number
}

export interface CategoryHighlight {
  id: CategoryId
  color: string
  collected: number
  total: number
}

export interface CollectionStats {
  totalElements: number
  collectedCount: number
  radioactiveCollectedCount: number
  spectraCount: number
  purestSample: PurestSample | null
  fullestCategory: CategoryHighlight | null
  emptiestCategory: CategoryHighlight | null
}

function purityToPercent(raw: string | null | undefined): number | null {
  const formatted = formatCollectionPurity(raw)
  if (!formatted) return null
  const cleaned = formatted.replace('~', '').replace('%', '').replace(',', '.')
  const value = Number(cleaned)
  return Number.isFinite(value) ? value : null
}

export function computeCollectionStats(): CollectionStats {
  const collected = elements.filter((el) => el.inCollection)

  const categoryHighlights: CategoryHighlight[] = allCategories.map(({ id, color }) => {
    const inCategory = elements.filter((el) => el.category === id)
    return {
      id,
      color,
      collected: inCategory.filter((el) => el.inCollection).length,
      total: inCategory.length,
    }
  })

  let fullestCategory: CategoryHighlight | null = null
  let emptiestCategory: CategoryHighlight | null = null
  for (const cat of categoryHighlights) {
    if (cat.total === 0) continue
    const ratio = cat.collected / cat.total
    const fullestRatio = fullestCategory ? fullestCategory.collected / fullestCategory.total : -1
    const emptiestRatio = emptiestCategory
      ? emptiestCategory.collected / emptiestCategory.total
      : Infinity
    if (ratio > fullestRatio || (ratio === fullestRatio && cat.total > (fullestCategory?.total ?? 0))) {
      fullestCategory = cat
    }
    if (ratio < emptiestRatio) {
      emptiestCategory = cat
    }
  }

  let purestSample: PurestSample | null = null
  for (const el of collected) {
    const raw = el.collection?.purity
    const percent = purityToPercent(raw)
    if (percent == null || !raw) continue
    if (!purestSample || percent > purestSample.purityPercent) {
      purestSample = {
        number: el.number,
        symbol: el.symbol,
        color: el.color,
        purityRaw: raw,
        purityPercent: percent,
      }
    }
  }

  return {
    totalElements: elements.length,
    collectedCount: collected.length,
    radioactiveCollectedCount: collected.filter((el) => isElementRadioactive(el.number)).length,
    spectraCount: collected.filter((el) => el.collection?.spectrum).length,
    purestSample,
    fullestCategory,
    emptiestCategory,
  }
}

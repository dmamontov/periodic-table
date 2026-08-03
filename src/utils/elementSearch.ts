import type { Element } from '../types/element'
import type { LocaleMessages } from '../locales/types'

const MAX_RESULTS = 8

export function searchElements(
  query: string,
  elements: readonly Element[],
  messages: LocaleMessages,
): Element[] {
  const q = query.trim().toLowerCase()
  if (!q) return []

  const ranked: { element: Element; rank: number }[] = []

  for (const element of elements) {
    const symbol = element.symbol.toLowerCase()
    const name = (messages.elements[element.symbol] ?? '').toLowerCase()
    const number = String(element.number)

    let rank = -1
    if (symbol === q || number === q) rank = 0
    else if (symbol.startsWith(q)) rank = 1
    else if (name.startsWith(q)) rank = 2
    else if (name.includes(q)) rank = 3
    else if (number.startsWith(q)) rank = 4

    if (rank >= 0) ranked.push({ element, rank })
  }

  ranked.sort((a, b) => a.rank - b.rank || a.element.number - b.element.number)

  return ranked.slice(0, MAX_RESULTS).map((r) => r.element)
}

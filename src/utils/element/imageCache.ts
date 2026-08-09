import { getElementImageUrl, hasElementImage } from '../../data'

const preloadedUrls = new Set<string>()

export function preloadElementImage(number: number): void {
  if (!hasElementImage(number)) return

  const url = getElementImageUrl(number)
  if (!url || preloadedUrls.has(url)) return

  preloadedUrls.add(url)
  const image = new Image()
  image.decoding = 'async'
  image.src = url
}

export function preloadAllElementImages(): void {
  for (let number = 1; number <= 118; number += 1) {
    preloadElementImage(number)
  }
}

export function scheduleElementImagePreload(): void {
  const run = () => preloadAllElementImages()

  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(run, { timeout: 8000 })
    return
  }

  window.setTimeout(run, 1000)
}

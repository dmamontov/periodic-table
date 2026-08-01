/** True when opened as installed PWA (incl. iOS «Add to Home Screen»). */
export function isPwaStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches
    || (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  )
}

/** Marks `<html>` for PWA-only CSS (e.g. disable double-tap zoom on iOS). */
export function initPwaStandalone(): void {
  if (!isPwaStandalone()) return
  document.documentElement.classList.add('pwa-standalone')
}

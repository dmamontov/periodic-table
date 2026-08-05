/**
 * iOS WKWebView (standalone PWA / "Add to Home Screen") has a long-documented
 * bug where `100vh`/`100dvh` on a `position: fixed` element does not reliably
 * match the real visible screen height - it can under-report, leaving an
 * unpainted gap at the bottom that no CSS-unit trick (vh, dvh, svh, dvh,
 * -webkit-fill-available, or anchoring via top/bottom:0 on the fixed box
 * itself) consistently fixes across iOS versions.
 *
 * The reliable fix is to stop trusting CSS viewport units for this and
 * instead measure the real height in JS via the Visual Viewport API (built
 * for exactly this class of problem) and publish it as a custom property.
 */

const PROPERTY_NAME = '--real-vh'

function update(): void {
  const height = window.visualViewport?.height ?? window.innerHeight
  document.documentElement.style.setProperty(PROPERTY_NAME, `${height}px`)
}

export function initRealViewportHeight(): void {
  update()
  window.visualViewport?.addEventListener('resize', update)
  window.addEventListener('resize', update)
  window.addEventListener('orientationchange', update)
}

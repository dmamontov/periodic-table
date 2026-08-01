import { registerSW } from 'virtual:pwa-register'

const UPDATE_INTERVAL_MS = 5 * 60 * 1000

export function initPwaUpdates(): void {
  registerSW({
    immediate: true,
    onRegisteredSW(_swUrl, registration) {
      if (!registration) return

      const checkForUpdate = () => {
        if (!navigator.onLine) return
        registration.update().catch(() => {
          // ignore transient network errors
        })
      }

      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') checkForUpdate()
      })

      window.addEventListener('online', checkForUpdate)
      window.addEventListener('focus', checkForUpdate)
      window.setInterval(() => {
        if (document.visibilityState === 'visible') checkForUpdate()
      }, UPDATE_INTERVAL_MS)
    },
  })
}

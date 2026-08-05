import { createApp } from 'vue'
import 'unfonts.css'
import './style.css'
import App from './App.vue'
import { router } from './router'
import { installLocale } from './locales'
import { installTheme } from './theme'
import { initPwaUpdates } from './pwa'
import { initPwaStandalone } from './utils/pwaStandalone'
import { scheduleElementImagePreload } from './utils/elementImageCache'

initPwaStandalone()
initPwaUpdates()

const app = createApp(App)
app.use(router)
installLocale(app)
installTheme(app)
app.mount('#app')
scheduleElementImagePreload()

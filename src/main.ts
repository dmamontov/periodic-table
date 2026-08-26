import { createApp } from 'vue';
import { createHead } from '@unhead/vue/client';
import 'unfonts.css';
import './style.css';
import App from './App.vue';
import { router } from './router';
import { installLocale } from './locales';
import { installTheme } from './theme';
import { initPwaUpdates } from './pwa';
import { initPwaStandalone } from './utils/pwaStandalone';
import { scheduleElementImagePreload } from './utils/element/imageCache';
import { scheduleElementSpectrumPreload } from './utils/element/elementSpectrumCache';
import { scheduleGridStructurePreload } from './utils/element/gridStructureCache';
import { scheduleCollectionSpectrumPreload } from './utils/collection/spectrumPreload';

initPwaStandalone();
initPwaUpdates();

const app = createApp(App);
app.use(router);
app.use(createHead());
installLocale(app);
installTheme(app);
app.mount('#app');
scheduleElementImagePreload();
scheduleElementSpectrumPreload();
scheduleGridStructurePreload();
scheduleCollectionSpectrumPreload();

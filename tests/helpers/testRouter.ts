import { createRouter, createMemoryHistory } from 'vue-router';

const StubView = { template: '<div />' };

/** A fresh, isolated router per test (memory history, no real navigation) mirroring src/router/index.ts's routes. */
export function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'home', component: StubView },
      { path: '/element/:symbol', name: 'element', component: StubView },
      { path: '/collection', name: 'collection', component: StubView },
    ],
  });
}

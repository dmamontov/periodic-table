import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/element',
      redirect: '/',
    },
    {
      path: '/element/:symbol',
      name: 'element',
      component: HomeView,
    },
    {
      path: '/collection',
      name: 'collection',
      component: HomeView,
    },
    {
      path: '/el',
      redirect: '/',
    },
    {
      path: '/el/:symbol',
      redirect: (to) => ({ path: `/element/${String(to.params.symbol ?? '')}` }),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
});

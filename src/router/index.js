import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/views/Home';
import Login from '@/views/Login.vue';

import { getStore, setStore } from '@/config/utils';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },

  // redirect home
  { path: '*', redirect: '/' },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = getStore('mmoreno-app-user');

  if (to.path == '/login') {
    if (loggedIn) return next('/');
  } else {
    if (!loggedIn) return next('/login');
  }

  next();
});

export default router;

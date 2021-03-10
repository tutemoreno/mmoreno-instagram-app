import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/views/Home';
// import EditAccount from '@/home/EditAccount';
import Login from '@/views/Login.vue';
import { authGuard } from '@/helpers';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home, beforeEnter: authGuard },
  // { path: '/edit/:id', component: EditAccount, beforeEnter: authGuard },
  { path: '/login', component: Login },

  // redirect home
  { path: '*', redirect: '/' },
];

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes,
});

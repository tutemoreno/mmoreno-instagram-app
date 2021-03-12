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
  // eslint-disable-next-line no-undef
  FB.getLoginStatus(function(response) {
    console.log(response);
    loggedIn = response.status == 'connected';
  });
  const authRequired = to.path !== '/login';

  if (!authRequired) return next();
  const userInfo = getStore('mmoreno-app-user');
  console.log('beforeEach', userInfo);
  let loggedIn;
  if (userInfo) {
    switch (userInfo.accessMode) {
      case 'SERVER':
        break;

      case 'FACEBOOK':
        // eslint-disable-next-line no-undef
        // FB.logout(function(response) {
        //   // Person is now logged out
        // });

        // eslint-disable-next-line no-undef
        FB.getLoginStatus(function(response) {
          console.log(response);
          loggedIn = response.status == 'connected';
        });
        break;

      case 'GOOGLE':
        break;
      default:
        break;
    }
  }

  if (!loggedIn) return next('/login');

  next();
});

export default router;

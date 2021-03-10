import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

//import { initFacebookSdk, jwtInterceptor, errorInterceptor } from './helpers';
import jQuery from 'jquery';
window.$ = jQuery;

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/css/bootstrap.min.css';

import GoogleAuth from '@/config/google_oAuth.js';
const gauthOption = {
  clientId:
    '61568487421-dn6ajb4a6e5cdfa1kichmt9bkhkbapch.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account',
};
Vue.use(GoogleAuth, gauthOption);

//initFacebookSdk().then(start);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');

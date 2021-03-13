import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import { getStore } from '@/config/utils';
import axios from 'axios';
axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL;
axios.defaults.headers.common = {
  ...axios.defaults.headers.common,
  ...getStore('mmoreno-app-user'),
};

// axios.interceptors.request.use(
//   config => {
//     const token = localStorageService.getAccessToken();
//     if (token) {
//       config.headers['Authorization'] = 'Bearer ' + token;
//     }
//     // config.headers['Content-Type'] = 'application/json';
//     return config;
//   },
//   error => {
//     Promise.reject(error);
//   }
// );

import jQuery from 'jquery';
window.$ = jQuery;

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import { initFbsdk } from '@/config/facebook_oAuth.js';

initFbsdk();

import GoogleAuth from '@/config/google_oAuth.js';
const gauthOption = {
  clientId:
    '61568487421-dn6ajb4a6e5cdfa1kichmt9bkhkbapch.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account',
};
Vue.use(GoogleAuth, gauthOption);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');

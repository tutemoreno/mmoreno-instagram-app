import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router';

import { getStore, setStore } from '@/config/utils';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginUser: localStorage.getItem('mmoreno-app-user'),
  },
  mutations: {
    setUserInfo(state, user) {
      setStore('mmoreno-app-user', user);
      router.push('/home');
    },
  },
  actions: {
    async signIn(data) {
      console.log('GGGGGGG');

      const response = await axios({
        method: 'post',
        baseURL: process.env.VUE_APP_SERVER_URL,
        url: '/accounts/signIn',
        data,
      });

      console.log(response);
    },
  },
  getters: {
    getUserInfo() {
      return JSON.parse(localStorage.getItem('mmoreno-app-user'));
    },
  },
});

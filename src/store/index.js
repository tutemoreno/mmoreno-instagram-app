import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import { setStore, getStore } from '@/config/utils';

Vue.use(Vuex);

const user = getStore('user');

export default new Vuex.Store({
  state: {
    loginUser: user,
  },
  mutations: {
    setLoginUser(state, user) {
      state.loginUser = user;
      setStore('user', user);
    },
  },
  actions: {
    async signIn({ commit }, data) {
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
    getLoginUserInfo(state) {
      return state.loginUser;
    },
  },
});

import axios from 'axios';
import router from '@/router';

import { getStore, setStore } from '@/config/utils';

export default {
  namespaced: true,
  state: {
    loginNotification: null,
    signUpMode: false,
  },
  mutations: {
    setSignUpMode(state, mode) {
      state.signUpMode = mode;
    },
    setLoginNotification(state, notification) {
      state.loginNotification = notification;
    },
  },
  actions: {
    async setUserInfo({ commit }, { user, rememberMe }) {
      axios.defaults.headers.common = {
        ...axios.defaults.headers.common,
        ...user,
      };

      if (user['access-mode'] != 'SERVER') {
        const { data } = await axios({
          headers: user,
          method: 'post',
          url: '/accounts/social/signIn',
        });

        if (!data.success) return commit('setLoginNotification', data.message);
      }

      setStore('mmoreno-app-user', user, rememberMe);

      router.push('/home');
    },
    async checkIfAlreadyExists({ commit }, username) {
      const { data } = await axios({
        method: 'post',
        url: '/accounts/server/checkIfAlreadyExists',
        data: { username },
      });

      console.log(data);

      commit('setLoginNotification', data.exists ? data.message : null);
    },
  },
  getters: {
    getUserInfo() {
      return getStore('mmoreno-app-user');
    },
    getLoginNotification(state) {
      return state.loginNotification;
    },
    getSignUpMode(state) {
      return state.signUpMode;
    },
  },
};

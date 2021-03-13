import axios from 'axios';

import { getStore, setStore } from '@/config/utils';

export default {
  namespaced: true,
  state: {
    posts: [],
  },
  mutations: {},
  actions: {},
  getters: {
    getPosts(state) {
      return state.posts;
    },
  },
};

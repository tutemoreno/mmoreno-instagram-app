import axios from 'axios';

export default {
  namespaced: true,
  state: {
    posts: [],
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
  },
  actions: {
    async refresh({ commit }) {
      const { data } = await axios({
        method: 'get',
        url: '/posts',
      });

      return commit('setPosts', data.posts);
    },
  },
  getters: {
    getPosts(state) {
      return state.posts;
    },
  },
};

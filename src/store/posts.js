import axios from 'axios';

export default {
  namespaced: true,
  state: {
    posts: [],
    currentPage: 1,
    lastPage: 1,
    perPage: 6,
    pages: [],
  },
  mutations: {
    setPosts(state, payload) {
      const { posts, pages, lastPage, currentPage } = payload;

      state.posts = posts;
      state.pages = pages;
      state.lastPage = lastPage;
      state.currentPage = currentPage;
    },
    setUpdatedPost(state, payload) {
      state.posts.splice(payload.index, 1, payload.post);
    },
  },
  actions: {
    async refresh({ commit, state }, currentPage) {
      const { data } = await axios({
        method: 'get',
        url: `/posts/${state.perPage}/${currentPage - 1}`,
      });

      const lastPage = Math.ceil(data.count / state.perPage);

      const u = currentPage + 3,
        s = currentPage - 3;

      const until = u > lastPage ? lastPage : u,
        since = s < 1 ? 1 : s;

      const pages = [];
      for (let i = since; i <= until; i++) {
        pages.push(i);
      }

      commit('setPosts', { pages, lastPage, currentPage, posts: data.posts });
    },
    async didLike({ commit, state }, post) {
      const index = state.posts.indexOf(post);

      const { data } = await axios({
        method: 'post',
        url: `/posts/${post._id}/${post.liked ? 'unlike' : 'like'}`,
      });

      return commit('setUpdatedPost', { post: data.post, index });
    },
    setCurrentPage({ dispatch }, page) {
      dispatch('refresh', page);
    },
    setPreviousPage({ state, dispatch }) {
      if (state.currentPage == 1) return;
      dispatch('refresh', state.currentPage - 1);
    },
    setNextPage({ state, dispatch }) {
      if (state.currentPage == state.lastPage) return;
      dispatch('refresh', state.currentPage + 1);
    },
  },
  getters: {
    getPosts(state) {
      return state.posts;
    },
    getPages(state) {
      return state.pages;
    },
    getCurrentPage(state) {
      return state.currentPage;
    },
    getLastPage(state) {
      return state.lastPage;
    },
  },
};

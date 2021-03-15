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
    setUpdatedPost(state, payload) {
      state.posts.splice(payload.index, 1, payload.post);
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
    async didLike({ commit, state }, post) {
      const index = state.posts.indexOf(post);

      const { data } = await axios({
        method: 'post',
        url: `/posts/${post._id}/${post.liked ? 'unlike' : 'like'}`,
      });

      return commit('setUpdatedPost', { post: data.post, index });
    },
  },
  getters: {
    getPosts(state) {
      return state.posts;
    },
  },
};

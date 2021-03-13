import Vue from 'vue';
import Vuex from 'vuex';

import accounts from './accounts';
import posts from './posts';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    accounts,
    posts,
  },
});

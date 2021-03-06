import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';

import { initFacebookSdk, jwtInterceptor, errorInterceptor } from './helpers';

Vue.config.productionTip = false;

Vue.use(axios);

initFacebookSdk().then(start);

function start() {
  new Vue({
    store,
    router,
    render: h => h(App),
  }).$mount('#app');
}

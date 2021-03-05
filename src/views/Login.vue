<template>
  <Modal :show="true" title="Welcome to Your Vue.js App">
    <template v-slot:header>
      <h3>Login</h3>
    </template>
    <template v-slot:body>
      <input type="text" name="username" placeholder="Username" />
      <input type="text" name="password" placeholder="Password" />
      <div>
        <input type="checkbox" name="remember" />
        <label for="remember">Remember me</label>
        <button>Sign in</button>
      </div>
    </template>
    <template v-slot:footer>
      <button @click="fbLogin">Sign in with facebook</button>

      <div
        class="fb-login-button"
        data-width=""
        data-size="medium"
        data-button-type="login_with"
        data-layout="default"
        data-auto-logout-link="false"
        data-use-continue-as="true"
      ></div>
    </template>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal.vue';

import { accountService } from '@/services';
import router from '@/router';

export default {
  name: 'Home',
  components: {
    Modal,
  },
  created() {
    // redirect to home if already logged in
    if (accountService.accountValue) {
      console.log('[ACC value]', accountService.accountValue);
      router.push('/');
    }
  },
  methods: {
    fbLogin: accountService.login,
  },
};
</script>

<style>
body {
  background: gray;
}
input {
  margin: 10px;
}
</style>

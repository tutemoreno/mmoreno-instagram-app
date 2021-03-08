<template>
  <div>
    <Modal id="signInModal" data-bs-backdrop="static" data-bs-keyboard="false">
      <template #header>
        <h5 class="modal-title mx-auto" id="exampleModalLabel">
          Login
        </h5>
      </template>
      <template #body>
        <form class="container">
          <div class="row mb-3">
            <div class="col">
              <input
                type="text"
                class="form-control"
                id="username"
                placeholder="Username"
                aria-describedby="emailHelp"
              />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col">
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="Password"
              />
            </div>
          </div>

          <template v-if="signUpMode">
            <div class="row mb-3">
              <div class="col">
                <input
                  type="password"
                  class="form-control"
                  id="passwordConfirm"
                  placeholder="Confirm password"
                />
              </div>
            </div>
            <div class="row mb-3 d-flex justify-content-end">
              <button
                type="button"
                class="btn btn-dark col-3 mx-5"
                @click="goToSignUp"
              >
                Sign up
              </button>
            </div>
          </template>

          <template v-else>
            <div
              class="row mb-3 d-flex justify-content-center align-items-center"
            >
              <div class="form-check col-6">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="rememberMe"
                />
                <label class="form-check-label" for="rememberMe">
                  Remember me
                </label>
              </div>

              <button type="button" class="btn btn-dark col-3">
                Sign in
              </button>
            </div>

            <div class="row mb-3">
              <button type="button" class="btn btn-primary col-8 mx-auto">
                Sign in with Facebook
              </button>
            </div>

            <div class="row mb-3">
              <button type="button" class="btn btn-danger col-8 mx-auto">
                Sign in with Google
              </button>
            </div>

            <div class="row mb-3">
              <button
                type="button"
                class="btn btn-light border-secondary col-3 mx-auto"
                @click="goToSignUp"
              >
                Sign up
              </button>
            </div>
          </template>
        </form>
      </template>
    </Modal>
  </div>
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
  data() {
    return {
      signUpMode: false,
    };
  },
  created() {
    // redirect to home if already logged in
    if (accountService.accountValue) {
      console.log('[ACC value]', accountService.accountValue);
      router.push('/');
    }
  },
  mounted() {
    $('#signInModal').modal('show');
  },
  methods: {
    fbLogin: accountService.login,
    goToSignUp() {
      this.signUpMode = true;
    },
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

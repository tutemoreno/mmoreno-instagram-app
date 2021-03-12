<template>
  <div>
    <Modal id="signInModal">
      <template #header>
        <div class="container">
          <div v-if="showAlert" class="alert alert-danger" role="alert">
            Passwords do not match!
          </div>
          <div class="row">
            <h5 class="modal-title mx-auto" id="exampleModalLabel">
              {{ signUpMode ? 'Create Account' : 'Login' }}
            </h5>
          </div>
        </div>
      </template>
      <template #body>
        <form class="container">
          <div class="row mb-3">
            <div class="col">
              <input
                type="text"
                class="form-control"
                id="username"
                v-model.trim="username"
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
                v-model.trim="password"
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
                  id="confirmPassword"
                  v-model.trim="confirmPassword"
                  placeholder="Confirm password"
                />
              </div>
            </div>
            <div class="row mb-3 d-flex justify-content-end">
              <button
                type="button"
                class="btn btn-dark col-3 mx-5"
                @click="signUpWithServer"
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
                  v-model="rememberMe"
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
              <button
                type="button"
                class="btn btn-primary col-8 mx-auto"
                @click="signInWithFacebook"
              >
                Sign in with Facebook
              </button>
            </div>

            <div class="row mb-3">
              <button
                type="button"
                class="btn btn-danger col-8 mx-auto"
                @click="signInWithGoogle"
              >
                Sign in with Google
              </button>
            </div>

            <div class="row mb-3">
              <button
                type="button"
                class="btn btn-light border-secondary col-3 mx-auto"
                @click="signUpMode = true"
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
import { mapMutations } from 'vuex';
import axios from 'axios';
import Modal from '@/components/Modal.vue';

export default {
  name: 'Home',
  components: {
    Modal,
  },
  data() {
    return {
      username: null,
      password: null,
      confirmPassword: null,
      rememberMe: false,
      signUpMode: false,
      showAlert: false,
    };
  },
  mounted() {
    $('#signInModal').modal({
      backdrop: 'static',
      keyboard: false,
      focus: true,
    });
    $('#signInModal').modal('show');
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    async signUpWithServer() {
      const { username, password, confirmPassword } = this;

      if (password != confirmPassword) return (this.showAlert = true);

      this.showAlert = false;

      const response = await axios({
        method: 'post',
        baseURL: process.env.VUE_APP_SERVER_URL,
        url: '/accounts/server/signUp',
        data: { username, password },
      });

      const { userId, token } = response;

      this.setUserInfo({
        accessId: userId,
        accessToken: token,
        accessMode: 'SERVER',
      });
    },
    async signInWithServer() {
      const { username, password } = this;
      const response = await axios({
        method: 'post',
        baseURL: process.env.VUE_APP_SERVER_URL,
        url: '/accounts/server/signIn',
        data: { username, password },
      });

      const { userId, token } = response;

      this.setUserInfo({
        accessId: userId,
        accessToken: token,
        accessMode: 'SERVER',
      });
    },
    signInWithGoogle() {
      this.$gAuth
        .signIn()
        .then(GoogleUser => {
          console.log(GoogleUser.getId());
          this.setUserInfo({
            accessId: GoogleUser.getId(),
            accessToken: GoogleUser.getAuthResponse().access_token,
            accessMode: 'GOOGLE',
          });
        })
        .catch(error => {
          console.log('error', error);
        });
    },
    signInWithFacebook() {
      window.FB.login(response => {
        const {
          authResponse: { accessToken, userID },
        } = response;

        this.setUserInfo({
          accessId: userID,
          accessToken,
          accessMode: 'FACEBOOK',
        });
      }, this.params);
    },
  },
};
</script>

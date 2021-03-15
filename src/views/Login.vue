<template>
  <div>
    <Modal id="signInModal">
      <template #header>
        <div class="container">
          <div
            v-if="!!getLoginNotification"
            class="alert alert-danger"
            role="alert"
          >
            {{ getLoginNotification }}
          </div>
          <div class="row">
            <h5 class="modal-title mx-auto" id="exampleModalLabel">
              {{ getSignUpMode ? 'Create Account' : 'Login' }}
            </h5>
          </div>
        </div>
      </template>
      <template #body>
        <form class="container" id="loginForm">
          <div class="row mb-3">
            <div class="col">
              <input
                type="text"
                class="form-control"
                id="username"
                v-model.trim="username"
                placeholder="Username"
                aria-describedby="emailHelp"
                @change="
                  e => {
                    getSignUpMode ? checkIfAlreadyExists(e.target.value) : null;
                  }
                "
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

          <template v-if="getSignUpMode">
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
                :disabled="!!getLoginNotification"
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

              <button
                type="button"
                class="btn btn-dark col-3"
                @click="signInWithServer"
              >
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
                @click="setSignUpMode(true)"
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
import { mapMutations, mapActions, mapGetters } from 'vuex';
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
    $('#signInModal')
      .modal({
        backdrop: 'static',
        keyboard: false,
        focus: true,
      })
      .modal('show');
  },
  computed: {
    ...mapGetters('accounts', ['getLoginNotification', 'getSignUpMode']),
  },
  methods: {
    ...mapMutations('accounts', ['setLoginNotification', 'setSignUpMode']),
    ...mapActions('accounts', ['signIn', 'checkIfAlreadyExists']),
    didLoggedIn() {
      $('#signInModal').modal('hide');
    },
    async signUpWithServer() {
      const { username, password, confirmPassword } = this;

      if (password != confirmPassword)
        return this.setLoginNotification('Password fo not match!');

      this.setLoginNotification(null);

      const response = await axios({
        method: 'post',
        url: '/accounts/server/signUp',
        data: { username, password },
      });

      if (response.status == 200) {
        this.password = null;
        this.confirmPassword = null;

        this.setSignUpMode(false);
      } else this.setLoginNotification(response.data.message);
    },
    async signInWithServer() {
      const { username, password, rememberMe } = this;

      this.signIn({
        data: { username, password },
        mode: 'server',
        rememberMe,
        didLoggedIn: this.didLoggedIn,
      });
    },
    signInWithGoogle() {
      this.$gAuth
        .signIn()
        .then(GoogleUser => {
          this.signIn({
            data: {
              token: GoogleUser.getAuthResponse().access_token,
              userId: GoogleUser.getId(),
            },
            mode: 'google',
            rememberMe: this.rememberMe,
            didLoggedIn: this.didLoggedIn,
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

        this.signIn({
          data: { token: accessToken, userId: userID },
          mode: 'facebook',
          rememberMe: this.rememberMe,
          didLoggedIn: this.didLoggedIn,
        });
      }, this.params);
    },
  },
};
</script>

<template>
  <div>
    <Modal id="signInModal">
      <template #header>
        <h5 class="modal-title mx-auto" id="exampleModalLabel">
          {{ signUpMode ? 'Create Account' : 'Login' }}
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
              <button
                type="button"
                class="btn btn-primary col-8 mx-auto"
                @click="loginWithFacebook"
              >
                Sign in with Facebook
              </button>
            </div>

            <div class="row mb-3">
              <button
                type="button"
                class="btn btn-danger col-8 mx-auto"
                @click="loginWithGoogle"
              >
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
import { mapActions } from 'vuex';
import Modal from '@/components/Modal.vue';
import { initFbsdk } from '@/config/facebook_oAuth.js';

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
  mounted() {
    initFbsdk();
    $('#signInModal').modal({
      backdrop: 'static',
      keyboard: false,
      focus: true,
    });
    $('#signInModal').modal('show');
  },
  methods: {
    ...mapActions(['signIn']),
    goToSignUp() {
      this.signUpMode = true;
    },
    loginWithGoogle() {
      this.$gAuth
        .signIn()
        .then(GoogleUser => {
          // on success do something
          console.log('GoogleUser', GoogleUser);
          console.log('getId', GoogleUser.getId());
          console.log('getBasicProfile', GoogleUser.getBasicProfile());
          console.log('getAuthResponse', GoogleUser.getAuthResponse());
          var userInfo = {
            loginType: 'google',
            google: GoogleUser,
          };
          this.$store.commit('setLoginUser', userInfo);
          this.$router.push('/home');
        })
        .catch(error => {
          console.log('error', error);
        });
    },
    loginWithFacebook() {
      window.FB.login(response => {
        var userInfo = {
          loginType: 'facebook',
          fb: response,
        };
        console.log('fb response', response);
        const {
          authResponse: { accessToken, userID },
        } = response;
        this.signIn({ token: accessToken, userID, accessMode: 'facebook' });
        this.$store.commit('setLoginUser', userInfo);
        this.$router.push('/home');
      }, this.params);
    },
  },
};
</script>

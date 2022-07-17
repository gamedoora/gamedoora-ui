<template>
  <button @click="twitterLogin">
    <img src="@/assets/icon/twitter.svg" alt="twitter">
  </button>
</template>

<script lang="ts">
import {
  getAuth, signInWithPopup, TwitterAuthProvider, UserCredential,
} from 'firebase/auth';
import { firebaseApp } from '@/main';
import { defineComponent } from 'vue';

const twitterProvider = new TwitterAuthProvider();
const auth = getAuth(firebaseApp);

export default defineComponent({
  name: 'GithubLogin',
  methods: {
    twitterLogin() {
      signInWithPopup(auth, twitterProvider)
        .then((result: UserCredential) => {
          const credential = TwitterAuthProvider.credentialFromResult(result);
          const token = credential ? credential.accessToken : null;
          const { user } = result;
          console.info(credential, token, user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const { email } = error;
          const credential = TwitterAuthProvider.credentialFromError(error);
          console.error(errorCode, errorMessage, email, credential);
        });
    },
  },
});
</script>

<style lang="scss" scoped>
button {
  background: none;
  border-radius: 3px;
  border: 1px solid #e2e5ff;
  padding: 0.5rem 1.5rem;
  img {
    height: 32px;
  }
}
</style>

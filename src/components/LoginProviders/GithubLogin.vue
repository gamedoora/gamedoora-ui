<template>
  <button @click="githubLogin">
    <img src="@/assets/icon/github.svg" alt="github">
  </button>
</template>

<script lang="ts">
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { firebaseApp } from '@/main';
import { defineComponent } from "vue";

const githubProvider = new GithubAuthProvider();
const auth = getAuth(firebaseApp);

export default defineComponent({
  name: 'GithubLogin',
  methods: {
    githubLogin() {
      signInWithPopup(auth, githubProvider)
      .then((result: any) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential ? credential.accessToken : null;
        const user = result.user;
        console.log(credential, token, user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GithubAuthProvider.credentialFromError(error);
        console.error(errorCode, errorMessage, email, credential);
      });
    }
  }
})
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
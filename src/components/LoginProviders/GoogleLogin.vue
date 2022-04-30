<template>
  <button @click="googleLogin">
    <img src="@/assets/icon/google.svg" alt="">
  </button>
</template>

<script lang="ts">
import { getAuth, signInWithPopup, GoogleAuthProvider, UserCredential } from "firebase/auth";
import { firebaseApp } from '@/main';
import { defineComponent } from "vue";

const provider = new GoogleAuthProvider();
const auth = getAuth(firebaseApp);

export default defineComponent({
  name: 'GoogleLogin',
  methods: {
    googleLogin() {
      signInWithPopup(auth, provider)
      .then((result: UserCredential) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential ? credential.accessToken : null;
        const user = result.user;
        console.log(credential, token, user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
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
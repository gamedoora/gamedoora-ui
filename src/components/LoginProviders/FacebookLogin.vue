<template>
  <button @click="facebookLogin">
    <img src="@/assets/icon/facebook.svg" alt="facebook">
  </button>
</template>

<script lang="ts">
import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { firebaseApp } from '@/main';
import { defineComponent } from "vue";

const facebookProvider = new FacebookAuthProvider();
const auth = getAuth(firebaseApp);

export default defineComponent({
  name: 'FacebookLogin',
  methods: {
    facebookLogin() {
      signInWithPopup(auth, facebookProvider)
      .then((result: any) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const token = credential ? credential.accessToken : null;
        const user = result.user;
        console.log(credential, token, user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
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
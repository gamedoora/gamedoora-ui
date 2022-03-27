<template>
  <button @click="logout">
    Logout
  </button>
</template>

<script lang="ts">
import { getAuth, signOut } from "@firebase/auth";
import { defineComponent } from "vue";
import { firebaseApp } from '@/main';

const auth = getAuth(firebaseApp);

export default defineComponent ({
  name: 'LogoutButton',
  methods: {
    logout() {
      signOut(auth).then(() => {
        console.log('logged out');
      }).catch((error) => {
        console.error(error);
      });
    }
  }
})

</script>

<style>

</style>
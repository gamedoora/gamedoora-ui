<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  methods: {
  },
  watch: {
  },
});
</script>

<style>
#app {
  font-family: 'Red Hat Text', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  background-color: #ebeef5;
  height: 100vh;
  width: 100vw;
}
</style>

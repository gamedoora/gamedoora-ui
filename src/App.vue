<template>
  <Header
    v-if="showNav"
    :leftBarActive="leftBarActive"
    :rightBarActive="rightBarActive"
  />
  <div
    class="w3-row"
    v-bind:class="{ 'body-container': showNav, 'container content': !showNav }"
  >
    <LeftNavigationNew
      v-if="showNav"
      :isShow="leftBarActive"
      :currentView="currentView"
    />

    <RightNavigation v-if="showNav" :isShow="rightBarActive"
  /> 
    <router-view :leftBarActive="leftBarActive" :rightBarActive="rightBarActive" :currentView="currentView"></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/components/header.vue';
import LeftNavigationNew from '@/components/LeftNavigationNew.vue';
import RightNavigation from '@/components/rightNavigation.vue';

export default defineComponent({
  name: 'App',
  data() {
    return {
      leftBarActive: true,
      rightBarActive: false,
      currentView: 'Studio',
      showNav: true,
    } as ThemeConfig;
  },
  components: {
    Header,
    LeftNavigationNew,
    RightNavigation
  },
  methods: {
    onResize() {
      if (window.innerWidth > 993) {
        this.$data.leftBarActive = true;
        this.$data.rightBarActive = true;
      } else {
        this.$data.leftBarActive = false;
        this.$data.rightBarActive = false;
      }
    },
  },
  created() {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.onResize);
  },
  mounted() {
    const noHeader = ['/', '/SignUpPage', '/forgot-password'];
    this.showNav = !noHeader.includes(this.$route.path);
  },
  watch: {
    $route(to) {
      const noHeader = ['/', '/SignUpPage', '/forgot-password'];
      this.showNav = !noHeader.includes(to.path);
    },
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

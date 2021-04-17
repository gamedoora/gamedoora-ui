<template>
  <div class="right-navigation-container" v-bind:class="{ show: isShow }">
    <span
      class="right-collapse-button icon-collapse"
      v-on:click="hideRightSideBar"
    ></span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "RightNavigation",
  props: {
    isShow: Boolean,
  },
  methods: {
    hideRightSideBar: function (): void {
      const rootData:any = this.$root?.$data;
      rootData.rightBarActive = false;
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#rightSideBar {
  float: left;
}
</style>

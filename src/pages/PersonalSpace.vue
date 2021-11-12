<template>
  <div
    class="dashboard-content-container"
    :style="{
      width: 'calc(100vw - ' + vw + 'px)',
      left: leftOffset + 'px',
      'margin-top': '20px',
      height: 'calc(100vh - 72px)',
    }"
  >
    <Stream :hideForm="true" />
  </div>
</template>

<script lang="ts">
import Stream from "../components/Stream.vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "PersonalSpace",
  components: {
    Stream,
  },
  props: {
    leftBarActive: Boolean,
    rightBarActive: Boolean,
  },
  computed: {
    vw():number {
      if (this.leftBarActive && this.rightBarActive) {
        return 423;
      } else if (this.leftBarActive && !this.rightBarActive) {
        return 234;
      } else if (!this.leftBarActive && this.rightBarActive) {
        return 233;
      } else {
        return 44;
      }
    },
    leftOffset():number {
      if (this.leftBarActive) {
        return 212;
      } else {
        return 10;
      }
    },
  },
});
</script>

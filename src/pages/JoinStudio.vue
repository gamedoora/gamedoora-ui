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
    <div class="page-header-block">
      <div class="heading">Join Studio</div>
    </div>
    <div class="user-join-studio-container">
      <div class="list-of-studios">
        <StudioItem
          v-for="studio in studios"
          :key="studio.name"
          :studio="studio"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import StudioItem from "../components/StudioItem.vue";

export default defineComponent({
  name: "JoinStudio",
  components: {
    StudioItem,
  },
  data() {
    return {
      studios: [
        {
          name: "Studio Simran",
          desc: "This studio belongs to Simran - Dev",
          approved: true,
        },
        { name: "Studio 1", desc: "Example Studio 1", approved: false },
        { name: "Studio 2", desc: "Example Studio 2", approved: false },
        { name: "Studio 3", desc: "Example Studio 3", approved: true },
      ],
    };
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

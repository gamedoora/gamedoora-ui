<template>
  <div
    class="dashboard-content-container studio"
    :style="{
      width: 'calc(100vw -  ' + vw + 'px)',
      left: leftOffset + 'px',
      'margin-top': '55px',
      height: 'calc(100vh - 107px)',
    }"
  >
    <keep-alive>
      <component :is="bodyContent"></component>
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Stream from "./Stream.vue";
import Assets from "./Assets.vue";
import Admin from "./Admin.vue";
import TasksNew from "./TasksNew.vue";
import Dashboard from "./Dashboard.vue";

export default defineComponent({
  name: "TabContent",
  props: ["vw", "leftOffset", "bodyContent"],
  components: {
    Stream,
    Assets,
    Admin,
    TasksNew,
    Dashboard,
  },
});
</script>

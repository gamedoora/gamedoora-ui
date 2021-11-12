<template>
  <tab-header
    :vw="vw"
    :leftOffset="leftOffset"
    :tabActive="current_tab"
    :tabItems="tabsItem"
    :onTabChange="changeTab"
  />
  <tab-content
    :vw="vw"
    :leftOffset="leftOffset"
    :bodyContent="tabsItem[current_tab]['component']"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TabHeader from "./TabHeader.vue";
import TabContent from "./TabContent.vue";

export default defineComponent({
  name: "Dashboard",
  data() {
    return {
      current_tab: 0,
      tabsItem: [
        { name: "Stream", component: "Stream" },
        { name: "Assets", component: "Assets" },
        { name: "Tasks", component: "TasksNew" },
        { name: "Dashboard", component: "Dashboard" },
        { name: "Admin", component: "Admin" },
      ],
    };
  },
  methods: {
    changeTab(index : number) {
      this.current_tab = index;
    },
  },
  components: {
    TabHeader,
    TabContent,
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

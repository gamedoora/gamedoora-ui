<template>
  <div
    class="dashboard-content-header"
    :style="{
      width: 'calc(100vw -  ' + vw + 'px)',
      left: leftOffset + 'px',
      'margin-top': '10px',
    }"
  >
    <div class="links">
      <ul class="list-inline float-left">
        <li
          v-for="(tab, index) in tabItems"
          :key="tab.name"
          v-bind:class="[index === tabActive ? 'active' : '']"
          :data-index="index"
        >
          <a
            href="javascript:void(0)"
            class="link"
            v-on:click="onTabChange(index)"
          >
            <i class="icon-stream" aria-hidden="true"></i>
            {{ tab.name }}
          </a>
        </li>
      </ul>
      <div class="float-right">
        <a href="javascript:void(0)">
          <i class="icon-filter" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "TabHeader",
  props: ["vw", "leftOffset", "tabActive", "tabItems", "onTabChange"],
});
</script>

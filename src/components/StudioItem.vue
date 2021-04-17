<template>
  <div class="studio-component">
    <div class="name-logo">
      <div class="studio-logo">
        <img style="height: 100px; width: 100px" src="../assets/logo.png" />
      </div>
      <div class="right-div">
        <div class="studio-name">
          {{ studio.name }}
        </div>
        <div
          class="cta"
          v-bind:class="[studio.approved ? 'join_studio' : 'pending']"
        >
          {{ studio.approved ? "Join" : "Pending" }}
        </div>
      </div>
    </div>
    <div class="studio-description">
      {{ studio.desc }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "StudioItem",
  props: ["studio"],
});
</script>

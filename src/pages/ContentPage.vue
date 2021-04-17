<template>
  <component
    :is="currentView"
    :rightBarActive="rightBarActive"
    :leftBarActive="leftBarActive"
  ></component>
  <Modal ref="Modal" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Studio from "./Studio.vue";
import JoinStudio from "./JoinStudio.vue";
import PersonalSpace from "./PersonalSpace.vue";
import ProfilePage from "./ProfilePage.vue";

import Modal from "@/components/Modal.vue";

export default defineComponent({
  name: "ContentPage",
  props: ["currentView", "leftBarActive", "rightBarActive"],
  components: {
    Studio,
    JoinStudio,
    PersonalSpace,
    ProfilePage,
    Modal,
  }
});
</script>

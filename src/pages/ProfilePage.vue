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
      <div class="heading">Your Profile</div>
    </div>
    <div class="users-edit-profile">
      <form class="form-horizontal" action="" method="post">
        <div class="form-group row">
          <label class="col-sm-2 col-form-label control-label" for="name"
            >Name:</label
          >
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="name"
              name="name"
              placeholder="Enter Full Name"
              value="pradeep"
              required=""
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label control-label" for="email"
            >Email:</label
          >
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="email"
              placeholder="Enter Email"
              value="pnatrial@gmail.com"
              disabled=""
            />
          </div>
        </div>
        <div class="form-group row">
          <div class="offset-sm-2 col-sm-10">
            <button type="button" class="btn btn-default default-submit-btn">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ProfilePage",
  props: {
    leftBarActive: Boolean,
    rightBarActive: Boolean,
  },
  computed: {
    vw() {
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
    leftOffset() {
      if (this.leftBarActive) {
        return 212;
      } else {
        return 10;
      }
    },
  },
});
</script>

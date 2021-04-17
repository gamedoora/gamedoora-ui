<template>
  <header class="nav-header container-fluid">
    <div class="col-md-12 col-xs-12 col-lg-12 col-sm-12 header-row">
      <div class="logo-container float-left">
        <span
          class="menu-icon"
          v-on:click="showLeftSideBar"
          v-bind:class="{ 'd-none': leftBarActive }"
        >
          <i class="fa fa-bars fa-2x" aria-hidden="true"></i>
        </span>
        <img class="img" src="../assets/images/core/logo.png" />
      </div>
      <hr class="d-block d-sm-none divider-hr" />
      <div class="right-top-navigation-container float-right">
        <div class="user-container">
          <div class="dropdown notifications">
            <a
              class="dropdown-toggle"
              data-toggle="dropdown"
              id="notification-dropdown"
            >
              <i class="fa fa-bell" aria-hidden="true"></i>
              <span class="badge notification-badge">0</span>
            </a>
            <ul
              class="dropdown-menu dropdown-menu-right"
              aria-labelledby="notification-dropdown"
            >
              <div class="notification-list">
                <li>
                  <div class="notification-parent">
                    <a href="javascript:void(0)" class="notification-anchor">
                      <div class="notification-div">
                        There are no notifications
                      </div>
                    </a>
                  </div>
                </li>
              </div>
            </ul>
          </div>
          <div class="dropdown user-profile-dropdown">
            <a
              class="dropdown-toggle user-profile-link"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              <span class="d-none d-sm-inline"> pradeep </span>
              <span class="d-inline d-sm-none">
                <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
              </span>
            </a>
            <ul class="dropdown-menu dropdown-menu-right">
              <li class="name-container">
                <div class="name">pradeep</div>
                <div class="email">pnatrial@gmail.com</div>
              </li>
              <li class="actions-container">
                <div class="sign-out-container">
                  <a
                    rel="nofollow"
                    data-method="delete"
                    href="javascript:void(0)"
                    >Sign out</a
                  >
                </div>
              </li>
            </ul>
          </div>
          <span
            class="menu-right-icon float-right"
            v-bind:class="{
              'd-none d-md-inline-block': !rightBarActive,
              'd-none': rightBarActive,
            }"
            v-on:click="showRightSideBar"
            ><i class="fa fa-bars fa-2x" aria-hidden="true"></i
          ></span>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
  props: {
    leftBarActive: Boolean,
    rightBarActive: Boolean,
  },
  methods: {
    showLeftSideBar: function ():void {
      const rootData:any = this.$root?.$data;
      rootData.leftBarActive = true;
    },
    showRightSideBar: function ():void {
      // this.$root.$data.rightBarActive = true;
      const rootData: any = this.$root?.$data;
      rootData.rightBarActive = true;
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#leftBarIcon {
  display: none;
}
#leftBarIcon {
  font-size: 20px;
  margin-top: 6px;
  margin-left: 8px;
}
#rightBarIcon {
  font-size: 20px;
  margin-top: 6px;
  margin-right: 8px;
  display: none;
}
.app-bar {
  background-color: #595858;
}
</style>

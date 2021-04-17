<template>
  <div
    class="left-navigation-container display-md-lg"
    v-bind:class="{ show: isShow }"
  >
    <span
      class="left-collapse-button icon-collapse d-none d-lg-block d-md-block"
      v-on:click="hideLeftSideBar"
    ></span>
    <div class="logo-container hidden-lg">
      <img class="img" src="../assets/images/core/logo.png" />
      <div
        class="icon-close-container float-right"
        v-on:click="hideLeftSideBar"
      >
        <i class="fa fa-times" aria-hidden="true"></i>
      </div>
    </div>
    <div class="profile-container margin-bottom-30">
      <!--<div class="image-div">
      <img class="img" src="/assets/core/dummy-profile-2fa7e5f3d6432e27753a1ae7028a2dcea1da2acf822c4b574905b8f92930f52c.png">
    </div>-->
      <div class="text-div text-center">
        <span class="name"> pradeep </span>
        <a
          href="javascript:void(0)"
          @click="goToView('ProfilePage')"
          class="update-profile-button"
        >
          Update Profile
        </a>
      </div>
    </div>

    <div class="left-right-navigation-divider"></div>
    <div class="my-studio-container" style="margin-bottom: 10px">
      <h5 class="title">
        <a href="javascript:void(0)" @click="goToView('PersonalSpace')">
          Personal Space
        </a>
      </h5>
    </div>

    <div class="left-right-navigation-divider"></div>
    <div class="my-studio-container" style="margin-bottom: 30px">
      <h5 class="title">
        My Studios
        <span class="pull-right">
          <a
            class="studio_create_popup orange-color"
            @click="showNewStudio"
            href="javascript:void(0)"
            ref="showNewDialog"
          >
            <i class="fa fa-plus plus" aria-hidden="true"></i>
          </a>
        </span>
      </h5>
      <div class="search-input-container">
        <!--<input type="text" class="search-input form-control" placeholder="Search Studios">-->
      </div>
      <div class="ul-container margin-bottom-30">
        <ul class="portal-navigation">
          <li class="nav-item">
            <a
              class="get_studio_stream_url"
              href="javascript:void(0)"
              @click="goToView('Studio')"
            >
              <i class="icon-studio" aria-hidden="true"></i>
              <span class="item-name">As</span>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="get_studio_stream_url"
              href="javascript:void(0)"
              @click="goToView('Studio')"
            >
              <i class="icon-studio orange-color" aria-hidden="true"></i>
              <span class="item-name orange-color">Teststudio</span>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="left-right-navigation-divider"></div>

    <div class="ul-container">
      <ul class="portal-navigation">
        <li class="nav-item">
          <a
            href="javascript:void(0)"
            class="get_join_studio_list_url"
            @click="goToView('JoinStudio')"
          >
            <i class="icon-join-studio" aria-hidden="true"></i>
            <span class="item-name">Join a Studio</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "LeftNavigationNew",
  props: ["isShow", "currentView"],
  methods: {
    hideLeftSideBar: function () {
      this.$root.$data.leftBarActive = false;
    },
    goToView(comp) {
      console.log(comp);
      this.$root.$data.currentView = comp;
      console.log(this.$root.$data.currentView);
    },
    showNewStudio() {
      this.emitter.emit("modal:toggle");
    },
  },
};
</script>

<template>
  <div
    id="leftSideBar"
    class="left-navigation-container display-md-lg"
    v-bind:class="{ show: isShow }"
  >
    <div class="  ">
      <div class="w3-border-bottom leftSide">
        <i
          class="fa fa-caret-left w3-right w3-margin iconColor"
          v-on:click="hideLeftSideBar"
          aria-hidden="true"
        ></i>
        <p class="title">James John</p>
      </div>
      <div class="w3-panel w3-border-bottom">
        <p class="w3-left">Personal space</p>
      </div>
      <div class="w3-panel Studio-height w3-border-bottom">
        <a class="w3-left">My Studios</a>
        <i class="fa fa-plus w3-right plusColor" aria-hidden="true"></i>
        <br />
        <br />
        <div>
          <a class="w3-left plusColor"
            ><i class="fa fa-sliders" aria-hidden="true"></i> As</a
          >
        </div>
        <br />
        <br />
        <div>
          <a class="w3-left"
            ><i class="fa fa-sliders" aria-hidden="true"></i> Teststudio</a
          >
        </div>
      </div>
      <div class="w3-panel">
        <router-link to="/join-studio" class="w3-left">
          <p><i class="fa fa-users" aria-hidden="true"></i> Join Studios</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: Boolean,
  },
  name: "leftNaviation",
  methods: {
    hideLeftSideBar: function () {
      this.$root.$data.leftBarActive = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-height {
  height: 723px;
  margin-left: 10px;
  margin-right: 5px;
  background-color: #ffffff;
}
.iconColor {
  color: #595858;
}

.Studio-height {
  height: 20%;
}
.title {
  padding-top: 10%;
  padding-left: 10%;
}
.plusColor {
  color: #ffa15e;
}
</style>

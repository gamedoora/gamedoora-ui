<template>
  <!-- <div id="mainContent" class="w3-col m8 l8 "> -->
  <div class="w3-panel w3-card card-color dashboard-content-header">
    <div class="w3-bar">
      <div id="tabs" style="display: flex">
        <a class="w3-bar-item w3-mobile" v-on:click="openTab('stream')"
          ><i class="fa fa-desktop" aria-hidden="true"></i> Stream</a
        >
        <a class="w3-bar-item w3-mobile active" v-on:click="openTab('assets')"
          ><i class="fa fa-desktop" aria-hidden="true"></i> Assets</a
        >
        <a class="w3-bar-item w3-mobile" v-on:click="openTab('tasks')"
          ><i class="fa fa-desktop" aria-hidden="true"></i> Tasks</a
        >
        <a class="w3-bar-item w3-mobile"
          ><i class="fa fa-desktop" aria-hidden="true"></i> Dashboard</a
        >
        <a class="w3-bar-item w3-mobile"
          ><i class="fa fa-desktop" aria-hidden="true"></i> Admin</a
        >
      </div>
    </div>
  </div>
  <div class="w3-card content-height">
    <div id="stream" style="display: none" class="tabs">
      <stream />
    </div>
    <div id="tasks" style="display: none" class="tabs">
      <div class="w3-quarter">
        <div class="w3-panel w3-card-4 w3-margin">
          <p class="w3-center">Backlog</p>
          <div id="backlog">
            <input
              class="w3-input w3-border w3-margin-bottom"
              v-on:click="showBacklog"
              type="text"
              placeholder="Add New Card"
            />
          </div>
          <div
            id="showBacklog"
            class="w3-border w3-margin-bottom"
            style="display: none"
          >
            <div class="w3-container">
              <p>Add New Task</p>
              <label class="w3-left">Task Title</label>
              <input
                class="w3-input w3-border"
                type="text"
                placeholder="Enter task title"
              />
              <label class="w3-left w3-margin-top">Task Owner</label>
              <select class="w3-select w3-border" name="option" style="color: ">
                <option value="" disabled selected>--Select Owner--</option>
                <option value="3">Script</option>
              </select>
              <label class="w3-left w3-margin-top">Start Date</label>
              <input class="w3-input w3-border" type="date" />
              <label class="w3-left w3-margin-top">Due date</label>
              <input class="w3-input w3-border" type="date" />
              <button
                class="w3-button w3-white w3-border w3-margin-top w3-margin-bottom"
                v-on:click="hideBacklog"
                style="width: 35%; margin-right: 10%"
              >
                Cancel
              </button>
              <button
                class="w3-btn w3-ripple w3-border"
                style="
                  width: 35%;
                  margin-right: 10%;
                  background-color: #286090;
                  color: white;
                "
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="w3-quarter">
        <div class="w3-panel w3-card-4 w3-margin">
          <p class="w3-center">Todo</p>
          <div id="todo">
            <input
              class="w3-input w3-border w3-margin-bottom"
              v-on:click="showTodo"
              type="text"
              placeholder="Add New Card"
            />
          </div>
          <div
            id="showTodo"
            class="w3-border w3-margin-bottom"
            style="display: none"
          >
            <div class="w3-container">
              <p>Add New Task</p>
              <label class="w3-left">Task Title</label>
              <input
                class="w3-input w3-border"
                type="text"
                placeholder="Enter task title"
              />
              <label class="w3-left w3-margin-top">Task Owner</label>
              <select class="w3-select w3-border" name="option" style="color: ">
                <option value="" disabled selected>--Select Owner--</option>
                <option value="3">Script</option>
              </select>
              <label class="w3-left w3-margin-top">Start Date</label>
              <input class="w3-input w3-border" type="date" />
              <label class="w3-left w3-margin-top">Due date</label>
              <input class="w3-input w3-border" type="date" />
              <button
                class="w3-button w3-white w3-border w3-margin-top w3-margin-bottom"
                v-on:click="hideTodo"
                style="width: 35%; margin-right: 10%"
              >
                Cancel
              </button>
              <button
                class="w3-button w3-ripple w3-border"
                style="
                  width: 35%;
                  margin-right: 10%;
                  background-color: #286090;
                  color: white;
                "
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="w3-quarter">
        <div class="w3-panel w3-card-4 w3-margin">
          <p class="w3-center">In Progress</p>
          <div id="progress">
            <input
              class="w3-input w3-border w3-margin-bottom"
              v-on:click="showProgress"
              type="text"
              placeholder="Add New Card"
            />
          </div>
          <div
            id="showProgress"
            class="w3-border w3-margin-bottom"
            style="display: none"
          >
            <div class="w3-container">
              <p>Add New Task</p>
              <label class="w3-left">Task Title</label>
              <input
                class="w3-input w3-border"
                type="text"
                placeholder="Enter task title"
              />
              <label class="w3-left w3-margin-top">Task Owner</label>
              <select class="w3-select w3-border" name="option" style="color: ">
                <option value="" disabled selected>--Select Owner--</option>
                <option value="3">Script</option>
              </select>
              <label class="w3-left w3-margin-top">Start Date</label>
              <input class="w3-input w3-border" type="date" />
              <label class="w3-left w3-margin-top">Due date</label>
              <input class="w3-input w3-border" type="date" />
              <button
                class="w3-button w3-white w3-border w3-margin-top w3-margin-bottom"
                v-on:click="hideProgress"
                style="width: 35%; margin-right: 10%"
              >
                Cancel
              </button>
              <button
                class="w3-button w3-ripple w3-border"
                style="
                  width: 35%;
                  margin-right: 10%;
                  background-color: #286090;
                  color: white;
                "
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="w3-quarter">
        <div class="w3-panel w3-card-4 w3-margin">
          <p class="w3-center">Done</p>
          <div id="done">
            <input
              class="w3-input w3-border w3-margin-bottom"
              v-on:click="showDone"
              type="text"
              placeholder="Add New Card"
            />
          </div>
          <div
            id="showDone"
            class="w3-border w3-margin-bottom"
            style="display: none"
          >
            <div class="w3-container">
              <p>Add New Task</p>
              <label class="w3-left">Task Title</label>
              <input
                class="w3-input w3-border"
                type="text"
                placeholder="Enter task title"
              />
              <label class="w3-left w3-margin-top">Task Owner</label>
              <select class="w3-select w3-border" name="option" style="color: ">
                <option value="" disabled selected>--Select Owner--</option>
                <option value="3">Script</option>
              </select>
              <label class="w3-left w3-margin-top">Start Date</label>
              <input class="w3-input w3-border" type="date" />
              <label class="w3-left w3-margin-top">Due date</label>
              <input class="w3-input w3-border" type="date" />
              <button
                class="w3-button w3-white w3-border w3-margin-top w3-margin-bottom"
                v-on:click="hideDone"
                style="width: 35%; margin-right: 10%"
              >
                Cancel
              </button>
              <button
                class="w3-button w3-ripple w3-border"
                style="
                  width: 35%;
                  margin-right: 10%;
                  background-color: #286090;
                  color: white;
                "
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="assets" class="tabs">
      <div style="height: 100px; border-bottom: 3px solid #e1e1e1">
        <h3 class="w3-left w3-margin">Assets Management</h3>
        <div class="w3-cell w3-right">
          <p>As / assets</p>
          <p style="font-size: 14px; margin-right: 20px">Upload new Asset</p>
          <p style="font-size: 14px; margin-top: -15px; margin-right: 20px">
            Upload new Script
          </p>
        </div>
      </div>
      <div class="w3-container">
        <button
          v-on:click="openAccordion('Demo1')"
          class="w3-btn w3-block w3-black w3-left-align"
          style="margin-top: 15px"
        >
          <h5>Advance Filter</h5>
          <i
            class="fa fa-chevron-down w3-right"
            style="margin-top: -30px; font-size: 20px"
            aria-hidden="true"
          ></i>
        </button>
        <div id="Demo1" class="w3-hide">
          <div class="w3-block w3-border w3-shadow">
            <p class="w3-left w3-margin-left">
              - Search for one or more Customers -
            </p>
            <div class="w3-row">
              <div class="w3-col s12 m4 l4">
                <input
                  class="w3-input w3-border"
                  style="width: 80%; margin: 0px 10px 20px 50px"
                  type="text"
                  placeholder="Search By Asset Name"
                />
              </div>
              <div class="w3-col s12 m4 l4">
                <select
                  class="w3-select w3-border"
                  name="option"
                  style="width: 80%; margin: 0px 10px 20px 10px"
                >
                  <option value="" disabled selected>
                    --Select a type of asset--
                  </option>
                  <option value="1">Document</option>
                  <option value="2">Image</option>
                  <option value="3">Audio</option>
                  <option value="3">Video</option>
                  <option value="3">Script</option>
                </select>
              </div>
              <div class="w3-col m4 l4">
                <button
                  class="w3-button w3-white w3-border"
                  style="width: 35%; margin-right: 10%"
                >
                  Reset
                </button>
                <button
                  class="w3-button"
                  style="width: 35%; background-color: #ff8833; color: white"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="w3-responsive">
          <table class="w3-table w3-border" style="margin-top: 5%">
            <tr style="text-align: center; padding: 10%">
              <td class="w3-border">#</td>
              <td class="w3-border">NAME</td>
              <td class="w3-border">FILE TYPE</td>
              <td class="w3-border">USER</td>
              <td class="w3-border">VERSION</td>
              <td class="w3-border">STATUS</td>
              <td class="w3-border">FILE</td>
              <td class="w3-border">
                ACTIONS
                <i
                  class="fa fa-plus w3-right"
                  style="font-size: 21px; margin-right: 11px"
                  aria-hidden="true"
                ></i>
              </td>
            </tr>
            <tr>
              <td class="w3-border">First Name</td>
              <td class="w3-border">First Name</td>
              <td class="w3-border">First Name</td>
              <td class="w3-border">First Name</td>
              <td class="w3-border">First Name</td>
              <td class="w3-border">First Name</td>
              <td class="w3-border">First Name</td>
              <td class="w3-border">
                <i
                  class="fa fa-link"
                  style="margin-right: 10px"
                  aria-hidden="true"
                ></i>
                <i class="fa fa-upload" aria-hidden="true"></i>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- </div> -->
</template>

<script>
import Stream from "./stream.vue";
export default {
  name: "Content",
  components: {
    Stream,
  },
  methods: {
    hideRightSideBar: function () {
      console.log("HiderightSideBar");
      document.getElementById("rightBarIcon").style.display = "";
      document.getElementById("rightSideBar").style.display = "none";
      var element = document.getElementById("mainContent");
      element.className = element.className.replace(/\bm10 l10\b/g, "m8 l8");
    },

    showBacklog: function () {
      console.log("showBacklog");
      document.getElementById("showBacklog").style.display = "";
      document.getElementById("backlog").style.display = "none";
    },
    hideBacklog: function () {
      console.log("showBacklog");
      document.getElementById("showBacklog").style.display = "none";
      document.getElementById("backlog").style.display = "";
    },
    showTodo: function () {
      console.log("showBacklog");
      document.getElementById("showTodo").style.display = "";
      document.getElementById("todo").style.display = "none";
    },
    hideTodo: function () {
      console.log("showBacklog");
      document.getElementById("showTodo").style.display = "none";
      document.getElementById("todo").style.display = "";
    },
    showProgress: function () {
      console.log("showBacklog");
      document.getElementById("showProgress").style.display = "";
      document.getElementById("progress").style.display = "none";
    },
    hideProgress: function () {
      console.log("showBacklog");
      document.getElementById("showProgress").style.display = "none";
      document.getElementById("progress").style.display = "";
    },
    showDone: function () {
      console.log("showBacklog");
      document.getElementById("showDone").style.display = "";
      document.getElementById("done").style.display = "none";
    },
    hideDone: function () {
      console.log("showBacklog");
      document.getElementById("showDone").style.display = "none";
      document.getElementById("done").style.display = "";
    },
    openTab: function (tabsName) {
      var i;
      var x = document.getElementsByClassName("tabs");
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      document.getElementById(tabsName).style.display = "block";
      var header = document.getElementById("tabs");
      var btns = header.getElementsByClassName("w3-bar-item");
      for (var j = 0; j < btns.length; j++) {
        btns[j].addEventListener("click", function () {
          var current = document.getElementsByClassName("active");
          if (current.length > 0) {
            current[0].className = current[0].className.replace(" active", "");
          }
          this.className += " active";
        });
      }
    },
    openAccordion: function (id) {
      console.log("Accordion");
      var x = document.getElementById(id);
      if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
      } else {
        x.className = x.className.replace(" w3-show", "");
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mainContent {
  margin-left: 11px;
}
.content-height {
  height: 665px;
  background-color: #ffffff;
  margin-right: 10px;
  margin-left: 10px;
}
.card-color {
  background-color: #ffffff;
  margin-right: 10px;
  margin-left: 10px;
}
.active,
.w3-bar-item:hover {
  color: #ffa15e;
  border-bottom: 2px solid #ffa15e !important;
}
</style>

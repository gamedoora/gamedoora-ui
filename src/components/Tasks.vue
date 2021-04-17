<template>
  <div class="state_story_parent row">
    <div class="states">
      <div class="col-12 state_parent_div">
        <div class="list_boundary">
          <div class="heading state_heading ui-sortable-handle">
            <p class="w3-center">Backlog</p>
          </div>
          <div class="add_new_card_form_div">
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
              class="w3-margin-bottom"
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
                <select
                  class="w3-select w3-border"
                  name="option"
                  style="color: "
                >
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
      </div>
    </div>
    <div class="states">
      <div class="col-12 state_parent_div">
        <div class="list_boundary">
          <div class="heading state_heading ui-sortable-handle">
            <p class="w3-center">Todo</p>
          </div>
          <div class="add_new_card_form_div">
            <div id="todo">
              <input
                class="w3-input w3-border w3-margin-bottom"
                v-on:click="showTodo"
                type="text"
                placeholder="Add New Card"
              />
            </div>
            <div id="showTodo" class="w3-margin-bottom" style="display: none">
              <div class="w3-container">
                <p>Add New Task</p>
                <label class="w3-left">Task Title</label>
                <input
                  class="w3-input w3-border"
                  type="text"
                  placeholder="Enter task title"
                />
                <label class="w3-left w3-margin-top">Task Owner</label>
                <select
                  class="w3-select w3-border"
                  name="option"
                  style="color: "
                >
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
      </div>
    </div>
    <div class="states">
      <div class="col-12 state_parent_div">
        <div class="list_boundary">
          <div class="heading state_heading ui-sortable-handle">
            <p class="w3-center">In Progress</p>
          </div>
          <div class="add_new_card_form_div">
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
              class="w3-margin-bottom"
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
                <select
                  class="w3-select w3-border"
                  name="option"
                  style="color: "
                >
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
      </div>
    </div>
    <div class="states">
      <div class="col-12 state_parent_div">
        <div class="list_boundary">
          <div class="heading state_heading ui-sortable-handle">
            <p class="w3-center">Done</p>
          </div>
          <div class="add_new_card_form_div">
            <div id="done">
              <input
                class="w3-input w3-border w3-margin-bottom"
                v-on:click="showDone"
                type="text"
                placeholder="Add New Card"
              />
            </div>
            <div id="showDone" class="w3-margin-bottom" style="display: none">
              <div class="w3-container">
                <p>Add New Task</p>
                <label class="w3-left">Task Title</label>
                <input
                  class="w3-input w3-border"
                  type="text"
                  placeholder="Enter task title"
                />
                <label class="w3-left w3-margin-top">Task Owner</label>
                <select
                  class="w3-select w3-border"
                  name="option"
                  style="color: "
                >
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
    </div>
  </div>
</template>
<script>
export default {
  name: "Tasks",
  methods: {
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
  },
};
</script>

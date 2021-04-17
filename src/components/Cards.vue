<template>
  <div class="col-12 col-sm-4 col-lg-auto state_parent_div">
    <div class="list_boundary">
      <div class="heading state_heading ui-sortable-handle">
        <h4 class="text-center">{{ title }}</h4>
      </div>

      <!-- <div class="stories ui-sortable">
                <div class="draggable" v-for="list in lists" :key="list" @click="updateTask">
                    <div class="story_div story_div_14" >
                        {{ list }}
                    </div>
                </div>
            </div> -->
      <div class="stories ui-sortable">
        <draggable
          v-model="mutableList"
          group="tasks"
          item-key="text">
          <!-- <template #item="{ element }"> -->
            <div class="draggable" @click="updateTask" v-for="element of mutableList" :key="element.text">
              <div class="story_div story_div_14">
                {{ element.text }}
              </div>
            </div>
          <!-- </template> -->
        </draggable>
      </div>
      <div class="add_new_card_form_div">
        <form
          class="add_new_card_form"
          method="post"
          v-bind:class="{ 'd-block': showForm }"
        >
          <h5 style="text-align: center"><strong>Add New Task</strong></h5>
          <div class="form-group">
            <label>Task Title</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter task title"
              name="story_name"
            />
          </div>
          <div class="form-group">
            <label for="pwd">Task Owner</label>
            <select name="user_id" class="form-control">
              <option value="">--- Select Owner ---</option>
              <option value="28">pradeep</option>
            </select>
          </div>
          <div class="form-group">
            <label for="pwd">Start Date</label>
            <input
              type="date"
              name="start_date"
              class="form-control"
              value=""
            />
          </div>
          <div class="form-group">
            <label for="pwd">Due Date</label>
            <input type="date" name="due_date" class="form-control" value="" />
          </div>
          <div class="text-center">
            <button
              type="button"
              @click="showForm = false"
              class="btn btn-light mr-3 cancel_new_card_trigger_button"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="showForm = false"
              class="btn btn-primary submit_new_card_trigger_button"
            >
              Submit
            </button>
          </div>
        </form>
        <div
          class="add_new_card_trigger_button display-block"
          @click="showForm = true"
          v-bind:class="{ 'd-block': !showForm, 'd-none': showForm }"
        >
          Add new card
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { VueDraggableNext }  from "vue-draggable-next";

export default defineComponent({
  name: "Cards",
  components: {
    draggable:VueDraggableNext,
  },
  props: {
    title: String,
    lists: {
      default: [],
    },
    updateTask: {
      type: Function
    },
  },
  data() {
    return {
      showForm: false,
      testID: 0,
      mutableList: this.lists,
      drag: false,
    };
  },
});
</script>

<style>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.sortable-ghost .story_div {
  opacity: 0.9;
  background: #eee;
  border: 1px dashed #000;
  transform: rotateZ(3deg);
  transition: transform 0.5s;
}
</style>

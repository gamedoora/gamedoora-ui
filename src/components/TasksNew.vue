<template>
  <div class="state_story_parent">
    <!-- <div class="states ui-sortable row"> -->
    <draggable v-model="kanbans" item-key="name" class="states ui-sortable row">
      <!-- <template #item="{ element }"> -->
        <Cards
          v-for="element in kanbans" 
          :key="element.name"
          :title="element.name"
          :lists="element.data"
          :updateTask="updateTask"
        />
      <!-- </template> -->
    </draggable>
  </div>

  <div class="kanban-modal modal fade" role="dialog" id="kanban-modal">
    <div class="modal-dialog modal-lg">
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modal title</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body row">
          <EditTaskModal />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cards from "./Cards.vue";
import EditTaskModal from "./EditTaskModal.vue";
import $ from "jquery";

import { VueDraggableNext }  from "vue-draggable-next";

export default defineComponent({
  name: "TasksNew",
  components: {
    Cards,
    EditTaskModal,
    draggable: VueDraggableNext,
  },
  data() {
    return {
      kanbans: [
        {
          name: "To do",
          data: [{ text: "todo1" }, { text: "todo2" }, { text: "todo3" }],
        },
        {
          name: "Backlog",
          data: [
            { text: "backlog1" },
            { text: "backlog2" },
            { text: "backlog3" },
          ],
        },
        { name: "In Progress", data: [] },
        { name: "Done", data: [] },
      ],
    };
  },
  methods: {
    updateTask():void {
      $("#kanban-modal").modal("show");
    },
  }
});
</script>

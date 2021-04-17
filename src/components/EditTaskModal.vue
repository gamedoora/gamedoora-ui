<template>
  <div class="col-xs-12 col-sm-12 col-lg-4 col-md-4 side-bar details-section">
    <div class="list-group-item-parent">
      <div class="form-horizontal">
        <div class="form-group list-group-item">
          <div class="heading">
            <h5>Task Owner</h5>
          </div>
          <div class="body">
            <div
              class="story-owner-name-div"
              style="
                border: 1px solid #3c3c3c;
                margin-right: 10px;
                padding: 5px;
                display: inline-block;
              "
            >
              <a
                href="javascript:void(0)"
                data-toggle="tooltip"
                data-placement="top"
                title="Pradeep"
                >Pradeep</a
              >
            </div>
          </div>
        </div>
      </div>
      <form class="form-horizontal">
        <div
          class="form-group list-group-item display-none edit-tags-div"
          style="display: none"
        >
          <div class="heading">
            <h5>Assign labels</h5>
          </div>
          <div class="body">
            <select
              name="tags[]"
              class="form-control"
              multiple=""
              style="max-height: 70px"
            ></select>
          </div>
          <div
            class="cancel-edit-tags-button btn btn-danger"
            style="margin-top: 10px"
          >
            Cancel
          </div>
        </div>
        <div class="form-group list-group-item">
          <div class="heading">
            <h5>Start Date</h5>
          </div>
          <div class="body">
            <input
              type="date"
              name="start_date"
              class="form-control"
              value="2021-03-12"
            />
          </div>
        </div>
        <div class="form-group list-group-item">
          <div class="heading">
            <h5>Due Date</h5>
          </div>
          <div class="body">
            <input
              type="date"
              name="due_date"
              class="form-control"
              value="2021-03-13"
            />
          </div>
        </div>
        <div class="form-group list-group-item">
          <div class="heading">
            <h5>Assets</h5>
          </div>
          There are no linked assets
        </div>
        <div class="form-group list-group-item">
          <div class="heading">
            <h5>
              Description
              <span class="edit-description-button" @click="description = true"
                ><i class="fa fa-pencil" aria-hidden="true"></i
              ></span>
            </h5>
          </div>
          <div class="body">
            <div
              class="edit-description-div"
              v-bind:class="{ 'd-none': !description }"
            >
              <editor
                :init="{
                  menubar: false,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                  ],
                  toolbar1: 'undo redo | bold italic',
                  toolbar2:
                    'alignleft aligncenter alignright alignjustify | indent outdent ',
                }"
              />
              <div
                class="cancel-edit-description-button btn btn-danger"
                @click="description = false"
                style="margin-top: 10px"
              >
                Cancel
              </div>
            </div>
          </div>
        </div>
        <div class="form-group list-group-item">
          <button
            type="button"
            class="btn btn-block btn-primary update_story_details"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
  <ul class="col-xs-12 col-sm-12 col-md-8 col-lg-8 comments-section">
    <li class="list-group-item create-comment">
      <span
        class="project-management comment-form"
        data-url="/create-comment"
        data-commentable-id="15"
        data-commentable-type="Core::Story"
      >
        <textarea
          class="comment-field"
          placeholder="Enter your comment"
          rows="2"
        ></textarea>
        <button class="comment-btn btn btn-primary d-block">Comment</button>
      </span>
    </li>
    <div class="comments">
      <li id="comment_93" class="project-management comment list-group-item">
        <div class="comment-content">
          <div class="user-name-div">
            <div class="user-name">p</div>
          </div>
          <div class="comment-content">comment-1</div>
        </div>
        <div class="comment-action-div">
          <span class="action comment-reply-div">
            <a
              href="javascript:void(0)"
              class="reply"
              @click="replyComment = true"
              v-bind:class="{
                'd-none': replyComment,
                'd-inline': !replyComment,
              }"
              >Reply</a
            >
            <a
              href="javascript:void(0)"
              class="cancel"
              @click="replyComment = false"
              v-bind:class="{
                'd-inline': replyComment,
                'd-none': !replyComment,
              }"
              >Cancel</a
            >
            <div
              class="reply-form display-none"
              v-bind:class="{
                'd-block': replyComment,
                'd-none': !replyComment,
              }"
            >
              <span class="project-management comment-form">
                <textarea
                  class="comment-field"
                  placeholder="Enter your comment"
                  rows="2"
                ></textarea>
                <button
                  class="comment-btn btn btn-primary"
                  style="display: inline-block"
                >
                  Comment
                </button>
              </span>
            </div>
          </span>
        </div>
      </li>
    </div>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Editor from "@tinymce/tinymce-vue";

export default defineComponent({
  name: "EditTaskModal",
  components: {
    editor: Editor,
  },
  data() {
    return {
      replyComment: false,
      description: false,
    };
  },
});
</script>

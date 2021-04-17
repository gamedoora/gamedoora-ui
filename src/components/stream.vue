<template>
  <div class="feed-composer" v-bind:class="{ 'display-none': hideForm }">
    <form method="POST">
      <div class="form-group" style="margin-bottom: 10px">
        <input
          type="text"
          name="context"
          class="form-control"
          data-studio-uid="teststudio"
          placeholder="What are you working on..."
        />
      </div>
      <button class="btn btn-u share pull-right submit_story_comment">
        Share
      </button>
    </form>
  </div>

  <ul class="feeds-container list-unstyled">
    <li class="feed-container" data-feed-id="95">
      <div class="feed">
        <div>
          <div class="image-div pull-left">
            <img class="img" src="../assets/logo.png" height="40px" />
          </div>
          <div class="name-time-div pull-left">
            <div class="user-name">Users</div>
            <div class="feed-time">
              <i class="icon-clock" aria-hidden="true"></i>
              2021-03-16 00:00:00 UTC
            </div>
          </div>
        </div>
        <div class="content">
          <div class="text">Commsnsad</div>
        </div>
      </div>

      <ul
        class="list-inline like-comment pull-right has-comments"
        data-reference="95"
      >
        <li class="comment-button" @click="toggleChild($event)">
          <i class="icon-reply" aria-hidden="true"></i>
          <span class="count"> 1 comments </span>
        </li>
      </ul>
      <div class="child-container display-none">
        <div class="reply-div display-none">
          <form method="POST">
            <div class="form-group">
              <input
                type="text"
                name="context"
                class="form-control"
                data-studio-uid="teststudio"
                placeholder="Write a Comment...."
              />
            </div>
            <div class="form-group">
              <button class="btn btn-primary reply_to_studio_feed">
                Comment
              </button>
            </div>
          </form>
        </div>
        <div class="child_feeds_div" data-fetched-children="0"></div>
      </div>
    </li>
    <li class="feed-container" data-feed-id="92">
      <div class="feed">
        <div>
          <div class="image-div pull-left">
            <img class="img" src="../assets/logo.png" height="40px" />
          </div>
          <div class="name-time-div pull-left">
            <div class="user-name">Users</div>
            <div class="feed-time">
              <i class="icon-clock" aria-hidden="true"></i>
              2021-03-16 00:00:00 UTC
            </div>
          </div>
        </div>
        <div class="content">
          <div class="text">Cmns-sdsd sd</div>
        </div>
      </div>

      <ul class="list-inline like-comment pull-right" data-reference="92">
        <li class="comment-button" @click="toggleChild($event)">
          <i class="icon-reply" aria-hidden="true"></i>
          <span class="count"> </span>
        </li>
      </ul>
      <div class="child-container display-none">
        <div class="reply-div display-none">
          <form action="/create-comment" method="POST">
            <div class="form-group">
              <input
                type="text"
                name="context"
                class="form-control"
                data-studio-uid="teststudio"
                placeholder="Write a Comment...."
              />
            </div>
            <div class="form-group">
              <button class="btn btn-primary reply_to_studio_feed">
                Comment
              </button>
            </div>
          </form>
        </div>
        <div class="child_feeds_div" data-fetched-children="0"></div>
      </div>
    </li>
    <li class="feed-container" data-feed-id="91">
      <div class="feed">
        <div>
          <div class="image-div pull-left">
            <img class="img" src="../assets/logo.png" height="40px" />
          </div>
          <div class="name-time-div pull-left">
            <div class="user-name">Users</div>
            <div class="feed-time">
              <i class="icon-clock" aria-hidden="true"></i>

              2021-02-17 16:18:09 UTC
            </div>
          </div>
        </div>
        <div class="content">
          <div class="text">test stream</div>
        </div>
      </div>

      <ul class="list-inline like-comment pull-right" data-reference="91">
        <li class="comment-button" @click="toggleChild($event)">
          <i class="icon-reply" aria-hidden="true"></i>
          <span class="count"></span>
        </li>
      </ul>
      <div class="child-container display-none">
        <div class="reply-div display-none">
          <form method="POST">
            <div class="form-group">
              <input
                type="text"
                name="context"
                class="form-control"
                data-studio-uid="teststudio"
                placeholder="Write a Comment...."
              />
            </div>
            <div class="form-group">
              <button class="btn btn-primary reply_to_studio_feed">
                Comment
              </button>
            </div>
          </form>
        </div>
        <div class="child_feeds_div" data-fetched-children="0"></div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import $ from "jquery";

export default defineComponent({
  name: "Stream",
  props: ["hideForm"],
  methods: {
    toggleChild(event:Event):void {
     const target = event.target as HTMLLIElement;

      var comment_container = $(target).closest("li.feed-container");
      var expandedContainer = comment_container.find(".child-container");
    
      if (expandedContainer.hasClass("display-none")) {
        expandedContainer.removeClass("display-none");
        const replyDiv = expandedContainer.find(".reply-div");
        replyDiv.removeClass("display-none");
      } else {
        expandedContainer.addClass("display-none");
        const replyDiv = expandedContainer.find(".reply-div");
        replyDiv.addClass("display-none");
      }
    },
  },
});
</script>

<style>
.dashboard-content-container { 
  text-align: -webkit-auto;
}
</style>

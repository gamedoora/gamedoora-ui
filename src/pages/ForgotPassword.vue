<template>
  <div class="row">
    <div class="col-md-6 offset-md-3 col-sm-6 offset-sm-3">
      <form
        class="reg-page"
        id="new_user"
        action=""
        accept-charset="UTF-8"
        method="post"
      >
        <div class="reg-header">
          <h3>Forgot Your Password?</h3>
        </div>
        <div class="input-container">
          <div class="input-group margin-bottom-20">
            <div class="input-group-prepend">
              <span class="input-group-text"
                ><i class="fa fa-envelope"></i
              ></span>
            </div>

            <input
              class="form-control margin-bottom-20 email"
              placeholder="Email ID"
              type="email"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <button
              type="button"
              @click="$router.push('studio')"
              class="btn-u btn-block reset-pwd-btn"
            >
              Reset Password
            </button>
          </div>
        </div>
        <hr />
        <p>
          Click <router-link to="/" class="color-green">Sign In</router-link> to
          login your account.
        </p>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ForgotPassword",
});
</script>

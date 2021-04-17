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
          <h2>Sign In</h2>
          <ul class="social-icons text-center">
            <li>
              <a
                href="javascript:void(0)"
                class="rounded-x social_facebook"
                data-original-title="Facebook"
              ></a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                class="rounded-x social_twitter"
                data-original-title="Twitter"
              ></a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                class="rounded-x social_googleplus"
                data-original-title="Google Plus"
              ></a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                class="rounded-x social_linkedin"
                data-original-title="Linkedin"
              ></a>
            </li>
          </ul>
          <p>
            Don't Have Account? Click
            <router-link to="/signup" class="color-green">Sign Up</router-link>
            to registration.
          </p>
        </div>

        <div class="input_container">
          <div class="input-group margin-bottom-20">
            <div class="input-group-prepend">
              <span class="input-group-text"
                ><i class="fa fa-envelope"></i
              ></span>
            </div>
            <input
              autofocus="autofocus"
              class="form-control margin-bottom-20 _email"
              placeholder="Email ID"
              required="required"
              type="email"
              value=""
              id="user_email"
            />
          </div>
        </div>

        <div class="input_container">
          <div class="input_field_error"></div>
          <div class="input-group margin-bottom-20">
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="fa fa-key"></i></span>
            </div>
            <input
              autocomplete="off"
              class="form-control margin-bottom-20 _password"
              placeholder="Password"
              required="required"
              type="password"
              id="user_password"
            />
          </div>
        </div>

        <div class="checkbox">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="defaultCheck1"
            />
            <label class="form-check-label" for="defaultCheck1">
              Always stay signed in
            </label>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <!-- <router-link to="/signup" class="btn-u btn-block login_btn">Log In</router-link> -->
            <button
              type="button"
              class="btn-u btn-block login_btn"
              @click="$router.push('studio')"
            >
              Log In
            </button>
          </div>
        </div>
        <hr />
        <h4>Forget your Password ?</h4>
        <p>
          no worries,
          <router-link to="/forgot-password" class="color-green"
            >click here</router-link
          >
          to reset your password.
        </p>
        <hr />
        <a href="javascript:void(0)"
          >Didn't receive confirmation instructions?</a
        >
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent ({
  name: "Dashboard",
});
</script>

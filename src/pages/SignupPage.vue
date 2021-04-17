<template>
  <div class="row">
    <div class="col-md-6 offset-md-3 col-sm-8 offset-sm-2">
      <form
        class="reg-page"
        id="new_user"
        action=""
        accept-charset="UTF-8"
        method="post"
      >
        <div class="reg-header">
          <h2>Register a new account</h2>
          <p>
            Already Signed Up? Click
            <router-link to="/" class="color-green">Sign In</router-link>
            to login your account.
          </p>
        </div>
        <div class="input_container">
          <label>Name <span class="color-red">*</span></label>
          <input
            autofocus="autofocus"
            class="form-control margin-bottom-20 _name"
            required="required"
            type="text"
          />
        </div>
        <div class="input_container">
          <label>Email Address <span class="color-red">*</span></label>
          <div class="input_field_error"></div>
          <input
            autofocus="autofocus"
            class="form-control margin-bottom-20 _email"
            required="required"
            type="email"
          />
          <p class="email-instructions">
            You will receive an email with instructions for how to confirm your
            email address
          </p>
        </div>
        <div class="input_container">
          <label>Password <span class="color-red">*</span></label>
          <div class="input_field_error"></div>
          <input
            autocomplete="off"
            class="form-control margin-bottom-20 _password"
            required="required"
            type="password"
          />
        </div>
        <div class="input_container">
          <label>Confirm Password <span class="color-red">*</span></label>
          <div class="input_field_error"></div>
          <input
            autocomplete="off"
            class="form-control margin-bottom-20 _confirmPassword"
            required="required"
            type="password"
          />
        </div>
        <hr />
        <div class="row">
          <button
            type="button"
            @click="$router.push('studio')"
            name="commit"
            value="Sign up"
            class="btn-u btn-block register_btn"
            data-disable-with="Sign up"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Signup",
});
</script>

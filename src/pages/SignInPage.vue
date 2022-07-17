<template>
  <div class="main">
    <div class="main__login">
      <div class="main__login-section">
        <p>
          Don't have an account?
          <!-- TODO: Add when page is available
          <router-link :to="{ name: 'SignUpPage' }">Sign up</router-link> -->
        </p>
        <div class="main__login-form">
          <h1>Welcome to <span>GameDoora</span></h1>
          <h3>Create. Connect. Collaborate.</h3>
          <p>
            A social and collaboration hub for
            everyone involved in gaming,
            animation, and film production pipeline.
          </p>
          <form>
            <input
              type="email"
              class="form-control"
              id="email"
              aria-label="Email"
              aria-describedby="emailHelp"
              autocomplete="email"
              placeholder="Enter email">
            <input
              type="password"
              class="form-control"
              id="password"
              aria-label="Password"
              autocomplete="current-password"
              aria-describedby="emailHelp"
              placeholder="Enter Password">
            <button type="submit">Login</button>
          </form>
          <div class="main__login-social">
            <ul class="">
              <li>
                <GoogleLogin />
              </li>
              <li>
                <TwitterLogin />
              </li>
              <li>
                <GithubLogin />
              </li>
              <li>
                <FacebookLogin />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="main__content">
      <div class="main__content-header">
      </div>
      <div class="main__content-illustration">
        <img src="@/assets/images/illustration.svg" alt="illustration">
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .main {
    display: grid;
    background: #fff;
    border-radius: 5px;
    grid-template-columns: 1fr 1fr;
    &__login {
      &-section {
        padding: 2.5rem .5rem;
        margin: auto;
        width: 80%;
        p {
          color: #9c9c9c;
          font-size: 14px;
        }
      }
      &-form {
        margin-top: 5.5rem;
        h1 {
          span {
            background: #ff5a09;
            color: white;
            padding: 0.2rem 0.5rem;
          }
        }
        form {
          margin-top: 3rem;
          input {
            margin-top: 2rem;
          }
          button {
            margin-top: 2rem;
            background: #ff5a09;
            color: #fff;
            border: none;
            font-weight: 500;
            border-radius: 5px;
            padding: .5rem 1rem;
            font-size: 16px;
            width: 100%;
            cursor: pointer;
          }
        }
      }
      &-social {
        margin-top: 2rem;
        ul {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          li {
            margin: .5rem;
            img {
              height: 32px;
            }
          }
        }
      }
    }
    &__content {
      background: url('~@/assets/images/background.png');
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      background-repeat: no-repeat;
    }
  }
  // TODO: This should be a variable
  @media (max-width: 995px){
    .main {
      display: block;
      &__content {
        display: none;
      }
    }
  }
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import GoogleLogin from '@/components/LoginProviders/GoogleLogin.vue';
import GithubLogin from '@/components/LoginProviders/GithubLogin.vue';
import FacebookLogin from '@/components/LoginProviders/FacebookLogin.vue';
import TwitterLogin from '@/components/LoginProviders/TwitterLogin.vue';

export default defineComponent({
  name: 'SignInPage',
  props: {
  },
  components: {
    GoogleLogin,
    GithubLogin,
    FacebookLogin,
    TwitterLogin,
  },
  methods: {
  },
});
</script>

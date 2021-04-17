import { createWebHistory, createRouter, RouteRecordRaw } from "vue-router";

const ContentPage = () => import("@/pages/ContentPage.vue");
const SigninPage = () => import("@/pages/SigninPage.vue");
const SignupPage = () => import("@/pages/SignupPage.vue");
const ForgotPassword = () => import("@/pages/ForgotPassword.vue");

const routes: Array<RouteRecordRaw> = [
  { path: "/", name: "signin", component: SigninPage },
  { path: "/signup", name: "signup", component: SignupPage },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: ForgotPassword,
  },
  { path: "/studio", name: "studio", component: ContentPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

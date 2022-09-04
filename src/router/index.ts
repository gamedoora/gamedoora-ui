import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'SignInPage',
    component: () => import(/* webpackChunkName: "SignInPage" */ '../pages/SignInPage.vue'),
  },
  // {
  //   path: '/signup',
  //   name: 'SignUpPage',
  //   component: () =>
  //     import(/* webpackChunkName: "SignUpPage" */ '@/pages/SignUpPage.vue'),
  // },
  // {
  //   path: '/forgot-password',
  //   name: 'forgot-password',
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "ForgotPassword" */ '../pages/ForgotPassword.vue'
  //     ),
  // },
  // {
  //   path: '/studio',
  //   name: 'studio',
  //   component: () =>
  //     import(/* webpackChunkName: "ContentPage" */ '../pages/ContentPage.vue'),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

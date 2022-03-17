import { createApp } from "vue";
import App from "./App.vue";
import mitt from "mitt";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "w3-css/w3.css";
import "font-awesome/css/font-awesome.min.css";
import "./assets/css/style.css";
import "./assets/css/custom.css";

import router from "./router";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_APIKEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.VUE_APP_FIREBASE_APPID,
  databaseUrl: process.env.VUE_APP_FIREBASE_DATABASEURL,
};
export const firebaseApp = initializeApp(firebaseConfig);

const app = createApp(App);
const emitter = mitt();

app.use(router);
app.config.globalProperties.emitter = emitter;
app.mount("#app");

import { createApp } from "vue";
import App from "./App.vue";
import mitt from "mitt";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "w3-css/w3.css";
import "font-awesome/css/font-awesome.min.css";
import "./assets/css/style.css";
import "./assets/css/custom.css";

import router from "./router";

const app = createApp(App);
const emitter = mitt();

app.use(router);
app.config.globalProperties.emitter = emitter;
app.mount("#app");

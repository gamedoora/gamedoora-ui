// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

export const firebaseConfig = {
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

app.use(router);
app.mount('#app');

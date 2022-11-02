// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './index.css';

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
  databaseUrl: import.meta.env.VITE_FIREBASE_DATABASEURL,
};
export const firebaseApp = initializeApp(firebaseConfig);
const app = createApp(App);

app.use(router);
app.mount('#app');

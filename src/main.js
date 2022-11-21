import { createApp, } from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'
import axios from './plugins/axios.js'
import store from './store'
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
const app = createApp(App).use(store)
app.use(axios, {
    baseUrl: 'http://127.0.0.1:8000/api/',
    token: localStorage.getItem('Token')

})
app.use(Toast)
const firebaseConfig = {
    apiKey: "AIzaSyBKhRKYfbb-C-e-dhEfl6q357QAXpvCIiU",
    authDomain: "consult-6a736.firebaseapp.com",
    databaseURL: "https://consult-6a736-default-rtdb.firebaseio.com",
    projectId: "consult-6a736",
    storageBucket: "consult-6a736.appspot.com",
    messagingSenderId: "855384090084",
    appId: "1:855384090084:web:8b07af95c1e55872e4d3f1"
  };
const firestore = firebase.initializeApp(firebaseConfig)
app.use(firestore)
app.use(router).mount('#app')

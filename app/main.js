import Vue from 'nativescript-vue'
import App from './components/App'
import VueDevtools from 'nativescript-vue-devtools'
import {TNSFontIcon, fonticon} from 'nativescript-fonticon';

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
import store from './store'

import * as firebase from "firebase/app";
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

// // Add the Firebase products that you want to use
// import "firebase/auth";
// import "firebase/firestore";
import "firebase/database";
// import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAoLC13tfnPUOt1JI280RkjNbkZnCxQfKU",
  authDomain: "autosos-4d0e5.firebaseapp.com",
  databaseURL: "https://autosos-4d0e5.firebaseio.com",
  projectId: "autosos-4d0e5",
  storageBucket: "autosos-4d0e5.appspot.com",
  messagingSenderId: "956798391934",
  appId: "1:956798391934:web:a1ebc918dcdc76094e2a2f",
  measurementId: "G-CKNH75H27J"
};
// // Initialize Firebase
(firebase.default || firebase).initializeApp(firebaseConfig);
var database = (firebase.default || firebase).database();
console.log(database);
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')


TNSFontIcon.debug = true;
TNSFontIcon.paths = {
  'fa': './font-awesome.css',
  'ion': './ionicons.css'
};
TNSFontIcon.loadCss();

Vue.filter('fonticon', fonticon);
new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()

import Vue from 'nativescript-vue'
import App from './components/App'
import VueDevtools from 'nativescript-vue-devtools'
// import {TNSFontIcon, fonticon} from 'nativescript-fonticon';
import * as platform from 'platform'
if (platform.isIOS) { 
  GMSServices.provideAPIKey("AIzaSyB-E3hqinv-EPqqwS7NGe86JBkk14Yxr9Y")
}
if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
import store from './store/index'

// import * as firebase from "firebase/app";
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

// // Add the Firebase products that you want to use
// import "firebase/auth";
// import "firebase/firestore";
// import "firebase/database";
// // import "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyAoLC13tfnPUOt1JI280RkjNbkZnCxQfKU",
//   authDomain: "autosos-4d0e5.firebaseapp.com",
//   databaseURL: "https://autosos-4d0e5.firebaseio.com",
//   projectId: "autosos-4d0e5",
//   storageBucket: "autosos-4d0e5.appspot.com",
//   messagingSenderId: "956798391934",
//   appId: "1:956798391934:web:a1ebc918dcdc76094e2a2f",
//   measurementId: "G-CKNH75H27J"
// };
// // // Initialize Firebase
// (firebase.default || firebase).initializeApp(firebaseConfig);
// var database = (firebase.default || firebase).database();
// console.log(database);
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

const firebase = require("nativescript-plugin-firebase/app");
// const db = firebase.firestore();

firebase.initializeApp({
  apiKey: 'AIzaSyBBwloHxSyDZNiJGMD12leduIYALuIJX90',
  authDomain: 'https://autosos-4d0e5.firebaseio.com',
  projectId: 'autosos-4d0e5',
  onAuthStateChanged: function(data) { // optional but useful to immediately re-logon the user when they re-visit your app
    console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
    if (data.loggedIn) {
      store.commit('SET_USER_DATA', data.user);
      console.log("user's email address: " + (data.user.email ? data.user.email : "N/A"));
    }else{
      store.commit('UNAUTHORIZE');
    }
  }
}).then(
    function () {
      console.log("firebase.init done");
    },
    function (error) {
      console.log("firebase.init error: " + error);
    }
);






Vue.registerElement('MapView', ()=> require('nativescript-google-maps-sdk').MapView)
// Vue.filter('fonticon', fonticon);
new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()

import Vue from 'nativescript-vue'
import App from './components/App'
import VueDevtools from 'nativescript-vue-devtools'
import * as platform from 'platform'
if (platform.isIOS) { 
  GMSServices.provideAPIKey("AIzaSyDvtm7tbUWeYOKCJVH_-_abGwXib16brqg"); //AIzaSyB-E3hqinv-EPqqwS7NGe86JBkk14Yxr9Y
}
if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
import store from './store/index'
Vue.config.silent = (TNS_ENV === 'production')

const firebase = require("nativescript-plugin-firebase/app");

firebase.initializeApp({
  apiKey: 'AIzaSyBBwloHxSyDZNiJGMD12leduIYALuIJX90',
  authDomain: 'https://autosos-4d0e5.firebaseio.com',
  projectId: 'autosos-4d0e5',
  onAuthStateChanged: function(data) {
    console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
    if (data.loggedIn) {
      const loggedInUser = data.user;
      store.commit('SET_USER_DATA', loggedInUser);
      store.dispatch('getUserFromDB', loggedInUser);
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

Vue.registerElement('MapView', ()=> require('nativescript-google-maps-sdk').MapView);

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()

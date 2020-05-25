import Vue from 'vue';
import Vuex from 'vuex';
var firebase = require("nativescript-plugin-firebase");
const firebaseapp = require("nativescript-plugin-firebase/app");
const db = firebaseapp.firestore();
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  getters: {
    loggedIn(state) {
      return !!state.user;
    },
    user(state) {
      return state.user;
    },
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData;
    },
    UNAUTHORIZE(state) {
      state.user = null;
    },
  },
  actions: {
    login(context, user){
      var userEmail = user.email;
      var userPassword = user.password;
      return firebase.login(
        {
            type: firebase.LoginType.PASSWORD,
            passwordOptions: {
            email: userEmail,
            password: userPassword
            }
        })
        .then((result) => {
        })
        .catch((error) => {
          alert({
            title: "AutoSOS",
            okButtonText: "OK",
            message: error
          });
        });
    },
    register(context, userData) {
      var email = userData.email;
      var password = userData.password;
      return firebase.createUser({
        email,
        password,
      })
      .then((data) => {
        context.dispatch('setUserToDb', data);
      })
      .catch((error) => {
        alert({
          title: "AutoSOS",
          okButtonText: "OK",
          message: error
        });
      });
    },
    logOut(context) {
      context.commit('UNAUTHORIZE');
      firebase.logout();
    },
    setUserToDb(context, user){
      const email = user.email;
      const uid = user.uid;
      db.collection("users").doc(uid).set({
          email: email,
      })
      .then(function() {
          console.log("Document successfully written!");
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });
    },
  }
});

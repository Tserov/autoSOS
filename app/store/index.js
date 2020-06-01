import Vue from 'vue';
import Vuex from 'vuex';
var firebase = require("nativescript-plugin-firebase");
const firebaseapp = require("nativescript-plugin-firebase/app");
const db = firebaseapp.firestore();
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    userServices: [],
    servicesCollection: null,
  },
  getters: {
    loggedIn(state) {
      return !!state.user;
    },
    user(state) {
      return state.user;
    },
    userServices(state) {
      return state.userServices;
    },
    AllServicesCollection(state){
      return state.servicesCollection;
    },
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData;
    },
    UNAUTHORIZE(state) {
      state.user = null;
    },
    SET_USER_SERVICES(state, servicesCollection) {
      state.userServices = servicesCollection;
    },
    SET_SERVICES_COLLECTION(state, servicesCollection) {
      state.servicesCollection = servicesCollection;
    },
    ADD_USER_SERVICE(state, service) {
      state.userServices.push(service);
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
          console.log('login success');
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
    updateUserToDb(context, user){
      const name = user.name;
      const email = user.email;
      const uid = user.uid;
      db.collection("users").doc(uid).update({
          name,
      })
      .then(function() {
          console.log("Document successfully written!");
          context.commit('SET_USER_DATA', user);
          alert({
            title: "AutoSOS",
            okButtonText: "OK",
            message: "Успешно обновяване"
          });
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
          alert({
            title: "AutoSOS",
            okButtonText: "OK",
            message: "Неуспешно обновяване:" + error
          });
      });
    },
    getUserFromDB(context, loggedInUser) {
      const currentUserID = loggedInUser.uid;
      var docRef = db.collection("users").doc(currentUserID);

      docRef.get().then(function(doc) {
          if (doc.exists) {
            const user = doc.data();
            user.uid = currentUserID;
            context.commit('SET_USER_DATA', user);
          } else {
              context.dispatch('setUserToDb', loggedInUser);
              console.log("No such document!");
          }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
      
    },
    getAllUserServricesFromDb(context) {
      const servicesCollection = [];
      const currentUserID = context.getters.user.uid;
      var docRef = db.collection("services");
      docRef.where("author_id", "==", currentUserID).get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            if(!!doc.data){
              var servcie = doc.data();
              servcie.uid = doc.id;
              servicesCollection.push(servcie);
            }
          });
          context.commit('SET_USER_SERVICES', servicesCollection);
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
    },
    updateServiceToDb(context, service){
      const uid = service.uid;
      const name = service.name ? service.name : '';
      const email = service.email ? service.email : '';
      const city = service.city ? service.city : '';
      const address = service.address ? service.address : '';
      const isFree = service.isFree;
      const phone = service.phone ? service.phone : '';
      const work_time = service.work_time;
      const location = service.location;
      const author_id = context.getters.user.uid;
      db.collection("services").doc(uid).update({
          name,
          email,
          city,
          address,
          isFree,
          phone,
          work_time,
          location,
          author_id,
      })
      .then(function() {
          console.log("Document successfully written!");
          // context.commit('SET_USER_DATA', user);
          alert({
            title: "AutoSOS",
            okButtonText: "OK",
            message: "Успешно обновяване",
          });
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
          alert({
            title: "AutoSOS",
            okButtonText: "OK",
            message: "Неуспешно обновяване:" + error
          });
      });
    },
    setServiceToDb(context, service){
      const uid = service.uid;
      const name = service.name ? service.name : '';
      const email = service.email ? service.email : '';
      const city = service.city ? service.city : '';
      const address = service.address ? service.address : '';
      const isFree = service.isFree;
      const phone = service.phone ? service.phone : '';
      const work_time = service.work_time;
      const location = service.location;
      const author_id = context.getters.user.uid;
      return db.collection("services").add({
        name,
        email,
        city,
        address,
        isFree,
        phone,
        work_time,
        location,
        author_id,
      })
      .then(function() {
          console.log("Document successfully written!");
          context.commit('ADD_USER_SERVICE', service);
          alert({
            title: "AutoSOS",
            okButtonText: "OK",
            message: "Успешно добавяне:"
          });
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
          alert({
            title: "AutoSOS",
            okButtonText: "OK",
            message: "Неуспешно добавяне:" + error
          });
      });
    },
    // TO DO TO DO TO DO
    getAllServicePlaces(context) {//TO DO
      const servicesCollection = [];
      return db.collection('services').get()
      .then(function(querySnapshot) {
        // console.log(querySnapshot);
          querySnapshot.forEach(function(doc) {
            if(!!doc.data){
              var servcie = doc.data();
              servcie.uid = doc.id;
              servicesCollection.push(servcie);
            }
          });
          context.commit('SET_SERVICES_COLLECTION', servicesCollection);
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });//TO DO
    },
  }
});

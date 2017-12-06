import Vue from 'vue'
import App from './App.vue'
import Home from './Home.vue'
import * as firebase from 'firebase'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'




Vue.component('app-status', Home);

new Vue({
  el: '#app',
  render: h => h(App),

  created(){
    firebase.initializeApp({
        apiKey: "AIzaSyBmmn2QvPuU-QGOxaQmOw0v9r09ApRxnUY",
        authDomain: "surveyapp-a67a4.firebaseapp.com",
        databaseURL: "https://surveyapp-a67a4.firebaseio.com",
        projectId: "surveyapp-a67a4",
        storageBucket: ""

    })

    Vue.use(BootstrapVue);

  },

})



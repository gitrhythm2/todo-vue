import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase/app'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: 'AIzaSyD2ZypOxgmuiGaDQK4ba38jUeWNkBrlHic',
  authDomain: 'todo-8218e.firebaseapp.com',
  databaseURL: 'https://todo-8218e.firebaseio.com',
  projectId: 'todo-8218e',
  storageBucket: 'todo-8218e.appspot.com',
  messagingSenderId: '736719206785',
  appId: '1:736719206785:web:272ea6cbf2e9997c32d080'
}
firebase.initializeApp(firebaseConfig)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

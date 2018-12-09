import 'shitajicss/docs/css/shitaji.min.css';
import './scss/style.scss'
import Vue from 'vue'
import Vuetify from 'vuetify';
import App from './App.vue'
import router from "./router";
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify)


new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})

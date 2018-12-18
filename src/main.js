import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import Api from "./api";

Vue.config.productionTip = false
Api.init();

new Vue({router, store,
  render: h => h(App),
}).$mount('#app');

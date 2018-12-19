import Vue from "vue";
import Vuex from "vuex";


import auth from "@/authentication";
import feed from "@/feed";
import comment from "@/comment";


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
 
    auth,feed,comment

  }
});

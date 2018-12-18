import Vue from "vue";
import Vuex from "vuex";

// import home from "./home.module";
import auth from "@/authentication";
import feed from "@/feed";
import comment from "@/comment";
// import article from "./article.module";
// import profile from "./profile.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    // home,
    auth,feed,comment
    // article,
    // profile
  }
});

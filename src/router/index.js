import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
        name: "home",
        path: "/home",
        component: () => import("@/views/Home"),
    },
    {
      name: "/",
      path: "/",
      component: () => import("@/views/Home"),
    },
    {
        name: "login",
        path: "/login",
        component: () => import("@/views/Login")
    },
    {
        name: "register",
        path: "/register",
        component: () => import("@/views/Register")
    },
    {
      name: "article",
      path: "/article/:slug",
      props:true,
      component: () => import("@/views/ArticleView")
  },
  {
    name: "write",
    path: "/write",
    props:true,
    component: () => import("@/views/Write")
}
  ]
});

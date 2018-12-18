import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/jwtservice";

const Api = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = "https://conduit.productionready.io/api";
  },

  setHeader() {
    Vue.axios.defaults.headers.common[
      "Authorization"
    ] = `Token ${JwtService.getToken()}`;
  },

  getHeader(){
    Vue.axios.defaults.headers.common;
  },
  query(resource, params) {

    return Vue.axios.get(resource, params).catch(error => {
      throw new Error(` Api ${error}`);
    });
  },

  get(resource, slug = "") {
    return Vue.axios.get(`${resource}/${slug}`).catch(error => {
      throw new Error(`[Api ${error}`);
    });
  },

  post(resource, params) {

    return Vue.axios.post(`${resource}`, params);
  },

  update(resource, slug, params) {
    return Vue.axios.put(`${resource}/${slug}`, params);
  },

  put(resource, params) {
    return Vue.axios.put(`${resource}`, params);
  },

  delete(resource) {
    return Vue.axios.delete(resource).catch(error => {
      throw new Error(`Api ${error}`);
    });
  }
};

export default Api;



export const ArticlesApi = {
  query(type, params) {
    return Api.query("articles" + (type === "feed" ? "/feed" : ""), {
      params: params
    });
  },
  get(slug) {
    return Api.get("articles", slug);
  },
  create(params) {
    Api.setHeader();
    return Api.post("articles", { article: params });
  },
  update(slug, params) {
  
    return Api.update("articles", slug, { article: params });
  },
  destroy(slug) {
    Api.setHeader();
    return Api.delete(`articles/${slug}`);
  }
};

export const CommentsService = {
 


  get(slug) {
    if (typeof slug !== "string") {
      throw new Error(
        "[RWV] CommentsService.get() article slug required to fetch comments"
      );
    }
    return Api.get("articles", `${slug}/comments`);
  },

  post(slug, payload) {
    
Api.setHeader();
    return Api.post(`articles/${slug}/comments`, {
      comment: { body: payload }
    });
  },

  destroy(slug, commentId) {
    return Api.delete(`articles/${slug}/comments/${commentId}`);
  }
};


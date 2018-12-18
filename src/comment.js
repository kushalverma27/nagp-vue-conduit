import Vue from "vue";
import {
  ArticlesApi,
  CommentsService

} from "@/api";

const FETCH_ARTICLE = "fetchArticle";


const initialState = {
  article: {
    author: {},
    title: "",
    description: "",
    body: "",
    tagList: []
  },
  comments: []
};

export const state = { ...initialState };

export const actions = {
    [FETCH_ARTICLE](context, articleSlug) {
      return ArticlesApi.get(articleSlug)
        .then(({ data }) => {
          context.commit("setArticle", data.article);
        })
        .catch(error => {
          throw new Error(error);
        });
    },
    // ["fetchComments"](context, articleSlug) {
    //     return CommentsService.get(articleSlug)
    //       .then(({ data }) => {
    //         context.commit("setComments", data.comments);
    //       })
    //       .catch(error => {
    //         throw new Error(error);
    //       });
    //   },
   

  async ["fetchComments"](context, articleSlug) {
    const { data } = await CommentsService.get(articleSlug);
    context.commit("setComments", data.comments);
    return data.comments;
  },
  async ["commentCreate"](context, payload) {
    await CommentsService.post(payload.slug, payload.comment);
    context.dispatch("fetchComments", payload.slug);
  },
  async ["commentDestroy"](context, payload) {
    await CommentsService.destroy(payload.slug, payload.commentId);
    context.dispatch("fetchComments", payload.slug);
  }
//   async [FAVORITE_ADD](context, payload) {
//     const { data } = await FavoriteService.add(payload);
//     context.commit(UPDATE_ARTICLE_IN_LIST, data.article, { root: true });
//     context.commit(SET_ARTICLE, data.article);
//   },
//   async [FAVORITE_REMOVE](context, payload) {
//     const { data } = await FavoriteService.remove(payload);
//     // Update list as well. This allows us to favorite an article in the Home view.
//     context.commit(UPDATE_ARTICLE_IN_LIST, data.article, { root: true });
//     context.commit(SET_ARTICLE, data.article);
//   },
 , ["articlePublish"]({ state }) {
    return ArticlesApi.create(state.article);
  },
  ["articleDelete"](context, slug) {
    return ArticlesApi.destroy(slug);
  },
  ["articleEdit"]({ state }) {
    return ArticlesApi.update(state.article.slug, state.article);
  },
//   [ARTICLE_EDIT_ADD_TAG](context, tag) {
//     context.commit(TAG_ADD, tag);
//   },
//   [ARTICLE_EDIT_REMOVE_TAG](context, tag) {
//     context.commit(TAG_REMOVE, tag);
//   },
//   [ARTICLE_RESET_STATE]({ commit }) {
//     commit(RESET_STATE);
//   }
};

/* eslint no-param-reassign: ["error", { "props": false }] */
export const mutations = {
  ["setArticle"](state, article) {
    state.article = article;
  },
  ["setComments"](state, comments) {
     state.comments = comments;
   },
//   [TAG_ADD](state, tag) {
//     state.article.tagList = state.article.tagList.concat([tag]);
//   },
//   [TAG_REMOVE](state, tag) {
//     state.article.tagList = state.article.tagList.filter(t => t !== tag);
//   },
  ["resetState"]() {
    for (let f in state) {
      Vue.set(state, f, initialState[f]);
    }
  }
};

const getters = {
  article(state) {
    return state.article;
  },
   comments(state) {
     return state.comments;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};

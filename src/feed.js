import { ArticlesApi } from "@/api";


const FETCH_ARTICLES = "fetchArticles";

const state = {
  tags: [],
  articles: [],
  isLoading: true,
  articlesCount: 0
};

const getters = {
  articlesCount(state) {
    return state.articlesCount;
  },
  articles(state) {
    return state.articles;
  },
  isLoading(state) {
    return state.isLoading;
  },
  tags(state) {
    return state.tags;
  }
};

const actions = {
  [FETCH_ARTICLES]({ commit }, params) {
    commit("fetchStart");
    return ArticlesApi.query(params.type, params.filters)
      .then(({ data }) => {
        commit("fetchEnd", data);
      })
      .catch(error => {
        throw new Error(error);
      });
  }

};

const mutations = {
  ["fetchStart"](state) {
    state.isLoading = true;
  },
  ["fetchEnd"](state, { articles, articlesCount }) {
    state.articles = articles;
    state.articlesCount = articlesCount;
    state.isLoading = false;
  }
 };

export default {
  state,
  getters,
  actions,
  mutations
};

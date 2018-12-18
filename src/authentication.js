import Api from "@/api";
import JwtService from "@/jwtservice";

const LOGIN = "login";
const LOGOUT = "logout";
const REGISTER = "register";
const CHECKAUTH = "checkAuth";
const UPDATEUSER = "updateUser";
const SETUSER = "setUser";
const SETERROR = "setError";



const state = {
  errors: null,
  user: {},
  isLogged: !!JwtService.getToken()
};

const getters = {
  user(state) {
    return state.user;
  },
  isLogged(state) {
    return state.isLogged;
  }
};

const actions = {
  [LOGIN](context, credentials) {
    return new Promise(resolve => {
      Api.post("users/login", { user: credentials })
        .then(({ data }) => {
          context.commit(SETUSER, data.user);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SETERROR, response.data.errors);
        });
    });
  },
  [LOGOUT](context) {
    context.commit(LOGOUT);
  },
  [REGISTER](context, credentials) {
    return new Promise((resolve, reject) => {
      Api.post("users", { user: credentials })
        .then(({ data }) => {
          context.commit(SETUSER, data.user);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SETERROR, response.data.errors);
          reject(response);
        });
    });
  },
  [CHECKAUTH](context) {
    if (JwtService.getToken()) {
      Api.setHeader();
      Api.get("user")
        .then(({ data }) => {
          context.commit(SETUSER, data.user);
        })
        .catch(({ response }) => {
          context.commit(SETERROR, response.data.errors);
        });
    } else {
      context.commit(LOGOUT);
    }
  },
  [UPDATEUSER](context, payload) {
    const { email, username, password, image, bio } = payload;
    const user = {
      email,
      username,
      bio,
      image
    };
    if (password) {
      user.password = password;
    }

    return Api.put("user", user).then(({ data }) => {
      context.commit(SETUSER, data.user);
      return data;
    });
  }
};

const mutations = {
  [SETERROR](state, error) {
    state.errors = error;
  },
  [SETUSER](state, user) {
    state.isLogged = true;
    state.user = user;
    state.errors = {};
    JwtService.saveToken(state.user.token);
 
  },
  [LOGOUT](state) {
    state.isLogged = false;
    state.user = {};
    state.errors = {};
    JwtService.removeToken();
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};

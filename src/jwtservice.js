const TOKEN = "token";

export const saveToken = token => {
  window.localStorage.setItem(TOKEN, token);
};

export const removeToken = () => {
  window.localStorage.removeItem(TOKEN);
};

export const getToken = () => {
    return window.localStorage.getItem(TOKEN);
  };

export default { getToken, saveToken, removeToken };

import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../types";
import api from "../api";
import setAuthorizationHeader from "../utils/setAuthorizationHeader";

export const userLoggedIn = (user) => ({
  type: USER_LOGGED_IN,
  user,
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT,
});

export const login = (credentials) => (dispatch) =>
  api.user.login(credentials).then((userdata) => {
    localStorage.bookwormJWT = userdata.token;
    localStorage.userEmail = userdata.user.email;
    localStorage.userId = userdata.user.id;
    setAuthorizationHeader(userdata.token);
    dispatch(userLoggedIn(userdata.user));
  });

export const logout = () => (dispatch) => {
  localStorage.clear();
  setAuthorizationHeader();
  dispatch(userLoggedOut());
};

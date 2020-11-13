import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  CHANGE_TOKEN_SUCCESS,
} from '../actions/types';

const updateUser = (state, action) => {

  if (state === undefined) {
    return {
      token: localStorage.getItem("token"),
      user: null,
      isAuthenticated: null,
      isLoading: false
    };
  };

  switch (action.type) {
    case USER_LOADING:
      return {
        ...state.auth,
        isLoading: true
      }
    case USER_LOADED:
      return {
        ...state.auth,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      }
    case LOGIN_SUCCESS:
    case CHANGE_TOKEN_SUCCESS:
      localStorage.setItem("token", action.payload.token)
      return {
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
      }
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token")
      return {
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      }
    default:
      return state.auth
  };
};

export default updateUser;
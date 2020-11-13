import axios from 'axios';

import { createMessage, returnErrors } from './messages'
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  GET_ERRORS,
  CHANGE_TOKEN_SUCCESS
} from './types';
import { getConfig } from './utils';

export const loadUser = () => (dispatch, getState) => {

  dispatch({
    type: USER_LOADING
  });

  axios
    .get('/api/auth/user', getConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR
      })
    });
};

export const loginUser = (username, password) => (dispatch) => {

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ username, password })

  axios
    .post('/api/auth/login/', body, config)
    .then((res) => {
      dispatch(createMessage({
        loginSuccess: "Login Successful"
      }));
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      const errors = {
        msg: err.response.data,
        status: err.response.status
      };
      dispatch({
        type: GET_ERRORS,
        payload: errors
      });
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

export const logoutUser = () => (dispatch) => {

  dispatch(createMessage({
    logoutSuccess: "Logout Successful"
  }));

  dispatch({
    type: LOGOUT_SUCCESS
  });
};

// export const changeToken = () => (dispatch, getState) => {

//   axios
//     .post('/api/auth/change-token', {}, getConfig(getState))
//     .then((res) => {
//       dispatch(createMessage({
//         changeTokenSuccess: "Token changed successfully"
//       }));
//       dispatch({
//         type: CHANGE_TOKEN_SUCCESS,
//         payload: res.data,
//       });
//     })
//     .catch((err) => {
//       const errors = {
//         msg: err.response.data,
//         status: err.response.status
//       };
//       dispatch({
//         type: GET_ERRORS,
//         payload: errors
//       });
//     });
// };
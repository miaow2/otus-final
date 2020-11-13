// import { createMessage } from './messages'
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

export const loadUser = (netwatcherService) => (dispatch, getState) => {

  dispatch({
    type: USER_LOADING
  });

  const url = '/api/auth/user';
  const token = getState().auth.token

  netwatcherService.getResources(url, token)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, received ${res.status}, ${res.json()}`)
      };
      return res.json();
    })
    .then((data) => {
      dispatch({
        type: USER_LOADED,
        payload: data,
      })
    })
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR
      })
    });
};

export const loginUser = (netwatcherService, dispatch) => (username, password) => {

  const url = '/api/auth/login/';
  const data = { username, password }

  netwatcherService.postResource(url, data)
    .then((data) => {
      // dispatch(createMessage({
      //   loginSuccess: "Login Successful"
      // }));
      console.log("data", data)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
    })
    .catch((err) => {
      console.log("err", err)
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

export const logoutUser = () => (dispatch) => {

  // dispatch(createMessage({
  //   logoutSuccess: "Logout Successful"
  // }));

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
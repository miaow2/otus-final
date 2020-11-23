import axios from 'axios';

import {
  FETCH_GROUPS_FAIL,
  FETCH_GROUPS_SUCCESS,
  FETCH_DEPT_FAIL,
  FETCH_DEPT_SUCCESS,
  GROUPS_LOADING,
  GET_ERRORS
} from './types';
import { getConfig } from './utils';

const deptLoaded = (group) => {
  return {
    type: FETCH_DEPT_SUCCESS,
    payload: group
  }
};

const deptError = (error) => {
  return {
    type: FETCH_DEPT_FAIL,
    payload: error
  }
};

const groupsLoaded = (newGroups) => {
  return {
    type: FETCH_GROUPS_SUCCESS,
    payload: newGroups
  }
};

const groupsError = (error) => {
  return {
    type: FETCH_GROUPS_FAIL,
    payload: error
  }
};

export const fetchGroups = (deptId) => (dispatch) => {

  const url = `/api/groups/?departament_id=${deptId}`;

  axios
    .get(url)
    .then((res) => dispatch(groupsLoaded(res.data.results)))
    .catch((err) => dispatch(groupsError(err)))
};

export const fetchDept = (deptId, location) => (dispatch) => {

  dispatch({
    type: GROUPS_LOADING
  });

  if (location === undefined) {
    const url = `/api/departaments/${deptId}/`;
    axios
      .get(url)
      .then((res) => dispatch(deptLoaded(res.data)))
      .catch((err) => dispatch(deptError(err)))
  } else {
    dispatch(deptLoaded(location.state.dept));
  };
};

export const deleteGroup = (id) => (dispatch, getState) => {

  const url = `/api/groups/${id}/`;

  axios
    .delete(url, {}, getConfig(getState))
    .then((res) => dispatch(fetchGroups(getState().groupsList.dept.id)))
    .catch((err) => dispatch(groupsError(err)))
};

export const addGroup = (name, deptId) => (dispatch, getState) => {

  const url = "/api/groups/";

  const data = {
    name,
    departament: {
      id: deptId
    }
  };

  axios
    .post(url, data, getConfig(getState))
    .then((res) => dispatch(fetchGroups(res.data.departament.id)))
    .catch((err) => {
      const errors = {
        msg: err.response.data,
        status: err.response.status
      };
      dispatch({
        type: GET_ERRORS,
        payload: errors
      });
    })
};
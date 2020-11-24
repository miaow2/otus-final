import axios from 'axios';

import { createMessage, returnErrors } from './messages-action'
import {
  FETCH_GROUP_FAIL,
  FETCH_GROUP_SUCCESS,
  FETCH_JOBS_FAIL,
  FETCH_JOBS_SUCCESS,
  FLUSH_JOBS,
  JOBS_LOADING,
  SET_PENDING_JOBS,
  UPDATE_PENDING_JOBS,
  GET_ERRORS
} from './types';
import { getConfig } from './utils';

const jobsLoaded = (newJobs) => {
  return {
    type: FETCH_JOBS_SUCCESS,
    payload: newJobs
  }
};

const jobsError = (error) => {
  return {
    type: FETCH_JOBS_FAIL,
    payload: error
  }
};

export const fetchJobs = (groupId) => (dispatch) => {

  const url = `/api/jobs/?group_id=${groupId}`;

  axios
    .get(url)
    .then((res) => dispatch(jobsLoaded(res.data.results)))
    .catch((err) => dispatch(jobsError(err)))
};

const groupLoaded = (group) => {
  return {
    type: FETCH_GROUP_SUCCESS,
    payload: group
  }
};

const groupError = (error) => {
  return {
    type: FETCH_GROUP_FAIL,
    payload: error
  }
};

export const fetchGroup = (groupId, location) => (dispatch) => {

  dispatch({
    type: JOBS_LOADING
  });

  if (location.state === undefined) {
    const url = `/api/groups/${groupId}/`;
    axios
      .get(url)
      .then((res) => dispatch(groupLoaded(res.data)))
      .catch((err) => dispatch(groupError(err)))
  } else {
    dispatch(groupLoaded(location.state.group));
  };

};

export const flushJobs = () => (dispatch) => {

  dispatch({
    type: FLUSH_JOBS
  });
};

export const setPendingJobs = (jobs) => (dispatch) => {

  dispatch({
    type: SET_PENDING_JOBS,
    payload: jobs
  });
};

export const updatePendingJobs = () => (dispatch, getState) => {

  const pendingJobsList = getState().jobsList.pendingJobs

  for (const job of pendingJobsList) {
    const url = `/api/jobs/${job.id}/`;
    axios
      .get(url)
      .then((res) => {
        if (res.data.task) {
          dispatch({
            type: UPDATE_PENDING_JOBS,
            payload: res.data
          });
          dispatch(
            createMessage({
              jobUpdated: `Job with ID ${res.data.id} updated`
            })
          )
        }
      })
      .catch((err) => console.log(err))
  }
};

export const deleteJob = (id) => (dispatch, getState) => {

  const url = `/api/jobs/${id}/`;

  axios
    .delete(url, {}, getConfig(getState))
    .then((res) => dispatch(fetchJobs(getState().jobsList.group.id)))
    .catch((err) => dispatch(jobsError(err)))
};

export const runCommand = (group, command) => (dispatch, getState) => {

  const url = "/api/tasks/";

  const data = {
    group,
    command
  };

  axios
    .post(url, data, getConfig(getState))
    .then((res) => {
      dispatch(fetchJobs(getState().jobsList.group.id));
      dispatch(
        createMessage({
          taskCreated: `Task with ID ${res.data.task_id} created`
        })
      );
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
    })
};
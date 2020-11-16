import {
  FETCH_GROUP_FAIL,
  FETCH_GROUP_SUCCESS,
  FETCH_JOBS_FAIL,
  FETCH_JOBS_SUCCESS,
  FLUSH_JOBS,
  JOBS_LOADING,
  SET_PENDING_JOBS,
  UPDATE_PENDING_JOBS
} from '../actions/types';

const updateJobs = (state, action) => {

  if (state === undefined) {
    return {
      jobs: [],
      isLoading: false,
      group: {},
      pendingJobs: []
    };
  };

  switch (action.type) {

    case JOBS_LOADING:
      return {
        ...state.jobsList,
        isLoading: true
      }

    case FETCH_JOBS_SUCCESS:
      return {
        ...state.jobsList,
        jobs: action.payload,
        isLoading: false
      }

    case FETCH_GROUP_SUCCESS:
      return {
        ...state.jobsList,
        group: action.payload
      }

    case SET_PENDING_JOBS:
      return {
        ...state.jobsList,
        pendingJobs: action.payload
      }

    case UPDATE_PENDING_JOBS:
      return {
        ...state.jobsList,
        jobs: [
          ...state.jobsList.jobs.slice(0, action.payload.id),
          action.payload.data,
          ...state.jobsList.jobs.slice(action.payload.id + 1)
        ]
      }

    case FETCH_JOBS_FAIL:
    case FETCH_GROUP_FAIL:
    case FLUSH_JOBS:
      return {
        jobs: [],
        isLoading: false,
        group: {},
        pendingJobs: []
      }

    default:
      return state.jobsList;
  };
};

export default updateJobs;
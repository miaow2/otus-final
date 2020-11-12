import {
  FETCH_DEPTS_FAIL,
  FETCH_DEPTS_SUCCESS,
  FETCH_DEPTS_REQUEST
} from './types';

const deptsLoaded = (newDepts) => {
  return {
    type: FETCH_DEPTS_SUCCESS,
    payload: newDepts
  }
};

const deptsRequested = () => {
  return {
    type: FETCH_DEPTS_REQUEST
  }
};

const deptsError = (error) => {
  return {
    type: FETCH_DEPTS_FAIL,
    payload: error
  }
};

export const fetchDepts = (netwatcherService, dispatch) => (url) => {
  dispatch(deptsRequested());
  netwatcherService.getResources(url)
    .then((data) => dispatch(deptsLoaded(data.results)))
    .catch((err) => dispatch(deptsError(err)));
};
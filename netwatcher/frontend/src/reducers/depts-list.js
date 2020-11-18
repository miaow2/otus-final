import {
  FETCH_DEPTS_FAIL,
  FETCH_DEPTS_SUCCESS,
  FETCH_DEPTS_REQUEST
} from '../actions/types';

const initialState = {
  depts: [],
  loading: true,
  error: null
};

const updateDeptsList = (state = initialState, action) => {

  switch (action.type) {
    case FETCH_DEPTS_REQUEST:
      return {
        depts: [],
        loading: true,
        error: null
      };

    case FETCH_DEPTS_SUCCESS:
      return {
        depts: action.payload,
        loading: false,
        error: null
      };

    case FETCH_DEPTS_FAIL:
      return {
        depts: [],
        loading: false,
        error: action.payload
      };
    default:
      return state;
  };
};

export default updateDeptsList;
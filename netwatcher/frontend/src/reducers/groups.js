import {
  FETCH_GROUPS_FAIL,
  FETCH_GROUPS_SUCCESS,
  FETCH_DEPT_FAIL,
  FETCH_DEPT_SUCCESS,
  GROUPS_LOADING
} from '../actions/types';

const initialState = {
  groups: [],
  isLoading: false,
  dept: {},
  error: null
};

const updateGroupsList = (state = initialState, action) => {

  switch (action.type) {

    case GROUPS_LOADING:
      return {
        ...state,
        isLoading: true
      }

    case FETCH_DEPT_SUCCESS:
      return {
        ...state,
        dept: action.payload
      }

    case FETCH_GROUPS_SUCCESS:
      return {
        ...state,
        groups: action.payload,
        isLoading: false,
        error: null
      };

    case FETCH_GROUPS_FAIL:
    case FETCH_DEPT_FAIL:
      return {
        groups: [],
        isLoading: false,
        dept: {},
        error: action.payload
      };

    default:
      return state;
  };
};

export default updateGroupsList;
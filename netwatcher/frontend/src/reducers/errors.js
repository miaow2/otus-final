import { GET_ERRORS } from '../actions/types';

const initialState = {
  msg: {},
  status: null,
  type: null
};

const updateErrors = (state = initialState, action) => {

  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        type: action.payload.type
      }
    default:
      return state
  };
};

export default updateErrors;
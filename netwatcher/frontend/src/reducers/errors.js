import { GET_ERRORS } from '../actions/types';

const updateErrors = (state, action) => {

  if (state === undefined) {
    return {
      msg: {},
      status: null,
      type: null
    };
  };

  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        type: action.payload.type
      }
    default:
      return state.errors
  };
};

export default updateErrors;
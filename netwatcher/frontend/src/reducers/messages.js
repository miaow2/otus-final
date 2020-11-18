import { CREATE_MESSAGE } from '../actions/types';

const initialState = {};

const updateMessages = (state = initialState, action) => {

  switch (action.type) {
    case CREATE_MESSAGE:
      return action.payload;
    default:
      return state
  };
};

export default updateMessages;
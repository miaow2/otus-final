import { CREATE_MESSAGE } from '../actions/types';

const updateMessages = (state, action) => {

  if (state === undefined) {
    return {};
  };

  switch (action.type) {
    case CREATE_MESSAGE:
      return action.payload;
    default:
      return state.messages
  };
};

export default updateMessages;
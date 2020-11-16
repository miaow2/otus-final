import updateUser from './auth';
import updateDeptsList from './depts-list';
import updateErrors from './errors';
import updateJobs from './jobs';
import updateMessages from './messages';

const rootReducer = (state, action) => {

  return {
    deptsList: updateDeptsList(state, action),
    auth: updateUser(state, action),
    errors: updateErrors(state, action),
    jobsList: updateJobs(state, action),
    messages: updateMessages(state, action)
  };
};

export default rootReducer;
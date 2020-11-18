import { combineReducers } from 'redux';

import updateUser from './auth';
import updateDeptsList from './depts-list';
import updateErrors from './errors';
import updateJobs from './jobs';
import updateMessages from './messages';

export default combineReducers({
  deptsList: updateDeptsList,
  auth: updateUser,
  errors: updateErrors,
  jobsList: updateJobs,
  messages: updateMessages
});
import { combineReducers } from 'redux';

import updateUser from './auth';
import updateDeptsList from './depts-list';
import updateErrors from './errors';
import updateGroupsList from './groups';
import updateJobs from './jobs';
import updateMessages from './messages';

export default combineReducers({
  auth: updateUser,
  deptsList: updateDeptsList,
  errors: updateErrors,
  groupsList: updateGroupsList,
  jobsList: updateJobs,
  messages: updateMessages
});
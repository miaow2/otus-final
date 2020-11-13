import updateDeptsList from './depts-list';
import updateUser from './auth';

const rootReducer = (state, action) => {

  return {
    deptsList: updateDeptsList(state, action),
    auth: updateUser(state, action)
  };
};

export default rootReducer;
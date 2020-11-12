import updateDeptsList from './depts-list';

const rootReducer = (state, action) => {

  // initialState определяется в импортированных функциях
  return {
    deptsList: updateDeptsList(state, action)
  };
};

export default rootReducer;
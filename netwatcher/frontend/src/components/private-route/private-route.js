import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { Spinner } from '../spinners';

const PrivateRoute = ({ component: Component, auth, ...args }) => {
  return (
    <Route {...args} render={(props) => {
      if (auth.isLoading) {
        return <Spinner />
      }
      else if (!auth.isAuthenticated) {
        return <Redirect to="/login" />
      }
      else {
        return <Component {...props} />
      }
    }} />
  );
};

const mapPropsToState = (state) => ({
  auth: state.auth
});

export default connect(mapPropsToState)(PrivateRoute);
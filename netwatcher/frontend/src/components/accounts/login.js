import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import withNetWatcherService from '../hoc';
import { loginUser } from '../../actions/auth';

const Login = ({ isAuthenticated, loginUser }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {

    e.preventDefault();

    loginUser(username, password)

    setUsername("");
    setPassword("");
  };

  if (isAuthenticated) {
    return <Redirect to="/" />
  }

  return (
    <div className="col-md-6 m-auto">
      <div className="card card-body mt-5">
        <h2 className="text-center">Login</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = (dispatch, ownProps) => {

  const { netwatcherService } = ownProps;
  return {
    loginUser: loginUser(netwatcherService, dispatch),
  };
};

export default withNetWatcherService()(connect(mapStateToProps, mapDispatchToProps)(Login));
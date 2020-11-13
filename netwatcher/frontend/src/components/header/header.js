import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logoutUser } from '../../actions/auth';

const Header = ({ auth, logoutUser }) => {

  const { isAuthenticated, user } = auth

  const authLinks = (
    <>
      <li className="nav-item">
        <Link to="/profile" className="nav-link">
          <strong>
            {user ? user.username : ""}
          </strong>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/" className="nav-link" onClick={logoutUser}>
          Logout
        </Link>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li className="nav-item">
        <Link to="/login" className="nav-link">Login</Link>
      </li>
    </>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
      <div className="container">
        <Link to="/" className="navbar-brand">NetWatcher</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            {isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Header);
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
      <div className="container">
        <Link to="/" className="navbar-brand">NetWatcher</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <span>Login</span>
            </li>
            <li className="nav-item">
              <span>Profile</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
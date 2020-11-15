import React from 'react';
import { connect } from 'react-redux';

import { changeToken } from '../../actions/auth';

const Profile = ({ auth, changeToken }) => {

  const copyToClipboard = (e) => {
    const token = document.getElementById("token");
    const textArea = document.createElement("textarea");
    textArea.value = token.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
  };

  return (
    <div className="row mt-4">
      <div className="col-md-4">
        <h3>Profile</h3>
        <ul className="list-group" style={{ boxShadow: '0 1px 4px rgba(0,0,0,.4)' }}>
          <li className="list-group-item">
            <span><strong>Username:</strong> {auth.user.username}</span>
          </li>
          <li className="list-group-item">
            <span><strong>First Name:</strong> {auth.user.first_name}</span>
          </li>
          <li className="list-group-item">
            <span><strong>Last Name:</strong> {auth.user.last_name}</span>
          </li>
        </ul>
      </div>
      <div className="col-md-8">
        <h3>Token</h3>
        <div className="card card-body">
          <div className="card-text">
            <strong>Token:</strong> <samp className="mr-3"><span id="token">{auth.token}</span></samp>
            <div style={{ float: 'right' }}>
              <button
                className="btn btn-success btn-sm"
                onClick={copyToClipboard}>Copy</button>
              <button
                className="btn btn-success btn-sm ml-2"
                onClick={changeToken}>Change</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { changeToken })(Profile);
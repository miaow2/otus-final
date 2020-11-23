import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert';

const Alerts = ({ alert, errors, messages }) => {

  useEffect(() => {
    if (errors.msg.username) {
      alert.error(`Username: ${errors.msg.username.join()}`)
    };
    if (errors.msg.non_field_errors) {
      if (errors.type !== "login") {
        alert.error(errors.msg.non_field_errors.join(), { timeout: 0 })
      }
    };
    if (errors.msg.detail) {
      alert.error(errors.msg.detail, { timeout: 0 })
    };
    if (errors.msg.departament_id) {
      alert.error(errors.msg.departament_id, { timeout: 0 })
    };
    if (errors.msg.device_group_error) {
      alert.error(errors.msg.device_group_error, { timeout: 0 })
    };
    if (errors.msg.device_group_not_found) {
      alert.error(errors.msg.device_group_not_found, { timeout: 0 })
    };
    // eslint-disable-next-line
  }, [errors]);

  useEffect(() => {
    if (messages.loginSuccess) {
      alert.success(messages.loginSuccess)
    };
    if (messages.logoutSuccess) {
      alert.success(messages.logoutSuccess)
    };
    if (messages.changeTokenSuccess) {
      alert.success(messages.changeTokenSuccess)
    };
    if (messages.copyToken) {
      alert.success(messages.copyToken)
    };
    if (messages.jobUpdated) {
      alert.success(messages.jobUpdated)
    };
    if (messages.taskCreated) {
      alert.success(messages.taskCreated)
    };
    // eslint-disable-next-line
  }, [messages]);

  return <Fragment />;
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  messages: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));
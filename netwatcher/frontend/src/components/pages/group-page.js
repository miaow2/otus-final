import React, { Component } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  deleteJob,
  fetchJobs,
  fetchGroup,
  flushJobs,
  runCommand,
  setPendingJobs,
  updatePendingJobs
} from '../../actions/jobs-action';
import { PendingSpinner, Spinner } from '../spinners';

class GroupPage extends Component {

  state = {
    command: ""
  };

  onCommandChange = (e) => {
    this.setState({
      command: e.target.value
    });
  };

  componentDidMount() {
    this.props.fetchGroup(this.props.groupId, this.props.location);
    this.props.fetchJobs(this.props.groupId);
    this.updateJobs()
    this.interval = setInterval(this.updateJobs, 5000)
  };

  componentWillUnmount() {
    this.props.flushJobs();
    clearInterval(this.interval);
  };

  updateJobs = () => {

    const filteredPendingJobs = this.props.jobsList.jobs.filter((item) => !item.task)
    this.props.setPendingJobs(filteredPendingJobs)

    if (filteredPendingJobs.length !== 0) {
      this.props.updatePendingJobs()
    } else {
      clearInterval(this.interval)
    };
  };

  onRunCommand = (e) => {
    e.preventDefault();
    if (this.state.command === "") {
      return
    };

    const { group } = this.props.jobsList;
    this.props.runCommand(group.name, this.state.command)

    this.setState({
      command: ""
    });

    this.props.fetchJobs(this.props.groupId);
    this.updateJobs()
    this.interval = setInterval(this.updateJobs, 5000)
  };

  render() {

    const { group, jobs, isLoading } = this.props.jobsList;

    if (isLoading) {
      return <Spinner />
    };

    return (
      <>
        <h1>
          {group.name}
        </h1>
        {
          this.props.auth.isAuthenticated &&
          <div className="d-flex justify-content-sm-end align-items-center mb-2">
            <form id="groupAdd" className="mr-2" onSubmit={this.onRunCommand}>
              <input
                type="text"
                className="form-control"
                style={{ padding: '0.5rem 0' }}
                placeholder="Enter command"
                onChange={this.onCommandChange}
                value={this.state.command}
              />
            </form>
            <button
              className="btn btn-primary btn-sm"
              type="submit"
              form="groupAdd"
            >Run command</button>
          </div>
        }
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Command</th>
              <th>Status</th>
              <th>Run By</th>
              <th>Started</th>
              <th>Completed</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {jobs.map((item) => {
              let completed = "—"
              let status = <PendingSpinner />
              let buttonDelete = null

              if (item.task) {
                completed = <Moment format="HH:mm DD-MM-YYYY">{item.task.date_done}</Moment>
                status = item.task.status[0] + item.task.status.slice(1).toLowerCase()

                if (item.task.status === "SUCCESS") {
                  status = <span className="badge badge-success" style={{ fontSize: '.7125rem' }}>Completed</span>
                } else if (item.task.status === "FAILURE") {
                  status = <span className="badge badge-danger" style={{ fontSize: '.7125rem' }}>Failure</span>
                }
              };

              if (this.props.auth.isAuthenticated) {
                if (item.task) {
                  buttonDelete = <button className="btn btn-danger btn-sm" onClick={() => this.props.deleteJob(item.id)}>{' '}Delete</button>
                } else {
                  buttonDelete = <button className="btn btn-danger btn-sm disabled">{' '}Delete</button>
                }
              };

              return (
                <tr key={item.id}>
                  <td>
                    <Link
                      to={{
                        pathname: `/jobs/${item.id}`,
                        state: { job: item }
                      }}>
                      {item.id}
                    </Link>
                  </td>
                  <td>{item.command}</td>
                  <td>{status}</td>
                  <td>{item.user.username}</td>
                  <td><Moment format="HH:mm DD-MM-YYYY">{item.created}</Moment></td>
                  <td>{completed}</td>
                  <td>
                    {buttonDelete}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  jobsList: state.jobsList,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteJob, fetchJobs, fetchGroup, flushJobs, runCommand, setPendingJobs, updatePendingJobs }
)(GroupPage);
import React, { Component } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchJobs, fetchGroup, flushJobs, setPendingJobs, updatePendingJobs } from '../../actions/jobs';
import { PendingSpinner, Spinner } from '../spinners';

const GroupView = ({ jobs }) => {

  return (
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

          if (item.task) {
            completed = <Moment format="hh:mm DD-MM-YYYY">{item.task.date_done}</Moment>
            status = item.task.status[0] + item.task.status.slice(1).toLowerCase()
            if (item.task.status === "SUCCESS") {
              status = <span className="badge badge-success" style={{ fontSize: '.7125rem' }}>Completed</span>
            } else if (item.task.status === "FAILURE") {
              status = <span className="badge badge-danger" style={{ fontSize: '.7125rem' }}>Failure</span>
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
              <td><Moment format="hh:mm DD-MM-YYYY">{item.created}</Moment></td>
              <td>{completed}</td>
              <td>
                <button className="btn btn-danger btn-sm">{' '}Delete</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  );
};

class GroupPage extends Component {

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
        <GroupView jobs={jobs} />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  jobsList: state.jobsList
});

export default connect(
  mapStateToProps,
  { fetchJobs, fetchGroup, flushJobs, setPendingJobs, updatePendingJobs }
)(GroupPage);
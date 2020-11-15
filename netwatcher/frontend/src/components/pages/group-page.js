import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { PendingSpinner, Spinner } from '../spinners';
import withNetWatcherService from '../hoc';

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
          const date = new Date(Date.parse(item.created))
          let completed = "—"
          let status = <PendingSpinner />

          if (item.task) {
            const date_done = new Date(Date.parse(item.task.date_done))
            completed = `${date_done.toLocaleTimeString()} ${date_done.toLocaleDateString()}`
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
              <td>{date.toLocaleTimeString()} {date.toLocaleDateString()}</td>
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

const GroupPage = ({ groupId, netwatcherService, location }) => {

  const [jobs, setjobs] = useState([])
  const [isLoaded, setIsLoaded] = useState(false);
  const [group, setGroup] = useState({})

  useEffect(() => {
    if (location.state === undefined) {
      const deptUrl = `/api/groups/${groupId}/`;
      netwatcherService.getResources(deptUrl)
        .then((res) => res.json())
        .then((data) => {
          setGroup(data);
        });
    } else {
      setGroup(location.state.group);
    }
    const url = `/api/jobs/?group_id=${groupId}`;
    netwatcherService.getResources(url)
      .then((res) => res.json())
      .then((data) => {
        setjobs(data.results);
        setIsLoaded(true);
      });
  }, [])

  const content = isLoaded ? <GroupView jobs={jobs} /> : <Spinner />

  return (
    <>
      <h1>
        {group.name}
      </h1>
      {content}
    </>
  );
};

// const mapStateToProps = (state) => ({
//   depts: state.deptsList.depts
// });

// const mapDispatchToProps = (dispatch, ownProps) => {

//   const { netwatcherService } = ownProps;
//   return {
//     fetchDepts: fetchDepts(netwatcherService, dispatch)
//   };
// };

export default withNetWatcherService()(GroupPage);
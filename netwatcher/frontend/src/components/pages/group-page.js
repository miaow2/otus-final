import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Spinner from '../spinner';
import withNetWatcherService from '../hoc';

const GroupView = ({ groups }) => {

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {groups.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>
              <button className="btn btn-danger btn-sm">{' '}Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const GroupPage = ({ groupId, depts, netwatcherService, location }) => {

  const [jobs, setjobs] = useState([])
  const [isLoaded, setIsLoaded] = useState(false);
  const { groupName } = location.state

  useEffect(() => {
    const url = `/api/jobs/?group_id=${groupId}`;
    netwatcherService.getResources(url)
      .then((res) => res.json())
      .then((data) => {
        setjobs(data.results);
        setIsLoaded(true);
      });
  }, [])

  const content = isLoaded ? <GroupView groups={jobs} /> : <Spinner />

  return (
    <>
      <h1>
        {groupName}
      </h1>
      {content}
    </>
  );
};

const mapStateToProps = (state) => ({
  depts: state.deptsList.depts
});

// const mapDispatchToProps = (dispatch, ownProps) => {

//   const { netwatcherService } = ownProps;
//   return {
//     fetchDepts: fetchDepts(netwatcherService, dispatch)
//   };
// };

export default withNetWatcherService()(connect(mapStateToProps)(GroupPage));
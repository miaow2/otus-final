import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Spinner from '../spinner';
import withNetWatcherService from '../hoc';

const DeptView = ({ groups }) => {

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

const DeptPage = ({ deptId, depts, netwatcherService }) => {

  const [groups, setGroups] = useState([])
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const url = `/api/groups/?departament_id=${deptId}`;
    netwatcherService.getResources(url)
      .then((data) => {
        setGroups(data.results);
        setIsLoaded(true);
      });
  }, [])

  const [dept] = depts.filter((item) => item.id == deptId)

  const content = isLoaded ? <DeptView groups={groups} /> : <Spinner />

  return (
    <>
      <h1>
        {dept.name}
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

export default withNetWatcherService()(connect(mapStateToProps)(DeptPage));
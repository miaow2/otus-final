import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
            {/* <td><Link to={`/groups/${item.id}`}>{item.name}</Link></td> */}
            <td>
              <Link to={{
                pathname: `/groups/${item.id}`,
                state: {
                  groupName: item.name
                }
              }}>
                {item.name}
              </Link>
            </td>
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
  const [dept, setDept] = useState({})

  useEffect(() => {
    const deptUrl = `/api/departaments/${deptId}/`;
    netwatcherService.getResources(deptUrl)
      .then((res) => res.json())
      .then((data) => {
        setDept(data);
      });
    const groupsUrl = `/api/groups/?departament_id=${deptId}`;
    netwatcherService.getResources(groupsUrl)
      .then((res) => res.json())
      .then((data) => {
        setGroups(data.results);
        setIsLoaded(true);
      });
  }, [])

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
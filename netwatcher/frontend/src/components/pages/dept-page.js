import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { addGroup, deleteGroup, fetchGroups, fetchDept } from '../../actions/groups-actions';
import { Spinner } from '../spinners';

const DeptPage = ({ deptId, auth, location, addGroup, deleteGroup, groupsList, fetchGroups, fetchDept }) => {

  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    fetchDept(deptId, location)
    fetchGroups(deptId);
    // eslint-disable-next-line
  }, []);

  const onAddGroup = (e) => {
    e.preventDefault();
    if (groupName === "") {
      return
    };
    addGroup(groupName, deptId)
    setGroupName("")
  };

  const { dept, groups, isLoading } = groupsList;

  if (isLoading) {
    return <Spinner />
  };

  return (
    <div>
      <h1>
        {dept.name}
      </h1>
      {
        auth.isAuthenticated &&
        <div className="d-flex justify-content-sm-end align-items-center mb-2">
          <form id="groupAdd" className="mr-2" onSubmit={onAddGroup}>
            <input
              type="text"
              className="form-control"
              style={{ padding: '0.5rem 0' }}
              placeholder="Enter group name"
              onChange={(e) => setGroupName(e.target.value)}
              value={groupName}
            />
          </form>
          <button
            className="btn btn-success btn-sm"
            type="submit"
            form="groupAdd"
          >Add group</button>
        </div>
      }
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {groups.map((item) => {

            let buttonDelete = null;

            if (auth.isAuthenticated) {
              buttonDelete = <button className="btn btn-danger btn-sm" onClick={() => deleteGroup(item.id)}>{' '}Delete</button>
            };

            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td><Link to={{
                  pathname: `/groups/${item.id}`,
                  state: {
                    group: item
                  }
                }}>{item.name}</Link></td>
                <td>
                  {buttonDelete}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  groupsList: state.groupsList
});

export default (connect(mapStateToProps, { addGroup, deleteGroup, fetchGroups, fetchDept })(DeptPage));
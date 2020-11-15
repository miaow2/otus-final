import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Spinner } from '../spinners';
import withNetWatcherService from '../hoc';

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal d-block" : "modal d-none";

  return (
    <div className={showHideClassName}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modal title</h5>
            <button
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {children}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary btn-sm">Save changes</button>
            <button
              className="btn btn-secondary btn-sm"
              data-dismiss="modal"
              onClick={handleClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

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
            <td><Link to={`/groups/${item.id}`}>{item.name}</Link></td>
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

  const node = useRef();

  const [groups, setGroups] = useState([])
  const [isLoaded, setIsLoaded] = useState(false);
  const [dept, setDept] = useState({})
  const [modal, setModal] = useState(false);

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

  const handleModal = () => {
    setModal(!modal);
  };

  const handleOutsideClick = (e) => {
    if (node.current.contains(e.target)) {
      console.log("inside")
      return
    };
    console.log("outside")
    setModal(false);
    // if (!node.current.contains(e.target)) setModal(false)
  };

  useEffect(() => {
    if (modal) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [modal]);

  const content = isLoaded ? <DeptView groups={groups} /> : <Spinner />

  const showHideClassName = modal ? "modal d-block" : "modal d-none";

  return (
    <div>
      <h1>
        {dept.name}
      </h1>
      <div ref={node}>
        {/* <Modal show={modal} handleClose={handleModal}>
          <p>Modal</p>
          <p>Data</p>
        </Modal> */}
        <div className={showHideClassName}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modal title</h5>
                <button
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={handleModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Modal</p>
                <p>Data</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary btn-sm">Save changes</button>
                <button
                  className="btn btn-secondary btn-sm"
                  data-dismiss="modal"
                  onClick={handleModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
        <button className="btn btn-success btn-sm" onClick={handleModal}>Add group</button>
      </div>
      {content}
    </div>
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
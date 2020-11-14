import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Spinner from '../spinner';
import { fetchDepts } from '../../actions/home';

const HomeView = ({ depts }) => {

  const items = depts.map((item) => {
    return (
      <div className="col" key={item.id}>
        <div className="card border-primary mb-3" style={{ maxWidth: '20rem' }}>
          <div className="card-body">
            <h4 className="card-title">{item.name}</h4>
            <ul className="list-group" style={{ fontSize: '18px' }}>
              <li className="list-group-item d-flex justify-content-between align-items-center border-0">
                <Link to={{
                  pathname: `/depts/${item.id}`,
                  state: {
                    deptName: item.name
                  }
                }}>
                  Groups
                </Link>
                <span className="badge badge-primary badge-pill">{item.groups_count}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="row row-cols-4">
      {items}
    </div>
  );
};

const HomeContainer = ({ deptsList, fetchDepts }) => {

  useEffect(() => {
    const url = '/api/departaments/';
    fetchDepts(url);
  }, []);

  const { depts, loading } = deptsList

  if (loading) {
    return <Spinner />
  };

  // if (error) {
  //   return <ErrorIndicator />
  // };

  return <HomeView depts={depts} />;
};

const mapStateToProps = (state) => ({
  deptsList: state.deptsList
});

const mapDispatchToProps = (dispatch) => {

  return {
    fetchDepts: fetchDepts(dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
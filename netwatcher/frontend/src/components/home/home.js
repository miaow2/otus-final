import React, { useEffect, useState } from 'react';

import Spinner from '../spinner';
import withNetWatcherService from '../hoc';

const HomeView = ({ depts }) => {

  const items = depts.map((item) => {
    return (
      <div className="col" key={item.id}>
        <div className="card border-primary mb-3" style={{ maxWidth: '20rem' }}>
          <div className="card-body">
            <h4 className="card-title">{item.name}</h4>
            <ul className="list-group" style={{ fontSize: '18px' }}>
              <li className="list-group-item d-flex justify-content-between align-items-center border-0">
                <a href="#">Groups</a>
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

const HomeContainer = ({ netwatcherService }) => {

  const [depts, setDepts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const url = 'api/departaments/';
    netwatcherService.getAllResources(url)
      .then((data) => {
        setDepts(data.results);
        setIsLoaded(true);
      });
  }, []);

  const content = isLoaded ? <HomeView depts={depts} /> : <Spinner />;

  return content;
};

export default withNetWatcherService()(HomeContainer);
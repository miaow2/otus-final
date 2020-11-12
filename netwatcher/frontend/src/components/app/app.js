import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../header';
import Home from '../home';
import NetWatcherService from '../../services/netwatcher-api';
import { DeptPage } from '../pages';
import { NetWatcherServiceProvider } from '../netwatcher-service-context';

import store from '../../store';

const App = () => {

  const netwatcherService = new NetWatcherService()

  return (
    <Provider store={store}>
      {/* <AlertProvider template={AlertTemplate} {...alertOptions}> */}
      <NetWatcherServiceProvider value={netwatcherService}>
        <Router>
          <Header />
          {/* <Alerts /> */}
          <div className="container">
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/depts/:id" render={({ match }) => {
                const { id } = match.params
                return <DeptPage deptId={id} />
              }} />
              {/* <Route path="/groups/:id" render={({ match }) => {
                const { id } = match.params
                return <CoursePage courseId={id} />
              }} /> */}
              {/* <Route path="/login" component={Login} /> */}
              {/* <PrivateRoute path="/profile" component={Profile} /> */}
            </Switch>
          </div>
        </Router>
      </NetWatcherServiceProvider>
      {/* </AlertProvider> */}
    </Provider>
  );
};

export default App;
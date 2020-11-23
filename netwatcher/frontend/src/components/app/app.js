import React, { useEffect } from 'react';
import AlertTemplate from 'react-alert-template-basic';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Provider as AlertProvider } from 'react-alert';

import Alerts from '../alerts';
import Header from '../header';
import Home from '../home';
import Login from '../accounts';
import NetWatcherService from '../../services/netwatcher-api';
import PrivateRoute from '../private-route';
import Profile from '../profile';
import { DeptPage, GroupPage, JobPage } from '../pages';
import { loadUser } from '../../actions/auth-action';
import { NetWatcherServiceProvider } from '../netwatcher-service-context';

import store from '../../store';

import './app.css'

const alertOptions = {
  timeout: 3000,
  position: "top center"
};

const App = () => {

  const netwatcherService = new NetWatcherService();

  useEffect(() => {
    store.dispatch(loadUser())
    // eslint-disable-next-line
  }, []);

  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <NetWatcherServiceProvider value={netwatcherService}>
          <Router>
            <Header />
            <Alerts />
            <div className="container">
              <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/depts/:id" render={({ match }) => {
                  const { id } = match.params
                  return <DeptPage deptId={id} />
                }} />
                <Route path="/groups/:id" render={({ match, location }) => {
                  const { id } = match.params
                  return <GroupPage groupId={id} location={location} />
                }} />
                <Route path="/jobs/:id" render={({ match, location }) => {
                  const { id } = match.params
                  return <JobPage jobId={id} location={location} />
                }} />
                <Route path="/login" component={Login} />
                <PrivateRoute path="/profile" component={Profile} />
              </Switch>
            </div>
          </Router>
        </NetWatcherServiceProvider>
      </AlertProvider>
    </Provider>
  );
};

export default App;
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
import Profile from '../profile';
import { DeptPage } from '../pages';
import { GroupPage } from '../pages';
import { loadUser } from '../../actions/auth';
import { NetWatcherServiceProvider } from '../netwatcher-service-context';

import store from '../../store';

const alertOptions = {
  timeout: 5000,
  position: "top center"
};

const App = () => {

  const netwatcherService = new NetWatcherService();

  useEffect(() => {
    store.dispatch(loadUser())
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
                <Route path="/groups/:id" render={({ match }) => {
                  const { id } = match.params
                  return <GroupPage groupId={id} />
                }} />
                <Route path="/login" component={Login} />
                {/* <PrivateRoute path="/profile" component={Profile} /> */}
                <Route path="/profile" component={Profile} />
              </Switch>
            </div>
          </Router>
        </NetWatcherServiceProvider>
      </AlertProvider>
    </Provider>
  );
};

export default App;
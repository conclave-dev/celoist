import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Dashboard from './container/Dashboard';

const Router = () => (
  <Switch>
    <Redirect exact={true} from="/" to="/dashboard" />
    <Route path="/dashboard">
      <Dashboard />
    </Route>
  </Switch>
);

export default Router;

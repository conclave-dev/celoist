import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Home from './container/Home';

const Router = () => (
  <Switch>
    <Redirect exact={true} from="/" to="/home" />
    <Route path="/home">
      <Home />
    </Route>
  </Switch>
);

export default Router;

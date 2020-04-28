import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Home from './container/ecosystem/Home';
import Elections from './container/ecosystem/Elections';
import Governance from './container/ecosystem/Governance';
import Profile from './container/account/Profile';
import Portfolio from './container/account/Portfolio';
import { DEFAULT_ADDRESS } from '../config';

const Router = () => (
  <Switch>
    <Redirect exact from="/" to="/ecosystem" />
    <Route exact path="/ecosystem">
      <Home />
    </Route>
    <Route exact path="/ecosystem/elections">
      <Elections />
    </Route>
    <Route exact path="/ecosystem/governance">
      <Governance />
    </Route>
    <Route exact path="/account">
      <Profile />
    </Route>
  </Switch>
);

export default Router;

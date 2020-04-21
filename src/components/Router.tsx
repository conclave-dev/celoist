import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Home from './container/ecosystem/Home';
import Elections from './container/ecosystem/Elections';
import Governance from './container/ecosystem/Governance';
import Profile from './container/account/Profile';

const Router = () => (
  <Switch>
    <Redirect exact={true} from="/" to="/ecosystem" />
    <Route path="/ecosystem">
      <Home />
    </Route>
    <Route path="/ecosystem/elections">
      <Elections />
    </Route>
    <Route path="/ecosystem/governance">
      <Governance />
    </Route>
    <Route path="/account">
      <Profile />
    </Route>
    <Route path="/account/portfolio">
    </Route>
  </Switch>
);

export default Router;

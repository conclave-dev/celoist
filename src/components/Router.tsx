import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Home from './container/ecosystem/Home';
import Elections from './container/ecosystem/Elections';
import Proposals from './container/ecosystem/Proposals';

const Router = () => (
  <Switch>
    <Redirect exact={true} from="/" to="/home" />
    <Route path="/home">
      <Home />
    </Route>
    <Route path="/elections">
      <Elections />
    </Route>
    <Route path="/proposals">
      <Proposals />
    </Route>
  </Switch>
);

export default Router;

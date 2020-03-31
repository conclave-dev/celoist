import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Home from './container/ecosystem/Home';
import Elections from './container/ecosystem/Elections';
import Governance from './container/ecosystem/Governance';

const Router = () => (
  <Switch>
    <Redirect exact={true} from="/" to="/home" />
    <Route path="/home">
      <Home />
    </Route>
    <Route path="/elections">
      <Elections />
    </Route>
    <Route path="/governance">
      <Governance />
    </Route>
  </Switch>
);

export default Router;

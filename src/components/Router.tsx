import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Home from './container/Home';
import Elections from './container/Elections';

const Router = () => (
  <Switch>
    <Redirect exact={true} from="/" to="/home" />
    <Route path="/home">
      <Home />
    </Route>
    <Route path="/elections">
      <Elections />
    </Route>
  </Switch>
);

export default Router;

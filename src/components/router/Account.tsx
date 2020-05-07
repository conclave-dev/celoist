import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Profile from '../container/account/Profile';
import { DEFAULT_ACCOUNT } from '../../config';

const Router = () => (
  <Switch>
    <Route
      exact
      path="/account/profile/:account"
      render={({ match: { params } }: { match: { params: { account: string } } }) => {
        const { account } = params;

        return <Profile account={account || DEFAULT_ACCOUNT} />;
      }}
    />
    <Redirect from="/account" to={`/account/profile/${DEFAULT_ACCOUNT}`} />
  </Switch>
);

export default Router;

import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router';

export default () => (
  <Fragment>
    {/* @TODO: Add your menu component here */}
    <Switch>
      {/**
       * @TODO: Define routes here for: /items, /profile, /profile/:userid, and /share
       *
       * Provide a wildcard redirect to /items for any undefined route using <Redirect />.
       *
       * Later, we'll add logic to send users to one set of routes if they're logged in,
       * or only view the /welcome page if they are not.
       */}
      <Route exact path="/" component={Home} />
      <Route path="/items" component={Items} />
      <Route path="/profile" component={Profile} />
      <Route path="/profile/:userid" component={Profile} />
      <Route path="/share" component={Share} />
      <Redirect from="/old" to="/items" />
      <Route component={NotFound} />
    </Switch>
  </Fragment>
);

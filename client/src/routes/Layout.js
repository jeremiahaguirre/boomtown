import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Home from '../pages/Home';
import Items from '../pages/Items';
import Profile from '../pages/Profile';
import Share from '../pages/Share';
import NavBar from '../components/navBar';

export default ({ classes, props }) => (
  <Fragment>
    <NavBar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/items" component={Items} />
      <Route path="/profile" component={Profile} />
      <Route path="/profile/:userid" component={Profile} />
      <Route path="/share" component={Share} />
      <Redirect from="/:?" to="/items" />
    </Switch>
  </Fragment>
);

import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Home from '../pages/Home';
import Items from '../pages/Items';
import Profile from '../pages/Profile';
import Share from '../pages/Share';
import NavBar from '../components/navBar';
import { ViewerContext } from '../context/ViewerProvider';

export default () => (
  <ViewerContext.Consumer>
    {({ viewer, loading }) => {
      if (loading) return null;
      if (!viewer) {
        return (
          <Switch>
            <Route exact path="/welcome" component={Home} />
            <Redirect from="/*" to="/welcome" />
          </Switch>
        );
      } else {
        return (
          <Fragment>
            <NavBar />
            <Switch>
              <Route path="/items" component={Items} />
              <Route path="/profile/:userid" component={Profile} />
              <Route path="/share" component={Share} />
              <Redirect from="/*" to="/items" />
            </Switch>
          </Fragment>
        );
      }
    }}
  </ViewerContext.Consumer>
);

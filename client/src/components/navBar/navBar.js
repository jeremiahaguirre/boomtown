import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import styles from './styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';

// import MenuIcon from '@material-ui/icons/Menu';

import logo from '../../images/boomtown.svg';

const navBar = ({ classes, props }) => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar className={classes.navBar}>
          <div className={classes.logoBtn}>
            <IconButton color="inherit" aria-label="Menu">
              <img className={classes.logo} src={logo} />
            </IconButton>
          </div>

          <div className={classes.login}>
            <Button>Share Somthing</Button>
            <Button>
              <MoreVertIcon />
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(navBar);

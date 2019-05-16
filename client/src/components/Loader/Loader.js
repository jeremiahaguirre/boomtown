import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './styles';

function Loader(props) {
  const { classes } = props;
  return (
    <div>
      <CircularProgress className={classes.progress} />
    </div>
  );
}

Loader.propType = {
  props: PropTypes.any
};

export default withStyles(styles)(Loader);

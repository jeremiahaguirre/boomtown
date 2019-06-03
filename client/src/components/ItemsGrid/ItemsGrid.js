import React from 'react';
import styles from './styles';
import ItemCards from '../ItemCards';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const ItemsGrid = ({ classes, items }) => {
  return (
    <div className={classes.mainGrid}>
      <Grid container alignContent="center" key={items.id}>
        <Grid item xs={12} key={items.id}>
          <Grid container>
            {items.map(item => (
              <Link key={item.id} to={`/profile/${item.itemowner.id}`}>
                <ItemCards item={item} />
              </Link>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

ItemsGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ItemsGrid);

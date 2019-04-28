import React from 'react';
import styles from './styles';
import ItemCards from '../ItemCards';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';

const ItemsGrid = ({ classes, items }) => {
  return (
    <div className={classes.mainGrid}>
      <Grid container alignContent="center">
        <Grid item xs={12}>
          <Grid container>
            {items.map(item => <ItemCards key={item.index} item={item} />)}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(ItemsGrid);

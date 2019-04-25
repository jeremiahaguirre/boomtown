import React from 'react';
//import Gravatar from 'react-gravatar';
//import styles from './styles';
import ItemCards from '../ItemCards';
import Grid from '@material-ui/core/Grid';

const ItemsGrid = ({ items }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container justify="center">
          {items.map(item => <ItemCards key={item.index} item={item} />)}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ItemsGrid;

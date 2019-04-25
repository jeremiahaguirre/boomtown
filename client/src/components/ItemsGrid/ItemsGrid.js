import React from 'react';
import Gravatar from 'react-gravatar';
import styles from './styles';
import ItemCards from '../ItemCards/index';

const ItemsGrid = ({ classes, items }) => {
  return (
    <div>
      {items.map(items => {
        items;
      })}
      <ItemCards />
    </div>
  );
};

export default ItemsGrid;

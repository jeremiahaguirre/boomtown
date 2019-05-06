import React from 'react';
import ItemsGrid from '../../components/ItemsGrid';

const Items = ({ classes, items }) => {
  return (
    <div className={classes.main}>
      <ItemsGrid key={items.index} items={items} />
    </div>
  );
};

export default Items;

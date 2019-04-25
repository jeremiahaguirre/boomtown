import React from 'react';
import ItemsGrid from '../../components/ItemsGrid';

const Items = ({ items }) => {
  return (
    <div>
      <p>
        This is the items page located at <code>/items</code>.
      </p>
      <ItemsGrid items={items} />
    </div>
  );
};

export default Items;

import React from 'react';
import Gravatar from 'react-gravatar';
import styles from './styles';

const ItemsCards = ({ classes, items }) => {
  return (
    <div>
      <Gravatar email="happytobike@gmail.com" />
      <div>
        <h2>{items.title}</h2>
        <p>{items.description}</p>
        <span>{items.created}</span>
      </div>
    </div>
  );
};

export default ItemsCards;

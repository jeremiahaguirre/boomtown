import React, { Component } from 'react';
import Items from './Items';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import CardMedia from '@material-ui/core/CardMedia';
// import FullScreenLoader from '../../components/FullScreenLoader';
import { Query } from 'react-apollo';
import { ALL_ITEMS_QUERY } from '../../apollo/queries';
import ItemsGrid from '../../components/ItemsGrid/index';

class ItemsContainer extends Component {
  render() {
    return (
      <Query query={ALL_ITEMS_QUERY} variables={{ filter: 1 }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          console.log(data);
          return (
            <Items classes={this.props.classes} items={data.items} />,
            <ItemsGrid />
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(ItemsContainer);

import React, { Component } from 'react';
import Items from './Items';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { Query } from 'react-apollo';
import { ALL_ITEMS_QUERY } from '../../apollo/queries';
import { ViewerContext } from '../../context/ViewerProvider';
import Loader from '../../components/Loader';
import PropTypes from 'prop-types';

class ItemsContainer extends Component {
  render() {
    return (
      <ViewerContext.Consumer>
        {({ viewer, loading }) => {
          return (
            <Query
              query={ALL_ITEMS_QUERY}
              variables={{ filter: viewer.id }}
              fetchPolicy="network-only"
            >
              {({ loading, error, data }) => {
                if (loading) return <Loader />;
                if (error) return `Error! ${error.message}`;
                return (
                  <Items classes={this.props.classes} items={data.items} />
                );
              }}
            </Query>
          );
        }}
      </ViewerContext.Consumer>
    );
  }
}

ItemsContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ItemsContainer);

import React, { Component } from 'react';
import Share from './Share';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { Query } from 'react-apollo';
import { ALL_TAGS_QUERY } from '../../apollo/queries';
import Loader from '../../components/Loader';

class ShareContainer extends Component {
  render() {
    return (
      <Query query={ALL_TAGS_QUERY} fetchPolicy="network-only">
        {({ loading, error, data }) => {
          if (loading) return <Loader />;
          if (error) return `Error! ${error.message}`;
          return <Share classes={this.props.classes} tags={data.tags} />;
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(ShareContainer);

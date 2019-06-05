import React, { Component } from 'react';
import Profile from './Profile';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { ViewerContext } from '../../context/ViewerProvider';
import { Query } from 'react-apollo';
import { ALL_USER_ITEMS_QUERY } from '../../apollo/queries';
import Loader from '../../components/Loader';
import PropTypes from 'prop-types';

class ProfileContainer extends Component {
  render() {
    const { match } = this.props;
    return (
      <div className={this.props.classes.main}>
        <ViewerContext.Consumer>
          {({ viewer, loading }) => {
            return (
              <Query
                query={ALL_USER_ITEMS_QUERY}
                variables={{ id: match.params.userid || viewer.id }}
                fetchPolicy="network-only"
              >
                {({ loading, error, data }) => {
                  if (loading) return <Loader />;
                  if (error) return `Error! ${error.message}`;
                  return (
                    <Profile
                      classes={this.props.classes}
                      user={data.user}
                      userItems={data.user.items}
                    />
                  );
                }}
              </Query>
            );
          }}
        </ViewerContext.Consumer>
      </div>
    );
  }
}

ProfileContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileContainer);

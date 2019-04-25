import React, { Component } from 'react';
import Home from './Home';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { Query } from 'react-apollo';
// import ALL_TAGS_QUERY from '../../apollo/queries';

class HomeContainer extends Component {
  render() {
    return <Home classes={this.props.classes} />;
  }
}
export default withStyles(styles)(HomeContainer);

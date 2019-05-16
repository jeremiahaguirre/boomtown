import React, { Component } from 'react';
import Home from './Home';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import styles from './styles';

class HomeContainer extends Component {
  render() {
    return <Home classes={this.props.classes} />;
  }
}
export default withStyles(styles)(HomeContainer);

HomeContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

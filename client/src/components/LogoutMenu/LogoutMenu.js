import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { LOGOUT_MUTATION, VIEWER_QUERY } from '../../apollo/queries';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import styles from './styles';

const ITEM_HEIGHT = 48;

class LogoutMenu extends Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { logoutMutation, classes } = this.props;

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          className={classes.main}
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200
            }
          }}
        >
          <Link to="/profile">
            <MenuItem key={'profile'} onClick={this.handleClose}>
              Profile
            </MenuItem>
          </Link>
          <Mutation mutation={LOGOUT_MUTATION}>
            {(logOut, { data }) => (
              <MenuItem key={'logout'} onClick={logoutMutation}>
                Logout
              </MenuItem>
            )}
          </Mutation>
        </Menu>
      </div>
    );
  }
}

LogoutMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  logoutMutation: PropTypes.func
};

const refetchQueries = [
  {
    query: VIEWER_QUERY
  }
];

export default compose(
  graphql(LOGOUT_MUTATION, {
    options: {
      refetchQueries
    },
    name: 'logoutMutation'
  })
)(withStyles(styles)(LogoutMenu));

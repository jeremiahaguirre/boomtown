import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { LOGOUT_MUTATION, VIEWER_QUERY } from '../../apollo/queries';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';

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
    const { logoutMutation } = this.props;

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
              <i class="fas fa-fingerprint" />Profile
            </MenuItem>
          </Link>
          <Mutation mutation={LOGOUT_MUTATION}>
            {(logOut, { data }) => (
              <MenuItem key={'logout'} onClick={logoutMutation}>
                <i class="fas fa-power-off" />Logout
              </MenuItem>
            )}
          </Mutation>
        </Menu>
      </div>
    );
  }
}

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
)(LogoutMenu);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from './styles';
import Gravatar from 'react-gravatar';

function ProfileCard({ classes, user, userItems }) {
  console.log(user);
  return (
    <div className={classes.main}>
      <Card className={classes.card}>
        <CardContent>
          <Gravatar className={classes.profilePic} email={user.email} />

          <Typography className={classes.owner} component="h2">
            {user.fullname}
          </Typography>
          <Typography component="p">{userItems.length} Items shared</Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default withStyles(styles)(ProfileCard);

import React from 'react';
import Gravatar from 'react-gravatar';
import styles from './styles';
import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
const moment = require('moment');

const ItemsCards = ({ classes, item }) => {
  return (
    <Card className={classes.cards}>
      <CardMedia component="img" height="240" image={item.imageurl} />
      <CardContent className={classes.infoSection}>
        <div className={classes.header}>
          <IconButton>
            <Gravatar
              className={classes.profilePic}
              email="happytobike@gmail.com"
            />
          </IconButton>
          <div className={classes.ownerDate}>
            <Typography className={classes.owner} component="p">
              {item.itemowner.fullname}
            </Typography>
            <Typography component="p">
              {moment(item.created)
                .startOf('day')
                .fromNow()}
            </Typography>
          </div>
        </div>
        <div className={classes.textSection}>
          <Typography gutterBottom component="h2">
            {item.title}
          </Typography>
          <Typography className={classes.tag} component="span">
            {item.tags.map(tag => tag.title).join(', ')}
          </Typography>
          <Typography className={classes.description} component="p">
            {item.description}
          </Typography>
        </div>
        <div className={classes.btn}>
          <Button className={classes.button} size="large">
            Borrow
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(ItemsCards);

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

          <Typography className={classes.owner} component="span">
            {item.itemowner.fullname}
          </Typography>
        </div>
        <div className={classes.textSection}>
          <Typography gutterBottom variant="h5" component="h2">
            {item.title}
          </Typography>
          <Typography className={classes.tag} component="span">
            {item.tags.map(tag => (
              <Typography>
                <span>{tag.title}</span>
              </Typography>
            ))}
          </Typography>
          <Typography className={classes.description} component="p">
            {item.description}
          </Typography>
        </div>
        <Button className={classes.button} size="large">
          Borrow
        </Button>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(ItemsCards);

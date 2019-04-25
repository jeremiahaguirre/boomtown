import React from 'react';
// import Gravatar from 'react-gravatar';
// import styles from './styles';
import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const ItemsCards = ({ classes, item }) => {
  return (
    <Card>
      {/* <CardActionArea> */}
      <CardMedia component="img" height="140" image={item.imageurl} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {item.title}
        </Typography>
        <Typography component="p">{item.description}</Typography>
      </CardContent>
      {/* </CardActionArea> */}
    </Card>
  );
};

export default ItemsCards;

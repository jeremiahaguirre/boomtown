import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Gravatar from 'react-gravatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

// import './SimpleForm.css';

function InputField({ value, placeholder, onChange, meta }) {
  return (
    <div className="line">
      <div>
        <TextField
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export const FormConfig = {
  placeholder: {
    name: 'Name your item',
    description: 'Describe your item',
    tags: 'Add some tags'
  }
};

export function FormView({ classes, handleSubmit, tags }) {
  return (
    <form onSubmit={handleSubmit}>
      <button className="line" type="submit">
        Select an image
      </button>
      <Field
        name="name"
        render={({ input, meta }) => (
          <InputField
            placeholder={FormConfig.placeholder[input.name]}
            onChange={input.onChange}
            meta={meta}
            value={input.value}
          />
        )}
      />

      <Field
        name="description"
        render={({ input, meta }) => (
          <InputField
            placeholder={FormConfig.placeholder[input.name]}
            meta={meta}
            {...input}
          />
        )}
      />
      <FormControl>
        <InputLabel htmlFor="select-multiple-checkbox">
          Add some tags
        </InputLabel>
        <Select
          name="tags"
          render={({ input, meta }) => (
            <InputField placeholder={FormConfig.placeholder[input.name]} />
          )}
        >
          {tags &&
            tags.map(tag => (
              <MenuItem key={tag} value={tag.title}>
                <Checkbox checked={tag} />
                <ListItemText primary={tags} />
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <button className="line" type="submit">
        Enter
      </button>
    </form>
  );
}

class ShareForm extends Component {
  render() {
    return (
      <div>
        <Card />
        <Form
          render={props => <FormView {...props} tags={this.props.tags} />}
        />
      </div>
    );
  }
}

// const Cards = ({ classes, item }) => {
//   <Card className={classes.cards}>
//     <CardContent className={classes.infoSection}>
//       <div className={classes.header}>
//         <IconButton>
//           <Gravatar
//             className={classes.profilePic}
//             email="happytobike@gmail.com"
//           />
//         </IconButton>
//         <div className={classes.ownerDate}>
//           <Typography className={classes.owner} component="p">
//             {item.itemowner.fullname}
//           </Typography>
//         </div>
//       </div>
//       <div className={classes.textSection}>
//         <Typography gutterBottom variant="h5" component="h2">
//           some text
//         </Typography>
//         <Typography className={classes.tag} component="span">
//           some text
//         </Typography>
//         <Typography className={classes.description} component="p">
//           some text
//         </Typography>
//       </div>
//     </CardContent>
//   </Card>;
// };

export default ShareForm;

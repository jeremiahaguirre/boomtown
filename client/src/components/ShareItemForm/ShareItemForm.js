import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Gravatar from 'react-gravatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import styles from './styles';

function InputFieldNoStyle({ classes, value, placeholder, onChange, meta }) {
  return (
    <div className="line">
      <TextField
        className={classes.space}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
const InputField = withStyles(styles)(InputFieldNoStyle);

const FormConfig = {
  placeholder: {
    name: 'Name your item',
    description: 'Describe your item',
    tags: 'Add some tags'
  }
};

function FormViewNoStyle({ classes, handleSubmit, tags }) {
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Typography className={classes.formHeader} component="h2">
        Share. Borrow. Prosper.
      </Typography>
      <button className={classes.select} type="submit">
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
      <FormControl className={classes.tags}>
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

      <button className={classes.btn} type="submit">
        Share
      </button>
    </form>
  );
}
const FormView = withStyles(styles)(FormViewNoStyle);
const CardNoStyle = ({ classes, item }) => {
  return (
    <Card className={classes.cards}>
      <CardMedia
        component="img"
        height="240"
        image="https://loremflickr.com/320/240"
      />
      <CardContent>
        <div>
          <IconButton>
            <Gravatar email="happytobike@gmail.com" />
          </IconButton>
          <div>
            <Typography component="span">some text</Typography>
          </div>
        </div>
        <div>
          <Typography gutterBottom variant="h5" component="h2">
            some text
          </Typography>
          <Typography variant="h5" component="p">
            some text
          </Typography>
          <Typography variant="h5" component="p">
            some text
          </Typography>
        </div>
        <Button size="large">Borrow</Button>
      </CardContent>
    </Card>
  );
};

const Cards = withStyles(styles)(CardNoStyle);

const ShareForm = ({ classes, items }) => {
  return (
    <div className={classes.share}>
      <Cards />
      <Form render={props => <FormView {...props} tags={props.tags} />} />
    </div>
  );
};

export default withStyles(styles)(ShareForm);

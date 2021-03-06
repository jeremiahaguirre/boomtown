import React, { Component } from 'react';
import { Form, Field, FormSpy } from 'react-final-form';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import { Mutation } from 'react-apollo';
import { ADD_ITEM_MUTATION, ALL_ITEMS_QUERY } from '../../apollo/queries';
import {
  updateItem,
  resetItem,
  resetImage
} from '../../redux/shareItemPreview/reducer';
import { connect } from 'react-redux';
import { ViewerContext } from '../../context/ViewerProvider';

const InputFieldNoStyle = ({ classes, value, placeholder, onChange }) => {
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
};
const InputField = withStyles(styles)(InputFieldNoStyle);

const FormConfig = {
  placeholder: {
    title: 'Name your item',
    description: 'Describe your item',
    tags: 'Add some tags'
  }
};

const FormViewNoStyle = ({
  classes,
  handleSubmit,
  tags,
  dispatchUpdate,
  updateItem,
  selectedTags,
  handleSelectTag,
  generateTagsText,
  handleSelectFile,
  resetFileInput,
  fileSelected,
  fileInput,
  pristine,
  handleTagClose,
  responseMessage,
  invalid,
  form
}) => {
  return (
    <form
      className={classes.form}
      onSubmit={e => {
        handleSubmit(e);
        form.reset();
        handleTagClose();
        responseMessage();
      }}
    >
      <FormSpy
        subscription={{ values: true }}
        component={({ values }) => {
          if (values) {
            dispatchUpdate(values, tags, updateItem);
          }
          return '';
        }}
      />
      <Typography className={classes.formHeader} component="h2">
        Share. Borrow. Prosper.
      </Typography>
      <Field
        name="imageurl"
        render={({ input, meta }) => (
          <div>
            <input
              type="file"
              accept="image/*"
              ref={fileInput}
              id="fileinput"
              hidden
              onChange={e => handleSelectFile(e)}
            />
            {fileSelected ? (
              <Button
                onClick={() => {
                  resetFileInput();
                }}
                className={classes.select}
              >
                Reset Image
              </Button>
            ) : (
              <Button
                onClick={() => {
                  fileInput.current.click();
                }}
                className={classes.select}
              >
                Select an image
              </Button>
            )}
          </div>
        )}
      />

      <Field
        name="title"
        render={({ input, meta }) => (
          <InputField
            placeholder={FormConfig.placeholder[input.name]}
            onChange={input.onChange}
            meta={meta}
            {...input}
          />
        )}
      />

      <Field
        name="description"
        render={({ input, meta }) => (
          <InputField
            placeholder={FormConfig.placeholder[input.name]}
            onChange={input.onChange}
            meta={meta}
            {...input}
          />
        )}
      />
      <Field name="tags">
        {({ input, meta }) => {
          return (
            <Select
              multiple
              value={selectedTags}
              onChange={handleSelectTag}
              renderValue={selected => {
                return generateTagsText(tags, selected);
              }}
            >
              {tags &&
                tags.map(tag => (
                  <MenuItem key={tag.id} value={tag.id}>
                    <Checkbox checked={selectedTags.indexOf(tag.id) > -1} />
                    <ListItemText primary={tag.title} />
                  </MenuItem>
                ))}
            </Select>
          );
        }}
      </Field>
      <Button
        className={classes.btn}
        type="submit"
        disabled={pristine || invalid}
        onSubmit={() => alert('Thank you for submitting')}
      >
        Share
      </Button>
    </form>
  );
};

FormViewNoStyle.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func,
  tags: PropTypes.array,
  dispatchUpdate: PropTypes.func
};

const FormView = withStyles(styles)(FormViewNoStyle);

class ShareForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileSelected: false,
      done: false,
      selectedTags: []
    };
    this.fileInput = React.createRef();
  }
  generateTagsText(tags, selected) {
    return tags
      .map(t => (selected.indexOf(t.id) > -1 ? t.title : false))
      .filter(e => e)
      .join(', ');
  }
  handleSelectTag = event => {
    this.setState({
      selectedTags: event.target.value
    });
  };

  responseMessage = () => {
    alert('Thank you for submitting');
  };

  handleTagClose = () => {
    this.setState({
      selectedTags: []
    });
  };

  handleSelectFile = event => {
    this.setState({
      fileSelected: this.fileInput.current.files[0]
    });
  };
  applyTags(tags) {
    return (
      tags &&
      tags
        .filter(t => this.state.selectedTags.indexOf(t.id) > -1)
        .map(t => ({ title: t.title, id: t.id }))
    );
  }
  getBase64Url() {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = e => {
        resolve(
          `data:${this.state.fileSelected.type};base64, ${btoa(
            e.target.result
          )}`
        );
      };
      reader.readAsBinaryString(this.state.fileSelected);
    });
  }
  resetFileInput = () => {
    this.fileInput.current.value = '';
    this.props.resetImage();
    this.setState({
      fileSelected: false
    });
  };
  dispatchUpdate = (values, tags, updateNewItem) => {
    if (!values.imageurl && this.state.fileSelected) {
      this.getBase64Url().then(imageurl => {
        updateNewItem({
          imageurl
        });
      });
    }
    updateNewItem({
      ...values,
      tags: this.applyTags(tags)
    });
  };

  render() {
    const { tags } = this.props;
    return (
      <div className={this.props.classes.share}>
        <ViewerContext.Consumer>
          {({ loading, viewer }) => {
            return (
              <Mutation
                refetchQueries={() => [
                  { query: ALL_ITEMS_QUERY, variables: viewer.id }
                ]}
                mutation={ADD_ITEM_MUTATION}
              >
                {(addItem, { data }) => (
                  <Form
                    onSubmit={async values => {
                      try {
                        const newItem = {
                          item: {
                            ...values,
                            tags: this.applyTags(tags)
                          }
                        };
                        await addItem({
                          variables: newItem
                        });
                      } catch (e) {
                        console.log(e);
                      }
                    }}
                    render={props => (
                      <FormView
                        {...props}
                        fileInput={this.fileInput}
                        tags={tags}
                        responseMessage={this.responseMessage}
                        handleTagClose={this.handleTagClose}
                        fileSelected={this.state.fileSelected}
                        resetFileInput={this.resetFileInput}
                        generateTagsText={this.generateTagsText}
                        handleSelectTag={this.handleSelectTag}
                        selectedTags={this.state.selectedTags}
                        updateItem={this.props.updateItem}
                        handleSelectFile={this.handleSelectFile}
                        dispatchUpdate={this.dispatchUpdate}
                      />
                    )}
                  />
                )}
              </Mutation>
            );
          }}
        </ViewerContext.Consumer>
      </div>
    );
  }
}

ShareForm.propTypes = {
  classes: PropTypes.object.isRequired,
  tags: PropTypes.array
};

const mapDispatchToProps = dispatch => ({
  updateItem(item) {
    dispatch(updateItem(item));
  },
  resetImage() {
    dispatch(resetImage());
  },
  resetItem() {
    dispatch(resetItem());
  }
});

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(ShareForm));

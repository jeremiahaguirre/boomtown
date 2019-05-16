import React from 'react';
import ShareItemForm from '../../components/ShareItemForm';
import ShareItemPreview from '../../components/ShareItemPreview';
import PropTypes from 'prop-types';

const Share = ({ classes, tags }) => {
  return (
    <div className={classes.share}>
      <ShareItemPreview />
      <ShareItemForm tags={tags} />
    </div>
  );
};

Share.propTypes = {
  classes: PropTypes.object.isRequired,
  tags: PropTypes.array
};

export default Share;

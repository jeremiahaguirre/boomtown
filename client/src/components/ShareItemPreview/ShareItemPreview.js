import React from 'react';
import ItemCards from '../ItemCards';
import { connect } from 'react-redux';
import { ViewerContext } from '../../context/ViewerProvider';
import PropTypes from 'prop-types';

const ShareItemPreview = ({ shareItemPreview }) => {
  return (
    <ViewerContext.Consumer>
      {({ viewer, loading }) => {
        return <ItemCards item={shareItemPreview} viewer={viewer} />;
      }}
    </ViewerContext.Consumer>
  );
};

const mapStateToProps = ({ shareItemPreview }) => ({ shareItemPreview });

ShareItemPreview.propTypes = {
  shareItemPreview: PropTypes.object
};

export default connect(mapStateToProps)(ShareItemPreview);

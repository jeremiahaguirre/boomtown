import React, { Component } from 'react';
import ItemCards from '../ItemCards';
import { connect } from 'react-redux';
import { ViewerContext } from '../../context/ViewerProvider';

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

export default connect(mapStateToProps)(ShareItemPreview);

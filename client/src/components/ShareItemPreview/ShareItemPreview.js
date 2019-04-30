import React, { Component } from 'react';
import ItemCards from '../ItemCards';
import { connect } from 'react-redux';

const ShareItemPreview = ({ shareItemPreview }) => {
  return <ItemCards item={shareItemPreview} />;
};

const mapStateToProps = ({ shareItemPreview }) => ({ shareItemPreview });

export default connect(mapStateToProps)(ShareItemPreview);

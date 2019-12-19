import React from 'react';
import PropTypes from 'prop-types';
import { PostTemplate } from '../../templates/post';

const PostPreview = ({ entry, widgetFor }) => (
  <PostTemplate
    html={widgetFor('body')}
    date={entry.getIn(['data', 'date'])}
    category={entry.getIn(['data', 'category'])}
    tags={entry.getIn(['data', 'tags'])}
    title={entry.getIn(['data', 'title'])}
    image={entry.getIn(['data', 'cover'])}
  />
);

PostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }).isRequired,
  widgetFor: PropTypes.func.isRequired,
};

export default PostPreview;

import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import './style.scss';

const PostTags = ({ tags }) => {
  return (
    <ul className="post-tags">
      {tags &&
        tags.map(tag => (
          <li key={tag}>
            <Link to={`/tags/${_.kebabCase(tag)}`}>{`🔖${tag}`}</Link>
          </li>
        ))}
    </ul>
  );
};

PostTags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
};

PostTags.defaultProps = {
  tags: null,
};

export default React.memo(PostTags);

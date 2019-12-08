import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const PostText = ({ head, category, date, timeToRead, wrapClass, children }) => {
  return (
    <div className={wrapClass}>
      <h3 className="post-title">{head}</h3>
      <div className="post-subtitle">
        {category && (
          <Link to={`/categories/${_.kebabCase(category)}`}>
            <span className="post-category">{category}</span>
          </Link>
        )}
        <span>
          <i className="fas fa-calendar-alt" style={{ marginRight: '4px' }} />
          {date}
        </span>
        <span>{` • ${timeToRead} min read`}</span>
      </div>
      {children}
    </div>
  );
};

PostText.propTypes = {
  head: PropTypes.node.isRequired,
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  timeToRead: PropTypes.number.isRequired,
  wrapClass: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default React.memo(PostText);

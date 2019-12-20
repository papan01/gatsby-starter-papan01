import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const PostText = ({ head, category, date, timeToRead, wrapClass, children }) => {
  const formatDate =
    Number.isNaN(date) === false ? new Date(date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10);
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
          {formatDate}
        </span>
        <span>{` • ${timeToRead} min read`}</span>
      </div>
      {children}
    </div>
  );
};

PostText.propTypes = {
  head: PropTypes.node,
  category: PropTypes.string.isRequired,
  date: PropTypes.string,
  timeToRead: PropTypes.number,
  wrapClass: PropTypes.string,
  children: PropTypes.node.isRequired,
};

PostText.defaultProps = {
  head: '',
  date: '',
  timeToRead: 0,
  wrapClass: '',
};

export default React.memo(PostText);

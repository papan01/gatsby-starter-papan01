import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import './style.scss';

const postShortList = ({ data }) => {
  return (
    <article>
      {data.map(field => (
        <section key={field.fieldValue}>
          <h2>{field.fieldValue}</h2>
          <ul className="post-short-list">
            {field.posts.map(post => (
              <li key={post.slug}>
                <div className="post-date-timetoread">
                  <p>
                    {Number.isNaN(post.date) === false
                      ? new Date(post.date).toISOString().slice(0, 10)
                      : new Date().toISOString().slice(0, 10)}
                  </p>
                  <p>{`☕️ ${post.timeToRead} min read`}</p>
                </div>
                <Link to={post.slug}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </article>
  );
};

postShortList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      fieldValue: PropTypes.string.isRequired,
      posts: PropTypes.arrayOf(
        PropTypes.shape({
          date: PropTypes.string.isRequired,
          timeToRead: PropTypes.number.isRequired,
          slug: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
        }),
      ),
    }).isRequired,
  ).isRequired,
};

export default React.memo(postShortList);

import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';
import './style.scss';

const PostCardList = ({ posts }) => {
  const PostCard = loadable(() => import('../postCard'));
  return (
    <div className="posts">
      {posts.map(post => (
        <PostCard data={post} key={post.title} />
      ))}
    </div>
  );
};

PostCardList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
      cover: PropTypes.object,
      title: PropTypes.string,
      category: PropTypes.string,
      date: PropTypes.string,
      timeToRead: PropTypes.number,
      excerpt: PropTypes.string,
    }),
  ).isRequired,
};

export default React.memo(PostCardList);

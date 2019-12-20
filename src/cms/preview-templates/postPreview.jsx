import React from 'react';
import PropTypes from 'prop-types';
import PostText from '../../components/postText';
import PostTags from '../../components/postTags';

export const PostTemplate = ({ category, date, title, tags, image, html }) => {
  const DefaultTitle = 'Template Title';
  const DefaultDate = new Date().toISOString();
  return (
    <main className="post-preview">
      <PostText category={category} date={date || DefaultDate} wrapClass="post-head" head={title || DefaultTitle}>
        <PostTags tags={tags} />
      </PostText>
      <hr />
      {image && <img style={{ maxWidth: '800px', maxHeight: '400px' }} src={image} alt="preview" />}
      {html && <div className="markdowm-body">{html}</div>}
    </main>
  );
};

PostTemplate.propTypes = {
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  image: PropTypes.string.isRequired,
  html: PropTypes.string.isRequired,
};

const PostPreview = ({ entry, widgetFor }) => {
  return (
    <PostTemplate
      html={widgetFor('body')}
      date={entry.getIn(['data', 'date'])}
      category={entry.getIn(['data', 'category'])}
      tags={entry.getIn(['data', 'tags'])}
      title={entry.getIn(['data', 'title'])}
      image={entry.getIn(['data', 'cover'])}
    />
  );
};

PostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }).isRequired,
  widgetFor: PropTypes.func.isRequired,
};

export default PostPreview;

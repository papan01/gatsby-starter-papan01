import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../layout';
import PostCardList from '../components/postCardList';
import PostPagination from '../components/postPagination';
import SEO from '../components/SEO';

const PostList = ({ data, pageContext }) => {
  const { edges } = data.allMarkdownRemark;
  const { currentPage, numPages } = pageContext;
  const postList = [];
  edges.forEach(edge => {
    postList.push({
      path: edge.node.fields.slug,
      tags: edge.node.frontmatter.tags,
      category: edge.node.frontmatter.category,
      cover: edge.node.frontmatter.cover,
      title: edge.node.frontmatter.title,
      date: edge.node.frontmatter.date,
      timeToRead: edge.node.timeToRead,
      excerpt: edge.node.excerpt,
    });
  });
  return (
    <Layout>
      <SEO />
      <PostCardList posts={postList} />
      <PostPagination currentPage={currentPage} numPages={numPages} />
    </Layout>
  );
};

PostList.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }).isRequired,
            excerpt: PropTypes.string.isRequired,
            timeToRead: PropTypes.number.isRequired,
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
              tags: PropTypes.arrayOf(PropTypes.string),
              cover: PropTypes.object,
              category: PropTypes.string,
              date: PropTypes.string,
            }).isRequired,
          }).isRequired,
        }),
      ).isRequired,
    }).isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    currentPage: PropTypes.number,
    numPages: PropTypes.number,
  }).isRequired,
};

export default PostList;

export const pageQuery = graphql`
  query PostListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: $limit, skip: $skip) {
      edges {
        node {
          fields {
            slug
          }
          excerpt(pruneLength: 120)
          timeToRead
          frontmatter {
            title
            tags
            cover {
              childImageSharp {
                fluid(maxWidth: 400, maxHeight: 275) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            date
            category
          }
        }
      }
    }
  }
`;

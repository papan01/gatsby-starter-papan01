import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import _ from 'lodash';
import Layout from '../layout';
import SEO from '../components/SEO';
import PostCardList from '../components/postCardList';
import PostPagination from '../components/postPagination';

const Tag = ({ pageContext, data }) => {
  const postEdges = data.allMarkdownRemark.edges;
  const { tag, currentPage, numPages } = pageContext;
  const postList = [];
  postEdges.forEach(edge => {
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
  const path = `/tags/${_.kebabCase(tag)}`;
  return (
    <Layout>
      <SEO title={`Posts about tag-${tag}`} path={path} />
      <h1 className="text-center tag-head">{`Posts About ${tag}`}</h1>
      <PostCardList posts={postList} />
      <PostPagination currentPage={currentPage} numPages={numPages} subpath={path} />
    </Layout>
  );
};

Tag.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string,
    currentPage: PropTypes.number,
    numPages: PropTypes.number,
  }).isRequired,
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
};

export default Tag;

export const pageQuery = graphql`
  query tagQuery($tag: String, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover {
              childImageSharp {
                fluid(maxWidth: 380, maxHeight: 275) {
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

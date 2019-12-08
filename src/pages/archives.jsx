import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { graphql } from 'gatsby';
import Layout from '../layout';
import SEO from '../components/SEO';
import PostShortList from '../components/postShortList';

const Archives = ({ data }) => {
  const { edges } = data.allMarkdownRemark;
  const groupedByYear = _.groupBy(edges, item => {
    return item.node.frontmatter.date.substring(0, 4);
  });

  let postList = [];
  Object.keys(groupedByYear).forEach((year, index) => {
    const posts = [];
    Object.values(groupedByYear)[index].forEach(({ node }) => {
      posts.push({
        date: node.frontmatter.date,
        timeToRead: node.timeToRead,
        slug: node.fields.slug,
        title: node.frontmatter.title,
      });
    });
    postList.push({
      fieldValue: year,
      posts,
    });
  });
  postList = postList.reverse();
  return (
    <Layout>
      <SEO title="Archives" path="/archives" />
      <h1 className="text-center">Archives</h1>
      <hr />
      <PostShortList data={postList} />
    </Layout>
  );
};

Archives.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }).isRequired,
            timeToRead: PropTypes.number.isRequired,
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
              date: PropTypes.string,
            }).isRequired,
          }).isRequired,
        }),
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Archives;

export const pageQuery = graphql`
  query ArchivesQuery {
    allMarkdownRemark(limit: 2000, sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          timeToRead
          frontmatter {
            title
            date
          }
        }
      }
    }
  }
`;

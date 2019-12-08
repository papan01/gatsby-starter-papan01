import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import _ from 'lodash';
import Layout from '../layout/index';
import SEO from '../components/SEO';
import PostShortList from '../components/postShortList';
import './categories.scss';

const Categories = ({ data }) => {
  const { group } = data.allMarkdownRemark;
  const categoryList = [];
  group.forEach(category => {
    const posts = [];
    category.edges.forEach(({ node }) => {
      posts.push({
        date: node.frontmatter.date,
        timeToRead: node.timeToRead,
        slug: node.fields.slug,
        title: node.frontmatter.title,
      });
    });

    categoryList.push({
      fieldValue: category.fieldValue,
      posts,
    });
  });
  return (
    <Layout>
      <SEO title="Categories" path="/categories" />
      <h1 className="text-center">Categories</h1>
      <ul className="categories-head">
        {group.map(category => (
          <li key={category.fieldValue}>
            <Link to={`/categories/${_.kebabCase(category.fieldValue)}`} className="post-category">
              {`${category.fieldValue} (${category.totalCount})`}
            </Link>
          </li>
        ))}
      </ul>
      <hr />
      <PostShortList data={categoryList} />
    </Layout>
  );
};

Categories.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
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
          ),
        }).isRequired,
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Categories;

export const pageQuery = graphql`
  query CategoriesQuery {
    allMarkdownRemark(limit: 2000, sort: { fields: [frontmatter___date], order: DESC }) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
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
  }
`;

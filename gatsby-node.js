const path = require(`path`);
const _ = require('lodash');
const LoadablePlugin = require('@loadable/webpack-plugin');
const config = require('./config/siteConfig');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [new LoadablePlugin()],
  });
};

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = `/${_.kebabCase(node.frontmatter.title)}`;
    createNodeField({
      node,
      name: `slug`,
      value: `/archives${slug}`,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              tags
              category
            }
          }
        }
      }
    }
  `);

  const tagMap = new Map();
  const categoryMap = new Map();
  const posts = result.data.allMarkdownRemark.edges;

  posts.forEach(({ node }, index) => {
    const prev = index === 0 ? null : posts[index - 1].node;
    const next = index === posts.length - 1 ? null : posts[index + 1].node;
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/post.jsx`),
      context: {
        slug: node.fields.slug,
        prev,
        next,
      },
    });

    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach(tag => {
        if (tagMap.get(tag)) {
          tagMap.set(tag, tagMap.get(tag) + 1);
        } else {
          tagMap.set(tag, 1);
        }
      });
    }

    if (node.frontmatter.category) {
      const c = node.frontmatter.category;
      if (categoryMap.get(c)) {
        categoryMap.set(c, categoryMap.get(c) + 1);
      } else {
        categoryMap.set(c, 1);
      }
    }
  });

  const { postsPerPage } = config;
  let numPages = Math.ceil(posts.length / postsPerPage);

  for (let i = 0; i < numPages; i += 1) {
    createPage({
      path: i === 0 ? `/` : `/${i + 1}`,
      component: path.resolve('./src/templates/postList.jsx'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  }

  tagMap.forEach((count, tag) => {
    numPages = Math.ceil(count / postsPerPage);
    for (let i = 0; i < numPages; i += 1) {
      createPage({
        path: i === 0 ? `/tags/${_.kebabCase(tag)}` : `/tags/${_.kebabCase(tag)}/${i + 1}`,
        component: path.resolve(`./src/templates/tag.jsx`),
        context: {
          tag,
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        },
      });
    }
  });

  categoryMap.forEach((count, category) => {
    numPages = Math.ceil(count / postsPerPage);
    for (let i = 0; i < numPages; i += 1) {
      createPage({
        path: i === 0 ? `/categories/${_.kebabCase(category)}` : `/categories/${_.kebabCase(category)}/${i + 1}`,
        component: path.resolve(`./src/templates/category.jsx`),
        context: {
          category,
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        },
      });
    }
  });
};

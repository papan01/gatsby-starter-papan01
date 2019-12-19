const config = require('./config/siteConfig');

module.exports = {
  pathPrefix: config.pathPrefix === '' ? '/' : config.pathPrefix,
  siteMetadata: {
    author: config.author,
    siteUrl: `${config.siteUrl}${config.pathPrefix}`,
    siteLanguage: config.siteLanguage,
    siteTitleAlt: config.siteTitleAlt,
    title: config.siteTitle,
    description: config.siteDescription,
    image: `${config.siteUrl}${config.pathPrefix}/favicons/logo.png`,
    datePublished: config.datePublished,
    copyrightYear: config.copyrightYear,
    twitterUsername: config.twitterUserName,
    fbAppId: config.siteFBAppID,
    copyright: config.copyright,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-relative-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 680,
            },
          },
          {
            resolve: 'gatsby-remark-custom-blocks',
            options: {
              blocks: {
                info: {
                  classes: 'info',
                },
                warning: {
                  classes: 'warning',
                },
              },
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: `auto-link`,
            },
          },
          `gatsby-remark-prismjs`,
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'images',
        path: `${__dirname}/content/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleShort,
        description: config.siteDescription,
        start_url: config.pathPrefix === '' ? '/' : config.pathPrefix,
        background_color: `#282c35`,
        theme_color: `#282c35`,
        display: `standalone`,
        icon: config.siteLogo,
        icons: [
          {
            src: `favicons/logo-192x192.png`,
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: `favicons/logo-512x512.png`,
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
  
            allSitePage {
              edges {
                node {
                  path
                }
              }
            }
        }`,
        serialize: ({ site, allSitePage }) =>
          allSitePage.edges.map(edge => {
            return {
              url: site.siteMetadata.siteUrl + edge.node.path,
              changefreq: `daily`,
              priority: 0.7,
            };
          }),
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: config.siteGATrackingID,
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
        {
          site {
            siteMetadata {
              siteUrl
              title
              description
              site_url: siteUrl
              copyright
              siteLanguage
              language: siteLanguage
              datePublished
              pubDate: datePublished
            }
          }
        }
      `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return {
                  ...edge.node.frontmatter,
                  date: edge.node.frontmatter.date,
                  categories: edge.node.frontmatter.tags,
                  description: edge.node.excerpt,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }, { author: config.author }],
                };
              });
            },
            query: `
            {
              allMarkdownRemark(
                limit: 1000,
                sort: { order: DESC, fields: [frontmatter___date] },
              ) {
                edges {
                  node {
                    excerpt
                    html
                    fields { slug }
                    frontmatter {
                      title
                      date
                      cover {
                        relativePath
                      }
                      category
                      tags
                    }
                  }
                }
              }
            }
          `,
            output: config.siteRss,
            title: config.siteTitle,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
  ],
};

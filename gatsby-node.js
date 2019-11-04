/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path')
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      allCosmicjsPages{
        edges{
          node{
            slug
            metadata{
              headline
              content
            }
          }
        }
      }
    }
  `)
  // console.log(result)
  const pages = result.data.allCosmicjsPages.edges.map(({ node }) => node)
  pages.forEach(page => {
    createPage({
      path: page.slug === 'home' ? '/' : `/${page.slug}`,
      component: path.resolve('src/templates/page.js'),
      context: {
        slug: page.slug,
      },
    })
  })
}
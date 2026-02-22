import React from 'react'
import Search from 'components/search'
import {useStaticQuery, graphql} from 'gatsby'
import Layout from 'components/layout'

function BlogScreen() {
  const result = useStaticQuery(
    graphql`
      query {
        blogposts: allMdx(
          sort: {frontmatter: {date: DESC}}
          filter: {
            frontmatter: {published: {ne: false}}
            internal: {contentFilePath: {regex: "//content/blog//"}}
          }
        ) {
          nodes {
            fields {
              id
              slug
              productionUrl
              title
              categories
              keywords
              date(formatString: "MMM DD, YYYY")
              description: plainTextDescription
              banner {
                ...bannerImage260
              }
            }
            excerpt(pruneLength: 190)
          }
        }
      }
    `,
  )
  // Transform nodes to edges format for Search component compatibility
  // Guard for SSR/hydration when data might not be ready yet
  const blogposts = result?.blogposts?.nodes ? {
    edges: result.blogposts.nodes.map(node => ({node}))
  } : { edges: [] }
  return (
    <Layout headerLink="/">
      <Search blogposts={blogposts} />
    </Layout>
  )
}

export default BlogScreen

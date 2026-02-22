import React from 'react'
import Search from 'components/search'
import {graphql} from 'gatsby'
import Layout from 'components/layout'
import SEO from 'components/seo'

function BlogPage({data}) {
  // Transform nodes to edges format for Search component compatibility
  const blogposts = {
    edges: data.blogposts.nodes.map(node => ({node}))
  }

  return (
    <Layout headerLink="/" maxWidth="90vw" noMobileHorizontalPadding>
      <SEO
        title="Blog | Khoa Le"
        description="Search Khoa Le blog posts"
      />
      <Search blogposts={blogposts} />
    </Layout>
  )
}

export const query = graphql`
  query BlogPageQuery {
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
            childImageSharp {
              gatsbyImageData(width: 260, placeholder: BLURRED)
            }
          }
        }
        excerpt(pruneLength: 190)
      }
    }
  }
`

export default BlogPage

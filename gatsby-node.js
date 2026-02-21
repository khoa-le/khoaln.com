const fs = require('fs')
const path = require('path')
const {URL} = require('url')
const rimraf = require('rimraf')
const slugify = require('@sindresorhus/slugify')
const {createFilePath} = require('gatsby-source-filesystem')
const config = require('./config/website')

// Simple function to strip markdown formatting
function stripMarkdown(markdownString) {
  if (!markdownString) return ''
  return markdownString
    // Remove headers
    .replace(/^#{1,6}\s+/gm, '')
    // Remove emphasis
    .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, '$1')
    // Remove links, keep text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove images
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, '')
    // Remove inline code
    .replace(/`([^`]+)`/g, '$1')
    // Remove blockquotes
    .replace(/^>\s+/gm, '')
    // Remove horizontal rules
    .replace(/^[-*_]{3,}$/gm, '')
    // Remove list markers
    .replace(/^[\s]*[-*+]\s+/gm, '')
    .replace(/^[\s]*\d+\.\s+/gm, '')
    // Clean up extra whitespace
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

const createPosts = (createPage, createRedirect, edges) => {
  edges.forEach(({node}, i) => {
    const prev = i === 0 ? null : edges[i - 1].node
    const next = i === edges.length - 1 ? null : edges[i + 1].node
    const pagePath = node.fields.slug

    if (node.fields.redirects) {
      node.fields.redirects.forEach(fromPath => {
        createRedirect({
          fromPath,
          toPath: pagePath,
          redirectInBrowser: true,
          isPermanent: true,
        })
      })
    }

    createPage({
      path: pagePath,
      component: path.resolve(`./src/templates/post.js`) + `?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        id: node.id,
        prev,
        next,
      },
    })
  })
}

function createBlogPages({data, actions}) {
  if (!data.nodes.length) {
    console.warn('No posts found!')
    return
  }

  const edges = data.nodes.map((node, i) => ({node}))
  const {createRedirect, createPage} = actions
  createPosts(createPage, createRedirect, edges)
  return null
}

const createPages = async ({actions, graphql}) => {
  const {data, errors} = await graphql(`
    fragment PostDetails on Mdx {
      internal {
        contentFilePath
      }
      id
      excerpt(pruneLength: 250)
      fields {
        title
        slug
        description
        date
        redirects
      }
    }
    query {
      blog: allMdx(
        filter: {
          frontmatter: {published: {ne: false}}
          internal: {contentFilePath: {regex: "//content/blog//"}}
        }
        sort: {frontmatter: {date: DESC}}
      ) {
        nodes {
          ...PostDetails
        }
      }
      writing: allMdx(
        filter: {
          frontmatter: {published: {ne: false}}
          internal: {contentFilePath: {regex: "//content/writing-blog//"}}
        }
        sort: {frontmatter: {date: DESC}}
      ) {
        nodes {
          ...PostDetails
        }
      }
    }
  `)

  if (errors) {
    return Promise.reject(errors)
  }

  const {blog, writing} = data
  createBlogPages({
    blogPath: '/blog',
    data: blog,
    actions,
  })
  createBlogPages({
    blogPath: '/writing/blog',
    data: writing,
    actions,
  })
}

const onCreateWebpackConfig = ({actions}) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  })
}

const onCreateNode = async (...args) => {
  if (args[0].node.internal.type === `Mdx`) {
    await onCreateMdxNode(...args)
  }
}

async function onCreateMdxNode({node, getNode, actions}) {
  const {createNodeField} = actions
  const contentFilePath = node.internal.contentFilePath || ''
  
  let slug = node.frontmatter.slug || createFilePath({node, getNode, basePath: `pages`})
  let isWriting = false

  if (contentFilePath.includes('content/blog/')) {
    const parentNode = getNode(node.parent)
    slug = `/blog/${node.frontmatter.slug || slugify(parentNode?.name || 'post')}`
  }

  if (contentFilePath.includes('content/writing-blog/')) {
    const parentNode = getNode(node.parent)
    isWriting = true
    slug = `/writing/blog/${node.frontmatter.slug || slugify(parentNode?.name || 'post')}`
  }

  createNodeField({
    name: 'id',
    node,
    value: node.id,
  })

  createNodeField({
    name: 'published',
    node,
    value: node.frontmatter.published,
  })

  createNodeField({
    name: 'title',
    node,
    value: node.frontmatter.title,
  })

  createNodeField({
    name: 'author',
    node,
    value: node.frontmatter.author || 'Khoa Le',
  })

  createNodeField({
    name: 'description',
    node,
    value: node.frontmatter.description || '',
  })

  const plainText = node.frontmatter.description 
    ? await stripMarkdown(node.frontmatter.description)
    : ''
  
  createNodeField({
    name: 'plainTextDescription',
    node,
    value: plainText,
  })

  createNodeField({
    name: 'slug',
    node,
    value: slug,
  })

  const productionUrl = new URL(config.siteUrl)
  productionUrl.pathname = slug

  createNodeField({
    name: 'productionUrl',
    node,
    value: productionUrl.toString(),
  })

  createNodeField({
    name: 'date',
    node,
    value: node.frontmatter.date ? node.frontmatter.date.split(' ')[0] : '',
  })

  createNodeField({
    name: 'banner',
    node,
    value: node.frontmatter.banner,
  })

  createNodeField({
    name: 'bannerCredit',
    node,
    value: node.frontmatter.bannerCredit,
  })

  createNodeField({
    name: 'categories',
    node,
    value: node.frontmatter.categories || [],
  })

  createNodeField({
    name: 'keywords',
    node,
    value: node.frontmatter.keywords || [],
  })

  createNodeField({
    name: 'redirects',
    node,
    value: node.frontmatter.redirects,
  })

  createNodeField({
    name: 'editLink',
    node,
    value: `https://github.com/khoa-le/khoaln.com/edit/main${contentFilePath.replace(
      __dirname,
      '',
    )}`,
  })

  createNodeField({
    name: 'historyLink',
    node,
    value: `https://github.com/khoa-le/khoaln.com/commits/main${contentFilePath.replace(
      __dirname,
      '',
    )}`,
  })

  createNodeField({
    name: 'noFooter',
    node,
    value: isWriting ? false : node.frontmatter.noFooter || false,
  })

  createNodeField({
    name: 'isWriting',
    node,
    value: isWriting,
  })
}

const onPostBuild = async ({graphql}) => {
  if (process.env.gatsby_executing_command === 'develop') {
    return
  }
  
  // Create blog.json for search/other functionality
  const {data} = await graphql(`
    {
      allMdx(
        filter: {
          frontmatter: {published: {ne: false}}
          internal: {contentFilePath: {regex: "//content/blog//"}}
        }
        sort: {frontmatter: {date: DESC}}
      ) {
        nodes {
          fields {
            slug
            title
            description
          }
          frontmatter {
            date
            categories
          }
        }
      }
    }
  `)
  
  if (data?.allMdx?.nodes) {
    const blogData = data.allMdx.nodes.map(node => ({
      slug: node.fields.slug,
      title: node.fields.title,
      description: node.fields.description,
      date: node.frontmatter.date,
      categories: node.frontmatter.categories,
    }))
    
    fs.writeFileSync(
      path.join(__dirname, 'public', 'blog.json'),
      JSON.stringify(blogData, null, 2)
    )
  }
}

module.exports = {
  createPages,
  onCreateWebpackConfig,
  onCreateNode,
  onPostBuild,
}

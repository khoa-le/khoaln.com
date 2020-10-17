import React from 'react'
import {graphql} from 'gatsby'
import {css} from '@emotion/core'
import styled from '@emotion/styled'
import Markdown from 'react-markdown'
import SEO from 'components/seo'
import Layout from 'components/layout'
import Link from 'components/link'
import Container from 'components/container'
import Hero from 'components/big-hero'
import theme from '../../config/theme'
import {bpMaxMD, bpMaxSM} from '../lib/breakpoints'
import {rhythm, fonts} from '../lib/typography'

const Card = ({
  backgroundColor = '#E75248',
  image,
  title,
  description,
  link,
  big = false,
}) => (
  <Link
    to={link}
    aria-label={`View ${title}`}
    css={css`
      * {
        color: white;
        margin: 0;
      }
      display: flex;
      justify-content: space-between;
      align-items: center;
      h4 {
        font-size: 22px;
        padding: ${big ? '0 20px 0 40px' : '40px 40px 0 40px'};
      }
      p {
        padding: 20px 40px 0 40px;
        font-size: 16px;
        opacity: 0.85;
        ${bpMaxSM} {
          padding: 20px 20px 0 40px;
        }
      }
      ${bpMaxMD} {
        flex-direction: column;
        align-items: center;
        ${big &&
        `
          text-align: center;
          h4 {
            padding: 40px 40px 0 40px;
          }
          img {
            width: 100%;
          }
          p {
            padding-bottom: 40px;
          }
          `}
      }
      ${!big &&
      `
        align-items: flex-start;
        flex-direction: column; 
        img {
          margin-top: 20px;
        }
        ${bpMaxMD} {
          align-items: center;
          img {
            width: 100%;
          }
         h4 {
           padding: 40px 0 0 0;
         }
        }
      `}
      background: ${backgroundColor};
      overflow: hidden;
      border-radius: 5px;
      margin-bottom: ${big ? '20px' : '0'};
      img {
        transition: ${theme.transition.ease};
        flex-shrink: 0;
      }
      @media (hover: hover) {
        :hover:not(.touch) {
          transform: scale(1.03);
          box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.15);
        }
      }
    `}
  >
    <div>
      <h4>{title}</h4>
      {description && <p>{description}</p>}
    </div>
    <img src={image} alt={title} />
  </Link>
)

const PostTitle = styled.h3`
  margin-bottom: ${rhythm(0.3)};
  transition: ${theme.transition.ease};
  font-size: 22px;
  font-family: ${fonts.regular};
  :hover {
    color: ${theme.brand.primary};
    transition: ${theme.transition.ease};
  }
`

const Description = styled.div`
  width: 100%;
  p {
    margin-bottom: 4px;
  }
`

export default function Index({data: {allMdx}}) {
  return (
    <Layout headerColor={theme.colors.white} logo={false} hero={<Hero />}>
      <SEO />
      <Container
        css={css`
          margin-top: -20px;
          position: relative;
          background: white;
          border-radius: 5px;
          padding: 40px 80px 60px 80px;
          margin-bottom: ${rhythm(1)};
          ${bpMaxMD} {
            padding: auto;
          }
          ${bpMaxSM} {
            border-radius: 0;
          }
          h2 {
            margin-bottom: ${rhythm(1.5)};
          }
        `}
      >
        <h2>Blog</h2>
        {allMdx.edges.map(({node: post}) => (
          <div
            key={post.id}
            css={css`
              margin-bottom: 40px;
            `}
          >
            <Link
              to={post.fields.slug}
              aria-label={`View ${post.frontmatter.title}`}
            >
              <PostTitle>{post.frontmatter.title}</PostTitle>
            </Link>
            <Description>
              {post.frontmatter.description ? (
                <Markdown>{post.frontmatter.description}</Markdown>
              ) : null}
              <Link
                to={post.fields.slug}
                aria-label={`View ${post.frontmatter.title}`}
              >
                Read →
              </Link>
            </Description>
          </div>
        ))}
        <Link to="/blog" aria-label="Visit blog page">
          View all articles
        </Link>
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMdx(
      limit: 5
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {
        frontmatter: {published: {ne: false}, unlisted: {ne: true}}
        fileAbsolutePath: {regex: "//content/blog//"}
      }
    ) {
      edges {
        node {
          id
          fields {
            title
            slug
            date
          }
          parent {
            ... on File {
              sourceInstanceName
            }
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
            banner {
              childImageSharp {
                sizes(maxWidth: 720) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
            keywords
          }
        }
      }
    }
  }
`

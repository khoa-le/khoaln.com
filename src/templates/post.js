import React from 'react'
import {graphql, Link} from 'gatsby'
import {GatsbyImage, getImage} from 'gatsby-plugin-image'
import SEO from 'components/seo'
import {css} from '@emotion/react'
import Container from 'components/container'
import Layout from 'components/layout'
import Share from 'components/share'
import theme from '../../config/theme'
import config from '../../config/website'
import {bpMaxSM} from '../lib/breakpoints'
import get from 'lodash/get'

export default function PostPage({data: {site, mdx}, children}) {
  const {
    editLink,
    historyLink,
    title,
    date,
    slug,
    description,
    banner,
    bannerCredit,
    categories,
  } = mdx.fields

  const blogPostUrl = `${config.siteUrl}${slug}`
  const bannerImage = banner ? getImage(banner) : null

  return (
    <Layout
      site={site}
      frontmatter={mdx.fields}
      headerLink="/blog"
      noFooter={false}
    >
      <SEO
        frontmatter={mdx.fields}
        metaImage={get(
          mdx,
          'fields.banner.childImageSharp.gatsbyImageData.images.fallback.src'
        )}
        isBlogPost
      />

      {/* Article Header */}
      <header
        css={css`
          background: ${theme.colors.dark};
          padding: 64px 0;
          ${bpMaxSM} {
            padding: 40px 0;
          }
        `}
      >
        <Container maxWidth={720}>
          {/* Categories */}
          {categories && categories.length > 0 && (
            <div
              css={css`
                margin-bottom: 16px;
                display: flex;
                gap: 8px;
                flex-wrap: wrap;
              `}
            >
              {categories.map(cat => (
                <span
                  key={cat}
                  css={css`
                    display: inline-flex;
                    align-items: center;
                    padding: 4px 10px;
                    background: rgba(253, 186, 116, 0.15);
                    color: ${theme.colors.orange};
                    font-size: 12px;
                    font-weight: 500;
                    border-radius: ${theme.radii.full};
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                  `}
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          <h1
            css={css`
              color: ${theme.colors.white};
              font-size: 2.25rem;
              font-weight: 700;
              letter-spacing: -0.025em;
              line-height: 1.2;
              margin: 0 0 16px 0;
              ${bpMaxSM} {
                font-size: 1.75rem;
              }
            `}
          >
            {title}
          </h1>

          {description && (
            <p
              css={css`
                color: ${theme.colors.textSubtle};
                font-size: 1.125rem;
                line-height: 1.6;
                margin: 0 0 24px 0;
              `}
            >
              {description.replace(/^_|_$/g, '')}
            </p>
          )}

          <div
            css={css`
              display: flex;
              align-items: center;
              gap: 16px;
              color: ${theme.colors.textSubtle};
              font-size: 14px;
            `}
          >
            <time
              css={css`
                font-family: ${theme.fonts.mono};
              `}
            >
              {date}
            </time>
            <span>·</span>
            <span>Khoa Le</span>
          </div>
        </Container>
      </header>

      {/* Banner Image */}
      {bannerImage && (
        <div
          css={css`
            background: ${theme.colors.surfaceAlt};
            padding: 24px 0;
          `}
        >
          <Container maxWidth={900}>
            <div
              css={css`
                border-radius: ${theme.radii.lg};
                overflow: hidden;
                box-shadow: ${theme.shadows.lg};
              `}
            >
              <GatsbyImage
                image={bannerImage}
                alt={title}
                css={css`
                  width: 100%;
                `}
              />
            </div>
            {bannerCredit && (
              <p
                css={css`
                  text-align: center;
                  font-size: 12px;
                  color: ${theme.colors.textMuted};
                  margin-top: 12px;
                `}
                dangerouslySetInnerHTML={{__html: bannerCredit}}
              />
            )}
          </Container>
        </div>
      )}

      {/* Article Content */}
      <article
        css={css`
          padding: 48px 0;
        `}
      >
        <Container maxWidth={720}>
          <div
            css={css`
              font-size: 1.0625rem;
              line-height: 1.8;
              color: ${theme.colors.text};

              h2 {
                margin-top: 48px;
                margin-bottom: 16px;
                font-size: 1.5rem;
                font-weight: 600;
                color: ${theme.colors.text};
              }

              h3 {
                margin-top: 32px;
                margin-bottom: 12px;
                font-size: 1.25rem;
                font-weight: 600;
              }

              p {
                margin-bottom: 24px;
              }

              ul,
              ol {
                margin-bottom: 24px;
                padding-left: 24px;
              }

              li {
                margin-bottom: 8px;
              }

              img {
                border-radius: ${theme.radii.default};
              }

              pre {
                margin: 32px 0;
              }
            `}
          >
            {children}
          </div>
        </Container>
      </article>

      {/* Article Footer */}
      <footer
        css={css`
          border-top: 1px solid ${theme.colors.border};
          padding: 32px 0;
          background: ${theme.colors.surfaceAlt};
        `}
      >
        <Container maxWidth={720}>
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
              flex-wrap: wrap;
              gap: 16px;
              margin-bottom: 24px;
            `}
          >
            <a
              href={historyLink}
              target="_blank"
              rel="noopener noreferrer"
              css={css`
                font-size: 12px;
                font-family: ${theme.fonts.mono};
                color: ${theme.colors.textMuted};
                &:hover {
                  color: ${theme.colors.orangeDark};
                }
              `}
            >
              Last updated: {date}
            </a>

            <div
              css={css`
                display: flex;
                gap: 16px;
                font-size: 14px;
              `}
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://twitter.com/search?q=${encodeURIComponent(
                  blogPostUrl
                )}`}
              >
                Discuss on Twitter
              </a>
              <a target="_blank" rel="noopener noreferrer" href={editLink}>
                Edit on GitHub
              </a>
            </div>
          </div>

          <Share
            url={blogPostUrl}
            title={title}
            twitterHandle={config.twitterHandle}
          />

          <div
            css={css`
              margin-top: 32px;
              text-align: center;
            `}
          >
            <Link
              to="/blog"
              css={css`
                display: inline-flex;
                align-items: center;
                gap: 8px;
                padding: 12px 24px;
                background: ${theme.colors.dark};
                color: ${theme.colors.white} !important;
                font-size: 14px;
                font-weight: 500;
                border-radius: ${theme.radii.default};
                transition: ${theme.transition.fast};
                &:hover {
                  background: #1e293b;
                }
              `}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </div>
        </Container>
      </footer>
    </Layout>
  )
}

export const pageQuery = graphql`
  query ($id: String!) {
    site {
      siteMetadata {
        keywords
      }
    }
    mdx(fields: {id: {eq: $id}}) {
      fields {
        editLink
        historyLink
        isWriting
        title
        date(formatString: "MMMM DD, YYYY")
        noFooter
        description
        plainTextDescription
        author
        banner {
          childImageSharp {
            gatsbyImageData(
              width: 900
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
        bannerCredit
        slug
        keywords
        categories
      }
    }
  }
`

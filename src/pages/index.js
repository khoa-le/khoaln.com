import React from 'react'
import {graphql, Link} from 'gatsby'
import {css} from '@emotion/react'
import SEO from 'components/seo'
import Layout from 'components/layout'
import Container from 'components/container'
import theme from '../../config/theme'
import {bpMaxSM} from '../lib/breakpoints'

export default function Index({data: {allMdx}}) {
  return (
    <Layout>
      <SEO />

      {/* Hero Section */}
      <section
        css={css`
          background: ${theme.colors.dark};
          padding: 80px 0;
          ${bpMaxSM} {
            padding: 48px 0;
          }
        `}
      >
        <Container maxWidth={1024}>
          <div
            css={css`
              max-width: 640px;
            `}
          >
            <h1
              css={css`
                color: ${theme.colors.white};
                font-size: 2.5rem;
                font-weight: 700;
                letter-spacing: -0.025em;
                line-height: 1.2;
                margin: 0 0 16px 0;
                ${bpMaxSM} {
                  font-size: 1.875rem;
                }
              `}
            >
              Hi, I'm{' '}
              <span
                css={css`
                  color: ${theme.colors.orange};
                `}
              >
                Khoa Le
              </span>
            </h1>
            <p
              css={css`
                color: ${theme.colors.textSubtle};
                font-size: 1.125rem;
                line-height: 1.7;
                margin: 0;
                ${bpMaxSM} {
                  font-size: 1rem;
                }
              `}
            >
              Software engineering manager based in Vietnam. I lead a team of
              developers working on digital transformation projects and write
              about software development, leadership, and technology.
            </p>
            <div
              css={css`
                margin-top: 32px;
                display: flex;
                gap: 12px;
                ${bpMaxSM} {
                  flex-direction: column;
                }
              `}
            >
              <Link
                to="/blog"
                css={css`
                  display: inline-flex;
                  align-items: center;
                  gap: 8px;
                  padding: 12px 24px;
                  background: ${theme.colors.orangeDark};
                  color: ${theme.colors.white} !important;
                  font-size: 14px;
                  font-weight: 500;
                  border-radius: ${theme.radii.default};
                  transition: ${theme.transition.fast};
                  &:hover {
                    background: #c2410c;
                    color: ${theme.colors.white} !important;
                  }
                `}
              >
                Read the Blog
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                to="/about"
                css={css`
                  display: inline-flex;
                  align-items: center;
                  padding: 12px 24px;
                  background: transparent;
                  color: ${theme.colors.textSubtle} !important;
                  font-size: 14px;
                  font-weight: 500;
                  border-radius: ${theme.radii.default};
                  border: 1px solid rgba(255, 255, 255, 0.2);
                  transition: ${theme.transition.fast};
                  &:hover {
                    background: rgba(255, 255, 255, 0.1);
                    color: ${theme.colors.white} !important;
                  }
                `}
              >
                About Me
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Latest Posts Section */}
      <section
        css={css`
          padding: 64px 0;
        `}
      >
        <Container maxWidth={1024}>
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 32px;
            `}
          >
            <h2
              css={css`
                font-size: 1.5rem;
                font-weight: 600;
                color: ${theme.colors.text};
                margin: 0;
              `}
            >
              Latest Posts
            </h2>
            <Link
              to="/blog"
              css={css`
                font-size: 14px;
                font-weight: 500;
                color: ${theme.colors.orangeDark};
                display: flex;
                align-items: center;
                gap: 4px;
                &:hover {
                  color: ${theme.colors.orangeMid};
                }
              `}
            >
              View all
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Link>
          </div>

          <div
            css={css`
              display: grid;
              gap: 16px;
            `}
          >
            {allMdx.edges.map(({node: post}) => (
              <article key={post.id} className="card-interactive">
                <Link
                  to={post.fields.slug}
                  css={css`
                    display: block;
                    padding: 24px;
                    color: ${theme.colors.text};
                    &:hover {
                      color: ${theme.colors.text};
                    }
                  `}
                >
                  <div
                    css={css`
                      display: flex;
                      justify-content: space-between;
                      align-items: flex-start;
                      gap: 16px;
                      ${bpMaxSM} {
                        flex-direction: column;
                        gap: 8px;
                      }
                    `}
                  >
                    <div>
                      <h3
                        css={css`
                          font-size: 1.125rem;
                          font-weight: 600;
                          color: ${theme.colors.text};
                          margin: 0 0 8px 0;
                          transition: color 150ms ease;
                        `}
                      >
                        {post.frontmatter.title}
                      </h3>
                      {post.frontmatter.description && (
                        <p
                          css={css`
                            font-size: 14px;
                            color: ${theme.colors.textMuted};
                            margin: 0;
                            line-height: 1.6;
                          `}
                        >
                          {post.frontmatter.description.replace(/^_|_$/g, '')}
                        </p>
                      )}
                    </div>
                    <time
                      css={css`
                        font-size: 12px;
                        font-family: ${theme.fonts.mono};
                        color: ${theme.colors.textSubtle};
                        white-space: nowrap;
                      `}
                    >
                      {post.frontmatter.date}
                    </time>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMdx(
      limit: 5
      sort: {frontmatter: {date: DESC}}
      filter: {
        frontmatter: {published: {ne: false}, unlisted: {ne: true}}
        internal: {contentFilePath: {regex: "//content/blog//"}}
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
          frontmatter {
            title
            date(formatString: "MMM DD, YYYY")
            description
          }
        }
      }
    }
  }
`

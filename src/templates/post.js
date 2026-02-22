import React from 'react'
import {graphql, Link} from 'gatsby'
import {GatsbyImage, getImage} from 'gatsby-plugin-image'
import SEO from 'components/seo'
import {css} from '@emotion/react'
import styled from '@emotion/styled'
import Container from 'components/container'
import Layout from 'components/layout'
import theme from '../../config/theme'
import config from '../../config/website'
import {bpMaxSM} from '../lib/breakpoints'
import get from 'lodash/get'

/* ── Icons ──────────────────────────────────────────────────────────────── */
const IconTwitterX = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const IconLinkedIn = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const IconGithub = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

const IconArrowLeft = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
)

const IconExternal = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

/* ── Styled components ──────────────────────────────────────────────────── */
const Breadcrumb = styled.nav`
  background: ${theme.colors.dark};
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
`

const BreadcrumbInner = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 0;
  font-size: 13px;
  color: ${theme.colors.textSubtle};
`

const BreadcrumbLink = styled(Link)`
  color: ${theme.colors.textSubtle};
  &:hover { color: ${theme.colors.orange}; }
`

const PostHeader = styled.header`
  background: ${theme.colors.dark};
  padding: 56px 0 48px;
  ${bpMaxSM} { padding: 36px 0 28px; }
`

const CategoryPills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
`

const CategoryPill = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  background: rgba(234, 88, 12, 0.12);
  color: ${theme.colors.orange};
  border: 1px solid rgba(234, 88, 12, 0.25);
  font-size: 11px;
  font-weight: 600;
  border-radius: ${theme.radii.full};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`

const PostTitle = styled.h1`
  color: ${theme.colors.white};
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin: 0 0 20px;
  ${bpMaxSM} { font-size: 1.875rem; }
`

const PostDescription = styled.p`
  color: rgba(148, 163, 184, 0.9);
  font-size: 1.125rem;
  line-height: 1.65;
  margin: 0 0 28px;
  ${bpMaxSM} { font-size: 1rem; }
`

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
`

const MetaDot = styled.span`
  color: rgba(148, 163, 184, 0.25);
  font-size: 13px;
`

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${theme.colors.textSubtle};
  font-size: 13px;
`

const AuthorAvatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: ${theme.radii.full};
  background: ${theme.colors.orangeDark};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
`

const BannerWrap = styled.div`
  background: ${theme.colors.dark};
`

const BannerInner = styled.div`
  border-radius: ${theme.radii.lg} ${theme.radii.lg} 0 0;
  overflow: hidden;
  max-height: 460px;
`

const BannerCredit = styled.p`
  text-align: center;
  font-size: 12px;
  color: ${theme.colors.textSubtle};
  padding: 8px 0 0;
  margin: 0;
`

const ArticleBody = styled.article`
  background: ${theme.colors.bg};
  padding: 56px 0 72px;
  ${bpMaxSM} { padding: 36px 0 52px; }
`

const proseStyles = css`
  font-size: 1.0625rem;
  line-height: 1.85;
  color: ${theme.colors.text};

  h2 {
    font-size: 1.625rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: ${theme.colors.text};
    margin: 3rem 0 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid ${theme.colors.border};
  }
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: ${theme.colors.text};
    margin: 2.25rem 0 0.75rem;
  }
  h4 {
    font-size: 1.0625rem;
    font-weight: 600;
    color: ${theme.colors.text};
    margin: 1.75rem 0 0.5rem;
  }
  p { margin: 0 0 1.5rem; }
  > p:first-of-type {
    font-size: 1.125rem;
    line-height: 1.75;
    color: ${theme.colors.textMuted};
  }
  a {
    color: ${theme.colors.orangeDark};
    text-decoration: underline;
    text-decoration-color: rgba(234,88,12,0.3);
    text-underline-offset: 3px;
    transition: color 100ms ease;
    &:hover {
      color: ${theme.colors.orangeMid};
      text-decoration-color: ${theme.colors.orangeMid};
    }
  }
  ul, ol {
    margin: 0 0 1.5rem;
    padding-left: 1.75rem;
  }
  li {
    margin-bottom: 0.5rem;
    &::marker { color: ${theme.colors.orange}; }
  }
  blockquote {
    border-left: 4px solid ${theme.colors.orange};
    margin: 2rem 0;
    padding: 1rem 1.5rem;
    background: ${theme.colors.orangeLight};
    border-radius: 0 ${theme.radii.default} ${theme.radii.default} 0;
    p { margin: 0; color: #7c2d12; font-style: italic; }
  }
  code {
    font-family: ${theme.fonts.mono};
    font-size: 0.85em;
    padding: 2px 7px;
    background: ${theme.colors.surfaceAlt};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.radii.sm};
    color: ${theme.colors.text};
  }
  pre {
    margin: 2rem 0;
    border-radius: ${theme.radii.default};
    border: 1px solid rgba(255,255,255,0.06);
    overflow: hidden;
    code {
      background: transparent;
      border: none;
      padding: 0;
      font-size: 0.875rem;
      line-height: 1.7;
    }
  }
  img {
    border-radius: ${theme.radii.default};
    box-shadow: ${theme.shadows.md};
    max-width: 100%;
    display: block;
    margin: 2rem auto;
  }
  hr {
    border: none;
    border-top: 1px solid ${theme.colors.border};
    margin: 3rem 0;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 2rem 0;
    font-size: 0.9rem;
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.radii.default};
    overflow: hidden;
  }
  th {
    background: ${theme.colors.surfaceAlt};
    font-weight: 600;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 10px 16px;
    text-align: left;
    border-bottom: 1px solid ${theme.colors.border};
  }
  td {
    padding: 10px 16px;
    border-bottom: 1px solid ${theme.colors.border};
    color: ${theme.colors.textMuted};
  }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: ${theme.colors.surfaceAlt}; }

  ${bpMaxSM} {
    font-size: 1rem;
    h2 { font-size: 1.375rem; }
    h3 { font-size: 1.125rem; }
  }
`

const PostFooter = styled.footer`
  background: ${theme.colors.white};
  border-top: 1px solid ${theme.colors.border};
`

const ShareRow = styled.div`
  padding: 28px 0;
  border-bottom: 1px solid ${theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  ${bpMaxSM} { flex-direction: column; align-items: flex-start; }
`

const ShareLabel = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.text};
`

const ShareButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`

const ShareBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 14px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.default};
  font-size: 13px;
  font-weight: 500;
  color: ${theme.colors.textMuted};
  background: ${theme.colors.white};
  transition: all 100ms ease;
  text-decoration: none;
  &:hover {
    border-color: ${p => p.hoverColor || theme.colors.orangeDark};
    color: ${p => p.hoverColor || theme.colors.orangeDark};
  }
`

const NavRow = styled.div`
  padding: 22px 0 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
`

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: ${theme.colors.textMuted};
  &:hover { color: ${theme.colors.orangeDark}; }
`

const MetaLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`

const MetaLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: ${theme.colors.textSubtle};
  &:hover { color: ${theme.colors.orangeDark}; }
`

/* ── Component ──────────────────────────────────────────────────────────── */
export default function PostPage({data: {site, mdx}, children}) {
  const {
    editLink,
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

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(blogPostUrl)}&via=${config.twitterHandle.replace('@', '')}`
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogPostUrl)}`
  const discussUrl = `https://twitter.com/search?q=${encodeURIComponent(blogPostUrl)}`

  return (
    <Layout site={site} frontmatter={mdx.fields} headerLink="/blog" noFooter={false}>
      <SEO
        frontmatter={mdx.fields}
        metaImage={get(mdx, 'fields.banner.childImageSharp.gatsbyImageData.images.fallback.src')}
        isBlogPost
      />

      {/* Breadcrumb */}
      <Breadcrumb>
        <Container maxWidth={720} noVerticalPadding>
          <BreadcrumbInner>
            <BreadcrumbLink to="/">Home</BreadcrumbLink>
            <span>/</span>
            <BreadcrumbLink to="/blog">Blog</BreadcrumbLink>
            {categories?.[0] && (
              <>
                <span>/</span>
                <span css={css`color: ${theme.colors.orange};`}>{categories[0]}</span>
              </>
            )}
          </BreadcrumbInner>
        </Container>
      </Breadcrumb>

      {/* Header */}
      <PostHeader>
        <Container maxWidth={720}>
          {categories?.length > 0 && (
            <CategoryPills>
              {categories.map(cat => <CategoryPill key={cat}>{cat}</CategoryPill>)}
            </CategoryPills>
          )}

          <PostTitle>{title}</PostTitle>

          {description && (
            <PostDescription>{description.replace(/^_|_$/g, '')}</PostDescription>
          )}

          <MetaRow>
            <MetaItem>
              <AuthorAvatar>KL</AuthorAvatar>
              <span css={css`font-weight: 500;`}>Khoa Le</span>
            </MetaItem>
            <MetaDot>·</MetaDot>
            <MetaItem>
              <time>{date}</time>
            </MetaItem>
          </MetaRow>
        </Container>
      </PostHeader>

      {/* Banner */}
      {bannerImage && (
        <BannerWrap>
          <Container maxWidth={900} noVerticalPadding>
            <BannerInner>
              <GatsbyImage image={bannerImage} alt={title} css={css`width: 100%; display: block;`} />
            </BannerInner>
          </Container>
          {bannerCredit && (
            <BannerCredit dangerouslySetInnerHTML={{__html: bannerCredit}} />
          )}
        </BannerWrap>
      )}

      {/* Article */}
      <ArticleBody>
        <Container maxWidth={720}>
          <div css={proseStyles}>{children}</div>
        </Container>
      </ArticleBody>

      {/* Footer */}
      <PostFooter>
        <Container maxWidth={720} noVerticalPadding>
          <ShareRow>
            <ShareLabel>Share this article</ShareLabel>
            <ShareButtons>
              <ShareBtn href={twitterUrl} target="_blank" rel="noopener noreferrer" hoverColor="#000">
                <IconTwitterX /> Share on X
              </ShareBtn>
              <ShareBtn href={linkedInUrl} target="_blank" rel="noopener noreferrer" hoverColor="#0077b5">
                <IconLinkedIn /> Share on LinkedIn
              </ShareBtn>
            </ShareButtons>
          </ShareRow>

          <NavRow>
            <BackLink to="/blog"><IconArrowLeft /> Back to Blog</BackLink>
            <MetaLinks>
              <MetaLink href={discussUrl} target="_blank" rel="noopener noreferrer">
                Discuss on X <IconExternal />
              </MetaLink>
              {editLink && (
                <MetaLink href={editLink} target="_blank" rel="noopener noreferrer">
                  <IconGithub /> Edit on GitHub
                </MetaLink>
              )}
            </MetaLinks>
          </NavRow>
        </Container>
      </PostFooter>
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

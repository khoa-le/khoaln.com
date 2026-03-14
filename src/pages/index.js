import React from 'react'
import {graphql, Link} from 'gatsby'
import {css} from '@emotion/react'
import styled from '@emotion/styled'
import SEO from 'components/seo'
import Layout from 'components/layout'
import Container from 'components/container'
import theme from '../../config/theme'
import {bpMaxSM} from '../lib/breakpoints'

/* ── Styled Components ──────────────────────────────────────────────────── */

const Hero = styled.section`
  background: ${theme.colors.dark};
  padding: 80px 0 80px;
  ${bpMaxSM} { padding: 60px 0 60px; }
`

const HeroTitle = styled.h1`
  color: ${theme.colors.white};
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin: 0 0 24px;
  max-width: 600px;
  
  span {
    color: ${theme.colors.orange};
  }

  ${bpMaxSM} { font-size: 2.25rem; }
`

const HeroSubtitle = styled.p`
  color: ${theme.colors.textSubtle};
  font-size: 1.25rem;
  line-height: 1.6;
  max-width: 580px;
  margin: 0 0 32px;
  
  strong {
    color: ${theme.colors.white};
    font-weight: 500;
  }

  ${bpMaxSM} { font-size: 1.125rem; }
`

const HeroActions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`

const PrimaryBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  background: ${theme.colors.orangeDark};
  color: white;
  font-weight: 600;
  font-size: 1rem;
  border-radius: ${theme.radii.default};
  text-decoration: none;
  transition: all 150ms ease;
  
  &:hover {
    background: #c2410c;
    color: white;
    transform: translateY(-1px);
  }
`

const SecondaryBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-weight: 500;
  font-size: 1rem;
  border-radius: ${theme.radii.default};
  text-decoration: none;
  transition: all 150ms ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    color: white;
  }
`

const LatestSection = styled.section`
  background: ${theme.colors.bg};
  padding: 80px 0;
`

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
  
  ${bpMaxSM} {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.text};
  margin: 0;
`

const ViewAllLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${theme.colors.orangeDark};
  font-weight: 600;
  font-size: 0.9375rem;
  text-decoration: none;
  
  &:hover {
    color: ${theme.colors.orangeMid};
    
    svg {
      transform: translateX(4px);
    }
  }
  
  svg {
    transition: transform 150ms ease;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 32px;
`

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.lg};
  overflow: hidden;
  text-decoration: none;
  transition: all 150ms ease;
  height: 100%;

  &:hover {
    border-color: rgba(234, 88, 12, 0.4);
    box-shadow: ${theme.shadows.md};
    transform: translateY(-2px);
    
    h3 { color: ${theme.colors.orangeDark}; }
  }
`

const CardBody = styled.div`
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
`

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 0.75rem;
  color: ${theme.colors.textMuted};
  font-family: ${theme.fonts.mono};
`

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.3;
  color: ${theme.colors.text};
  margin: 0 0 12px;
  transition: color 150ms ease;
`

const CardDesc = styled.p`
  font-size: 0.9375rem;
  color: ${theme.colors.textMuted};
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const ArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
)

/* ── Main Component ─────────────────────────────────────────────────────── */

export default function Index({data: {allMdx}}) {
  return (
    <Layout headerLink="/" noFooter={false}>
      <SEO />
      
      {/* Hero */}
      <Hero>
        <Container maxWidth={1000}>
          <HeroTitle>
            Hi, I'm <span>Khoa Le</span>.
          </HeroTitle>
          <HeroSubtitle>
            <strong>Engineering Manager</strong> based in Vietnam. <br />
            I lead developers, build AI systems, and write about software architecture and leadership.
          </HeroSubtitle>
          <HeroActions>
            <PrimaryBtn to="/blog">Read the Blog</PrimaryBtn>
            <SecondaryBtn to="/about">About Me</SecondaryBtn>
          </HeroActions>
        </Container>
      </Hero>

      {/* Latest Posts */}
      <LatestSection>
        <Container maxWidth={1000}>
          <SectionHeader>
            <SectionTitle>Latest Articles</SectionTitle>
            <ViewAllLink to="/blog">
              View all posts <ArrowIcon />
            </ViewAllLink>
          </SectionHeader>

          <Grid>
            {allMdx.edges.map(({node: post}) => (
              <Card key={post.id} to={post.fields.slug}>
                <CardBody>
                  <CardMeta>
                    <time>{post.frontmatter.date}</time>
                    {post.frontmatter.categories?.[0] && (
                      <>
                        <span>•</span>
                        <span css={css`color: ${theme.colors.orange}; font-weight: 600;`}>
                          {post.frontmatter.categories[0].toUpperCase()}
                        </span>
                      </>
                    )}
                  </CardMeta>
                  <CardTitle>{post.frontmatter.title}</CardTitle>
                  <CardDesc>
                    {post.frontmatter.description || post.excerpt}
                  </CardDesc>
                </CardBody>
              </Card>
            ))}
          </Grid>
        </Container>
      </LatestSection>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMdx(
      limit: 6
      sort: {frontmatter: {date: DESC}}
      filter: {
        frontmatter: {published: {ne: false}}
        internal: {contentFilePath: {regex: "//content/blog//"}}
      }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
            categories
          }
          excerpt(pruneLength: 150)
        }
      }
    }
  }
`

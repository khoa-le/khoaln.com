import React from 'react'
import {Helmet} from 'react-helmet'
import {graphql, useStaticQuery} from 'gatsby'
import {MDXProvider} from '@mdx-js/react'
import {Global, css, ThemeProvider} from '@emotion/react'
import Header from './header'
import Footer from './footer'
import mdxComponents from './mdx'
import theme from '../../config/theme'
import config from '../../config/website'

export const globalStyles = css`
  /* Reset & Base */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    scrollbar-gutter: stable;
  }

  body {
    margin: 0;
    background-color: ${theme.colors.bg};
    color: ${theme.colors.text};
    font-family: ${theme.fonts.body};
    font-feature-settings: 'kern' 1, 'liga' 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Selection */
  ::selection {
    background-color: ${theme.colors.selection};
    color: #7c2d12;
  }

  /* Links */
  a {
    color: ${theme.colors.orangeDark};
    text-decoration: none;
    transition: color 150ms ease;
  }

  a:hover {
    color: ${theme.colors.orangeMid};
  }

  /* Buttons */
  button {
    font-family: ${theme.fonts.body};
    font-size: 14px;
    font-weight: 500;
    border-radius: ${theme.radii.default};
    background-color: ${theme.colors.dark};
    border: 1px solid ${theme.colors.dark};
    color: ${theme.colors.white};
    padding: 8px 16px;
    cursor: pointer;
    transition: ${theme.transition.fast};
  }

  button:hover:not(:disabled) {
    background: #1e293b;
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Button variants */
  .btn-primary {
    background-color: ${theme.colors.dark};
    border-color: ${theme.colors.dark};
    color: ${theme.colors.white};
  }

  .btn-accent {
    background-color: ${theme.colors.orangeDark};
    border-color: ${theme.colors.orangeDark};
    color: ${theme.colors.white};
  }

  .btn-accent:hover {
    background-color: #c2410c;
  }

  .btn-secondary {
    background-color: ${theme.colors.white};
    border-color: ${theme.colors.border};
    color: ${theme.colors.text};
  }

  .btn-secondary:hover {
    background-color: ${theme.colors.bg};
  }

  /* Forms */
  input,
  textarea {
    font-family: ${theme.fonts.body};
    border-radius: ${theme.radii.default};
    border: 1px solid ${theme.colors.border};
    padding: 10px 14px;
    font-size: 14px;
    box-shadow: ${theme.shadows.sm};
    transition: ${theme.transition.fast};
  }

  input:focus,
  textarea:focus {
    outline: none;
    border-color: ${theme.colors.orange};
    box-shadow: 0 0 0 3px rgba(253, 186, 116, 0.2);
  }

  input::placeholder,
  textarea::placeholder {
    color: ${theme.colors.textSubtle};
  }

  /* Code */
  code {
    font-family: ${theme.fonts.mono};
    font-size: 0.875em;
    padding: 2px 6px;
    background: ${theme.colors.surfaceAlt};
    color: ${theme.colors.text};
    border-radius: 4px;
  }

  pre {
    background-color: ${theme.colors.dark};
    border-radius: ${theme.radii.default};
    font-size: 14px;
    padding: 16px;
    overflow-x: auto;
  }

  pre code {
    background: transparent;
    padding: 0;
    color: #e2e8f0;
  }

  /* Code highlighting */
  .highlight-line {
    background-color: rgba(253, 186, 116, 0.15);
    margin: 0 -16px;
    padding: 0 12px;
    border-left: 4px solid ${theme.colors.orange};
  }

  /* Headings anchor */
  h1 .anchor svg,
  h2 .anchor svg,
  h3 .anchor svg,
  h4 .anchor svg,
  h5 .anchor svg,
  h6 .anchor svg {
    position: absolute;
    left: -24px;
    height: 100%;
    width: 20px;
    transition: opacity 0.2s;
    opacity: 0;
    fill: ${theme.colors.orange};
  }

  h1:hover .anchor svg,
  h2:hover .anchor svg,
  h3:hover .anchor svg,
  h4:hover .anchor svg,
  h5:hover .anchor svg,
  h6:hover .anchor svg {
    opacity: 1;
  }

  /* HR */
  hr {
    margin: 48px 0;
    border: none;
    border-top: 1px solid ${theme.colors.border};
    background: none;
  }

  /* Blockquote */
  blockquote {
    border-left: 4px solid ${theme.colors.orange};
    padding-left: 20px;
    margin-left: 0;
    color: ${theme.colors.textMuted};
  }

  /* Images */
  .gatsby-resp-image-image {
    background: none !important;
    box-shadow: none !important;
    border-radius: ${theme.radii.default};
  }

  /* Cards utility */
  .card {
    background: ${theme.colors.white};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.radii.default};
    box-shadow: ${theme.shadows.sm};
  }

  .card-interactive {
    background: ${theme.colors.white};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.radii.default};
    box-shadow: ${theme.shadows.sm};
    transition: ${theme.transition.ease};
  }

  .card-interactive:hover {
    border-color: rgba(253, 186, 116, 0.5);
    box-shadow: ${theme.shadows.md};
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.border};
    border-radius: 9999px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.textSubtle};
  }
`

function Layout({
  headerLink,
  siteTitle = 'Khoa Le',
  frontmatter = {},
  children,
  noFooter,
  maxWidth = 720,
}) {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
          author {
            name
          }
          keywords
        }
      }
    }
  `)

  const {
    site: {
      siteMetadata,
      siteMetadata: {description: siteDescription, keywords: siteKeywords},
    },
  } = data

  const {
    keywords = siteKeywords,
    description = siteDescription,
    title = config.siteTitle,
  } = frontmatter

  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <Helmet
        title={title}
        meta={[
          {name: 'description', content: description},
          {name: 'keywords', content: keywords.join()},
        ]}
      >
        <html lang="en" />
        <noscript>This site runs best with JavaScript enabled.</noscript>
      </Helmet>

      <div
        css={css`
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: ${theme.colors.bg};
        `}
      >
        <Header siteTitle={siteTitle} headerLink={headerLink || '/'} />

        <main
          css={css`
            flex: 1 0 auto;
          `}
        >
          <MDXProvider components={mdxComponents}>{children}</MDXProvider>
        </main>

        {!noFooter && (
          <Footer
            maxWidth={maxWidth}
            author={siteMetadata.author.name}
          />
        )}
      </div>
    </ThemeProvider>
  )
}

export default Layout

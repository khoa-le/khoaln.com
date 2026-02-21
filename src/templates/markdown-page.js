import React from 'react'
import Container from 'components/container'
import SEO from 'components/seo'
import Layout from 'components/layout'

import {css} from '@emotion/react'
import {bpMaxSM} from 'lib/breakpoints'

function MarkdownPage({children, pageContext: {frontmatter}}) {
  return (
    <>
      <SEO frontmatter={frontmatter} />
      <Layout
        noFooter={frontmatter.noFooter}
        frontmatter={frontmatter}
      >
        <Container
          maxWidth={frontmatter.maxWidth}
          css={css`
            ${bpMaxSM} {
              padding: 20px
                ${frontmatter.noMobileHorizontalPadding ? 0 : '20'}px;
            }
          `}
        >
          {children}
        </Container>
      </Layout>
    </>
  )
}

export default MarkdownPage

import React from 'react'
import {css} from '@emotion/react'
import {Link} from 'gatsby'
import Container from './container'
import theme from '../../config/theme'
import config from '../../config/website'

function Footer({author, maxWidth}) {
  return (
    <footer
      css={css`
        background: ${theme.colors.dark};
        padding: 48px 0;
        margin-top: auto;
      `}
    >
      <Container maxWidth={maxWidth}>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 24px;
          `}
        >
          {/* Brand */}
          <div
            css={css`
              display: flex;
              align-items: center;
              gap: 10px;
            `}
          >
            <div
              css={css`
                width: 32px;
                height: 32px;
                background: ${theme.colors.orange};
                border-radius: ${theme.radii.default};
                display: flex;
                align-items: center;
                justify-content: center;
              `}
            >
              <span
                css={css`
                  color: ${theme.colors.orangeDark};
                  font-family: ${theme.fonts.mono};
                  font-weight: 700;
                  font-size: 14px;
                `}
              >
                KL
              </span>
            </div>
            <span
              css={css`
                color: ${theme.colors.white};
                font-weight: 600;
                font-size: 14px;
              `}
            >
              {author}
            </span>
          </div>

          {/* Links */}
          <nav
            css={css`
              display: flex;
              gap: 24px;
            `}
          >
            <FooterLink href={config.github}>GitHub</FooterLink>
            <FooterLink href={config.linkedin}>LinkedIn</FooterLink>
            <FooterLink href={config.rss}>RSS</FooterLink>
          </nav>
        </div>

        <div
          css={css`
            margin-top: 32px;
            padding-top: 24px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 16px;
          `}
        >
          <p
            css={css`
              color: ${theme.colors.textSubtle};
              font-size: 12px;
              margin: 0;
            `}
          >
            © {new Date().getFullYear()} {author}. All rights reserved.
          </p>

          <nav
            css={css`
              display: flex;
              gap: 16px;
            `}
          >
            <Link
              to="/blog"
              css={css`
                color: ${theme.colors.textSubtle};
                font-size: 12px;
                &:hover {
                  color: ${theme.colors.orange};
                }
              `}
            >
              Blog
            </Link>
            <Link
              to="/about"
              css={css`
                color: ${theme.colors.textSubtle};
                font-size: 12px;
                &:hover {
                  color: ${theme.colors.orange};
                }
              `}
            >
              About
            </Link>
          </nav>
        </div>
      </Container>
    </footer>
  )
}

function FooterLink({href, children}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      css={css`
        color: ${theme.colors.textSubtle};
        font-size: 14px;
        transition: color 150ms ease;
        &:hover {
          color: ${theme.colors.orange};
        }
      `}
    >
      {children}
    </a>
  )
}

export default Footer

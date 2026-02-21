import React from 'react'
import {Link} from 'gatsby'
import {css} from '@emotion/react'
import Container from './container'
import theme from '../../config/theme'
import MobileNav from './mobile-nav'
import {bpMaxSM} from '../lib/breakpoints'

function Header({siteTitle = 'Khoa Le', headerLink = '/'}) {
  return (
    <header
      css={css`
        background: ${theme.colors.dark};
        position: sticky;
        top: 0;
        z-index: 50;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      `}
    >
      <Container
        maxWidth={1280}
        noVerticalPadding
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 56px;
          padding-top: 0;
          padding-bottom: 0;
        `}
      >
        {/* Logo */}
        <Link
          to={headerLink}
          aria-label="Go home"
          css={css`
            display: flex;
            align-items: center;
            gap: 10px;
            color: ${theme.colors.white};
            text-decoration: none;
            &:hover {
              color: ${theme.colors.white};
            }
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
              font-weight: 600;
              font-size: 14px;
              ${bpMaxSM} {
                display: none;
              }
            `}
          >
            {siteTitle}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          css={css`
            display: flex;
            align-items: center;
            gap: 4px;
            ${bpMaxSM} {
              display: none;
            }
          `}
        >
          <NavLink to="/blog" activeClassName="active">
            Blog
          </NavLink>
          <NavLink to="/about" activeClassName="active">
            About
          </NavLink>
        </nav>

        {/* Mobile Navigation */}
        <div
          css={css`
            display: none;
            ${bpMaxSM} {
              display: block;
            }
          `}
        >
          <MobileNav color={theme.colors.white} />
        </div>
      </Container>
    </header>
  )
}

function NavLink({to, children, activeClassName, ...props}) {
  return (
    <Link
      to={to}
      activeClassName={activeClassName}
      css={css`
        display: inline-flex;
        align-items: center;
        padding: 8px 12px;
        font-size: 14px;
        font-weight: 500;
        color: ${theme.colors.textSubtle};
        border-radius: 6px;
        transition: ${theme.transition.fast};
        text-decoration: none;

        &:hover {
          color: ${theme.colors.white};
          background: rgba(255, 255, 255, 0.1);
        }

        &.active {
          color: ${theme.colors.orange};
          background: rgba(255, 255, 255, 0.1);
        }
      `}
      {...props}
    >
      {children}
    </Link>
  )
}

export default Header

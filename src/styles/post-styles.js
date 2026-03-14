import {css} from '@emotion/react'
import theme from '../../config/theme'
import {bpMaxSM} from '../lib/breakpoints'

export const proseStyles = css`
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
  /* Wrap tables in scrollable container on mobile */
  .table-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin: 2rem 0;
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.radii.default};
  }
  .table-wrapper table {
    margin: 0;
    border: none;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 2rem 0;
    font-size: 0.9rem;
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.radii.default};
    overflow: hidden;
    display: table;
    min-width: 500px;
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

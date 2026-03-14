import React from 'react'
import styled from '@emotion/styled'
import {css} from '@emotion/react'
import theme from '../../config/theme'
import {bpMaxSM} from '../lib/breakpoints'

const TOCWrapper = styled.div`
  position: sticky;
  top: 100px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  padding-left: 20px;
  border-left: 1px solid ${theme.colors.border};
  
  ${bpMaxSM} {
    position: static;
    border-left: none;
    padding-left: 0;
    margin-bottom: 40px;
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.radii.default};
    padding: 20px;
    background: ${theme.colors.surfaceAlt};
  }
`

const TOCHeader = styled.h4`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 700;
  color: ${theme.colors.textSubtle};
  margin: 0 0 16px;
`

const TOCList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const TOCItem = styled.li`
  margin: 0 0 8px;
  font-size: 0.875rem;
  line-height: 1.4;
  padding-left: ${p => (p.depth - 1) * 12}px;
  
  a {
    color: ${theme.colors.textMuted};
    text-decoration: none;
    transition: color 100ms ease;
    
    &:hover {
      color: ${theme.colors.orangeDark};
    }
  }
`

function renderItems(items) {
  return (
    <TOCList>
      {items.map(item => (
        <React.Fragment key={item.url}>
          <TOCItem depth={item.items ? 0 : 1}>
            <a href={item.url}>{item.title}</a>
          </TOCItem>
          {item.items && item.items.map(subItem => (
             <TOCItem key={subItem.url} depth={2}>
               <a href={subItem.url}>{subItem.title}</a>
             </TOCItem>
          ))}
        </React.Fragment>
      ))}
    </TOCList>
  )
}

function TableOfContents({ items }) {
  if (!items || items.length === 0) return null

  return (
    <TOCWrapper>
      <TOCHeader>Table of Contents</TOCHeader>
      {renderItems(items)}
    </TOCWrapper>
  )
}

export default TableOfContents

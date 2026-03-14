import React from 'react'
import {css} from '@emotion/react'
import {Highlight, themes} from 'prism-react-renderer'
import theme from '../../config/theme'
import {bpDesktopOnly} from '../../lib/breakpoints'

const prismTheme = themes.nightOwl

const RE = /{([\d,-]+)}/

const wrapperStyles = css`
  margin: 2rem 0;
  border-radius: ${theme.radii.default};
  overflow: hidden;
  background: #011627; /* Night Owl bg */
  box-shadow: ${theme.shadows.lg};
`

const headerStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background: #0d2137; /* Slightly lighter than code bg */
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-family: ${theme.fonts.mono};
  font-size: 0.75rem;
  color: ${theme.colors.textSubtle};
`

const langStyles = css`
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
`

const copyBtnStyles = css`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: ${theme.colors.textSubtle};
  font-size: 0.75rem;
  padding: 4px 8px;
  cursor: pointer;
  transition: ${theme.transition.fast};
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: ${theme.colors.white};
    border-color: rgba(255, 255, 255, 0.4);
  }
`

const preStyles = css`
  float: left;
  min-width: 100%;
  overflow: initial;
  margin: 0;
  padding: 20px;
  font-family: ${theme.fonts.mono};
  font-size: 0.9rem;
  line-height: 1.6;
`

function calculateLinesToHighlight(meta) {
  if (RE.test(meta)) {
    const lineNumbers = RE.exec(meta)[1]
      .split(',')
      .map(v => v.split('-').map(y => parseInt(y, 10)))
    return index => {
      const lineNumber = index + 1
      const inRange = lineNumbers.some(([start, end]) =>
        end ? lineNumber >= start && lineNumber <= end : lineNumber === start,
      )
      return inRange
    }
  } else {
    return () => false
  }
}

function Code({codeString, language, metastring}) {
  const [copied, setCopied] = React.useState(false)
  const shouldHighlightLine = calculateLinesToHighlight(metastring)

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div css={wrapperStyles}>
      <div css={headerStyles}>
        <span css={langStyles}>{language}</span>
        <button css={copyBtnStyles} onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div css={css`overflow-x: auto; -webkit-overflow-scrolling: touch;`}>
        <Highlight
          code={codeString}
          language={language || 'text'}
          theme={prismTheme}
        >
          {({className, style, tokens, getLineProps, getTokenProps}) => (
            <pre className={className} style={{...style, backgroundColor: 'transparent'}} css={preStyles}>
              {tokens.map((line, i) => (
                <div
                  key={i}
                  {...getLineProps({
                    line,
                    key: i,
                    className: shouldHighlightLine(i) ? 'highlight-line' : '',
                  })}
                >
                  <span
                    css={css`
                      display: inline-block;
                      width: 2em;
                      user-select: none;
                      opacity: 0.3;
                      text-align: right;
                      padding-right: 1em;
                    `}
                  >
                    {i + 1}
                  </span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({token, key})} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  )
}

export default Code

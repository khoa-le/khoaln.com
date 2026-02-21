import React from 'react'
import Title from './title'
import Subtitle from './subtitle'
import SmallTitle from './small-title'
import Paragraph from './paragraph'
import List from './list'
import Code from './code'

function preToCodeBlock(preProps) {
  if (
    preProps?.children?.props &&
    preProps.children.props.mdxType === 'code'
  ) {
    const { children: codeString, className = '', ...props } = preProps.children.props
    const matches = className.match(/language-(?<lang>.*)/)
    return {
      codeString: codeString.trim(),
      className,
      language: matches?.groups?.lang || '',
      ...props,
    }
  }
}

export default {
  h1: props => <Title {...props} />,
  h2: props => <Subtitle {...props} />,
  h3: props => <SmallTitle {...props} />,
  p: props => <Paragraph {...props} />,
  ul: props => <List {...props} />,
  pre: preProps => {
    const props = preToCodeBlock(preProps)
    if (props) return <Code {...props} />
    return <pre {...preProps} />
  },
}

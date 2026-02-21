import React from 'react'
import {css} from '@emotion/react'

function FourOFour() {
  return (
    <div
      css={css`
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        padding: 20px;
        text-align: center;
      `}
    >
      <h1>404 - NOT FOUND</h1>
      <p>{`You just hit a route that doesn't exist... the sadness.`}</p>
      <a href="/">Go home</a>
    </div>
  )
}

export default FourOFour

import React from 'react'

export const onRenderBody = ({setHeadComponents}) => {
  setHeadComponents([
    // Google Fonts - Inter + JetBrains Mono
    <link
      key="preconnect-fonts-google"
      rel="preconnect"
      href="https://fonts.googleapis.com"
    />,
    <link
      key="preconnect-fonts-gstatic"
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />,
    <link
      key="google-fonts"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
      rel="stylesheet"
    />,
  ])
}

import Typography from 'typography'

/**
 * Turbopuffer-inspired Typography
 * Fonts: Inter (body) + JetBrains Mono (code)
 */
const typography = new Typography({
  baseFontSize: '16px',
  baseLineHeight: 1.65,
  scaleRatio: 2.25,
  headerFontFamily: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
  bodyFontFamily: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
  headerWeight: 600,
  bodyWeight: 400,
  boldWeight: 600,
  headerColor: '#0f172a',
  bodyColor: '#0f172a',
  overrideStyles: ({rhythm}) => ({
    html: {
      scrollbarGutter: 'stable',
    },
    body: {
      fontFeatureSettings: '"kern" 1, "liga" 1',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    '::selection': {
      backgroundColor: '#fed7aa',
      color: '#7c2d12',
    },
    a: {
      color: '#ea580c',
      textDecoration: 'none',
      transition: 'color 150ms ease',
    },
    'a:hover': {
      color: '#f97316',
    },
    h1: {
      letterSpacing: '-0.025em',
      fontWeight: 700,
    },
    h2: {
      letterSpacing: '-0.02em',
      fontWeight: 600,
    },
    h3: {
      letterSpacing: '-0.015em',
      fontWeight: 600,
    },
    'h4, h5, h6': {
      fontWeight: 600,
    },
    'code, pre': {
      fontFamily: "'JetBrains Mono', 'Menlo', monospace",
    },
    code: {
      fontSize: '0.875em',
      backgroundColor: '#f1f5f9',
      padding: '0.125em 0.25em',
      borderRadius: '0.25rem',
      color: '#0f172a',
    },
    'pre code': {
      backgroundColor: 'transparent',
      padding: 0,
    },
    blockquote: {
      borderLeft: '4px solid #fdba74',
      paddingLeft: rhythm(0.75),
      marginLeft: 0,
      fontStyle: 'normal',
      color: '#64748b',
    },
    hr: {
      background: '#cbd5e1',
      height: '1px',
      border: 'none',
    },
    // Scrollbar styling
    '::-webkit-scrollbar': {
      width: '8px',
      height: '8px',
    },
    '::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '::-webkit-scrollbar-thumb': {
      background: '#cbd5e1',
      borderRadius: '9999px',
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: '#94a3b8',
    },
  }),
})

const {rhythm, scale} = typography

export {rhythm, scale}
export default typography

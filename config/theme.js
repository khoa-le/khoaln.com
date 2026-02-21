/**
 * Turbopuffer-inspired Design System
 * Based on: https://turbopuffer.com
 */

const colors = {
  // Backgrounds
  bg: '#f8fafc',
  surface: '#ffffff',
  surfaceAlt: '#f1f5f9',
  dark: '#0f172a',
  darkCard: '#09090b',
  
  // Text
  text: '#0f172a',
  textMuted: '#64748b',
  textSubtle: '#94a3b8',
  white: '#ffffff',
  
  // Orange Accent (Primary)
  orange: '#fdba74',
  orangeDark: '#ea580c',
  orangeMid: '#f97316',
  orangeLight: '#fff7ed',
  
  // Borders
  border: '#cbd5e1',
  borderStrong: '#94a3b8',
  
  // Selection
  selection: '#fed7aa',
  
  // Legacy compatibility
  primary: '#0f172a',
  primary_light: '#f1f5f9',
  link_color: '#ea580c',
  link_color_hover: '#f97316',
  body_color: '#0f172a',
  green: '#ea580c', // Use orange for CTAs
  gray: '#cbd5e1',
}

const theme = {
  colors,
  brand: {
    primary: colors.orangeDark,
  },
  fonts: {
    body: "'Inter', system-ui, -apple-system, sans-serif",
    heading: "'Inter', system-ui, -apple-system, sans-serif",
    mono: "'JetBrains Mono', 'Menlo', monospace",
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  radii: {
    sm: '0.25rem',
    default: '0.5rem',
    lg: '0.75rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    default: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  },
  transition: {
    ease: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    fast: 'all 100ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  // Legacy compatibility
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
}

module.exports = theme

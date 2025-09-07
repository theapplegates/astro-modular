
import { siteConfig } from './src/config.ts';
import { themes } from './src/themes/index.ts';

// Get the selected theme
const selectedTheme = themes[siteConfig.theme] || themes.minimal;

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
        'heading': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
      },
      colors: {
        // Dynamic theme colors based on config
        primary: selectedTheme.primary,
        highlight: selectedTheme.highlight
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            p: {
              marginTop: '1.25em',
              marginBottom: '1.25em',
            },
            'h1, h2, h3, h4, h5, h6': {
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontWeight: '600',
              scrollMarginTop: '2rem',
            },
            a: {
              color: siteConfig.theme === 'oxygen' ? '#0ea5e9' : '#708794',
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                color: siteConfig.theme === 'oxygen' ? '#0284c7' : '#5a6d77',
                textDecoration: 'underline',
              }
            },
            code: {
              color: 'inherit',
              backgroundColor: 'rgb(248 250 252 / 0.8)',
              borderRadius: '0.375rem',
              padding: '0.125rem 0.375rem',
              fontSize: '0.875em',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#1e293b',
              borderRadius: '0.5rem',
              padding: '1rem',
              overflow: 'auto',
              fontSize: '0.875em',
              lineHeight: '1.7142857',
            },
            'pre code': {
              backgroundColor: 'transparent',
              borderWidth: '0',
              borderRadius: '0',
              padding: '0',
              fontWeight: 'inherit',
              color: 'inherit',
              fontSize: 'inherit',
              fontFamily: 'inherit',
              lineHeight: 'inherit',
            },
            blockquote: {
              fontWeight: '400',
              fontStyle: 'normal',
              color: 'inherit',
              borderLeftWidth: '0.25rem',
              borderLeftColor: '#e2e8f0',
              quotes: '"\\201C""\\201D""\\2018""\\2019"',
              marginTop: '1.6em',
              marginBottom: '1.6em',
              paddingLeft: '1em',
            },
            'blockquote p:first-of-type::before': {
              content: '""',
            },
            'blockquote p:last-of-type::after': {
              content: '""',
            },
          }
        },
        dark: {
          css: {
            color: '#e2e8f0',
            code: {
              backgroundColor: 'rgb(30 41 59 / 0.8)',
            },
            blockquote: {
              borderLeftColor: '#475569',
              color: '#94a3b8',
            },
          }
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        },
        '.text-selection-highlight': {
          '::selection': {
            backgroundColor: siteConfig.theme === 'oxygen' ? '#0ea5e9' : '#708794',
            color: '#ffffff'
          },
          '::-moz-selection': {
            backgroundColor: siteConfig.theme === 'oxygen' ? '#0ea5e9' : '#708794',
            color: '#ffffff'
          }
        }
      })
    }
  ],
}

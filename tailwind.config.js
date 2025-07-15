/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Nord color scheme
        nord: {
          // Polar Night
          0: '#2E3440',
          1: '#3B4252',
          2: '#434C5E',
          3: '#4C566A',
          // Snow Storm
          4: '#D8DEE9',
          5: '#E5E9F0',
          6: '#ECEFF4',
          // Frost
          7: '#8FBCBB',
          8: '#88C0D0',
          9: '#81A1C1',
          10: '#5E81AC',
          // Aurora
          11: '#BF616A',
          12: '#D08770',
          13: '#EBCB8B',
          14: '#A3BE8C',
          15: '#B48EAD',
        },
        // Semantic color mapping from Jekyll config
        background: {
          dark: '#2E3440',
          darker: '#3B4252',
        },
        text: {
          primary: '#ECEFF4',
          secondary: '#D8DEE9',
        },
        primary: '#88C0D0',
        secondary: '#A3BE8C',
        tertiary: '#EBCB8B',
        alert: '#BF616A',
        links: '#5E81AC',
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
      },
      typography: {
        nord: {
          css: {
            '--tw-prose-body': '#ECEFF4',
            '--tw-prose-headings': '#ECEFF4',
            '--tw-prose-lead': '#D8DEE9',
            '--tw-prose-links': '#5E81AC',
            '--tw-prose-bold': '#ECEFF4',
            '--tw-prose-counters': '#88C0D0',
            '--tw-prose-bullets': '#88C0D0',
            '--tw-prose-hr': '#434C5E',
            '--tw-prose-quotes': '#D8DEE9',
            '--tw-prose-quote-borders': '#434C5E',
            '--tw-prose-captions': '#D8DEE9',
            '--tw-prose-code': '#EBCB8B',
            '--tw-prose-pre-code': '#ECEFF4',
            '--tw-prose-pre-bg': '#3B4252',
            '--tw-prose-th-borders': '#434C5E',
            '--tw-prose-td-borders': '#434C5E',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
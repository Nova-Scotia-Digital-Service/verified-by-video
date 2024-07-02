const palette = {
  white: '#FFFFFF',
  offWhite: '#F1F6FA',
  black: '#000000',
  offBlack: '#273645',
  navy: '#0E2A59',
  slate: '#C8D0DD',
  lightYellow: '#FFFAD4',
  yellow: '#E2CF51',
  darkYellow: '#764615',
}

/* eslint-disable no-undef */
module.exports = {
  content: ['./public/*.html', './src/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      sxl: '1242px',
      xl: '1440px',
    },
    colors: {
      black: palette.black,
      white: palette.white,
      'off-white': palette.offWhite,
      slate: palette.slate,
      background: palette.white,
      text: palette.navy,
      title: palette.offBlack,
      link: palette.offBlack,
      'primary-background': palette.navy,
      'primary-text': palette.white,
      'header-background': palette.navy,
      'header-text': palette.white,
      'warning-background': palette.lightYellow,
      'warning-text': palette.darkYellow,
      'warning-border': palette.yellow,
      'input-background': palette.offWhite,
      'input-text': palette.black,
    },
    fontFamily: {
      sans: ['Lato', 'Calibri', 'Arial', 'sans-serif'],
    },
    extend: {
      boxShadow: {
        input: 'inset 0px 0px 0px 1px rgba(0, 0, 0, 0.25)',
      },
      minWidth: {
        min: '420px',
      },
    },
  },
}

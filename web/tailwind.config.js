const palette = {
  white: '#FFFFFF',
  offWhite: '#F1F6FA',
  black: '#000000',
  offBlack: '#273645',
  navy: '#0E2A59',
  slate: '#C8D0DD',
}

/* eslint-disable no-undef */
module.exports = {
  content: ['./public/*.html', './src/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    minWidth: {
      min: '420px',
    },
    container: {
      center: true,
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
      slate: palette.slate,
      background: palette.white,
      text: palette.navy,
      'primary-background': palette.navy,
      'primary-text': palette.white,
      'header-background': palette.navy,
    },
    fontFamily: {
      sans: ['Lato', 'Calibri', 'Arial', 'sans-serif'],
    },
  },
}

const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        card: '#ffffff',
        btnPrimary: '#F49E4C',
        btnSecundary: '#02DBDB',
        btnThird: '#00A6ED',
        headTable: '#d1dbe6',
      },
      textColor: {
        primaryText: '#ffffff',
        secundaryText: '#000000',
      },
      fontFamily: {
        openSans: ['Open Sans', 'sans-serif'],
      },
      screens: {
        'mobile': '640px',
      }
    },
  },
  plugins: [],
});

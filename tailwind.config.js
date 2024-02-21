const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        nav: '#3063F0',
        card: '#ffffff',
        btnCard: '#F49E4C',
        history: '#CCE477',
      },
      textColor: {
        primaryText: '#ffffff',
        secundaryText: '#000000',
        cardText: '#000000',
      },
      boders: {
        cardBorder: '#fff275',
      },
      hovers: {
        hight: '#32936f',
      },
      fontFamily: {
        openSans: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
});

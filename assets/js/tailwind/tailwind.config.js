tailwind.config = {
  theme: {
    extend: {
      colors: {
        black: {
          primary: '#212121',
        },
        white: {
          primary: '#f8f8f8',
          secondary: '#f0f0f0',
        },
        gray: {
          primary: '#c8d3dd',
          secondary: '#D1D5DB',
          tertiary: '#e7ecf1ea',
        },
        blue: {
          primary: '#0369A1',
          secondary: '#1c78aa8a',
          tertiary: '#3587b3',
        },
        green: {
          primary: '#10b981',
        },
        red: {
          primary: '#ef4444',
        },
        log: {
          error: '#f7643d',
          success: '#79d246',
          info: '#fe9a01',
        },
      },
      maxWidth: {
        '1/5': '20%',
      },
      height: {
        500: '500px',
      },
      boxShadow: {
        primary: '0px 2px 8px 0px rgba(99, 99, 99, 0.2)',
      },
      margin: {
        primary: '20%',
      },
      fontSize: {
        xxs: '10px',
      },
    },
  },
};

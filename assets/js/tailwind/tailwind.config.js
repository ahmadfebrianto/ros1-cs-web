tailwind.config = {
  theme: {
    extend: {
      colors: {
        black: {
          primary: '#212121',
        },
        white: {
          primary: '#f6f6f6',
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
      },
      maxWidth: {
        '1/5': '20%',
      },
      height: {
        500: '500px',
      },
      boxShadow: {
        'primary': '0px 2px 8px 0px rgba(99, 99, 99, 0.2)',
      },
    },
  },
};

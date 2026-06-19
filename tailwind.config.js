/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf6f0', 100: '#faeade', 200: '#f4d2b8', 300: '#edb68c',
          400: '#e4925e', 500: '#dd7a3e', 600: '#cf6233', 700: '#ac4d2b',
          800: '#8a3f29', 900: '#703524',
        },
        warm: {
          50: '#fefbf6', 100: '#fdf5e9', 200: '#fbe8cc', 300: '#f7d5a3',
          400: '#f2ba70', 500: '#eca044', 600: '#de8530', 700: '#b96826',
          800: '#945325', 900: '#784521',
        },
        romantic: {
          50: '#fef1f7', 100: '#fee5f0', 200: '#ffcce4', 300: '#ffa1cb',
          400: '#ff6da7', 500: '#fa3a82', 600: '#ea1b5e', 700: '#cc0d44',
          800: '#a80f3a', 900: '#8c1234',
        },
        forest: {
          50: '#f0f9f4', 100: '#dbf0e3', 200: '#b9e1ca', 300: '#89c9a7',
          400: '#57ac80', 500: '#359066', 600: '#257451', 700: '#1e5d42',
          800: '#1a4a36', 900: '#163d2e',
        },
      },
      fontFamily: {
        display: ['Georgia', 'Cambria', 'serif'],
        body: ['"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

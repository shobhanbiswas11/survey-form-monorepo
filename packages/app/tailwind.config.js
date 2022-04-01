const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: colors.violet[200],
          main: colors.violet[500],
          dark: colors.violet[700],
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  variants: {
    extend: {
      borderColor: ["focus-visible", "first"],
    },
  },
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Nunito: ["Nunito"],
        Roboto: ["Roboto"],
      },
    },
  },
  plugins: [],
};

// eslint-disable-next-line import/no-unresolved
import flowbite from "flowbite-react/tailwind";
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        primary: "#EB5757",
      },
      fontSize: {
        small: "14px",
        normal: "16px",
        heading: "36px",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(30px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
      },
    },
  },
  plugins: [
    /* eslint-disable global-require */
    require("flowbite/plugin"),
    flowbite.plugin(),
    /* eslint-disable global-require */
  ],
};

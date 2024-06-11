/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        small: "14px",
        normal: "16px",
        heading: "36px",
      },
    },
  },
  plugins: [],
};

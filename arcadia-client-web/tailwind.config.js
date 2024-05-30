/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      lobster: ["Lobster Two", "sans-serif"],
      inconsolata: ["Inconsolata", "monospace"],
      spacemono: ["Space Mono", "monospace"],
    },
  },
  plugins: [],
};

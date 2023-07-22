/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000",
      white: "#fff",
      foreground: "#C0C0C0",
      background: "#808080",
      accent: "#018281",
    },
    extend: {
      boxShadow: {
        header: "inset -2px -2px 0px #fff, inset 2px 2px 0px #000",
        subheader: "inset -1px -2px 0px #fff, inset 2px 2px 0px #000",
        btn: "2px 2px 2px #000",
      },
    },
  },
  plugins: [],
};

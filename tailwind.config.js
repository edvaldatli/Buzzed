/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryPink: "#FF80C6",
        primaryOrange: "#FD841F",
        accentPurple: "#FF64CB",
        error: "#FE3639",
      },
    },
  },
  plugins: [],
};

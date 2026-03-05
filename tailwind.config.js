/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#d4af37",
        dark: {
          800: "#1a1a1a",
          900: "#0a0a0a",
        },
        light: "#f3f4f6",
      },
      fontFamily: {
        serif: ['"Playfair Display"', "serif"],
        sans: ['"Inter"', "sans-serif"],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  daisyui: {
    themes: ["dark"],
  },
  plugins: [require("daisyui")],
}


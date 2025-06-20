/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        "primary-bg": "#090015",
        "pup-100": "#8671FF",
        "pup-200": "#A053FF",
        "pup-300": "#7F27EA",
        "pup-dark": "#200F43", 
      },
      fontFamily: {
        // DM SANS
        "dm-light": ['DmLight', 'sans-serif'],
        "dm-regular": ['DmRegular', 'sans-serif'],
        "dm-medium": ['DmMedium', 'sans-serif'],
        "dm-semibold": ['DmSemiBold', 'sans-serif'],
        "dm-bold": ['DmBold', 'sans-serif'],

        // poppins
        "pop-light": ["PopLight", "sans-serif"],
        "pop-regular": ["PopRegular", "sans-serif"],
        "pop-medium": ["PopMedium", "sans-serif"],
        "pop-semibold": ["PopSemiBold", "sans-serif"],
        "pop-bold": ["PopBold", "sans-serif"],

        // Grotesk
        "grotesk-light": ["GroteskLight", "sans-serif"],
        "grotesk-regular": ["GroteskRegular", "sans-serif"],
        "grotesk-medium": ["GroteskMedium", "sans-serif"],
        "grotesk-semibold": ["GroteskSemiBold", "sans-serif"],
        "grotesk-bold": ["GroteskBold", "sans-serif"],
      }
    },
  },
  plugins: [],
};

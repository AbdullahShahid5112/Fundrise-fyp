// tailwind.config.js
module.exports = {
  darkMode: 'class', // important!
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
  themes: [
    {
      mydarktheme: {
        "primary": "#570df8",
        "secondary": "#f000b8",
        "accent": "#37cdbe",
        "neutral": "#1a1a1a",
        "base-100": "#121212",
        "info": "#3abff8",
        "success": "#36d399",
        "warning": "#fbbd23",
        "error": "#f87272",
      },
    },
  ],
},

}

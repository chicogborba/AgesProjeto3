import daisyui from "daisyui"

/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        retro: "8px 8px 0px rgba(0, 0, 0, 1)",
        retroSM: "4px 4px 0px rgba(0, 0, 0, 1)",

      },
      fontFamily: {
        PublicSans: ["Public Sans", "sans-serif"],
        ProstoOne: ["Prosto One", "sans-serif"],
      },
    },
  },
    plugins: [
      daisyui
  ],
    daisyui: {
    theme: "pastel",
    themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "pastel", // name of one of the included themes for dark mode
  },
}


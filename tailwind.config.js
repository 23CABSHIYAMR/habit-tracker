/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      tiny: { max: "640px" },
      sm: { min: "640px", max: "767px" },
      // => @media (min-width: 640px and max-width: 767px) { ... }

      md: { min: "768px", max: "1023px" },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      lg: { min: "1024px", max: "1279px" },
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      xl: { min: "1280px", max: "1535px" },
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      "2xl": { min: "1536px", max: "1440px" },
      // => @media (min-width: 1536px) { ... }
      "3xl": "1440px",
    },
    boxShadow: {
      ctr: "12px 12px 12px 1px rgb(0 0 0 / 0.1)",
      card: "8px 3px 6px 0px rgb(0 0 0 / 40%)",
      card2: "2px 9px 5px 0px rgb(0 0 0 / 20%)",
      btn:"0 16px 40px hsla(0, 0%, 0%, 0.125)"
    },
    fontSize: {
      sm: "12px",
      tiny: "13px",
      base: "14px",
      title: "13.5px",
      h6: "16px",
      h5: "18px",
      h4: "20px",
      h3: "22px",
      h2: "24px",
      h1: "36px",
    },
    backgroundImage: {
      blackgr: `linear-gradient(
  to bottom right, 
  hsl(240, 1%, 25%) 3%, 
  hsl(0, 0%, 19%) 97%
)`,
      yellow1: `linear-gradient(
  to right, 
  hsl(45, 100%, 72%), 
  hsl(35, 100%, 68%)
)`,
      jet: `linear-gradient(
  to bottom right, 
  hsla(240, 1%, 18%, 0.251) 0%, 
  hsla(240, 2%, 11%, 0) 100%
), hsl(240, 2%, 13%)`,
onyx:`linear-gradient(
  to bottom right, 
  hsl(0, 0%, 25%) 0%, 
  hsla(0, 0%, 25%, 0) 50%
)`
    },
    colors: {
      primary: "#282828",
      bggradient: "#06132d",
      "text-active": "#ffdb70",
      lightgray: "#d6d6d6",
      white1: "#fafafa",
      white2: "#c4c4c4",
      "pop-color": "#3b2500",
      jetcolor: "#636363",
      popup: "#1e1e1f",
      bgcard: "#4a4a4a",
      bgcolor: "#c4c4c4",
      iconcolor: "#ffdb70",
    },

    borderRadius: {
      none: "0",
      sm: "0.125rem",
      DEFAULT: "0.25rem",
      md: "0.375rem",
      lg: "0.5rem",
      card: "20px",
      full: "9999px",
      large: "12px",
    },
    extend: {},
  },
  plugins: [],
};

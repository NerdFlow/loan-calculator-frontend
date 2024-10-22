import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#020202",
        major: "rgba(23, 43, 75, 1)",
        minor: "rgba(0, 0, 0, 0.54)",
        secondary: "rgba(46, 111, 172, 1)",
      },
      fontFamily: {
        montserrat: ["var(--font-montserrat)", "sans-serif"],
        raleway: ["var(--font-raleway)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        base: ["var(--font-montserrat)", "sans-serif"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      dropShadow: {
        "text-sm": "1px 1px 0px rgba(0,0,0.90)",
        "text-md": "1px 1px 2px rgba(0,0,0.90)",
        "text-lg": "1px 1px 3px rgba(0,0,0.90)",
        "text-xl": "1px 2px 4px rgba(0,0,0.90)",
      },
    },
  },
  plugins: [],
};
export default config;

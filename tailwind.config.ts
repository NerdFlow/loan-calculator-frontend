import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xl: "1440px",
        lg: "1024px",
        md: "980px",
        sm: "767px",
        xs: "425px",
      },
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
      fontSize: {
        xsm: ["clamp(0.62rem, calc(0.58rem + 0.30vw), 0.92rem)", "1.4"],
        ssm: ["clamp(0.90rem, calc(0.82rem + 0.29vw), 1.10rem)", "1.4"],
        sm: ["clamp(0.95rem, calc(0.62rem + 0.29vw), 1.20rem)", "1.4"],
        base: ["clamp(1.00rem, calc(0.88rem + 0.19vw), 1.20rem)", "1.4"],
        lg: ["clamp(1.00rem, calc(0.88rem + 0.39vw), 1.28rem)", "1.4"],
        xl: ["clamp(1.42rem, calc(1.06rem + 0.80vw), 2.34rem)", "1.4"],
        "2xl": ["clamp(1.60rem, calc(1.08rem + 0.59vw), 2.93rem)", "1.2"],
        "3xl": ["clamp(1.80rem, calc(1.08rem + 1.63vw), 3.66rem)", "1.1"],
        "3.5xl": ["clamp(1.90rem, calc(1.15rem + 1.78vw), 3.80rem)", "1.1"],
        "4xl": ["clamp(2.00rem, calc(1.03rem + 2.98vw), 4.958rem)", "1.1"],
        "5xl": ["clamp(2.28rem, calc(0.94rem + 4.71vw), 5.72rem)", "1"],
        "6xl": ["clamp(2.57rem, calc(0.78rem + 7.95vw), 7.15rem)", "1"],
      },
    },
  },
  plugins: [],
};
export default config;

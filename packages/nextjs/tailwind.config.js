/** @type {import('tailwindcss').Config} */
// import tailwind defaultTheme
import { fontFamily } from "tailwindcss/defaultTheme";

// add dark mode
export const darkMode = "class";
export const content = [
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
  "./utils/**/*.{js,ts,jsx,tsx}",
];
export const plugins = [require("daisyui")];
export const darkTheme = "scaffoldEthDark";
export const daisyui = {
  themes: [
    {
      scaffoldEth: {
        primary: "#93BBFB",
        "primary-content": "#212638",
        secondary: "#DAE8FF",
        "secondary-content": "#212638",
        accent: "#93BBFB",
        "accent-content": "#212638",
        neutral: "#212638",
        "neutral-content": "#ffffff",
        "base-100": "#ffffff",
        "base-200": "#f4f8ff",
        "base-300": "#DAE8FF",
        "base-content": "#212638",
        info: "#93BBFB",
        success: "#34EEB6",
        warning: "#FFCF72",
        error: "#FF8863",

        "--rounded-btn": "9999rem",

        ".tooltip": {
          "--tooltip-tail": "6px",
        },
        ".link": {
          textUnderlineOffset: "2px",
        },
        ".link:hover": {
          opacity: "80%",
        },
      },
    },
    {
      scaffoldEthDark: {
        primary: "#212638",
        "primary-content": "#F9FBFF",
        secondary: "#323f61",
        "secondary-content": "#F9FBFF",
        accent: "#4969A6",
        "accent-content": "#F9FBFF",
        neutral: "#F9FBFF",
        "neutral-content": "#385183",
        "base-100": "#385183",
        "base-200": "#2A3655",
        "base-300": "#212638",
        "base-content": "#F9FBFF",
        info: "#385183",
        success: "#34EEB6",
        warning: "#FFCF72",
        error: "#FF8863",

        "--rounded-btn": "9999rem",

        ".tooltip": {
          "--tooltip-tail": "6px",
          "--tooltip-color": "hsl(var(--p))",
        },
        ".link": {
          textUnderlineOffset: "2px",
        },
        ".link:hover": {
          opacity: "80%",
        },
      },
    },
    {
      exampleUi: {
        primary: "#000000",
        "primary-content": "#ffffff",
        secondary: "#FF6644",
        "secondary-content": "#212638",
        accent: "#93BBFB",
        "accent-content": "#212638",
        neutral: "#f3f3f3",
        "neutral-content": "#212638",
        "base-100": "#ffffff",
        "base-200": "#f1f1f1",
        "base-300": "#d0d0d0",
        "base-content": "#212638",
        info: "#93BBFB",
        success: "#34EEB6",
        warning: "#FFCF72",
        error: "#FF8863",

        "--rounded-btn": "9999rem",

        ".tooltip": {
          "--tooltip-tail": "6px",
        },
      },
    },
  ],
};
export const theme = {
  // Extend Tailwind classes (e.g. font-bai-jamjuree, animate-grow)
  extend: {
    fontFamily: {
      "bai-jamjuree": ["Bai Jamjuree", "sans-serif"],
      plus: ["--font-plus-jakarta-sans", ...fontFamily.sans],
      poppins: ["--font-poppins", ...fontFamily.sans],
      montserrat: ["--font-montserrat", ...fontFamily.sans],
    },
    spacing: {
      base: "1024px",
      content: "1280px",
      input: "380px",
    },
    colors: {
      gradFrom: "#439DFF",
      gradTo: "#6052FF",
      purple: "#4918B2",
      "purple-light": "#F6F2FF",
      "purple-dark": "#381389",
      light: "#F9F9F9",
      "light-deep": "#BFBCF0",
      "light-gray": "#2626268F",
      "light-gray2": "#F0F2F5",
      "light-gray3": "#484848",
      dark: "#131313",
      dark2: "#2C2C2C",
      dark3: "#D9D9D9",
      "dark-deep": "#0D0D0D",
      "dark-gray": "#D9D9D98F",
      "dark-gray2": "#191919",
      "dark-gray3": "#737373",
      "dark-blue": "#212E6D",
      "enter-bg": "#2222224D",
      "enter-bg-dark": "#DDDDDD4D",
      gray1: "#718096",
      gray3: "#B7B7C0",
    },
    backgroundImage: {
      "purple-to-blue": "linear-gradient(267.03deg, #00F0FF 4.01%, #5200FF 57.55%, #FF2DF7 114.97%);",
    },
    boxShadow: {
      center: "0 0 12px -2px rgb(0 0 0 / 0.05)",
      table: "0px 13px 80px 0px #E2ECF980",
    },
    keyframes: {
      grow: {
        "0%": {
          width: "0%",
        },
        "100%": {
          width: "100%",
        },
      },
      zoom: {
        "0%, 100%": { transform: "scale(1, 1)" },
        "50%": { transform: "scale(1.1, 1.1)" },
      },
    },
    animation: {
      grow: "grow 5s linear infinite",
      "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      zoom: "zoom 1s ease infinite",
    },
  },
};

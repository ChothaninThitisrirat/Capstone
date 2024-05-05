import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark1': '#363062',
        'dark2': '#435585',
        'dark3': '#818FB4',
        'bg' : '#F7F8F9',
        "novel": "#00B2FF",
        "horror1":  "#FF0000",
        "horror2":  "#383535",
        "cartoon":  "#eeff59",
        "romantic":  "#FF69B4",
        "science":  "#4efa4b",
        "business": "#ff7e47",
        "education": "#47fff3",
        "develop": "#fffb91",
        "travel": "#FF4500",
        "health": "#FF6347",
    },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
    },
    },
  },
  plugins: [],
};
export default config;

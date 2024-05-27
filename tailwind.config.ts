import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/emailTemplate.ts",
  ],
  theme: {
    extend: {
      fontFamily: {
        bitter: ['var(--font-bitter)'],
      },
      colors: {
        'dark1': '#363062',
        'dark2': '#435585',
        'dark3': '#818FB4',
        'bg' : '#F7F8F9',
        "novel": "#F8F6E3",
        "horror1":  "#FA7070",
        "horror2":  "#383535",
        "cartoon":  "#7BD3EA",
        "romantic":  "#F6F7C4",
        "science":  "#40A2E3",
        "business": "#ff7e47",
        "education": "#47fff3",
        "develop": "#fffb91",
        "travel": "#FF4500",
        "health": "#FF6347",
        "grayname": "#CBCBCB",
        "graynamehead": "#9A9A9A"
    },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
    },
    height: {
      '110': '25rem',
      '115': '28rem',
      '130': '35rem',
      '128': '32rem',
    },
    minWidth: {
      '128': '40rem',
    },
    minHeight: {
      '110': '25rem',
      '128': '60rem',
    },
    width:{
      '110': '25rem',
    },
    },
  },
  plugins: [],
};
export default config;

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
        "novel": "#4169E1",
        "horror1":  "#006769",
        "horror2":  "#383535",
        "cartoon":  "#5AB2FF",
        "romantic":  "#f8838e",
        "science":  "#3ab26d",
        "business": "#FDDE55",
        "education": "#D8AE7E",
        "develop": "#fffb91",
        "travel": "#A67B5B",
        "health": "#ff8ac9",
        "grayname": "#CBCBCB",
        "graynamehead": "#9A9A9A"
    },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
    },
    height: {
      '84': '21rem',
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
    maxWidth:{
      '128': '40rem',
    }
    },
  },
  plugins: [],
};
export default config;

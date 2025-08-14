import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0b1016",
        panel: "#0f141b",
        border: "#1d2a37",
        text: "#c9d1d9",
        subtext: "#9aa7b4",
        brand: {
          50: "#e6f4ff",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
        },
      },
      boxShadow: {
        glow: "0 0 30px rgba(56,189,248,0.2)",
      },
      borderRadius: {
        xl2: "1rem",
      }
    },
  },
  plugins: [],
};
export default config;

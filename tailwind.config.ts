import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        blueScriptBlue: {
          50: "#E6E8F5",
          100: "#C2C8EC",
          200: "#9DA7E2",
          300: "#7986D9",
          400: "#5466D0",
          500: "#2F45C7",
          600: "#192B77", // Base color
          700: "#141F5C",
          800: "#0F1542",
          900: "#0A0A27",
          950: "#050513",
        },
      },
    },
    fontFamily: {
      sans: ["ui-NanumBarunGothic", "sans-serif"],
    },
  },
};

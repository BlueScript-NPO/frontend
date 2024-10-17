import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default <Partial<Config>>{
  content: [
    "./app.vue",
    "./components/**/*.vue",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "docs/content/**/*.md",
  ],
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
      gridTemplateColumns: {
        "16": "repeat(16, minmax(0, 1fr))",
        "20": "repeat(20, minmax(0, 1fr))",
      },
    },
    fontFamily: {
      sans: ["Noto Sans KR", ...defaultTheme.fontFamily.sans],
      // serif: ["Nanum Myeongjo", ...defaultTheme.fontFamily.serif],
    },
  },
};

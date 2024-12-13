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
          "50": "#ebf5ff",
          "100": "#daecff",
          "200": "#bddbff",
          "300": "#95c1ff",
          "400": "#6b9cff",
          "500": "#4876ff",
          "600": "#284dff",
          "700": "#1d3ce5",
          "800": "#1a34b9",
          "900": "#192b77", // Base
          "950": "#121d54",
        },
      },
      gridTemplateColumns: {
        "16": "repeat(16, minmax(0, 1fr))",
        "20": "repeat(20, minmax(0, 1fr))",
      },
    },
    fontFamily: {
      sans: ["Interop", ...defaultTheme.fontFamily.sans],
      // serif: ["Nanum Myeongjo", ...defaultTheme.fontFamily.serif],
    },
  },
};

import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1a1a1a",
        grey: "#4a4540",
        rule: "#e2ded9",
        uc: "#C4001D",
      },
      fontFamily: {
        serif: ['"Source Serif 4"', "Georgia", "serif"],
        display: ['"EB Garamond"', '"Source Serif 4"', "Georgia", "serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;

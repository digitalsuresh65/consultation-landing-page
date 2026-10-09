import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        maroon: { DEFAULT: "#7A1B2E", dark: "#4F1120" },
        cream: { DEFAULT: "#FBF3EA", deep: "#F2E3CE", card: "#FFFBF5" },
        ink: "#2B1420",
        gold: "#B9893F",
        whatsapp: "#167C45",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;

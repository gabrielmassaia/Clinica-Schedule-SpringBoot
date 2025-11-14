import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans]
      },
      colors: {
        primary: {
          DEFAULT: "#2563eb",
          foreground: "#ffffff"
        }
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;

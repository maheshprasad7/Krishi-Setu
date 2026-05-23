import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#22C55E", // Primary Green
          dark: "#15803D",    // Dark Green
          light: "#DCFCE7",   // Light Green
        },
        accent: {
          yellow: "#FACC15",  // Accent Yellow
        },
        background: "#F8FAFC", // Sleek light gray/blue background
        text: {
          DEFAULT: "#1E293B", // Dark slate text
          light: "#64748B",   // Muted slate text
        },
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

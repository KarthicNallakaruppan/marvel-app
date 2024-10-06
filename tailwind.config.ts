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
        background: "var(--screen-ui)",
        foreground: "var(--on-surface-ui)",
        'base': {
          600: 'var(--bg-ui)',
          700: 'var(--bg-shade-ui)',
        },
      },
    },
  },
  plugins: [],
};
export default config;

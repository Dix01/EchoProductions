import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        page: "rgb(var(--color-page) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        gold: "rgb(var(--color-gold) / <alpha-value>)",
        navy: "rgb(var(--color-navy) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        veil: "rgb(var(--color-veil) / <alpha-value>)"
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "Arial", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      },
      spacing: {
        gutter: "var(--gutter)"
      },
      zIndex: {
        cursor: "70",
        preload: "80"
      },
      transitionTimingFunction: {
        enter: "var(--ease-enter)",
        exit: "var(--ease-exit)",
        dolly: "var(--ease-dolly)"
      }
    }
  },
  plugins: []
};

export default config;

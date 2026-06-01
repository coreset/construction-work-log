/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "-apple-system", "BlinkMacSystemFont", "'Segoe UI'",
          "Roboto", "'Helvetica Neue'", "Arial", "sans-serif",
        ],
      },
      fontSize: {
        h1: ["38px", { lineHeight: "1.2", fontWeight: "600" }],
        h2: ["30px", { lineHeight: "1.2", fontWeight: "600" }],
        h3: ["24px", { lineHeight: "1.2", fontWeight: "600" }],
        h4: ["20px", { lineHeight: "1.2", fontWeight: "500" }],
        body: ["14px", { lineHeight: "1.5" }],
      },
      // All colors reference CSS variables — changing data-theme on <html>
      // instantly updates every Tailwind class without JS class toggling.
      colors: {
        primary:        "var(--color-primary)",
        "primary-hover":"var(--color-primary-hover)",
        "primary-active":"var(--color-primary-active)",
        success:        "var(--color-success)",
        warning:        "var(--color-warning)",
        error:          "var(--color-error)",
        heading:        "var(--color-text-heading)",
        secondary:      "var(--color-text-secondary)",
        disabled:       "var(--color-text-disabled)",
        border:         "var(--color-border)",
        divider:        "var(--color-divider)",
        page:           "var(--color-bg-page)",
        component:      "var(--color-bg-component)",
        hover:          "var(--color-bg-hover)",
        "table-header": "var(--color-bg-table-header)",
      },
      borderRadius: {
        btn:   "2px",
        card:  "6px",
        modal: "8px",
      },
      maxWidth:  { content: "1200px" },
      height:    { header:  "64px"   },
      spacing: {
        1: "4px", 2: "8px", 3: "12px", 4: "16px",
        6: "24px", 8: "32px", 12: "48px", 16: "64px",
      },
    },
  },
  plugins: [],
};

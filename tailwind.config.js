/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        "primary-light": "rgb(var(--color-primary-light) / <alpha-value>)",
        "primary-dark": "rgb(var(--color-primary-dark) / <alpha-value>)",
        "primary-contrast": "rgb(var(--color-primary-contrast) / <alpha-value>)",

        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        "secondary-light": "rgb(var(--color-secondary-light) / <alpha-value>)",
        "secondary-dark": "rgb(var(--color-secondary-dark) / <alpha-value>)",
        "secondary-contrast": "rgb(var(--color-secondary-contrast) / <alpha-value>)",

        success: "rgb(var(--indicators-success) / <alpha-value>)",
        'success-dark': "rgb(var(--indicators-success-dark) / <alpha-value>)",
        'success-light': "rgb(var(--indicators-success-light) / <alpha-value>)",

        warning: "rgb(var(--indicators-warning) / <alpha-value>)",
        'warning-dark': "rgb(var(--indicators-warning-dark) / <alpha-value>)",
        'warning-light': "rgb(var(--indicators-warning-light) / <alpha-value>)",

        error: "rgb(var(--indicators-error) / <alpha-value>)",
        'error-dark': "rgb(var(--indicators-error-dark) / <alpha-value>)",
        'error-light': "rgb(var(--indicators-error-light) / <alpha-value>)",

        info: "rgb(var(--indicators-info) / <alpha-value>)",
        'info-dark': "rgb(var(--indicators-info-dark) / <alpha-value>)",
        'info-light': "rgb(var(--indicators-info-light) / <alpha-value>)",

        white: "rgb(var(--common-white) / <alpha-value>)",
        black: "rgb(var(--common-black) / <alpha-value>)",

        "primary-text": "rgb(var(--text-primary) / <alpha-value>)",
        "secondary-text": "rgb(var(--text-secondary) / <alpha-value>)",

        "primary-bg": "rgb(var(--background-primary) / <alpha-value>)",
        "secondary-bg": "rgb(var(--background-secondary) / <alpha-value>)",
        "tertiary-bg": "rgb(var(--background-tertiary) / <alpha-value>)",
      },
    },
  },
  plugins: [],
}


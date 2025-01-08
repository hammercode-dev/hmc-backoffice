/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        hmc: {
          base: {
            100: "#E0F7FF",
            200: "#B3ECFF",
            300: "#80E1FF",
            400: "#4DD6FF",
            500: "#1ACBFF",
            600: "#00C0FF",
          },
          dark: {
            100: "#D0D7E5",
            200: "#A1AFCB",
            300: "#7187B0",
            400: "#425096",
            500: "#1F4C8F",
            600: "#003366",
          },
        },
      },
      fontFamily: {
        sans: ["Sora", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};

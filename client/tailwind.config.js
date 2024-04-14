/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "signup-background": "url('@/assets/5585062.jpg')",
      },
    },
  },
  daisyui: {
    themes: ["retro"],
  },
  plugins: [require("daisyui")],
};

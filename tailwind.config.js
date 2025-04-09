module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Urbanist', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        "button-primary": "linear-gradient(to right bottom, #5603ad, #6b25ba, #7f3dc8, #9253d5, #a568e3)",
      },
      colors: {
        "layout-bg": "#f6f8fc", 
        "content-bg": "#F7F8FA", 
      },
    },
  },
  plugins: [],
};
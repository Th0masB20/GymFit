/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        headerFullBackground:
          "linear-gradient(to bottom, rgba(0,0,0,0) 80%, rgba(255,255,255,1)), url('./src/imagesTracker/karsten-winegeart-0Wra5YYVQJE-unsplash.jpg')",
        loginBackground: "url('./src/imagesTracker/People working out.jpg')",
      },
      backgroundPosition: {
        "center-center": "center 60%",
      },
      colors: {
        main: "#F973C1",
        second: "#FFCDEA",
        third: "#8D21F6",
        "soft-1": "#FFC1E5",
        "soft-2": "#F57FFF",
        "soft-3": "#F8CEFF",
        accent: "#F84A92",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        headerFullBackground:
          "linear-gradient(to bottom, rgba(0,0,0,0) 80%, rgba(255,255,255,1)), url('./src/imagesTracker/karsten-winegeart-0Wra5YYVQJE-unsplash.jpg')",
        loginBackground: "url('./src/imagesTracker/People working out.jpg')",
        WorkoutImage: "url('./src/imagesTracker/Workouts.png')",
        CalendarImage: "url('./src/imagesTracker/Plan Calendar.png')",
        SettingsImage: "url('./src/imagesTracker/Settings.png')",
        HomeImage: "url('./src/imagesTracker/home.png')",
        WhiteAddSign: "url('./src/imagesTracker/white add.png')",
      },
      backgroundPosition: {
        "center-center": "center 60%",
      },
      colors: {
        main: "#F973C1",
        second: "#FFCDEA",
        third: "#8D21F6",
        fourth: "#FFA1D8",
        "soft-1": "#FFC1E5",
        "soft-2": "#F57FFF",
        "soft-3": "#F8CEFF",
        accent: "#F84A92",
        "footer-background": "rgba(255,255,255,0.7)",
      },
    },
    animation: {
      fadeIn: "fadeIn 1s ease-in",
    },
    keyframes: {
      fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
    },
  },
  plugins: [],
};

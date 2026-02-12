/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        headerFullBackground:
          "linear-gradient(to bottom, rgba(0,0,0,0) 80%, rgba(34, 40, 49,1)), url('/src/imagesTracker/karsten-winegeart-0Wra5YYVQJE-unsplash.jpg')",
        loginBackground: "url('/src/imagesTracker/People working out.jpg')",
        WorkoutImage: "url('/src/imagesTracker/Workouts.png')",
        CalendarImage: "url('/src/imagesTracker/Plan Calendar.png')",
        SettingsImage: "url('/src/imagesTracker/Settings.png')",
        HomeImage: "url('/src/imagesTracker/home.png')",
        WhiteAddSign: "url('/src/imagesTracker/white add.png')",
        LeftArrow: "url('/src/imagesTracker/Left Arrow.png')",
        RightArrow: "url('/src/imagesTracker/Right Arrow.png')",
      },
      backgroundPosition: {
        "center-center": "center 60%",
      },
      colors: {
        "soft-1": "#6EACDA",
        "soft-2": "#BBE1FA",

        main: "#1C4D8D",
        second: "#0F2854",
        third: "#4988C4",
        fourth: "#BDE8F5",

        accent: "#3282B8",

        cardBackground: "#343740",

        mainDark: "#222831",
        mainWhite: "#e4e4e7",

        "footer-background": "rgba(62, 66, 69,0.4)",
      },
    },
    animation: {
      fadeIn: "fadeIn 1s ease-in",
    },
    keyframes: {
      fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
    },

    screens: {
      lg: { max: "1300px" },
      md: { max: "1200px" },

      sm: { max: "1000px" },
      xs: { max: "880px" },
      tablet: { max: "780px" },
      mobile: { max: "670px" },

      //min-width: 1400 (styles apply when screen is bigger than 1400 px)
      xl: "1300px",
      xll: "1450px",
    },
  },
  plugins: [],
};

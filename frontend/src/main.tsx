import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./Pages/PublicMainPage";
import SigninPage from "./Pages/LoginFormPage";
import RegisterPage from "./Pages/RegisterPage";
import InfoFormPage from "./Pages/InfoPage";
import HomePage from "./Pages/HomePage";
import ErrorPage from "./Pages/404";
import WorkoutsPage from "./Pages/WorkoutsPage";
import CreateWorkout from "./Pages/CreateWorkoutPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/login",
    element: <SigninPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/info",
    element: <InfoFormPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/workouts",
    element: <WorkoutsPage />,
  },
  {
    path: "/workouts/create",
    element: <CreateWorkout />,
  },
  {
    path: "/404",
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

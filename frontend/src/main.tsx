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
import StartWorkout from "./Pages/StartWorkout";
import EditWorkout from "./Pages/EditWorkout";
import CalendarPage from "./Pages/CalendarPage";

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
    path: "/workouts/:workoutN/edit",
    element: <EditWorkout />,
  },
  {
    path: "/404/:error",
    element: <ErrorPage />,
  },
  {
    path: "/workouts/:workoutName/startworkout",
    element: <StartWorkout />,
  },
  {
    path: "/calendar",
    element: <CalendarPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

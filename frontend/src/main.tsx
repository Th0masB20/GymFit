import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./component/MainPage";
import SigninPage from "./component/LoginFormPage";
import RegisterPage from "./component/RegisterPage";
import InfoFormPage from "./component/InfoPage";
import HomePage from "./component/HomePage";
import ErrorPage from "./component/404";

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
    path: "/404",
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

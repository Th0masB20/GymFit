import React from "react";
import { NavLink } from "react-router-dom";

const CenterLogin = (): React.ReactElement => {
  return (
    <div className="bg-white bg-opacity-90 w-96 h-96 rounded-3xl flex justify-center relative overflow-hidden">
      <div className="absolute h-12 w-96 bg-main rotate-45 -right-1/3 top-[33]" />
      <div className="absolute h-12 w-96 bg-main -rotate-45 -left-1/3 top-[33]" />
      <div className="absolute h-12 w-96 bg-main rotate-45 right-1/3 bottom-0" />
      <div className="absolute h-12 w-96 bg-main -rotate-45 left-1/3 bottom-0" />
      <section className="flex flex-col justify-center items-center h-full w-3/4">
        <p className="text-xl text-center mb-2">
          Facilitate Your Workout routine today with
        </p>
        <p className="text-4xl text-third">Wokalog</p>
        <NavLink
          to="/login-page"
          className="relative w-44 h-10 bg-main flex justify-center items-center text-white text-xl font-semibold mt-10
            after:w-24 after:h-24 after:bg-third after:rounded-full after:absolute overflow-hidden z-10 after:blur-xl after:-z-10 border-third border-2 border-opacity-50"
        >
          Log in
        </NavLink>

        <NavLink to="/register" className="text-lg text-third mt-2">
          Register
        </NavLink>

        <NavLink to="/" className="">
          Back
        </NavLink>
      </section>
    </div>
  );
};

const LoginPage = (): React.ReactElement => {
  return (
    <main className="bg-loginBackground w-screen h-screen flex justify-center items-center">
      <CenterLogin />
    </main>
  );
};

export default LoginPage;

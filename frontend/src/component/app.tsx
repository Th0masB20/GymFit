import React from "react";
import "../css/index.css";
import { NavLink } from "react-router-dom";

const NavBar = (): React.ReactElement => {
  return (
    <nav className="absolute right-0 bg-[rgba(255,255,255,0.3)] h-10 flex flex-col justify-center w-96">
      <ul className="z-10 flex justify-end">
        <li>
          <NavLink to="/about" className="text-white font-semibold">
            About
          </NavLink>
        </li>
        <li className="pl-8">
          <NavLink
            to="/log in"
            className="box-border bg-gradient-to-r from-third to-main w-auto h-auto p-1 px-4 rounded-full text-white font-bold z-10"
          >
            Log In
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

const Header = (): React.ReactElement => {
  return (
    <header className="header">
      <NavBar />
      <div className="box-border absolute h-56 top-[20%] left-40 after:absolute after:bg-inherit after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-gray-400 after:w-72 after:h-80 after:rounded-full after:blur-3xl flex flex-col justify-between items-center">
        <p className="box-border text-4xl text-center w-52 z-10 text-white font-semibold">
          Easiest Way to track your Fitness Journey
        </p>
        <NavLink
          to="/register"
          className="box-border bg-gradient-to-r from-third to-main w-auto h-auto p-2 rounded-full text-white font-bold z-10"
        >
          Start Up Today
        </NavLink>
      </div>
    </header>
  );
};

const About = (): React.ReactElement => {
  return (
    <div className="flex flex-col items-center bg-soft-1 w-6/12 mx-auto h-96 mt-24 mb-24 p-8 rounded-3xl">
      <h2 className="text-3xl font-semibold pb-10">About</h2>
      <p>We strive to make workout tracking as easy and seamless as possible</p>
      <p>We allow users to:</p>
      <ul className="inline-block">
        <li className="text-center text-accent text-lg">
          Create Custome Workouts
        </li>
        <li className="text-center text-accent text-lg">
          Set a workout schedule
        </li>
        <li className="text-center text-accent text-lg">
          Set rerminders for days and time of workout
        </li>
      </ul>
      <p className="text-2xl text-center mt-5 font-semibold">
        Select From a huge list of exercises or create your own exercise.
      </p>
    </div>
  );
};

const MainPage = (): React.ReactElement => {
  return (
    <>
      <Header />
      <main>
        <About />
      </main>
    </>
  );
};

export default MainPage;

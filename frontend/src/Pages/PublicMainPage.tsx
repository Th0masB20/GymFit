import React from "react";
import "../css/index.css";
import { NavLink } from "react-router-dom";

const NavBar = (): React.ReactElement => {
  return (
    <nav className="absolute right-0 bg-[rgba(255,255,255,0.3)] h-10 flex flex-col justify-center w-96">
      <ul className="z-10 flex justify-end mr-5">
        <li>
          <NavLink to="/about" className="text-white font-semibold">
            About
          </NavLink>
        </li>
        <li className="pl-8 hover:scale-110 transition-all">
          <NavLink to="/login" className="mainLoginButton">
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
      <div className="headerWords">
        <p className="box-border text-4xl text-center w-52 z-10 text-white font-semibold">
          Easiest Way to track your Fitness Journey
        </p>
        <NavLink
          to="/register"
          className="box-border bg-gradient-to-r from-third to-main w-auto h-auto p-2 rounded-full text-white font-bold z-10 hover:scale-105 transition-all"
        >
          Start Up Today
        </NavLink>
      </div>
    </header>
  );
};

const About = (): React.ReactElement => {
  return (
    <div className="flex flex-col items-center bg-soft-1 w-6/12 mx-auto h-96 mt-24 mb-24 p-8 rounded-3xl min-w-96">
      <h2 className="text-3xl font-semibold pb-5 underline">About</h2>
      <p className="text-xl text-center md:text-lg">
        We strive to make workout tracking as easy and seamless as possible
      </p>
      <p className="text-xl text-center md:text-lg">We allow users to:</p>
      <ul className="inline-block pt-2 pb-2">
        <li className="listItem">Create Custome Workouts</li>
        <li className="listItem">Set a workout schedule</li>
        <li className="listItem">
          Set rerminders for days and time of workout
        </li>
      </ul>
      <p className="text-2xl text-center mt-5 font-semibold md:text-lg md:mt-0">
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

import React from "react";
import "../css/index.css";
import { NavLink } from "react-router-dom";

const NavBar = (): React.ReactElement => {
  return (
    <nav className="absolute right-0 bg-[rgba(255,255,255,0.3)] h-10 flex flex-col justify-center w-auto mobile:w-full px-6">
      <ul className="z-10 flex justify-end">
        <li>
          <NavLink to="/about" className="text-white font-semibold pr-8">
            About
          </NavLink>
        </li>
        <li className="hover:scale-110 transition-all">
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
    <header className="header overscroll-contain">
      <NavBar />
      <div className="headerWords">
        <p className="box-border text-4xl xl:text-5xl text-center w-52 xl:w-64 z-10 text-mainWhite font-semibold">
          Easiest Way to track your Fitness Journey
        </p>
        <NavLink
          to="/register"
          className="box-border bg-main w-auto h-auto py-2 px-4 xl:p-[10px] rounded-full text-mainWhite xl:text-lg font-bold z-10 hover:scale-105 transition-all"
        >
          Start Up Today
        </NavLink>
      </div>
    </header>
  );
};

const About = (): React.ReactElement => {
  return (
    <div className="flex flex-col items-center text-mainWhite bg-main w-6/12 h-96 mx-auto mt-24 mb-24 p-8 rounded-3xl min-w-96 mobile:min-w-80 overscroll-contain">
      <h2 className="text-3xl font-semibold pb-5 underline">About</h2>
      <p className="text-xl text-center md:text-lg mobile:text-base">
        We strive to make workout tracking as easy and seamless as possible
      </p>
      <p className="text-xl text-center md:text-lg mobile:text-sm">
        We allow users to:
      </p>
      <ul className="inline-block pt-2 pb-2">
        <li className="listItem">Create Custome Workouts</li>
        <li className="listItem">Set a workout schedule</li>
        <li className="listItem">
          Set rerminders for days and time of workout
        </li>
      </ul>
      <p className="text-2xl text-center mt-5 font-semibold md:text-lg md:mt-0 mobile:text-base">
        Select From a huge list of exercises or create your own exercise.
      </p>
    </div>
  );
};

const MainPage = (): React.ReactElement => {
  return (
    <>
      <Header />
      <main className="overscroll-none bg-mainDark">
        <About />
      </main>
    </>
  );
};

export default MainPage;

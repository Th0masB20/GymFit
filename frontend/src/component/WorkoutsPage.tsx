import React, { useEffect, useState } from "react";
import IUser from "../interfaces/IUser";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const WorkoutsPage = (): React.ReactElement => {
  const [user, setUser] = useState<IUser>();
  const nav = useNavigate();
  useEffect(() => {
    async function getData() {
      try {
        const userResponse = await axios.get("http://localhost:3000/home/", {
          withCredentials: true,
        });
        setUser(userResponse.data as IUser);
      } catch (error) {
        nav("/404");
      }
    }
    getData();
  }, [nav]);
  if (user == undefined) return <div></div>;
  return (
    <main className="relative w-screen h-screen">
      <h1 className="text-center text-2xl">Workouts</h1>
      <div className="w-screen h-1 bg-main float-right" />
      <SideBar />
      <MainBody user={user} />
    </main>
  );
};

const SideBar = (): React.ReactElement => {
  return (
    <nav className="h-screen w-20 bg-main absolute top-0 flex flex-col justify-between items-center">
      <div className="flex justify-center bg-[rgba(255,255,255,0.95)] mt-4 p-1 rounded-lg hover:scale-110">
        <NavLink to="/home" className="bg-HomeImage bg-cover w-11 h-11" />
      </div>
      <div className="flex flex-col items-center justify-between h-48 w-full">
        <NavLink
          to="/workouts"
          className="bg-WorkoutImage bg-cover w-16 h-16 hover:scale-110"
        />
        <button className="bg-CalendarImage bg-cover w-12 h-12 hover:scale-110" />
        <button className="bg-SettingsImage bg-cover w-11 h-11 hover:scale-110" />
      </div>
    </nav>
  );
};

const MainBody = ({ user }: { user: IUser }): React.ReactElement => {
  return (
    <NavLink
      to="/workouts/create"
      className="absolute flex flex-col justify-center items-center w-80 h-10 bg-main rounded-lg -bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:scale-110"
    >
      <p className="text-center text-xl w-44"> Create Workout </p>
    </NavLink>
  );
};

export default WorkoutsPage;

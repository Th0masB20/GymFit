import React, { useEffect, useState } from "react";
import SideBar from "../component/SideBar";
import Calendar from "../component/Calendar Components/Calendar";
import IUser from "../interfaces/IUser";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const CalendarPage = (): React.ReactElement => {
  // const getNumberOfDays;
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
    <main className="w-screen h-screen">
      <SideBar />
      <section className="w-screen h-screen flex-auto flex-col">
        <h1 className="text-center text-2xl pl-20">Calendar</h1>
        <div className="w-screen h-1 bg-main float-right" />
        <div className="w-full h-[94%] pl-20 pt-10">
          <Calendar user={user} />
        </div>
      </section>
    </main>
  );
};

export default CalendarPage;

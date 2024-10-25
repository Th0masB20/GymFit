import React, { useEffect, useState } from "react";
import IUser from "../interfaces/IUser";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SideBar from "../component/SideBar";
import { MainBody } from "../component/Workout Page Components/Body";

const WorkoutsPage = (): React.ReactElement => {
  const [user, setUser] = useState<IUser>();
  const nav = useNavigate();
  useEffect(() => {
    async function getData() {
      try {
        const userResponse = await axios.get(
          "http://localhost:3000/home/user",
          {
            withCredentials: true,
            headers: { "Cache-Control": "no-cache", Pragma: "no-cache" }
          }
        );
        setUser(userResponse.data as IUser);
      } catch (error) {
        nav("/404");
      }
    }
    getData();
  }, [nav]);
  if (user == undefined) return <div></div>;
  return (
    <main className="relative w-full h-full">
      <SideBar />
      <MainBody user={user} />
    </main>
  );
};

export default WorkoutsPage;

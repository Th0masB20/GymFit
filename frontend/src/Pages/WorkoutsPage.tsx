import React, { useEffect, useState } from "react";
import IUser from "../interfaces/IUser";
import { useNavigate } from "react-router-dom";
import axios_instance from "../utilities/AxiosInstance";
import SideBar from "../component/SideBar";
import { MainBody } from "../component/Workout Page Components/Body";
import { errorResponse } from "../interfaces/IError";

const WorkoutsPage = (): React.ReactElement => {
  const [user, setUser] = useState<IUser>();
  const nav = useNavigate();
  useEffect(() => {
    async function getData() {
      try {
        const userResponse = await axios_instance.get(
          "/api/home/user",
          {
            withCredentials: true,
            headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
          }
        );
        setUser(userResponse.data as IUser);
      } catch (error) {
        const responsError = (error as errorResponse).response.data.error;
        nav(`/404/${responsError}`);
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

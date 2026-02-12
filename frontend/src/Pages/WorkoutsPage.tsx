import React, { useEffect, useState } from "react";
import IUser from "../interfaces/IUser";
import { useNavigate } from "react-router-dom";
import axios_instance from "../utilities/AxiosInstance";
import SideBar from "../component/SideBar";
import { MainBody } from "../component/Workout Page Components/Body";
import { errorResponse } from "../interfaces/IError";
import MobileSideBar from "../component/MobileSideBar";

const WorkoutsPage = (): React.ReactElement => {
  const [user, setUser] = useState<IUser>();
  const nav = useNavigate();
  useEffect(() => {
    async function getData() {
      try {
        const userResponse = await axios_instance.get(
          import.meta.env.VITE_BACKEND_URL + "/home/user",
          {
            withCredentials: true,
            headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
          },
        );
        if (userResponse.status != 200) throw userResponse;
        setUser(userResponse.data as IUser);
      } catch (error) {
        console.log(error);
        const responsError = (error as errorResponse).response.data.error;
        nav(`/404/${responsError}`);
      }
    }
    getData();
  }, [nav]);
  if (user == undefined) return <div></div>;
  return (
    <main className="relative w-full h-full overscroll-none text-mainWhite">
      <MobileSideBar />
      <SideBar />
      <MainBody user={user} />
    </main>
  );
};

export default WorkoutsPage;

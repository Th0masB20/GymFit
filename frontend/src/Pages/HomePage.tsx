import React, { useEffect, useState } from "react";
import axios_instance from "../utilities/AxiosInstance";
import IUser from "../interfaces/IUser";
import { NavLink, useNavigate } from "react-router-dom";
import HomePageData from "./HomePageWithData";
import SideBar from "../component/SideBar";
import { errorResponse } from "../interfaces/IError";
import MobileSideBar from "../component/MobileSideBar";

const HomePage = (): React.ReactElement => {
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
          }
        );
        if (userResponse.status == 200) {
          setUser(userResponse.data as IUser);
          if (
            (userResponse.data as IUser).age == undefined ||
            (userResponse.data as IUser).height == undefined
          ) {
            nav("/info");
          }
        } else {
          throw userResponse;
        }
      } catch (error) {
        const reponseError = (error as errorResponse).response.data.error;
        nav(`/404/${reponseError}`);
      }
    }
    getData();
  }, [nav]);
  if (user == undefined) return <div></div>;
  return (
    <main className="relative w-full h-screen overscroll-none">
      <MobileSideBar />
      <h1 className="text-center text-2xl ml-20 tablet:ml-0 mobile:hidden">
        Welcome, {user.name} {user.lastName}
      </h1>
      <div className="w-screen h-1 bg-main float-right" />
      <SideBar />
      <MainBody user={user} />
    </main>
  );
};

const MainBody = ({ user }: { user: IUser }): React.ReactElement => {
  if (user.workouts.length == 0) {
    return (
      <div className="ml-10 tablet:ml-0 absolute flex flex-col justify-center items-center w-80 h-48 mobile:w-60 mobile:h-40 bg-gradient-to-r from-main to-fourth rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <p className="text-center text-xl w-44">
          Start By Creating Your Workout Routine
        </p>

        <NavLink
          to="/workouts"
          className="w-8 h-8 bg-black rounded-full mt-3 hover:cursor-pointer hover:scale-110 transition-all flex justify-center items-center"
        >
          <div className="w-5 h-5 bg-WhiteAddSign bg-cover" />
        </NavLink>
      </div>
    );
  }
  return (
    <>
      <div className="ml-20 tablet:ml-0">
        <HomePageData user={user} />
      </div>
    </>
  );
};

export default HomePage;

import React from "react";
import UserProp from "../interfaces/UserProp";
import { TodayWorkout } from "../component/Home Page Components/TodayWorkout";
import { WeeklySchedule } from "../component/Home Page Components/WeeklySchedule";
import { ActivityLog } from "../component/Home Page Components/ActivityLog";
import LastWorkoutStats from "../component/Home Page Components/LastWorkout";
const HomePageData = ({ user }: UserProp): React.ReactElement => {
  return (
    <section className="w-full h-full flex flex-col justify-start">
      <div className="flex justify-center md:justify-center items-center w-full h-auto mt-6 ">
        <TodayWorkout user={user} />
        <WeeklySchedule user={user} />
      </div>
      <div className="flex justify-center items-center mt-6 xs:flex-col">
        <ActivityLog user={user} />
        <LastWorkoutStats user={user} />
      </div>
    </section>
  );
};

export default HomePageData;

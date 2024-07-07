import React from "react";
import UserProp from "../interfaces/UserProp";
import { TodayWorkout } from "../component/Home Page Components/TodayWorkout";
import { WeeklySchedule } from "../component/Home Page Components/WeeklySchedule";
import { ActivityLog } from "../component/Home Page Components/ActivityLog";
import LastWorkoutStats from "../component/Home Page Components/LastWorkout";
const HomePageData = ({ user }: UserProp): React.ReactElement => {
  return (
    <section className="ml-20 w-fit h-fit flex flex-col justify-start">
      <div className="flex justify-start items-center w-full h-auto ml-10 mt-6">
        <TodayWorkout user={user} />
        <WeeklySchedule user={user} />
      </div>
      <div className="flex justify-between items-center ml-10 mt-6">
        <ActivityLog user={user} />
        <LastWorkoutStats user={user} />
      </div>
    </section>
  );
};

export default HomePageData;

import React from "react";
import UserProp from "../interfaces/UserProp";
import { TodayWorkout } from "../component/Home Page Components/TodayWorkout";
import { WeeklySchedule } from "../component/Home Page Components/WeeklySchedule";
import { ActivityLog } from "../component/Home Page Components/ActivityLog";
import LastWorkoutStats from "../component/Home Page Components/LastWorkout";
const HomePageData = ({ user }: UserProp): React.ReactElement => {
  return (
    <section className="m-auto w-[75%] xl:w-full sm:w-[85%] h-full flex flex-col xl:justify-around text-mainWhite">
      <div className="flex justify-center md:justify-center items-center w-full h-auto mt-6 gap-10 lg:gap-4">
        <TodayWorkout user={user} />
        <WeeklySchedule user={user} />
      </div>
      <div className="flex justify-center items-center mt-6 xs:flex-col mb-10 md:justify-between gap-10 xs:gap-6 xs:mt-12">
        <ActivityLog user={user} />
        <LastWorkoutStats user={user} />
      </div>
    </section>
  );
};

export default HomePageData;

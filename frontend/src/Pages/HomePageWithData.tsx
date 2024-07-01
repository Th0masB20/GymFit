import React from "react";
import UserProp from "../interfaces/UserProp";
import { TodayWorkout } from "../component/Home Page Components/TodayWorkoutComponent";
import { WeeklySchedule } from "../component/Home Page Components/WeeklyScheduleComponent";
import { ActivityLog } from "../component/Home Page Components/ActivityLogComponent";
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

const LastWorkoutStats = ({ user }: UserProp): React.ReactElement => {
  return (
    <div className="flex flex-col items-center ml-10 w-96 h-80 bg-gradient-to-r from-main to-second rounded-3xl">
      <p className="underline font-bold pt-4">Last Workout Stats</p>
      <DisplayLastWorkout user={user} />
    </div>
  );
};

const DisplayLastWorkout = ({ user }: UserProp): React.ReactElement => {
  if (!user.previousWorkout) {
    return (
      <div className="w-10 h-12">
        <p>Start Your First Workout</p>
      </div>
    );
  }
  return (
    <section>
      {user.previousWorkout.exercises.map((exercise) => {
        return (
          <div className="w-60 h-10 bg-white flex flex-col items-center justify-center rounded-xl mt-3">
            <p className="underline font-semibold text-lg">
              {exercise.exerciseName}
            </p>
          </div>
        );
      })}
    </section>
  );
};

export default HomePageData;

import React, { useEffect, useState } from "react";
import IUser from "../../interfaces/IUser";
const HomePageData = ({ user }: { user: IUser }): React.ReactElement => {
  console.log(user);
  return (
    <section className="pl-20 w-fit h-fit flex">
      <div className="flex justify-between items-center w-full h-auto ml-10 mt-10">
        <TodayWorkout user={user} />
        <WeeklySchedule user={user} />
      </div>
      <div>
        {/* <ActivityLog />
        <LastWorkoutStats /> */}
      </div>
    </section>
  );
};

const TodayWorkout = ({ user }: { user: IUser }): React.ReactElement => {
  const [todayExercise, setTodayExercise] = useState<string>("");

  useEffect(() => {
    const dateArray = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    setTodayExercise("");
    if (!user) return;
    const todayIndex = new Date().getDay();
    const exerciseName = user.weeklyCalendar[dateArray[todayIndex]];
    if (exerciseName) {
      setTodayExercise(exerciseName);
    }
  }, [user]);
  return (
    <div className=" mr-10 flex flex-col justify-center items-center w-60 h-48 rounded-2xl bg-gradient-to-r from-main to-second">
      <p className="text-center underline pb-5">Today's Exercise</p>
      <p className="text-center text-lg font-bold">{todayExercise}</p>
    </div>
  );
};

const WeeklySchedule = ({ user }: { user: IUser }): React.ReactElement => {
  const [mapOfExercises, setExerciseMap] = useState<React.ReactElement[]>([]);
  useEffect(() => {
    setExerciseMap([]);
    for (const weekDay in user.weeklyCalendar as object) {
      setExerciseMap((current) =>
        current.concat(
          <div className="flex flex-col justify-center items-center w-24 h-28 mx-3 bg-soft-3 rounded-2xl">
            <p className="underline mb-4">{weekDay}</p>
            {(user.weeklyCalendar as object[weekDay]) ? (
              <p>{(user.weeklyCalendar as object)[weekDay]}</p>
            ) : (
              <p>Rest</p>
            )}
          </div>
        )
      );
    }
  }, [user.weeklyCalendar]);
  return (
    <div className="w-aut h-48 rounded-2xl bg-gradient-to-r from-main to-second flex flex-col justify-center items-center">
      <p className="mb-5 underline">Weekly Schedule</p>
      <div className="flex">
        {mapOfExercises ? mapOfExercises : <div></div>}
      </div>
    </div>
  );
};

export default HomePageData;

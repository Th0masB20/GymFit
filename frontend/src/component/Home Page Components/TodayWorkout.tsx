import { useEffect, useState } from "react";
import UserProp from "../../interfaces/UserProp";

export const TodayWorkout = ({ user }: UserProp): React.ReactElement => {
  const [todayExercise, setTodayExercise] = useState<string>("");

  useEffect(() => {
    const dateArray = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    setTodayExercise("");
    if (!user) return;
    const todayIndex = new Date().getDay();
    console.log(todayIndex);
    const exerciseName = user.weeklyCalendar[dateArray[todayIndex]];
    if (exerciseName) {
      setTodayExercise(exerciseName);
    }
  }, [user]);
  return (
    <div className="flex flex-col justify-center items-center w-60 h-48 rounded-2xl bg-gradient-to-r from-main to-second">
      <p className="text-center underline pb-5">Today's Exercise</p>
      <p className="text-center text-lg font-bold">
        {todayExercise ? todayExercise : "No Workout For Today"}
      </p>
    </div>
  );
};

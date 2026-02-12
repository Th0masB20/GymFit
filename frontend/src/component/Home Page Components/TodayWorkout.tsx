import { useEffect, useState } from "react";
import UserProp from "../../interfaces/UserProp";
import { IWeekDay } from "../../interfaces/ICalendar";
import moment from "moment";
import { NavLink } from "react-router-dom";

export const TodayWorkout = ({ user }: UserProp): React.ReactElement => {
  const [todayExercise, setTodayExercise] = useState<string>("");

  useEffect(() => {
    const dateArray: IWeekDay[] = [
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
    const dayIndex = moment().day();
    const weekYearIndex = moment().week() - 1;
    const exerciseName: string =
      user.yearWeeklyCalendar[weekYearIndex][dateArray[dayIndex]].workoutName;
    if (exerciseName) {
      setTodayExercise(exerciseName);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center gap-8 w-52 h-48 rounded-2xl bg-cardBackground lg:w-40 md:hidden shadow-sm">
      <div className="w-full flex flex-col items-center">
        <p className="text-center mt-2 text-lg md: text-md font-bold">
          Today's Exercise
        </p>
        <div className="w-full h-[3px] bg-third mt-1" />
      </div>
      <p className="text-center text-lg">
        {todayExercise ? todayExercise : "No Workout For Today"}
      </p>
      <div>
        {todayExercise ? (
          <NavLink
            to="/workouts"
            className="bg-third hover:bg-fourth hover:text-mainDark p-2 px-4 rounded-lg transition-all duration-200"
          >
            Start Workout
          </NavLink>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

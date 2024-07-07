import { useEffect, useState } from "react";
import UserProp from "../../interfaces/UserProp";

export const WeeklySchedule = ({ user }: UserProp): React.ReactElement => {
  const [mapOfExercises, setExerciseMap] = useState<React.ReactElement[]>([]);
  useEffect(() => {
    setExerciseMap([]);
    for (const weekDay in user.weeklyCalendar as object) {
      setExerciseMap((current) =>
        current.concat(
          <div className="flex flex-col justify-center items-center w-24 h-28 mx-3 bg-soft-3 rounded-2xl">
            <p className="underline mb-4">{weekDay}</p>
            {user.weeklyCalendar[weekDay] ? (
              <p>{user.weeklyCalendar[weekDay]}</p>
            ) : (
              <p>Rest</p>
            )}
          </div>
        )
      );
    }
  }, [user.weeklyCalendar]);
  return (
    <div className="ml-10 w-auto h-48 rounded-2xl bg-gradient-to-r from-main to-second flex flex-col justify-center items-center">
      <p className="mb-5 underline">Weekly Schedule</p>
      <div className="flex">
        {mapOfExercises ? mapOfExercises : <div></div>}
      </div>
    </div>
  );
};

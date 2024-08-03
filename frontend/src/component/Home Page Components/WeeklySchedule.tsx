import { useEffect, useState } from "react";
import UserProp from "../../interfaces/UserProp";
import { IWeekDay } from "../../interfaces/ICalendar";
import moment from "moment";

export const WeeklySchedule = ({ user }: UserProp): React.ReactElement => {
  const [mapOfExercises, setExerciseMap] = useState<React.ReactElement[]>([]);
  useEffect(() => {
    setExerciseMap([]);
    for (const weekDay in user.yearWeeklyCalendar[moment().week()]) {
      console.log(weekDay);

      setExerciseMap((current) =>
        current.concat(
          <div
            className="flex flex-col justify-center items-center w-24 h-28 mx-3 bg-soft-3 rounded-2xl 
            lg:w-[5rem] lg:mx-2 lg:px-2
            xs:w-[70px]"
          >
            <p className="underline mb-4 lg:text-sm md:text-xs font-bold">
              {weekDay}
            </p>
            {user.yearWeeklyCalendar[moment().week()][weekDay as IWeekDay] ? (
              <p className="lg:text-sm md:text-xs text-nowrap">
                {
                  user.yearWeeklyCalendar[moment().week()][weekDay as IWeekDay]
                    .workoutName
                }
              </p>
            ) : (
              <p className="lg:text-sm">Rest</p>
            )}
          </div>
        )
      );
    }
  }, [user.yearWeeklyCalendar]);
  return (
    <div className="ml-10 md:ml-0 w-auto h-48 rounded-2xl bg-gradient-to-r from-main to-second flex flex-col justify-center items-center">
      <p className="mb-5 underline">Weekly Schedule</p>
      <div className="flex">
        {mapOfExercises ? mapOfExercises : <div></div>}
      </div>
    </div>
  );
};

import { useEffect, useState } from "react";
import UserProp from "../../interfaces/UserProp";
import { IWeekDay } from "../../interfaces/ICalendar";
import moment from "moment";

export const WeeklySchedule = ({ user }: UserProp): React.ReactElement => {
  const [mapOfExercises, setExerciseMap] = useState<React.ReactElement[]>([]);
  const [selectedDay, setSelectedDay] = useState<IWeekDay | undefined>(
    undefined
  );
  const weekYearIndex = moment().week() - 1;
  useEffect(() => {
    setExerciseMap([]);
    for (const weekDay in user.yearWeeklyCalendar[weekYearIndex]) {
      setExerciseMap((current) =>
        current.concat(
          <div
            className="xs:bg-second xs:mx-[2px] xs:rounded-lg focus-within:bg-fuchsia-300"
            onClick={() => setSelectedDay(weekDay as IWeekDay)}
          >
            <div className="flex justify-center items-center xs:w-9">
              <p className="underline mb-4 lg:text-sm md:text-xsfont-bold xs:hidden">
                {weekDay}
              </p>
              <p className="hidden mb-2 lg:text-sm md:text-xs font-bold xs:block">
                {weekDay.substring(0, 1)}
              </p>
            </div>
            <div className="hidden xs:flex xs:justify-center">
              <button>o</button>
            </div>

            <div
              className="flex justify-center items-center w-28 h-10 mx-3 bg-soft-3 rounded-2xl 
            lg:w-20 lg:mx-2 lg:px-2
            xs:w-16 xs:hidden"
            >
              {user.yearWeeklyCalendar[weekYearIndex][weekDay as IWeekDay] ? (
                <p className="lg:text-sm md:text-xs text-nowrap">
                  {
                    user.yearWeeklyCalendar[weekYearIndex][weekDay as IWeekDay]
                      .workoutName
                  }
                </p>
              ) : (
                <p className="lg:text-sm">Rest</p>
              )}
            </div>
            <div></div>
          </div>
        )
      );
    }
  }, [user.yearWeeklyCalendar, weekYearIndex]);
  return (
    <div className="ml-10 md:ml-0 w-auto h-48 xs:h-52 rounded-2xl bg-gradient-to-r xs:bg-main from-main to-fourth flex flex-col justify-center items-center">
      <p className="mb-5 font-bold">Weekly Schedule</p>
      <div className="flex">
        {mapOfExercises ? mapOfExercises : <div></div>}
      </div>
      <div className="hidden xs:flex xs:justify-center xs:items-center rounded-xl bg-second mt-4 w-11/12 h-10">
        <p className="text-center">
          {selectedDay
            ? user.yearWeeklyCalendar[weekYearIndex][selectedDay].workoutName ||
              "Rest"
            : "No Workout Set Yet"}
        </p>
      </div>
    </div>
  );
};

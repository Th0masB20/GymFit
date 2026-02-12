import { useEffect, useState } from "react";
import UserProp from "../../interfaces/UserProp";
import { IWeekDay } from "../../interfaces/ICalendar";
import moment from "moment";

export const WeeklySchedule = ({ user }: UserProp): React.ReactElement => {
  const [mapOfExercises, setExerciseMap] = useState<React.ReactElement[]>([]);
  const [selectedDay, setSelectedDay] = useState<IWeekDay | undefined>(
    undefined,
  );
  const weekYearIndex = moment().week() - 1;
  useEffect(() => {
    setExerciseMap([]);
    const orderedWeekDays: IWeekDay[] = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    for (const weekDay of orderedWeekDays) {
      setExerciseMap((current) =>
        current.concat(
          <div
            className="xs:mx-[2px] xs:rounded-lg focus-within:bg-accent"
            onClick={() => setSelectedDay(weekDay as IWeekDay)}
            key={current.length + 5000}
          >
            <div className="flex justify-center items-center xs:w-9">
              <p className="mb-4 lg:text-sm md:text-xsfont-bold xs:hidden">
                {weekDay}
              </p>
              <p className="hidden mb-2 lg:text-sm md:text-xs font-bold xs:block">
                {weekDay.substring(0, 1)}
              </p>
            </div>
            <div className="hidden xs:flex xs:justify-center">
              <div>o</div>
            </div>

            <div
              className="flex justify-center items-center w-20 h-10 mx-3 bg-third rounded-2xl 
            lg:w-20 lg:mx-2 lg:px-2
            xs:w-16 xs:hidden"
            >
              {user.yearWeeklyCalendar[weekYearIndex][weekDay as IWeekDay] ? (
                <p className="xl:text-xs lg:text-xs md:text-xs text-nowrap">
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
          </div>,
          <div key={current.length + 5500}>
            {weekDay != "Saturday" ? (
              <div className="w-[3px] h-full bg-third" />
            ) : (
              <div></div>
            )}
          </div>,
        ),
      );
    }
  }, [user.yearWeeklyCalendar, weekYearIndex]);
  return (
    <div className="w-auto h-48 xs:h-52 rounded-2xl bg-cardBackground flex flex-col gap-10 items-center text-darkText md:w-full md:min-w-fit xs:w-auto">
      <div className="w-full text-lg flex flex-col items-center">
        <p className="font-bold mt-2 text-center text-lg md:text-base">
          Weekly Schedule
        </p>
        <div className="w-full h-[3px] mt-1 bg-third" />
      </div>
      <div className="flex">
        {mapOfExercises ? mapOfExercises : <div></div>}
      </div>
      <div className="hidden xs:flex xs:justify-center xs:items-center rounded-xl mb-8 bg-main w-7/12 h-10">
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

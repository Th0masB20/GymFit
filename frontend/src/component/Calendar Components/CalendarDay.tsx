import React from "react";
import { IEditMonthDate, IMonthName } from "../../interfaces/ICalendar";

const CalendarDay = ({
  workoutName,
  date,
  month,
  gridStart,
  setEditCalDay,
  getDateMonth,
}: {
  workoutName: string;
  date: number;
  month: IMonthName;
  gridStart: string;
  setEditCalDay: React.Dispatch<React.SetStateAction<boolean>>;
  getDateMonth: React.Dispatch<React.SetStateAction<IEditMonthDate>>;
}): React.ReactElement => {
  return (
    <div
      className={
        "w-full h-full bg-soft-4 rounded-lg flex flex-col " + gridStart
      }
    >
      <p className="pl-2 mt-2">{date}</p>
      {workoutName ? (
        <button
          className="w-fit items-center m-auto bg-soft-5 p-2 text-center text-xs rounded-xl hover:scale-105 transition-all"
          onClick={() => {
            setEditCalDay(true);
            getDateMonth({ date, month });
          }}
        >
          {workoutName}
        </button>
      ) : (
        <button
          className="w-fit items-center m-auto bg-soft-3 p-2 text-center text-xs rounded-xl hover:scale-105 transition-all"
          onClick={() => {
            setEditCalDay(true);
            getDateMonth({ date, month });
          }}
        >
          Rest
        </button>
      )}
    </div>
  );
};

export default CalendarDay;

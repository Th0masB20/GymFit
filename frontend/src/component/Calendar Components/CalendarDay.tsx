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
      className={`w-full h-full md:h-[60px] md:w-16 mobile:w-8 mobile:h-12 bg-soft-4 rounded-lg flex flex-col select-none ${gridStart} ${
        window.innerWidth <= 1100 ? "active:bg-soft-1" : ""
      }`}
      onClick={() => {
        if (window.innerWidth <= 1100 && workoutName) {
          setEditCalDay(true);
          getDateMonth({ date, month });
        }
      }}
    >
      <p className="pl-2 mt-2 select-none">{date}</p>
      {workoutName ? (
        <>
          <button
            className=" md:hidden w-fit items-center m-auto bg-soft-5 p-2 text-center text-xs rounded-xl hover:scale-105 transition-all select-none"
            onClick={() => {
              setEditCalDay(true);
              getDateMonth({ date, month });
            }}
          >
            {workoutName}
          </button>
          {/* displays when screen is smaller */}
          <div className="invisible md:visible bg-soft-2 w-3 h-3 m-auto rounded-full select-none"></div>
        </>
      ) : (
        <button
          className="md:invisible w-fit items-center m-auto bg-soft-3 p-2 text-center text-xs rounded-xl hover:scale-105 transition-all select-none"
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

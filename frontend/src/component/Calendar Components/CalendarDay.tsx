import React from "react";

const CalendarDay = ({
  workoutName,
  date,
  gridStart,
}: {
  workoutName: string;
  date: string;
  gridStart: string;
}): React.ReactElement => {
  return (
    <div
      className={
        "w-full h-full bg-soft-4 rounded-lg flex flex-col " + gridStart
      }
    >
      <p className="pl-2 mt-2">{date}</p>
      {workoutName ? (
        <p className="w-fit items-center m-auto bg-soft-5 p-2 text-center text-xs rounded-xl">
          {workoutName}
        </p>
      ) : (
        <p className="w-fit items-center m-auto bg-soft-3 p-2 text-center text-xs rounded-xl">
          Rest
        </p>
      )}
    </div>
  );
};

export default CalendarDay;

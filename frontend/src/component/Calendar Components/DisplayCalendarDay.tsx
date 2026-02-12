import React from "react";

const DisplayCalendarDay = ({
  workoutName,
  date,
}: {
  workoutName: string;
  date: string;
}): React.ReactElement => {
  return (
    <div className="w-32 h-32 mx-auto mt-8 bg-soft-4 rounded-lg flex flex-col bg-soft-1">
      <p className="pl-2 mt-2">{date}</p>
      {workoutName ? (
        <p className="w-fit items-center m-auto bg-soft-5 p-2 text-center text-xs rounded-xl hover:scale-105 transition-all bg-third">
          {workoutName}
        </p>
      ) : (
        <p className="w-fit items-center m-auto bg-soft-3 p-2 text-center text-xs rounded-xl hover:scale-105 transition-all">
          Rest
        </p>
      )}
    </div>
  );
};

export default DisplayCalendarDay;

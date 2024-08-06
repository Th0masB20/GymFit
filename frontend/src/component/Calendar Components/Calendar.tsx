import React from "react";
import IUser from "../../interfaces/IUser";
import moment from "moment";
import { IMonthName } from "../../interfaces/ICalendar";
import CalendarDay from "./CalendarDay";
const Calendar = ({
  user,
  monthNumber,
}: {
  user: IUser;
  monthNumber: number;
}): React.ReactElement => {
  const getMonth = (monthIndex: number): IMonthName => {
    const monthArr: IMonthName[] = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return monthArr[monthIndex];
  };

  const getGridStart = (startDay: number): string => {
    let gridStart: string = "";
    switch (startDay) {
      case 0:
        gridStart = "col-start-0";
        break;
      case 1:
        gridStart = "col-start-1";
        break;
      case 2:
        gridStart = "col-start-2";
        break;
      case 3:
        gridStart = "col-start-3";
        break;
      case 4:
        gridStart = "col-start-4";
        break;
      case 5:
        gridStart = "col-start-5";
        break;
      case 6:
        gridStart = "col-start-6";
        break;
      case 7:
        gridStart = "col-start-7";
        break;
    }

    return gridStart;
  };

  const createCalendar = (
    user: IUser,
    monthNumber: number
  ): React.ReactElement[] => {
    const calendarObject: React.ReactElement[] = [] as React.ReactElement[];
    const currentMonth = getMonth(monthNumber);
    const startDay = moment().month(currentMonth).day();
    const gridStart = getGridStart(startDay);

    for (const date in user.monthlyCalendar[currentMonth]) {
      if (date == "1") {
        calendarObject.push(
          <CalendarDay
            workoutName={user.monthlyCalendar[currentMonth][date].workoutName}
            date={date}
            gridStart={gridStart}
          />
        );
        continue;
      }
      calendarObject.push(
        <CalendarDay
          workoutName={user.monthlyCalendar[currentMonth][date].workoutName}
          date={date}
          gridStart={""}
        />
      );
    }

    calendarObject[0];
    return calendarObject;
  };
  return (
    <div className="w-[1000px] h-full inline-block">
      <h1 className="w-auto h-auto px-4 gap-3 mx-3 text-center text-2xl font-bold">
        {getMonth(monthNumber)}
      </h1>
      <div className="w-auto h-auto grid grid-cols-7 grid-rows-1 px-4 gap-3 mx-3 text-center">
        <p>Su</p>
        <p>Mo</p>
        <p>Tu</p>
        <p>We</p>
        <p>Thu</p>
        <p>Fr</p>
        <p>Sa</p>
      </div>
      <div className="w-auto h-[90%] bg-second rounded-2xl grid grid-cols-7 grid-rows-5 p-4 gap-3 mx-3">
        {createCalendar(user, monthNumber)}
      </div>
    </div>
  );
};

export default Calendar;

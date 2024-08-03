import React from "react";
import IUser from "../../interfaces/IUser";
import moment from "moment";
import { IMonthName } from "../../interfaces/ICalendar";
import CalendarDay from "./CalendarDay";
const Calendar = ({ user }: { user: IUser }): React.ReactElement => {
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

  const createCalendar = (user: IUser): React.ReactElement[] => {
    const calendarObject: React.ReactElement[] = [] as React.ReactElement[];
    const currentMonth = getMonth(moment().month());
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
    <>
      <div className="m-auto w-[80%] h-auto flex justify-around text-center">
        <p>Su</p>
        <p>Mo</p>
        <p>Tu</p>
        <p>We</p>
        <p>Thu</p>
        <p>Fr</p>
        <p>Sa</p>
      </div>
      <div className="m-auto w-[80%] h-[92%] bg-second rounded-2xl grid grid-cols-7 grid-rows-5 p-4 gap-3">
        {createCalendar(user)}
      </div>
    </>
  );
};

export default Calendar;

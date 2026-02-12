import React from "react";
import IUser from "../../interfaces/IUser";
import moment from "moment";
import { IEditMonthDate, IMonthName } from "../../interfaces/ICalendar";
import CalendarDay from "./CalendarDay";
const Calendar = ({
  user,
  monthNumber,
  setEditCalDay,
  getDateMonth,
}: {
  user: IUser;
  monthNumber: number;
  setEditCalDay: React.Dispatch<React.SetStateAction<boolean>>;
  getDateMonth: React.Dispatch<React.SetStateAction<IEditMonthDate>>;
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
        gridStart = "col-start-1";
        break;
      case 1:
        gridStart = "col-start-2";
        break;
      case 2:
        gridStart = "col-start-3";
        break;
      case 3:
        gridStart = "col-start-4";
        break;
      case 4:
        gridStart = "col-start-5";
        break;
      case 5:
        gridStart = "col-start-6";
        break;
      case 6:
        gridStart = "col-start-7";
        break;
      case 7:
        gridStart = "col-start-1";
        break;
    }

    return gridStart;
  };

  const createCalendar = (
    user: IUser,
    monthNumber: number,
  ): React.ReactElement[] => {
    const calendarObject: React.ReactElement[] = [] as React.ReactElement[];
    const currentMonth = getMonth(monthNumber);
    const startDay = moment().month(currentMonth).startOf("month").weekday();
    const gridStart = getGridStart(startDay);

    for (const date in user.monthlyCalendar[currentMonth]) {
      const numberDate = Number(date);
      if (numberDate == 1) {
        calendarObject.push(
          <CalendarDay
            workoutName={user.monthlyCalendar[currentMonth][date].workoutName}
            date={numberDate}
            month={currentMonth}
            gridStart={gridStart}
            setEditCalDay={setEditCalDay}
            getDateMonth={getDateMonth}
            key={date + 100000}
          />,
        );
        continue;
      }
      calendarObject.push(
        <CalendarDay
          workoutName={user.monthlyCalendar[currentMonth][date].workoutName}
          date={numberDate}
          month={currentMonth}
          gridStart={""}
          setEditCalDay={setEditCalDay}
          getDateMonth={getDateMonth}
          key={date + 150000}
        />,
      );
    }

    calendarObject[0];
    return calendarObject;
  };
  return (
    <div className="mobile:w-80 mobile:h-[400px] md:w-[600px] w-[1000px] xll:w-[1250px] h-full inline-block mobile:mb-10">
      <h1 className="w-auto h-auto px-4 gap-3 mx-3 text-center text-2xl font-bold select-none text-mainWhite">
        {getMonth(monthNumber)}
      </h1>
      <div className="w-auto h-auto grid grid-cols-7 grid-rows-1 px-4 gap-3 mx-3 text-center select-none text-mainWhite hover:cursor-auto">
        <p>Su</p>
        <p>Mo</p>
        <p>Tu</p>
        <p>We</p>
        <p>Thu</p>
        <p>Fr</p>
        <p>Sa</p>
      </div>
      <div className="w-auto h-[90%] md:h-[85%] bg-third rounded-2xl grid grid-cols-7 grid-rows-5 p-4 gap-3 mx-3">
        {createCalendar(user, monthNumber)}
      </div>
    </div>
  );
};

export default Calendar;

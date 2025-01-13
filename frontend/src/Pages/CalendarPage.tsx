import React, { useEffect, useRef, useState } from "react";
import SideBar from "../component/SideBar";
import Calendar from "../component/Calendar Components/Calendar";
import IUser from "../interfaces/IUser";
import { useNavigate } from "react-router-dom";
import axios_instance from "../utilities/AxiosInstance";
import moment from "moment";
import EditCalendarDay from "../component/Calendar Components/EditCalendarDay";
import { IEditMonthDate } from "../interfaces/ICalendar";
import { errorResponse } from "../interfaces/IError";

const CalendarPage = (): React.ReactElement => {
  // const getNumberOfDays;
  const [user, setUser] = useState<IUser>();
  const calContainerRef = useRef<HTMLDivElement>(null);
  const [editCalDay, setEditCalDay] = useState<boolean>(false);
  const [shiftValue, setShiftValue] = useState<number>(
    window.innerWidth >= 1400 ? 1250 : 1000
  );
  const [dateMonth, getDateMonth] = useState<IEditMonthDate>({
    date: 0,
    month: "",
  });

  const [currentTranslate, setTranslate] = useState<number>(
    moment().month() * -shiftValue
  );
  // const [minMaxTranslate] = useState<number[]>([0, 12 * 1000]);

  useEffect(() => {
    window.addEventListener("resize", () =>
      setShiftValue(window.innerWidth >= 1400 ? 1250 : 1000)
    );
  }, []);

  const nav = useNavigate();
  useEffect(() => {
    //gets user
    async function getData() {
      try {
        const userResponse = await axios_instance.get("/home/user", {
          withCredentials: true,
          headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
        });
        setUser(userResponse.data as IUser);
      } catch (error) {
        const errorMessage = (error as errorResponse).response.data.error;
        nav(`/404/${errorMessage}`);
      }
    }

    getData();
  }, [nav, editCalDay]);

  useEffect(() => {
    const setTranslatePosition = (): void => {
      console.log(calContainerRef);
      if (!calContainerRef || !calContainerRef.current) return;
      calContainerRef.current.style.transform = `translateX(${currentTranslate}px)`;
    };

    setTranslatePosition();
  });
  if (!user) return <div></div>;
  if (!calContainerRef) return <div></div>;

  const moveRight = () => {
    if (!calContainerRef || !calContainerRef.current) return <div></div>;
    //12months * 1000px
    if (currentTranslate - shiftValue < -(11 * shiftValue)) {
      return;
    }
    setTranslate((current) => current - shiftValue);
    calContainerRef.current.style.transform = `translateX(${
      currentTranslate - shiftValue
    }px)`;
  };

  const moveLeft = () => {
    if (!calContainerRef || !calContainerRef.current) return <div></div>;
    //12months * 1000px
    if (currentTranslate + shiftValue > 0) {
      return;
    }
    setTranslate((current) => current + shiftValue);
    calContainerRef.current.style.transform = `translateX(${
      currentTranslate + shiftValue
    }px)`;
  };

  const createEntireCalendar = (): React.ReactElement[] => {
    const calendarsArray: React.ReactElement[] = [];
    for (let i = 0; i < 12; i++) {
      calendarsArray.push(
        <Calendar
          user={user}
          monthNumber={i}
          setEditCalDay={setEditCalDay}
          getDateMonth={getDateMonth}
        />
      );
    }

    return calendarsArray;
  };
  return (
    <main className="w-screen h-screen">
      {editCalDay ? (
        <EditCalendarDay
          user={user}
          dateMonth={dateMonth}
          setEditCalDay={setEditCalDay}
        />
      ) : null}

      <SideBar />
      <section className="w-screen h-screen flex-auto flex-col">
        <h1 className="text-center text-2xl pl-20">Calendar</h1>
        <div className="w-screen h-1 bg-main float-right" />
        {/* flex container of everything */}
        <div className="w-full h-[90%] pl-20 pt-5 flex justify-center">
          <div className="bg-LeftArrow arrowButton z-10" onClick={moveLeft} />
          <div className="w-[1000px] h-full whitespace-nowrap overflow-hidden xl:w-[1250px]">
            <div
              className={"w-fit h-full transition-all "}
              ref={calContainerRef}
            >
              {createEntireCalendar()}
            </div>
          </div>
          <div className="bg-RightArrow arrowButton z-10" onClick={moveRight} />
        </div>
      </section>
    </main>
  );
};

export default CalendarPage;

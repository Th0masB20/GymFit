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
import MobileSideBar from "../component/MobileSideBar";
import { mouseDown, mouseMove, mouseUp } from "../utilities/ClickAndDrag";

function useWindowWidth() {
  const [windowWidth, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const resize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", resize);
  }, []);
  return windowWidth;
}

const CalendarPage = (): React.ReactElement => {
  // const getNumberOfDays;
  const [isDown, setIsDown] = useState<boolean>(false);
  const [startY, setStartY] = useState<number>(0);
  const [startTranslate, setStartTranslate] = useState<number>(0);

  const [user, setUser] = useState<IUser>();
  const calContainerRef = useRef<HTMLDivElement>(null);

  const [editCalDay, setEditCalDay] = useState<boolean>(false);
  const windowWidth = useWindowWidth();
  const [shiftValue, setShiftValue] = useState<number>(1250);
  const [dateMonth, getDateMonth] = useState<IEditMonthDate>({
    date: 0,
    month: "",
  });
  const [currentTranslate, setTranslate] = useState<number>(
    moment().month() * -shiftValue
  );

  const [currentMonthViewed, setViewedMonth] = useState<number>(
    moment().month()
  );
  const nav = useNavigate();

  useEffect(() => {
    const setTranslatePosition = (): void => {
      if (!calContainerRef || !calContainerRef.current) return;
      if (windowWidth <= 670)
        calContainerRef.current.style.transform = `translateY(${currentTranslate}px)`;
      else
        calContainerRef.current.style.transform = `translateX(${currentTranslate}px)`;
    };

    setTranslatePosition();
  }, [currentTranslate, windowWidth]);

  // const [minMaxTranslate] = useState<number[]>([0, 12 * 1000]);
  useEffect(() => {
    if (windowWidth <= 670) return;
    let variableShiftValue = 1250;
    if (windowWidth >= 1450) variableShiftValue = 1250;
    else if (windowWidth >= 1200) variableShiftValue = 1000;
    else variableShiftValue = 600;

    setShiftValue(variableShiftValue);
    setTranslate(currentMonthViewed * -shiftValue);
  }, [currentMonthViewed, currentTranslate, shiftValue, windowWidth]);

  useEffect(() => {
    //gets user
    async function getData() {
      try {
        const userResponse = await axios_instance.get(
          import.meta.env.VITE_BACKEND_URL + "/home/user",
          {
            withCredentials: true,
            headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
          }
        );
        if (userResponse.status != 200) throw userResponse;

        setUser(userResponse.data as IUser);
      } catch (error) {
        const errorMessage = (error as errorResponse).response.data.error;
        nav(`/404/${errorMessage}`);
      }
    }

    getData();
  }, [nav, editCalDay]);

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

    setViewedMonth((currentTranslate - shiftValue) / -shiftValue);
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

    setViewedMonth((currentTranslate + shiftValue) / -shiftValue);
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
    <main className="w-screen h-screen mobile:overflow-hidden">
      {editCalDay ? (
        <EditCalendarDay
          user={user}
          dateMonth={dateMonth}
          setEditCalDay={setEditCalDay}
        />
      ) : null}
      <MobileSideBar />
      <SideBar />
      <section className="w-screen h-screen flex-auto flex-col">
        <h1 className="text-center text-2xl pl-20 tablet:pl-0 mobile:hidden">
          Calendar
        </h1>
        <div className="w-screen h-1 bg-main float-right" />
        {/* flex container of everything */}
        <div
          className="w-full h-[90%] pl-20 tablet:pl-0 pt-5 mobile:pt-2 mobile:h-96 flex justify-center"
          onTouchStart={(e: React.TouchEvent<HTMLDivElement>) =>
            mouseDown(
              setIsDown,
              e,
              calContainerRef,
              setStartY,
              setStartTranslate
            )
          }
          onTouchMove={(e: React.TouchEvent<HTMLDivElement>) => {
            mouseMove(
              isDown,
              startTranslate,
              startY,
              e,
              setTranslate,
              setIsDown,
              calContainerRef
            );
          }}
          onTouchEnd={() => {
            mouseUp(setIsDown, setTranslate, calContainerRef);
          }}
          onTouchCancel={() =>
            mouseUp(setIsDown, setTranslate, calContainerRef)
          }
        >
          <div
            className="mobile:hidden bg-LeftArrow arrowButton z-10"
            onClick={moveLeft}
          />
          <div className="mobile:h-screen mobile:w-80 md:w-[600px] w-[1000px] h-full mobile:whitespace-normal whitespace-nowrap xll:w-[1250px] overflow-hidden">
            {/*container for the calendar*/}
            <div
              className={
                "w-fit h-full mobile:w-full mobile:h-fit transition-all cursor-pointer"
              }
              ref={calContainerRef}
            >
              {createEntireCalendar()}
            </div>
          </div>
          <div
            className="mobile:hidden bg-RightArrow arrowButton z-10"
            onClick={moveRight}
          />
        </div>
      </section>
    </main>
  );
};

export default CalendarPage;

import React, { useEffect, useRef, useState } from "react";
import SideBar from "../component/SideBar";
import Calendar from "../component/Calendar Components/Calendar";
import IUser from "../interfaces/IUser";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const CalendarPage = (): React.ReactElement => {
  // const getNumberOfDays;
  const [user, setUser] = useState<IUser>();
  const calContainerRef = useRef<HTMLDivElement>(null);
  const [currentTranslate, setTranslate] = useState<number>(
    moment().month() * -1000
  );
  // const [minMaxTranslate] = useState<number[]>([0, 12 * 1000]);

  const nav = useNavigate();
  useEffect(() => {
    async function getData() {
      try {
        const userResponse = await axios.get("http://localhost:3000/home/", {
          withCredentials: true,
        });
        setUser(userResponse.data as IUser);
      } catch (error) {
        nav("/404");
      }
    }

    getData();
  }, [nav]);

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
    if (currentTranslate - 1000 < -11000) {
      return;
    }
    setTranslate((current) => current - 1000);
    calContainerRef.current.style.transform = `translateX(${
      currentTranslate - 1000
    }px)`;
  };

  const moveLeft = () => {
    if (!calContainerRef || !calContainerRef.current) return <div></div>;
    //12months * 1000px
    if (currentTranslate + 1000 > 0) {
      return;
    }
    setTranslate((current) => current + 1000);
    calContainerRef.current.style.transform = `translateX(${
      currentTranslate + 1000
    }px)`;
  };

  const createEntireCalendar = (): React.ReactElement[] => {
    const calendarsArray: React.ReactElement[] = [];
    for (let i = 0; i < 12; i++) {
      calendarsArray.push(<Calendar user={user} monthNumber={i} />);
    }

    return calendarsArray;
  };

  return (
    <main className="w-screen h-screen">
      <SideBar />
      <section className="w-screen h-screen flex-auto flex-col">
        <h1 className="text-center text-2xl pl-20">Calendar</h1>
        <div className="w-screen h-1 bg-main float-right" />
        {/* flex container of everything */}
        <div className="w-full h-[90%] pl-20 pt-5 flex justify-center">
          <div className="bg-LeftArrow arrowButton z-10" onClick={moveLeft} />
          <div className="w-[1000px] h-full whitespace-nowrap overflow-hidden">
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

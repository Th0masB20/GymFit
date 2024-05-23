import React, { useEffect, useState } from "react";
import IUser, { IWorkout } from "../interfaces/IUser";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const WorkoutsPage = (): React.ReactElement => {
  const [user, setUser] = useState<IUser>();
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
  if (user == undefined) return <div></div>;
  return (
    <main className="relative w-full h-full">
      <h1 className="text-center text-2xl ml-20">Workouts</h1>
      <div className="w-full h-1 bg-main float-right" />
      <SideBar />
      <MainBody user={user} />
    </main>
  );
};

const SideBar = (): React.ReactElement => {
  return (
    <nav className="h-full w-20 bg-main fixed top-0 flex flex-col justify-between items-center z-10">
      <div className="flex justify-center bg-[rgba(255,255,255,0.95)] mt-4 p-1 rounded-lg hover:scale-110">
        <NavLink to="/home" className="bg-HomeImage bg-cover w-11 h-11" />
      </div>
      <div className="flex flex-col items-center justify-between h-48 w-full">
        <NavLink
          to="/workouts"
          className="bg-WorkoutImage bg-cover w-16 h-16 hover:scale-110"
        />
        <button className="bg-CalendarImage bg-cover w-12 h-12 hover:scale-110" />
        <button className="bg-SettingsImage bg-cover w-11 h-11 hover:scale-110" />
      </div>
    </nav>
  );
};

const MainBody = ({ user }: { user: IUser }): React.ReactElement => {
  return (
    <>
      <section className="ml-32 mt-10 w-fit grid grid-cols-3 gap-16 mb-24">
        {user.workouts.map((workout, i) => {
          return <WorkoutTab workout={workout} key={i + 10000} />;
        })}
      </section>
      <div className="fixed w-full h-20 pl-20 bg-footer-background bottom-0 flex flex-col justify-center items-center">
        <NavLink
          to="/workouts/create"
          className="w-80 h-10 bg-main rounded-lg hover:scale-110 text-center text-xl flex items-center justify-center"
        >
          Create Workout
        </NavLink>
      </div>
    </>
  );
};

const WorkoutTab = ({ workout }: { workout: IWorkout }): React.ReactElement => {
  return (
    <div className="m-auto w-80 h-80 bg-fourth rounded-3xl flex flex-col items-center">
      <p className="text-center underline text-2xl mt-10">
        {workout.workoutName}
      </p>
      <div className="flex flex-col align-center my-5 h-36">
        {workout.exercises.map((exercises, i) => {
          if (i >= 4) return;
          return (
            <>
              <p key={i} className="mt-1 w-52 text-lg text-left">
                {exercises.numberOfSets} x {exercises.exerciseName}
              </p>
            </>
          );
        })}
        {workout.exercises.length > 4 ? (
          <p className="text-center font-semibold">view more...</p>
        ) : null}
      </div>
      <WorkoutDays calendarDays={workout.calendarDay} />
    </div>
  );
};

const WorkoutDays = ({
  calendarDays,
}: {
  calendarDays: string[];
}): React.ReactElement => {
  interface calendarD {
    Monday: boolean;
    Tuesday: boolean;
    Wednesday: boolean;
    Thursday: boolean;
    Friday: boolean;
    Saturday: boolean;
    Sunday: boolean;
  }

  const initialCalendarState: calendarD = {
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  };
  const [calendarSetDays, setCalendarDays] =
    useState<calendarD>(initialCalendarState);

  useEffect(() => {
    setCalendarDays(initialCalendarState);
    const calendar = { ...initialCalendarState };
    for (const day of calendarDays) {
      calendar[day as keyof calendarD] = true;
    }

    setCalendarDays(calendar);
  }, []);

  return (
    <div className="w-10/12 h-9 bg-second rounded-lg flex items-center justify-center">
      <ul className="text-md">
        <li className="inline-block">
          <p
            className={
              "calendarText " +
              (calendarSetDays["Monday"] ? "calendarTextSelected" : "")
            }
          >
            M
          </p>
        </li>
        <li className="inline-block">
          <p
            className={
              "calendarText " +
              (calendarSetDays["Tuesday"] ? "calendarTextSelected" : "")
            }
          >
            T
          </p>
        </li>
        <li className="inline-block">
          <p
            className={
              "calendarText " +
              (calendarSetDays["Wednesday"] ? "calendarTextSelected" : "")
            }
          >
            W
          </p>
        </li>
        <li className="inline-block">
          <p
            className={
              "calendarText " +
              (calendarSetDays["Thursday"] ? "calendarTextSelected" : "")
            }
          >
            TH
          </p>
        </li>
        <li className="inline-block">
          <p
            className={
              "calendarText " +
              (calendarSetDays["Friday"] ? "calendarTextSelected" : "")
            }
          >
            F
          </p>
        </li>
        <li className="inline-block">
          <p
            className={
              "calendarText " +
              (calendarSetDays["Saturday"] ? "calendarTextSelected" : "")
            }
          >
            S
          </p>
        </li>
        <li className="inline-block">
          <p
            className={
              "calendarText " +
              (calendarSetDays["Sunday"] ? "calendarTextSelected" : "")
            }
          >
            S
          </p>
        </li>
      </ul>
    </div>
  );
};

export default WorkoutsPage;

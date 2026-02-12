import { NavLink } from "react-router-dom";
import { WorkoutCard } from "./WorkoutCard";
import IUser from "../../interfaces/IUser";
import { useState } from "react";

export const MainBody = ({ user }: { user: IUser }): React.ReactElement => {
  const [selectedIndex, setSelectedIndex] = useState<number>();
  return (
    <>
      <h1 className="text-center text-2xl ml-20 tablet:ml-0 mt-2 mb-1">
        Workouts
      </h1>
      <div className="w-full h-1 bg-main float-right" />
      <div className="ml-20 tablet:ml-0 tablet:w-full flex justify-center">
        <section className="mt-10 w-fit grid grid-cols-3 md:grid-cols-2 tablet:grid-cols-2 mobile:grid-cols-1 gap-16 tablet:gap-10 mb-32 ">
          {user.workouts.map((workout, i) => {
            return (
              <WorkoutCard
                workout={workout}
                index={i}
                setSelectedIndex={setSelectedIndex}
                selectedIndex={selectedIndex}
                key={i + 6000}
              />
            );
          })}
        </section>
      </div>
      <div
        className={
          (selectedIndex == undefined ? "h-20" : "h-28") +
          " ml-10 tablet:ml-0 w-full fixed bg-footer-background bottom-0 transition-all duration-200 flex flex-col items-center justify-center"
        }
        onClick={() => setSelectedIndex(undefined)}
      >
        {selectedIndex != undefined ? (
          <NavLink
            to={`/workouts/${user.workouts[selectedIndex].workoutName}/startworkout`}
            className="w-80 h-10 md:h-10 md:w-64 bg-main rounded-lg hover:scale-110 text-center text-xl flex items-center justify-center transition-all "
          >
            Start Workout
          </NavLink>
        ) : null}
        <NavLink
          to={
            selectedIndex == undefined
              ? "/workouts/create"
              : `/workouts/${user.workouts[selectedIndex].workoutName}/edit`
          }
          className={
            (selectedIndex == undefined
              ? "w-72 h-10 md:h-10 md:w-64 sm:w-52 "
              : "w-60 h-8 my-2 md:w-52 sm:w-44 ") +
            "bg-main rounded-lg hover:scale-110 text-center text-xl md:text-lg flex items-center justify-center transition-all duration-300"
          }
        >
          {selectedIndex == undefined ? "Create Workout" : "Edit Workout"}
        </NavLink>
      </div>
    </>
  );
};

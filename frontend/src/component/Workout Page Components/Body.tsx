import { NavLink } from "react-router-dom";
import { WorkoutCard } from "./WorkoutCard";
import IUser from "../../interfaces/IUser";
import { useState } from "react";

export const MainBody = ({ user }: { user: IUser }): React.ReactElement => {
  const [selectedIndex, setSelectedIndex] = useState<number>();
  return (
    <>
      <div className="ml-32">
        <section className="mt-10 w-fit grid grid-cols-3 md:grid-cols-2 md:mx-auto gap-16 mb-32 ">
          {user.workouts.map((workout, i) => {
            return (
              <WorkoutCard
                workout={workout}
                index={i}
                setSelectedIndex={setSelectedIndex}
                selectedIndex={selectedIndex}
                key={i + 10000}
              />
            );
          })}
        </section>
      </div>
      <div
        className={
          (selectedIndex == undefined ? "h-20" : "h-28") +
          " ml-20 fixed w-full bg-footer-background bottom-0 flex flex-col justify-center items-center transition-all duration-200"
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
              ? "w-80 h-10 md:h-10 md:w-64 "
              : "w-60 h-8 my-2 md:w-52 ") +
            "bg-main rounded-lg hover:scale-110 text-center text-xl flex items-center justify-center transition-all duration-300"
          }
        >
          {selectedIndex == undefined ? "Create Workout" : "Edit Workout"}
        </NavLink>
      </div>
    </>
  );
};

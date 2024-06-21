import { NavLink } from "react-router-dom";
import { WorkoutCard } from "./WorkoutCard";
import IUser from "../../interfaces/IUser";

export const MainBody = ({ user }: { user: IUser }): React.ReactElement => {
  return (
    <>
      <section className="ml-32 mt-10 w-fit grid grid-cols-3 gap-16 mb-24">
        {user.workouts.map((workout, i) => {
          return <WorkoutCard workout={workout} key={i + 10000} />;
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

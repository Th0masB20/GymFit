import UserProp from "../../interfaces/UserProp";
import ExerciseDetails from "./ExerciseDetails";

const LastWorkoutStats = ({ user }: UserProp): React.ReactElement => {
  return (
    <div
      className="flex flex-col items-center ml-10 w-96 h-80 bg-gradient-to-r from-main to-second rounded-3xl overflow-y-auto
      lg:w-80 
      md:w-72
      xs:h-60
      xs:ml-0
      xs:mt-5"
    >
      <p className="underline font-bold pt-4 text-center">Last Workout Stats</p>
      <DisplayLastWorkout user={user} />
    </div>
  );
};

const DisplayLastWorkout = ({ user }: UserProp): React.ReactElement => {
  if (!user.previousWorkout || !user.previousWorkout.exercises) {
    return (
      <div className="inline-block w-9/12 h-auto min-w-f p-10 m-auto rounded-xl text-center bg-white">
        <p>Start Your First Workout</p>
      </div>
    );
  }
  return (
    <section className="w-full flex flex-col items-center">
      {user.previousWorkout.exercises.map((exercise) => {
        return <ExerciseDetails exercise={exercise} />;
      })}
    </section>
  );
};

export default LastWorkoutStats;

import UserProp from "../../interfaces/UserProp";
import ExerciseDetails from "./ExerciseDetails";

const LastWorkoutStats = ({ user }: UserProp): React.ReactElement => {
  return (
    <div
      className="flex flex-col items-center w-64 h-80 bg-cardBackground rounded-3xl overflow-y-auto
      lg:w-80 
      md:w-72
      xs:h-60
      xs:ml-0
      xs:mt-5"
    >
      <p className="text-lg md:text-base font-bold pt-4 text-center">
        Last Workout Stats
      </p>
      {/* <div className="w-full h-[3px] bg-third mt-1 mb-2" /> */}
      <DisplayLastWorkout user={user} />
    </div>
  );
};

const DisplayLastWorkout = ({ user }: UserProp): React.ReactElement => {
  if (!user.previousWorkout || !user.previousWorkout.exercises) {
    return (
      <div className="inline-block w-9/12 h-auto min-w-f p-10 m-auto rounded-xl text-center bg-third">
        <p>Start Your First Workout</p>
      </div>
    );
  }
  return (
    <section className="w-full flex flex-col items-center">
      {user.previousWorkout.exercises.map((exercise, i) => {
        return <ExerciseDetails exercise={exercise} key={i + 2500} />;
      })}
    </section>
  );
};

export default LastWorkoutStats;

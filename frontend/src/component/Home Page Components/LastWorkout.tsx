import UserProp from "../../interfaces/UserProp";
import ExerciseDetails from "./ExerciseDetails";

const LastWorkoutStats = ({ user }: UserProp): React.ReactElement => {
  return (
    <div className="flex flex-col items-center ml-10 w-96 h-80 bg-gradient-to-r from-main to-second rounded-3xl overflow-y-auto">
      <p className="underline font-bold pt-4">Last Workout Stats</p>
      <DisplayLastWorkout user={user} />
    </div>
  );
};

const DisplayLastWorkout = ({ user }: UserProp): React.ReactElement => {
  if (!user.previousWorkout) {
    return (
      <div className="w-10 h-12">
        <p>Start Your First Workout</p>
      </div>
    );
  }
  return (
    <section>
      {user.previousWorkout.exercises.map((exercise) => {
        return <ExerciseDetails exercise={exercise} />;
      })}
    </section>
  );
};

export default LastWorkoutStats;

import { IWorkout } from "../../interfaces/IUser";
import { WorkoutDays } from "./WorkoutDaysComponent";

export const WorkoutCard = ({
  workout,
}: {
  workout: IWorkout;
}): React.ReactElement => {
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

import { IWorkout } from "../../interfaces/IUser";
import { WorkoutDays } from "./WorkoutDaysComponent";

export const WorkoutCard = ({
  workout,
  index,
  setSelectedIndex,
  selectedIndex,
}: {
  workout: IWorkout;
  index: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
  selectedIndex: number | undefined;
}): React.ReactElement => {
  return (
    <div
      className={
        "m-auto w-80 h-80 bg-fourth rounded-3xl flex flex-col items-center hover:cursor-pointer hover:scale-105 transition-all " +
        (selectedIndex == index ? "border-2   border-black" : "")
      }
      onClick={() => {
        selectedIndex == undefined
          ? setSelectedIndex(index)
          : setSelectedIndex(undefined);
      }}
    >
      <p className="text-center underline text-2xl mt-10">
        {workout.workoutName}
      </p>
      <div className="flex flex-col align-center my-5 h-36">
        {workout.exercises.map((exercises, i) => {
          if (i >= 2) return;
          return (
            <>
              <p key={i} className="mt-1 w-52 text-lg text-left">
                {exercises.numberOfSets} x {exercises.exerciseName}
              </p>
            </>
          );
        })}
        {workout.exercises.length >= 3 ? (
          <p className="text-center font-semibold">view more...</p>
        ) : null}
      </div>
      <WorkoutDays calendarDays={workout.calendarDay} />
    </div>
  );
};

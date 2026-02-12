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
        "m-auto w-80 lg:w-72 md:w-64 tablet:w-60 h-80 bg-third rounded-3xl flex flex-col items-center hover:cursor-pointer hover:scale-105 transition-all " +
        (selectedIndex == index ? "border-2   border-black" : "")
      }
      onClick={() => {
        selectedIndex == undefined || selectedIndex != index
          ? setSelectedIndex(index)
          : setSelectedIndex(undefined);
      }}
    >
      <p className="text-center text-2xl mt-4 mb-1 font-bold">
        {workout.workoutName}
      </p>
      <div className="w-full h-1 bg-main" />

      <div className="flex flex-col align-center mt-10 my-5 h-36">
        {workout.exercises.map((exercises, i) => {
          if (i >= 2) return;
          return (
            <div key={i + 3500}>
              <p className="mt-1 w-52 text-lg text-left md:text-center">
                {exercises.numberOfSets} x {exercises.exerciseName}
              </p>
            </div>
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

import { IExercise, IWorkout } from "../../interfaces/IUser";
import InputSRWComponent from "./InputSRW";

export const StartWorkoutExerciseCard = ({
  currentExercise,
  updateCurrentWorkout,
  exerciseIndex,
  currentWorkout,
}: {
  currentExercise: IExercise;
  exerciseIndex: number;
  updateCurrentWorkout: React.Dispatch<
    React.SetStateAction<IWorkout | undefined>
  >;
  currentWorkout: IWorkout;
}): React.ReactElement => {
  const createSets = () => {
    const setArray: React.ReactElement[] = [];
    for (let i = 0; i < currentExercise.numberOfSets; i++) {
      setArray.push(
        <InputSRWComponent
          setIndex={i}
          exerciseIndex={exerciseIndex}
          currentWorkout={currentWorkout}
          updateCurrentWorkout={updateCurrentWorkout}
          key={i + 100000}
        />,
      );
    }
    return setArray;
  };

  return (
    <div className="w-80 min-h-72 h-auto bg-third m-10 pb-10 flex flex-col items-center rounded-3xl">
      <p className="text-center text-xl mb-3 mt-7 mobile:px-2 font-bold capitalize">
        {currentExercise.exerciseName}
      </p>
      <div className="flex flex-col gap-2">
        <div className="flex justify-around gap-6 mb-1">
          <p className="text-center w-6">Set</p>
          <p className="text-center w-14">Reps</p>
          <p className="text-center w-[72px]">Weight</p>
        </div>
        {createSets()}
      </div>
    </div>
  );
};

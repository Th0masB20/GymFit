import { IExercise, IWorkout } from "../../interfaces/IUser";
import InputSRWComponent from "./InputSRWComponent";

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
        />
      );
    }
    return setArray;
  };

  return (
    <div className="w-80 min-h-72 h-auto bg-fourth m-10 pb-10 flex flex-col justify-around items-center rounded-3xl">
      <p className="text-center text-xl mb-3 mt-3">
        {currentExercise.exerciseName}
      </p>
      <div className="flex w-52 justify-around mb-2">
        <p className="text-center">Set</p>
        <p className="text-center w-14">Reps</p>
        <p className="text-center w-14">Weight</p>
      </div>
      {createSets()}
    </div>
  );
  return <div></div>;
};

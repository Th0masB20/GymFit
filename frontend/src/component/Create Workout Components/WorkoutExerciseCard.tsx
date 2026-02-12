import { useState } from "react";
import { IExercise } from "../../interfaces/IUser";
import { SetRepWeightComponent } from "./SetRepWeight";

export const WorkoutExerciseCard = ({
  currentExercise,
  setWorkoutExercises,
  exerciseIndex,
}: {
  currentExercise: IExercise;
  exerciseIndex: number;
  setWorkoutExercises: React.Dispatch<React.SetStateAction<IExercise[]>>;
}): React.ReactElement => {
  const [setArray, addToSetArry] = useState<React.ReactElement[]>();

  const createSet = () => {
    currentExercise.numberOfSets++;
    const setArray: React.ReactElement[] = [];
    for (let i = 0; i < currentExercise.numberOfSets; i++) {
      setArray.push(
        <SetRepWeightComponent
          setIndex={i}
          exerciseIndex={exerciseIndex}
          setWorkoutExercises={setWorkoutExercises}
          key={i + 100000}
        />,
      );
    }
    addToSetArry(setArray);
  };

  return (
    <div className="w-80 min-h-72 md:w-64 tablet:w-64 tablet:min-h-60 h-auto bg-third m-10 flex flex-col items-center rounded-3xl">
      <p className="text-center text-xl mb-3 mt-7 mobile:px-2 font-bold capitalize">
        {currentExercise.exerciseName}
      </p>
      <div className="flex flex-col gap-2">
        <div className="flex w-52 justify-around mb-2">
          <p className="text-center">Set</p>
          <p className="text-center w-14">Reps</p>
          <p className="text-center w-14">Weight</p>
        </div>
        {setArray}
      </div>
      <button
        className="w-20 h-8 bg-soft-1 rounded-full mb-3 mt-3 hover:scale-110 transition-all duration-100"
        onClick={createSet}
      >
        Add Set
      </button>
    </div>
  );
};

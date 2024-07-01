import { useEffect, useState } from "react";
import { IExercise } from "../../interfaces/IUser";
import { SetRepWeightComponent } from "../Create Workout Components/SetRepWeightComponent";

export const EditWorkoutExerciseCard = ({
  currentExercise,
  setWorkoutExercises,
  exerciseIndex,
}: {
  currentExercise: IExercise;
  exerciseIndex: number;
  setWorkoutExercises: React.Dispatch<React.SetStateAction<IExercise[]>>;
}): React.ReactElement => {
  const [setArray, addToSetArry] = useState<React.ReactElement[]>();

  useEffect(() => {
    function createSets() {
      const setArray: React.ReactElement[] = [];
      for (let i = 0; i < currentExercise.numberOfSets; i++) {
        setArray.push(
          <SetRepWeightComponent
            setIndex={i}
            exerciseIndex={exerciseIndex}
            setWorkoutExercises={setWorkoutExercises}
            key={i + 10000000}
          />
        );
      }

      addToSetArry(setArray);
    }

    createSets();
  }, []);

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
        />
      );
    }
    addToSetArry(setArray);
  };

  return (
    <div className="w-80 min-h-72 h-auto bg-fourth m-10 flex flex-col justify-around items-center rounded-3xl">
      <p className="text-center text-xl mb-3 mt-3">
        {currentExercise.exerciseName}
      </p>
      <div className="flex w-52 justify-around mb-2">
        <p className="text-center">Set</p>
        <p className="text-center w-14">Reps</p>
        <p className="text-center w-14">Weight</p>
      </div>
      {setArray}
      <button
        className="w-20 h-8 bg-soft-1 rounded-full mb-3 mt-3 hover:scale-110 transition-all duration-100"
        onClick={createSet}
      >
        Add Set
      </button>
    </div>
  );
};

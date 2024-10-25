import { useEffect, useState } from "react";
import { IExercise } from "../../interfaces/IUser";

export const SetRepWeightComponent = ({
  setIndex,
  exerciseIndex,
  setWorkoutExercises,
}: {
  setIndex: number;
  exerciseIndex: number;
  setWorkoutExercises: React.Dispatch<React.SetStateAction<IExercise[]>>;
}): React.ReactElement => {
  const [reps, setRepNumber] = useState<string>("");
  const [weights, setWeightNumber] = useState<string>("");

  const onRepNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (isNaN(value)) return;
    setRepNumber(e.target.value);
  };

  const onWeightNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (isNaN(value)) return;
    setWeightNumber(e.target.value);
  };

  useEffect(() => {
    setWorkoutExercises((current) => {
      const newExerciseArray = current.map((currentExercise, i) => {
        const repNumber = Number(reps);
        const weightNumber = Number(weights);

        const newRepArray = [...currentExercise.reps];
        const newWeightArray = [...currentExercise.weights];

        if (setIndex > newRepArray.length || setIndex > newWeightArray.length) {
          newRepArray.push(repNumber);
          newWeightArray.push(weightNumber);
        } else {
          newRepArray[setIndex] = repNumber;
          newWeightArray[setIndex] = weightNumber;
        }
        return i == exerciseIndex
          ? { ...currentExercise, reps: newRepArray, weights: newWeightArray }
          : currentExercise;
      });

      return newExerciseArray;
    });
  }, [exerciseIndex, reps, setIndex, setWorkoutExercises, weights]);

  return (
    <>
      <div className="flex w-52 justify-around mb-2">
        <div className="w-5 h-6 rounded-full bg-soft-3 text-center">
          {setIndex + 1}
        </div>
        <input
          className="w-14 rounded-full bg-soft-1 text-center"
          onChange={onRepNumberInput}
          value={reps}
          placeholder="0"
        />
        <input
          className="w-14 rounded-full bg-soft-1 text-center"
          onChange={onWeightNumberInput}
          value={weights}
          placeholder="0"
        />
      </div>
    </>
  );
};

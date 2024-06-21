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
  const [repNumber, setRepNumber] = useState<number>(0);
  const [weightNumber, setWeightNumber] = useState<number>(0);

  const onRepNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (isNaN(value)) return;
    setRepNumber(Number(value));
  };

  const onWeightNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (isNaN(value)) return;
    setWeightNumber(Number(value));
  };

  useEffect(() => {
    if (weightNumber && repNumber) {
      setWorkoutExercises((current) => {
        const newExerciseArray = current.map((currentExercise, i) => {
          const newRepArray = [...currentExercise.reps];
          const newWeightArray = [...currentExercise.weights];

          if (
            setIndex > newRepArray.length ||
            setIndex > newWeightArray.length
          ) {
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
    }
  }, [exerciseIndex, repNumber, setIndex, setWorkoutExercises, weightNumber]);

  return (
    <>
      <div className="flex w-52 justify-around mb-2">
        <div className="w-5 h-6 rounded-full bg-soft-3 text-center">
          {setIndex + 1}
        </div>
        <input
          className="w-14 rounded-full bg-soft-1 text-center"
          onChange={onRepNumberInput}
          value={repNumber}
        />
        <input
          className="w-14 rounded-full bg-soft-1 text-center"
          onChange={onWeightNumberInput}
          value={weightNumber}
        />
      </div>
    </>
  );
};

import { useEffect, useState } from "react";
import { IWorkout, IWorkoutStartFinish } from "../../interfaces/IUser";

const InputSRWComponent = ({
  setIndex,
  exerciseIndex,
  currentWorkout,
  updateCurrentWorkout,
}: {
  setIndex: number;
  exerciseIndex: number;
  updateCurrentWorkout: React.Dispatch<
    React.SetStateAction<IWorkout | undefined>
  >;
  currentWorkout: IWorkout;
}): React.ReactElement => {
  const repStartVal =
    Object.keys(currentWorkout.previousWorkout).length != 0
      ? (currentWorkout.previousWorkout as IWorkoutStartFinish).exercises[
          exerciseIndex
        ].reps[setIndex]
      : currentWorkout.exercises[exerciseIndex].reps[setIndex];
  const weightStartVal =
    Object.keys(currentWorkout.previousWorkout).length != 0
      ? (currentWorkout.previousWorkout as IWorkoutStartFinish).exercises[
          exerciseIndex
        ].weights[setIndex]
      : currentWorkout.exercises[exerciseIndex].weights[setIndex];
  const [repNumber, setRepNumber] = useState<number>();
  const [weightNumber, setWeightNumber] = useState<number>();

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
      currentWorkout.exercises = currentWorkout.exercises.map(
        (currentExercise, i) => {
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
        },
      );

      updateCurrentWorkout(currentWorkout);
    }
  }, [
    exerciseIndex,
    repNumber,
    setIndex,
    updateCurrentWorkout,
    weightNumber,
    currentWorkout,
  ]);

  return (
    <>
      <div className="flex gap-6 justify-around">
        <div className="w-6 h-6 rounded-full bg-soft-3 text-center">
          {setIndex + 1}
        </div>
        <input
          className="w-14 rounded-full bg-soft-1 text-center"
          onChange={onRepNumberInput}
          value={repNumber}
          placeholder={repStartVal ? repStartVal.toString() : "0"}
        />
        <div className="flex gap-1">
          <input
            className="w-14 rounded-full bg-soft-1 text-center"
            onChange={onWeightNumberInput}
            value={weightNumber}
            placeholder={weightStartVal ? weightStartVal.toString() : "0"}
          />
          <p className="w-3">lb</p>
        </div>
      </div>
    </>
  );
};

export default InputSRWComponent;

import { useEffect, useState } from "react";
import { ExerciseRequestData } from "../../interfaces/ICacheExercises";
import { IExercise } from "../../interfaces/IUser";

export const ExerciseComponent = ({
  exercise,
  setWorkoutExercises,
  showSearch,
}: {
  exercise: ExerciseRequestData;
  setWorkoutExercises: React.Dispatch<React.SetStateAction<IExercise[]>>;
  showSearch: React.Dispatch<React.SetStateAction<boolean>>;
}): React.ReactElement => {
  const [exerciseName, setExerciseName] = useState<string>("");
  const [exerciseDescription, setExerciseDescription] = useState<string>("");

  const onAdd = () => {
    const newExercise: IExercise = {
      exerciseName: exerciseName,
      exerciseDescription: exerciseDescription,
      numberOfSets: 0,
      reps: [],
      weights: [],
    };

    setWorkoutExercises((current) => current.concat(newExercise));
    showSearch(false);
  };

  useEffect(() => {
    setExerciseName(exercise.name);
    setExerciseDescription(exercise.description);
  }, [exercise]);
  return (
    <div className="w-[450px] h-24 bg-main rounded-2xl mt-2 flex justify-start items-center">
      <img src={exercise.gifUrl} className="w-28 h-full rounded-l-2xl" />
      <div className="ml-4">
        <p className="text-xl font-bold">{exercise.name}</p>
        <p className="text-lg text-[rgba(0,0,0,0.5)]">
          Target: {exercise.bodyPart}
        </p>
      </div>
      <button
        className="ml-auto mr-6 w-14 bg-second p-1 rounded-full hover:scale-105"
        onClick={onAdd}
      >
        Add
      </button>
    </div>
  );
};

import { useState } from "react";
import { IExercise } from "../../interfaces/IUser";

const ExerciseDetails = ({
  exercise,
}: {
  exercise: IExercise;
}): React.ReactElement => {
  const [selected, setSelected] = useState<boolean>(false);
  console.log(exercise);
  return (
    <div
      className={
        "w-72 bg-white flex flex-col items-center rounded-xl my-3 hover:cursor-pointer hover:scale-105 transition-all duration-300 " +
        (selected
          ? "min-h-32 h-auto justify-start"
          : "min-h-10 h-auto justify-center")
      }
      onClick={() => setSelected((current) => !current)}
    >
      <p className="underline font-semibold text-md text-center m-3">
        {exercise.exerciseName}
      </p>
      <div className="w-full flex justify-between">
        {selected
          ? exercise.reps.map((rep, index) => (
              <SetCard exercise={exercise} index={index} />
            ))
          : null}
      </div>
    </div>
  );
};

const SetCard = ({
  exercise,
  index,
}: {
  exercise: IExercise;
  index: number;
}): React.ReactElement => {
  return (
    <div className="w-20 h-20 rounded-lg flex flex-col items-center bg-gray-200 m-2">
      <h3 className="underline">Set {index + 1}</h3>
      <p className="setRepText">Weight {exercise.reps[index]}</p>
      <p className="setRepText">Reps {exercise.weights[index]}</p>
    </div>
  );
};

export default ExerciseDetails;

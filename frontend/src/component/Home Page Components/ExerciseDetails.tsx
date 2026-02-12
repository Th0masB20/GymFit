import { useState } from "react";
import { IExercise } from "../../interfaces/IUser";

const ExerciseDetails = ({
  exercise,
}: {
  exercise: IExercise;
}): React.ReactElement => {
  const [selected, setSelected] = useState<boolean>(false);

  return (
    <div
      className={
        "w-10/12 bg-third flex flex-col items-center justify-start rounded-xl my-3 hover:cursor-pointer hover:scale-105 overflow-hidden transition-all duration-300 " +
        (selected ? "max-h-96" : "max-h-12")
      }
      onClick={() => setSelected((current) => !current)}
    >
      <p className="font-semibold text-md text-center m-3">
        {exercise.exerciseName}
      </p>
      <div className="w-full flex justify-between">
        {exercise.reps.map((_rep, index) => (
          <SetCard exercise={exercise} index={index} key={index + 2000} />
        ))}
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
    <div className="w-20 h-20 rounded-lg flex flex-col items-center bg-gray-200 m-2 text-mainDark">
      <h3 className="underline">Set {index + 1}</h3>
      <p className="setRepText">Weight {exercise.reps[index]}</p>
      <p className="setRepText">Reps {exercise.weights[index]}</p>
    </div>
  );
};

export default ExerciseDetails;

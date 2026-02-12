import { useState } from "react";
import { ExerciseRequestData } from "../../interfaces/ICacheExercises";
import { IExercise } from "../../interfaces/IUser";
import { ExerciseComponent } from "./Exercise";

export const WorkoutSearch = ({
  cachedExercises,
  setWorkoutExercises,
  showSearch,
}: {
  cachedExercises: ExerciseRequestData[];
  setWorkoutExercises: React.Dispatch<React.SetStateAction<IExercise[]>>;
  showSearch: React.Dispatch<React.SetStateAction<boolean>>;
}): React.ReactElement => {
  const [searchInput, setSearchInput] = useState<string>("");

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const displayExerciseSearch = () => {
    if (!searchInput) {
      return cachedExercises.map((exercise, i: number) => {
        return (
          <ExerciseComponent
            exercise={exercise}
            setWorkoutExercises={setWorkoutExercises}
            showSearch={showSearch}
            key={i + 500}
          />
        );
      });
    }

    return cachedExercises.map((exercise: ExerciseRequestData, i: number) => {
      if (exercise.name.includes(searchInput)) {
        return (
          <ExerciseComponent
            exercise={exercise}
            setWorkoutExercises={setWorkoutExercises}
            showSearch={showSearch}
            key={i + 1000}
          />
        );
      }
      return null;
    });
  };

  return (
    <div className="absolute top-0 w-full h-full bg-[rgba(0,0,0,0.6)] flex justify-center items-center">
      <div className="relative w-[600px] h-[550px] tablet:w-[500px] tablet:h-[500px] mobile:w-[340px] mobile:h-[450px] bg-main rounded-3xl flex flex-col items-center">
        <button
          className="absolute top-4 right-6 bg-mainWhite rounded-full w-6 h-6 hover:scale-110 transition-transform duration-100"
          onClick={() => showSearch(false)}
        >
          X
        </button>
        <input
          className="w-96 tablet:w-80 mobile:w-64 h-8 bg-gray-200 rounded-full focus:outline-none pl-2 mt-10"
          onChange={onSearch}
          value={searchInput}
        />
        <div className="h-8 w-auto px-2 mt-2 rounded-full bg-soft-2 flex justify-center items-center">
          <p className="text-center">Target body Type</p>
        </div>
        <div
          className="mt-4 flex flex-col w-fill
         h-full mb-5 items-center overflow-y-scroll rounded-xl hide-scrollBar"
        >
          {displayExerciseSearch()}
        </div>
      </div>
    </div>
  );
};

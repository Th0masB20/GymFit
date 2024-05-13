import React, { useEffect, useState } from "react";
import IUser, { IExercise } from "../interfaces/IUser";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ExerciseRequestData } from "../interfaces/ICacheExercises";

const CreateWorkout = (): React.ReactElement => {
  const [user, setUser] = useState<IUser>();
  const [workoutName, setWorkoutName] = useState<string>("");
  const [cachedExercises, populateCache] = useState<ExerciseRequestData[]>();
  const [exercises, setWorkoutExercises] = useState<IExercise[]>([]);
  const [workoutDays, setWorkoutDays] = useState<string[]>();

  const [displayExerciseSearch, showSearch] = useState<boolean>(false);

  const nav = useNavigate();
  useEffect(() => {
    async function getData() {
      try {
        const userResponse = await axios.get("http://localhost:3000/home/", {
          withCredentials: true,
        });
        setUser(userResponse.data as IUser);
      } catch (error) {
        nav("/404");
      }
    }
    getData();
  }, [nav]);

  useEffect(() => {
    const getExercises = async () => {
      const options = {
        method: "GET",
        url: "https://exercisedb.p.rapidapi.com/exercises",
        params: { limit: "1324" },
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_EXERCISE_API_KEY,
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        },
      };

      try {
        if (cachedExercises == undefined) {
          const response = await axios.request(options);
          populateCache(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getExercises();
  }, [cachedExercises, populateCache]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key == "Escape") {
        showSearch(false);
      }
    };

    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  const changeWorkoutName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setWorkoutName(e.target.value);
  };

  const hitEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      e.currentTarget.blur();
    }
  };

  if (user == undefined) return <div></div>;
  return (
    <main className="relative w-screen h-screen">
      <input
        className="text-center text-2xl m-auto block focus:outline-none"
        placeholder="Workout Name"
        onChange={changeWorkoutName}
        onFocus={(e) => (e.target.placeholder = "")}
        onBlur={(e) => (e.target.placeholder = "Workout Name")}
        onKeyDown={hitEnter}
        value={workoutName}
      />
      <div className="w-screen h-1 bg-main float-right" />
      <button
        className="flex flex-col justify-center items-center w-80 h-10 bg-main rounded-lg mt-5 m-auto hover:scale-110"
        onClick={() => showSearch(true)}
      >
        Add Exercise
      </button>

      <div className="w-full h-auto flex justify-center items-center flex-wrap">
        {exercises.map((currentExercise, i) => {
          return (
            <DisplayedExercise currentExercise={currentExercise} key={i} />
          );
        })}
      </div>
      <div className="fixed bg-[rgba(255,255,255,0.7)] w-full h-20 flex justify-center items-center bottom-0">
        <button className="w-52 h-10 bg-second rounded-lg hover:scale-110 mr-2">
          Delete Workout
        </button>
        <button className="w-52 h-10 bg-main rounded-lg hover:scale-110 ml-2">
          Save Workout
        </button>
      </div>
      {displayExerciseSearch && cachedExercises ? (
        <WorkoutSearch
          cachedExercises={cachedExercises}
          setWorkoutExercises={setWorkoutExercises}
          showSearch={showSearch}
        />
      ) : null}
    </main>
  );
};

const WorkoutSearch = ({
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
    let numberOfExercises = 0;

    if (!searchInput) {
      return cachedExercises.map((exercise, i: number) => {
        if (numberOfExercises >= 4) return;
        numberOfExercises++;
        return (
          <ExerciseComponent
            exercise={exercise}
            setWorkoutExercises={setWorkoutExercises}
            showSearch={showSearch}
            key={i}
          />
        );
      });
    }

    return cachedExercises.map((exercise: ExerciseRequestData, i: number) => {
      if (numberOfExercises >= 4) return;
      if (exercise.name.includes(searchInput)) {
        numberOfExercises++;
        return (
          <ExerciseComponent
            exercise={exercise}
            setWorkoutExercises={setWorkoutExercises}
            showSearch={showSearch}
            key={i}
          />
        );
      }
      return null;
    });
  };
  return (
    <div className="absolute top-0 w-screen h-screen bg-[rgba(0,0,0,0.6)] flex justify-center items-center">
      <div className="w-[600px] h-[550px] bg-second rounded-3xl flex flex-col items-center">
        <input
          className="w-96 h-8 bg-gray-200 rounded-full focus:outline-none pl-2 mt-4"
          onChange={onSearch}
          value={searchInput}
        />
        <div className="h-8 w-auto px-2 mt-2 rounded-full bg-soft-2 hover:cursor-pointer flex justify-center items-center">
          <p className="text-center">Target body Type</p>
        </div>
        <div className="mt-4 flex flex-col w-full h-96 items-center">
          {displayExerciseSearch()}
        </div>
      </div>
    </div>
  );
};

const ExerciseComponent = ({
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

const DisplayedExercise = ({
  currentExercise,
}: {
  currentExercise: IExercise;
}): React.ReactElement => {
  const [setArray, addToSetArry] = useState<React.ReactElement[]>();

  const createSet = () => {
    currentExercise.numberOfSets++;
    const setArray: React.ReactElement[] = [];
    for (let i = 0; i < currentExercise.numberOfSets; i++) {
      setArray.push(<SetRepWeightComponent setIndex={i} />);
    }

    addToSetArry(setArray);
  };

  return (
    <div className="w-80 min-h-72 h-auto bg-main m-10 flex flex-col justify-around items-center rounded-3xl">
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
        className="w-20 h-8 bg-soft-1 rounded-full mb-3 mt-3"
        onClick={createSet}
      >
        Add Set
      </button>
    </div>
  );
};

const SetRepWeightComponent = ({
  setIndex,
}: {
  setIndex: number;
}): React.ReactElement => {
  return (
    <>
      <div className="flex w-52 justify-around mb-2">
        <div className="w-5 h-6 rounded-full bg-soft-3 text-center">
          {setIndex}
        </div>
        <input className="w-14 rounded-full bg-soft-1 text-center" />
        <input className="w-14 rounded-full bg-soft-1 text-center" />
      </div>
    </>
  );
};

export default CreateWorkout;

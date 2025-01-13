import React, { useEffect, useState } from "react";
import IUser, { IExercise, IWorkout } from "../interfaces/IUser";
import { useNavigate } from "react-router-dom";
import axios_instance from "../utilities/AxiosInstance";
import { ExerciseRequestData } from "../interfaces/ICacheExercises";
import { WorkoutSearch } from "../component/Create Workout Components/WorkoutSearch";
import { SetWorkoutDays } from "../component/Create Workout Components/SetWorkoutDays";
import { WorkoutExerciseCard } from "../component/Create Workout Components/WorkoutExerciseCard";
import { errorResponse } from "../interfaces/IError";

const CreateWorkoutPage = (): React.ReactElement => {
  const [user, setUser] = useState<IUser>();
  const [workoutName, setWorkoutName] = useState<string>("");
  const [cachedExercises, populateCache] = useState<ExerciseRequestData[]>();
  const [exercises, setWorkoutExercises] = useState<IExercise[]>([]);
  const [workoutDays, setWorkoutDays] = useState<Set<string>>(new Set());
  const [disableButton, setDisableButton] = useState<boolean>(true);

  const [displayExerciseSearch, showSearch] = useState<boolean>(false);

  const nav = useNavigate();

  useEffect(() => {
    const repsIsEmpty = (): boolean => {
      for (const exercise of exercises) {
        if (exercise.reps.includes(0) || exercise.numberOfSets == 0)
          return true;
      }
      return false;
    };
    setDisableButton(
      !workoutName ||
        exercises.length == 0 ||
        workoutDays.size == 0 ||
        repsIsEmpty()
    );
  }, [exercises, workoutDays.size, workoutName]);
  //gets user
  useEffect(() => {
    async function getData() {
      try {
        const userResponse = await axios_instance.get("/api/home/user", {
          withCredentials: true,
        });
        setUser(userResponse.data as IUser);
      } catch (error) {
        const responseError = (error as errorResponse).response.data.error;
        nav(`/404/${responseError}`);
      }
    }
    getData();
  }, [nav]);

  //gets workouts from api and cachesThem
  //getting 300 errors from cached data in website, disabling cache helped
  useEffect(() => {
    const getExercises = async () => {
      if (cachedExercises == undefined) {
        const response = await axios_instance.get(
          "/api/workout/getJsonExercises",
          {
            withCredentials: true,
            headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
          }
        );
        populateCache(response.data);
      }
    };

    setTimeout(getExercises, 1000);
  }, [cachedExercises]);

  const saveWorkout = async () => {
    try {
      const exerciseJson: IWorkout = {
        workoutName,
        exercises,
        calendarDay: Array.from(workoutDays),
        previousWorkout: {},
      };

      const response = await axios_instance.post(
        "/api/workout/saveWorkout",
        exerciseJson,
        { withCredentials: true }
      );

      if (response.status == 200) nav("/workouts");
    } catch (error) {
      console.log(error);
      const responsError = (error as errorResponse).response.data.error;
      nav(`/404/${responsError}`);
    }
  };

  //hitting esc
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

  //hit enter when typing workout name
  const hitEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      e.currentTarget.blur();
    }
  };

  if (user == undefined) return <div></div>;
  return (
    <main
      className={
        "relative w-full " +
        (displayExerciseSearch
          ? "h-screen mb-0 overflow-hidden"
          : "h-full mb-32")
      }
    >
      <input
        className="text-center text-2xl m-auto block focus:outline-none"
        placeholder="Workout Name"
        onChange={changeWorkoutName}
        onFocus={(e) => (e.target.placeholder = "")}
        onBlur={(e) => (e.target.placeholder = "Workout Name")}
        onKeyDown={hitEnter}
        value={workoutName}
      />
      <div className="w-full h-1 bg-main float-right" />
      <button
        className="flex flex-col justify-center items-center w-80 h-10 bg-main rounded-lg mt-5 m-auto hover:scale-110 transition-all"
        onClick={() => showSearch(true)}
      >
        Add Exercise
      </button>

      <div className="w-fit h-fit grid grid-cols-3 mx-auto">
        {exercises.map((currentExercise, i) => {
          return (
            <WorkoutExerciseCard
              currentExercise={currentExercise}
              exerciseIndex={i}
              setWorkoutExercises={setWorkoutExercises}
              key={i + 1000}
            />
          );
        })}
      </div>
      <div className="fixed bottom-0 w-full flex flex-col justify-center items-center">
        <SetWorkoutDays
          setWorkoutDays={setWorkoutDays}
          workoutDays={workoutDays}
          user={user}
        />
        <div className="bg-footer-background w-full h-20 flex justify-center items-center">
          <button className="w-52 h-10 bg-second rounded-lg hover:scale-110 mr-2 transition-all duration-100">
            Delete Workout
          </button>
          <button
            className={
              "w-52 h-10 bg-main rounded-lg ml-2 transition-all " +
              (disableButton ? " opacity-30" : "hover:scale-110")
            }
            onClick={saveWorkout}
            disabled={disableButton}
          >
            Save Workout
          </button>
        </div>
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

export default CreateWorkoutPage;

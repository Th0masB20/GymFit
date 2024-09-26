import React, { useEffect, useState } from "react";
import IUser, { IExercise, IWorkout } from "../interfaces/IUser";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ExerciseRequestData } from "../interfaces/ICacheExercises";
import { WorkoutSearch } from "../component/Create Workout Components/WorkoutSearch";
import { SetWorkoutDays } from "../component/Create Workout Components/SetWorkoutDays";
import { WorkoutExerciseCard } from "../component/Create Workout Components/WorkoutExerciseCard";

const CreateWorkoutPage = (): React.ReactElement => {
  const [user, setUser] = useState<IUser>();
  const [workoutName, setWorkoutName] = useState<string>("");
  const [cachedExercises, populateCache] = useState<ExerciseRequestData[]>();
  const [exercises, setWorkoutExercises] = useState<IExercise[]>([]);
  const [workoutDays, setWorkoutDays] = useState<Set<string>>(new Set());

  const [displayExerciseSearch, showSearch] = useState<boolean>(false);

  const nav = useNavigate();
  //gets user
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

  //gets workouts from api and cachesThem
  useEffect(() => {
    const getExercises = async () => {
      try {
        if (cachedExercises == undefined) {
          const response = await axios.get(
            "http://localhost:3000/workout/getJsonExercises",
            { withCredentials: true }
          );
          populateCache(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getExercises();
  }, [cachedExercises]);

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

  const saveWorkout = async () => {
    const exerciseJson: IWorkout = {
      workoutName,
      exercises,
      calendarDay: Array.from(workoutDays),
      previousWorkout: {},
    };

    const response = await axios.post(
      "http://localhost:3000/workout/saveWorkout",
      exerciseJson,
      { withCredentials: true }
    );

    if (response.status == 200) nav("/workouts");
    else nav("/404");
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
        className="flex flex-col justify-center items-center w-80 h-10 bg-main rounded-lg mt-5 m-auto hover:scale-110"
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
              (!workoutName || exercises.length == 0 || workoutDays.size == 0
                ? " opacity-30"
                : "hover:scale-110")
            }
            onClick={saveWorkout}
            disabled={
              !workoutName || exercises.length == 0 || workoutDays.size == 0
            }
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

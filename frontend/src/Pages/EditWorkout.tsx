import { useEffect, useState } from "react";
import IUser, { IExercise, IWorkout } from "../interfaces/IUser";
import { ExerciseRequestData } from "../interfaces/ICacheExercises";
import { useNavigate, useParams } from "react-router-dom";
import axios_instance from "../utilities/AxiosInstance";
import { WorkoutSearch } from "../component/Create Workout Components/WorkoutSearch";
import { EditWorkoutExerciseCard } from "../component/Edit Workout Components/UpdateWorkoutExerciseCard";
import { EditSetWorkoutDays } from "../component/Edit Workout Components/EditSetWorkoutDays";
import { errorResponse } from "../interfaces/IError";

const EditWorkout = (): React.ReactElement => {
  const nav = useNavigate();
  const { workoutN } = useParams();

  const [user, setUser] = useState<IUser>();
  const [workout, setWorkout] = useState<IWorkout>();
  const [workoutName, setWorkoutName] = useState<string>("");
  const [startingWorkoutName, setStartingWorkoutName] = useState<string>("");
  const [cachedExercises, populateCache] = useState<ExerciseRequestData[]>([]);
  const [exercises, setWorkoutExercises] = useState<IExercise[]>([]);
  const [workoutDays, setWorkoutDays] = useState<Set<string>>(new Set());

  const [displayExerciseSearch, showSearch] = useState<boolean>(false);

  //gets user
  useEffect(() => {
    async function getData() {
      try {
        const userResponse = await axios_instance.get(
          "http://localhost:3000/home/user",
          {
            withCredentials: true,
            headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
          }
        );
        setUser(userResponse.data as IUser);
      } catch (error) {
        const responsError = (error as errorResponse).response.data.error;
        nav(`/404/${responsError}`);
      }
    }
    getData();
  }, [nav]);

  //gets workouts from api and cachesThem
  useEffect(() => {
    const getExercises = async () => {
      try {
        if (cachedExercises == undefined) {
          const response = await axios_instance.get(
            "http://localhost:3000/workout/getJsonExercises",
            {
              withCredentials: true,
              headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
            }
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

  useEffect(() => {
    if (user && workoutN) {
      const theWorkout: IWorkout | undefined = user.workouts.find(
        (workout) => workout.workoutName == workoutN
      );
      if (theWorkout == undefined) {
        return;
      }
      setWorkout(theWorkout);
      setWorkoutName(workoutN);
      setWorkoutExercises(theWorkout.exercises);
      setWorkoutDays(new Set(theWorkout.calendarDay));
    }
  }, [user, workoutN]);

  //saves initial workout name
  useEffect(() => {
    if (!workoutN) return;
    setStartingWorkoutName(workoutN);
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
    try {
      if (!workoutName || !exercises || !workout) return;
      const exerciseJson: IWorkout = {
        workoutName,
        exercises,
        calendarDay: Array.from(workoutDays),
        previousWorkout: {},
      };

      const response = await axios_instance.patch(
        `http://localhost:3000/workout/${workout.workoutName}/updateWorkout/`,
        exerciseJson,
        { withCredentials: true }
      );

      if (response.status == 200) nav("/workouts");
    } catch (error) {
      const responseError = (error as errorResponse).response.data;
      nav(`/404/${responseError}`);
    }
  };

  const deleteWorkout = async () => {
    if (!startingWorkoutName) return;
    const response = await axios_instance.delete(
      `http://localhost:3000/workout/${startingWorkoutName}/deleteWorkout`,
      { withCredentials: true }
    );

    if (response.status == 200) nav("/workouts");
  };

  if (!exercises || !user) {
    return <div></div>;
  }

  return (
    <main className="relative w-full h-screen mb-80">
      <input
        className="text-center text-2xl m-auto block focus:outline-none"
        placeholder={workoutName}
        onChange={changeWorkoutName}
        onFocus={(e) => (e.target.placeholder = "")}
        onBlur={(e) => (e.target.placeholder = `${workoutName}`)}
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

      <div className="w-fit h-fit grid grid-cols-3 m-auto mb-32">
        {exercises.map((currentExercise, i) => {
          return (
            <EditWorkoutExerciseCard
              currentExercise={currentExercise}
              exerciseIndex={i}
              setWorkoutExercises={setWorkoutExercises}
              key={i + 1000}
            />
          );
        })}
      </div>
      <div className="fixed bottom-0 w-full flex flex-col justify-center items-center">
        <EditSetWorkoutDays
          setWorkoutDays={setWorkoutDays}
          workoutDays={workoutDays}
          workoutName={startingWorkoutName}
          user={user}
        />
        <div className="bg-footer-background w-full h-20 flex justify-center items-center">
          <button
            className="w-52 h-10 bg-second rounded-lg hover:scale-110 mr-2 transition-all duration-100"
            onClick={deleteWorkout}
          >
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

export default EditWorkout;

import React, { useEffect, useState } from "react";
import IUser, { ICalendarBool, IExercise, IWorkout } from "../interfaces/IUser";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ExerciseRequestData } from "../interfaces/ICacheExercises";

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
        }
      } catch (error) {
        console.error(error);
      }
    };

    getExercises();
  }, [cachedExercises, populateCache]);

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

    await axios.post(
      "http://localhost:3000/workout/saveWorkout",
      exerciseJson,
      { withCredentials: true }
    );

    nav("/workouts");
  };

  if (user == undefined) return <div></div>;
  return (
    <main className="relative w-full h-auto">
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

      <div className="w-fit h-auto grid grid-cols-3 m-auto mb-32">
        {exercises.map((currentExercise, i) => {
          return (
            <DisplayedExercise
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
          <button className="w-52 h-10 bg-second rounded-lg hover:scale-110 mr-2">
            Delete Workout
          </button>
          <button
            className={
              "w-52 h-10 bg-main rounded-lg ml-2 " +
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

const SetWorkoutDays = ({
  setWorkoutDays,
  workoutDays,
  user,
}: {
  setWorkoutDays: React.Dispatch<React.SetStateAction<Set<string>>>;
  workoutDays: Set<string>;
  user: IUser;
}): React.ReactElement => {
  const [selected, setSelected] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const weeklyCalendar: ICalendarBool =
    user.weeklyCalendar as object as ICalendarBool;

  const setRemoveDay = (dayIndex: number) => {
    switch (dayIndex) {
      case 0: {
        const newSet = new Set<string>(workoutDays);
        if (newSet.has("Monday")) {
          newSet.delete("Monday");
          const newArr = selected.map((val, i) => (i == 0 ? false : val));
          setSelected(newArr);
        } else {
          newSet.add("Monday");
          const newArr = selected.map((val, i) => (i == 0 ? true : val));
          setSelected(newArr);
        }
        setWorkoutDays(newSet);
        break;
      }

      case 1: {
        const newSet = new Set<string>(workoutDays);
        if (newSet.has("Tuesday")) {
          newSet.delete("Tuesday");
          const newArr = selected.map((val, i) => (i == 1 ? false : val));
          setSelected(newArr);
        } else {
          newSet.add("Tuesday");
          const newArr = selected.map((val, i) => (i == 1 ? true : val));
          setSelected(newArr);
        }
        setWorkoutDays(newSet);
        break;
      }
      case 2: {
        const newSet = new Set<string>(workoutDays);
        if (newSet.has("Wednesday")) {
          newSet.delete("Wednesday");
          const newArr = selected.map((val, i) => (i == 2 ? false : val));
          setSelected(newArr);
        } else {
          newSet.add("Wednesday");
          const newArr = selected.map((val, i) => (i == 2 ? true : val));
          setSelected(newArr);
        }
        setWorkoutDays(newSet);
        break;
      }
      case 3: {
        const newSet = new Set<string>(workoutDays);
        if (newSet.has("Thursday")) {
          newSet.delete("Thursday");
          const newArr = selected.map((val, i) => (i == 3 ? false : val));
          setSelected(newArr);
        } else {
          newSet.add("Thursday");
          const newArr = selected.map((val, i) => (i == 3 ? true : val));
          setSelected(newArr);
        }
        setWorkoutDays(newSet);
        break;
      }

      case 4: {
        const newSet = new Set<string>(workoutDays);
        if (newSet.has("Friday")) {
          newSet.delete("Friday");
          const newArr = selected.map((val, i) => (i == 4 ? false : val));
          setSelected(newArr);
        } else {
          newSet.add("Friday");
          const newArr = selected.map((val, i) => (i == 4 ? true : val));
          setSelected(newArr);
        }
        setWorkoutDays(newSet);
        break;
      }

      case 5: {
        const newSet = new Set<string>(workoutDays);
        if (newSet.has("Saturday")) {
          newSet.delete("Saturday");
          const newArr = selected.map((val, i) => (i == 5 ? false : val));
          setSelected(newArr);
        } else {
          newSet.add("Saturday");
          const newArr = selected.map((val, i) => (i == 5 ? true : val));
          setSelected(newArr);
        }
        setWorkoutDays(newSet);
        break;
      }
      case 6: {
        const newSet = new Set<string>(workoutDays);
        if (newSet.has("Sunday")) {
          newSet.delete("Sunday");
          const newArr = selected.map((val, i) => (i == 6 ? false : val));
          setSelected(newArr);
        } else {
          newSet.add("Sunday");
          const newArr = selected.map((val, i) => (i == 6 ? true : val));
          setSelected(newArr);
        }
        setWorkoutDays(newSet);
        break;
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-80 h-20">
      <div className="bg-main w-24 h-6 mb-2 rounded-lg text-center">
        Set Days
      </div>
      <div className="w-full h-9 bg-second rounded-lg flex items-center justify-center">
        <ul className="inline">
          <li className="inline-block">
            <button
              className={
                "calendarWorkoutCreationText " +
                (selected[0] ? "calendarTextSelected" : "") +
                (!weeklyCalendar["Monday"]
                  ? " calendarDayAvailable"
                  : " calendarDayTaken")
              }
              onClick={() => setRemoveDay(0)}
              disabled={weeklyCalendar["Monday"]}
            >
              M
            </button>
          </li>
          <li className="inline-block">
            <button
              className={
                "calendarWorkoutCreationText " +
                (selected[1] ? "calendarTextSelected" : "") +
                (!weeklyCalendar["Tuesday"]
                  ? " calendarDayAvailable"
                  : " calendarDayTaken")
              }
              onClick={() => setRemoveDay(1)}
              disabled={weeklyCalendar["Tuesday"]}
            >
              T
            </button>
          </li>
          <li className="inline-block">
            <button
              className={
                "calendarWorkoutCreationText " +
                (selected[2] ? "calendarTextSelected" : "") +
                (!weeklyCalendar["Wednesday"]
                  ? " calendarDayAvailable"
                  : " calendarDayTaken")
              }
              onClick={() => setRemoveDay(2)}
              disabled={weeklyCalendar["Wednesday"]}
            >
              W
            </button>
          </li>
          <li className="inline-block">
            <button
              className={
                "calendarWorkoutCreationText " +
                (selected[3] ? "calendarTextSelected" : "") +
                (!weeklyCalendar["Thursday"]
                  ? " calendarDayAvailable"
                  : " calendarDayTaken")
              }
              onClick={() => setRemoveDay(3)}
              disabled={weeklyCalendar["Thursday"]}
            >
              TH
            </button>
          </li>
          <li className="inline-block">
            <button
              className={
                "calendarWorkoutCreationText " +
                (selected[4] ? "calendarTextSelected" : "") +
                (!weeklyCalendar["Friday"]
                  ? " calendarDayAvailable"
                  : " calendarDayTaken")
              }
              onClick={() => setRemoveDay(4)}
              disabled={weeklyCalendar["Friday"]}
            >
              F
            </button>
          </li>
          <li className="inline-block">
            <button
              className={
                "calendarWorkoutCreationText " +
                (selected[5] ? "calendarTextSelected" : "") +
                (!weeklyCalendar["Saturday"]
                  ? " calendarDayAvailable"
                  : " calendarDayTaken")
              }
              onClick={() => setRemoveDay(5)}
              disabled={weeklyCalendar["Saturday"]}
            >
              S
            </button>
          </li>
          <li className="inline-block">
            <button
              className={
                "calendarWorkoutCreationText " +
                (selected[6] ? "calendarTextSelected" : "") +
                (!weeklyCalendar["Sunday"]
                  ? " calendarDayAvailable"
                  : " calendarDayTaken")
              }
              onClick={() => setRemoveDay(6)}
              disabled={weeklyCalendar["Sunday"]}
            >
              S
            </button>
          </li>
        </ul>
      </div>
    </div>
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
            key={i + 10000000}
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
            key={i + 100000000}
          />
        );
      }
      return null;
    });
  };
  return (
    <div className="absolute top-0 w-full h-full bg-[rgba(0,0,0,0.6)] flex justify-center items-center">
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
  setWorkoutExercises,
  exerciseIndex,
}: {
  currentExercise: IExercise;
  exerciseIndex: number;
  setWorkoutExercises: React.Dispatch<React.SetStateAction<IExercise[]>>;
}): React.ReactElement => {
  const [setArray, addToSetArry] = useState<React.ReactElement[]>();

  const createSet = () => {
    currentExercise.numberOfSets++;
    const setArray: React.ReactElement[] = [];
    for (let i = 0; i < currentExercise.numberOfSets; i++) {
      setArray.push(
        <SetRepWeightComponent
          setIndex={i}
          exerciseIndex={exerciseIndex}
          setWorkoutExercises={setWorkoutExercises}
          key={i + 100000}
        />
      );
    }
    addToSetArry(setArray);
  };

  return (
    <div className="w-80 min-h-72 h-auto bg-fourth m-10 flex flex-col justify-around items-center rounded-3xl">
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

export default CreateWorkoutPage;

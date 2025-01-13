import { useEffect, useState } from "react";
import IUser, { IWorkout, IWorkoutStartFinish } from "../interfaces/IUser";
import axios_instance from "../utilities/AxiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { StartWorkoutExerciseCard } from "../component/Start Workout Components/StartWorkoutExerciseCards";
import FinishWorkoutButton from "../component/Start Workout Components/FinishWorkoutButton";
import TimerComponent from "../component/Start Workout Components/Timer";
import ITimerComponent from "../interfaces/ITimerComponent";
import { errorResponse } from "../interfaces/IError";

const StartWorkout = (): React.ReactElement => {
  const [user, setUser] = useState<IUser>();
  const { workoutName } = useParams();
  const [currentWorkout, updateCurrentWorkout] = useState<IWorkout>();
  const nav = useNavigate();

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHour] = useState(0);

  useEffect(() => {
    async function getData() {
      try {
        const userResponse = await axios_instance.get("/home/user", {
          withCredentials: true,
          headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
        });
        setUser(userResponse.data as IUser);
      } catch (error) {
        const responsError = (error as errorResponse).response.data.error;
        nav(`/404/${responsError}`);
      }
    }
    getData();
  }, [nav]);

  if (!user) return <div></div>;

  const workout = user.workouts.find(
    (workout) => workout.workoutName == workoutName
  );
  if (!workout) return <div></div>;
  const newWorkoutInstanse: IWorkout = { ...workout };
  if (newWorkoutInstanse == undefined) return <div></div>;
  if (!currentWorkout) updateCurrentWorkout(newWorkoutInstanse);
  if (!currentWorkout) return <div></div>;

  async function finishWorkout() {
    if (!currentWorkout) return;
    if (!workout) return;

    const finishedWorkoutJson: IWorkoutStartFinish = {
      ...currentWorkout,
      seconds,
      minutes,
      hours,
    };

    try {
      const saveFinishedResponse = await axios_instance.post(
        "/workout/finishWorkout",
        finishedWorkoutJson,
        {
          withCredentials: true,
        }
      );

      const updateUsersLastWorkout = await axios_instance.patch(
        `/workout/updatePreviousWorkout`,
        finishedWorkoutJson,
        {
          withCredentials: true,
        }
      );
      if (
        saveFinishedResponse.status == 200 &&
        updateUsersLastWorkout.status == 200
      ) {
        console.log(user?.workoutHistory);
        nav("/workout");
      } else {
        console.log(saveFinishedResponse.statusText);
        throw Error(saveFinishedResponse.statusText);
      }
    } catch (error) {
      const responsError = (error as errorResponse).response.data.error;
      nav(`/404/${responsError}`);
    }
    nav("/workouts");
  }

  const props: ITimerComponent = {
    seconds,
    minutes,
    hours,
    setSeconds,
    setMinutes,
    setHour,
  };
  return (
    <main>
      <TimerComponent timerProps={props} />
      <div className="w-10/12 h-auto flex justify-center flex-wrap m-auto mb-20">
        {newWorkoutInstanse.exercises.map((currentExercise, i) => {
          return (
            <StartWorkoutExerciseCard
              currentExercise={currentExercise}
              exerciseIndex={i}
              currentWorkout={currentWorkout}
              updateCurrentWorkout={updateCurrentWorkout}
              key={i + 1000}
            />
          );
        })}
      </div>

      <FinishWorkoutButton finishWorkout={finishWorkout} />
    </main>
  );
};

export default StartWorkout;

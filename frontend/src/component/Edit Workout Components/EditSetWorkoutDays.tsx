import { useEffect, useState } from "react";
import IUser from "../../interfaces/IUser";

export const EditSetWorkoutDays = ({
  setWorkoutDays,
  workoutDays,
  workoutName,
  user,
}: {
  setWorkoutDays: React.Dispatch<React.SetStateAction<Set<string>>>;
  workoutDays: Set<string>;
  workoutName: string;
  user: IUser;
}): React.ReactElement => {
  const [selected, setSelected] = useState<boolean[]>([]);
  useEffect(() => {
    const startingArray = [
      workoutDays.has("Monday"),
      workoutDays.has("Tuesday"),
      workoutDays.has("Wednesday"),
      workoutDays.has("Thursday"),
      workoutDays.has("Friday"),
      workoutDays.has("Saturday"),
      workoutDays.has("Sunday"),
    ];
    console.log(workoutDays);
    setSelected(startingArray);
  }, [workoutDays]);

  const weeklyCalendar = user.generalWeeklyCalendar;
  console.log(selected);

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
                (!weeklyCalendar["Monday"] ||
                weeklyCalendar["Monday"] == `${workoutName}`
                  ? " calendarDayAvailable"
                  : " calendarDayTaken")
              }
              onClick={() => setRemoveDay(0)}
              disabled={Boolean(
                weeklyCalendar["Monday"] &&
                  weeklyCalendar["Monday"] != `${workoutName}`
              )}
            >
              M
            </button>
          </li>
          <li className="inline-block">
            <button
              className={
                "calendarWorkoutCreationText " +
                (selected[1] ? "calendarTextSelected" : "") +
                (!weeklyCalendar["Tuesday"] ||
                weeklyCalendar["Tuesday"] == `${workoutName}`
                  ? " calendarDayAvailable"
                  : " calendarDayTaken")
              }
              onClick={() => setRemoveDay(1)}
              disabled={Boolean(
                weeklyCalendar["Tuesday"] &&
                  weeklyCalendar["Tuesday"] != `${workoutName}`
              )}
            >
              T
            </button>
          </li>
          <li className="inline-block">
            <button
              className={
                "calendarWorkoutCreationText " +
                (selected[2] ? "calendarTextSelected" : "") +
                (!weeklyCalendar["Wednesday"] ||
                weeklyCalendar["Wednesday"] == `${workoutName}`
                  ? " calendarDayAvailable"
                  : " calendarDayTaken")
              }
              onClick={() => setRemoveDay(2)}
              disabled={Boolean(
                weeklyCalendar["Wednesday"] &&
                  weeklyCalendar["Wednesday"] != `${workoutName}`
              )}
            >
              W
            </button>
          </li>
          <li className="inline-block">
            <button
              className={
                "calendarWorkoutCreationText " +
                (selected[3] ? "calendarTextSelected" : "") +
                (!weeklyCalendar["Thursday"] ||
                weeklyCalendar["Thursday"] == `${workoutName}`
                  ? " calendarDayAvailable"
                  : " calendarDayTaken")
              }
              onClick={() => setRemoveDay(3)}
              disabled={Boolean(
                weeklyCalendar["Thursday"] &&
                  weeklyCalendar["Thursday"] != `${workoutName}`
              )}
            >
              TH
            </button>
          </li>
          <li className="inline-block">
            <button
              className={
                "calendarWorkoutCreationText " +
                (selected[4] ? "calendarTextSelected" : "") +
                (!weeklyCalendar["Friday"] ||
                weeklyCalendar["Friday"] == `${workoutName}`
                  ? " calendarDayAvailable"
                  : " calendarDayTaken")
              }
              onClick={() => setRemoveDay(4)}
              disabled={Boolean(
                weeklyCalendar["Friday"] &&
                  weeklyCalendar["Friday"] != `${workoutName}`
              )}
            >
              F
            </button>
          </li>
          <li className="inline-block">
            <button
              className={
                "calendarWorkoutCreationText " +
                (selected[5] ? "calendarTextSelected" : "") +
                (!weeklyCalendar["Saturday"] ||
                weeklyCalendar["Saturday"] == `${workoutName}`
                  ? " calendarDayAvailable"
                  : " calendarDayTaken")
              }
              onClick={() => setRemoveDay(5)}
              disabled={Boolean(
                weeklyCalendar["Saturday"] &&
                  weeklyCalendar["Saturday"] != `${workoutName}`
              )}
            >
              S
            </button>
          </li>
          <li className="inline-block">
            <button
              className={
                "calendarWorkoutCreationText " +
                (selected[6] ? "calendarTextSelected" : "") +
                (!weeklyCalendar["Sunday"] ||
                weeklyCalendar["Sunday"] == `${workoutName}`
                  ? " calendarDayAvailable"
                  : " calendarDayTaken")
              }
              onClick={() => setRemoveDay(6)}
              disabled={Boolean(
                weeklyCalendar["Sunday"] &&
                  weeklyCalendar["Sunday"] != `${workoutName}`
              )}
            >
              S
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

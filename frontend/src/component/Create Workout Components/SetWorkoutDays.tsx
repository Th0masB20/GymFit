import { useEffect, useState } from "react";
import IUser from "../../interfaces/IUser";
import { ICalendarBool, IWeekDay } from "../../interfaces/ICalendar";

export const SetWorkoutDays = ({
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

  const [weeklyCalendar, setWeeklyCalendar] = useState({} as ICalendarBool);
  useEffect(() => {
    for (const key in user.generalWeeklyCalendar) {
      setWeeklyCalendar((currentWeeklyCalendar) => {
        const newCalendar = { ...currentWeeklyCalendar };
        newCalendar[key as IWeekDay] = Boolean(
          user.generalWeeklyCalendar[key as IWeekDay]["workoutName"],
        );
        return newCalendar;
      });
    }
  }, [user.generalWeeklyCalendar]);

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
      <div className="bg-main w-24 h-6 mb-2 rounded-lg text-center text-mainWhite">
        Set Days
      </div>
      <div className="w-full h-9 bg-third rounded-lg flex items-center justify-center">
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

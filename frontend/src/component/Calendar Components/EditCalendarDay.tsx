import axios_instance from "../../utilities/AxiosInstance";
import { IEditMonthDate, IMonthName } from "../../interfaces/ICalendar";
import IUser from "../../interfaces/IUser";
import DisplayCalendarDay from "./DisplayCalendarDay";
import ListOfWorkouts from "./ListOfWorkouts";
import { useState } from "react";
import moment from "moment";

const EditCalendarDay = ({
  user,
  dateMonth,
  setEditCalDay,
}: {
  user: IUser;
  dateMonth: IEditMonthDate;
  setEditCalDay: React.Dispatch<React.SetStateAction<boolean>>;
}): React.ReactElement => {
  return (
    <div className="w-screen h-screen bg-[rgba(0,0,0,0.5)] absolute z-20">
      <EditDay
        user={user}
        dateMonth={dateMonth}
        setEditCalDay={setEditCalDay}
      />
    </div>
  );
};

const EditDay = ({
  user,
  dateMonth,
  setEditCalDay,
}: {
  user: IUser;
  dateMonth: IEditMonthDate;
  setEditCalDay: React.Dispatch<React.SetStateAction<boolean>>;
}): React.ReactElement => {
  const date: number = dateMonth.date;
  const month: IMonthName | "" = dateMonth.month;
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    undefined
  );
  if (!month) return <div></div>;
  const submitUpdate = async () => {
    if (selectedIndex == undefined) return;
    let selectedWorkoutName: string;
    if (selectedIndex != user.workouts.length) {
      selectedWorkoutName = user.workouts[selectedIndex].workoutName;
    } else {
      selectedWorkoutName = "";
    }
    const response = await axios_instance.patch(
      import.meta.env.VITE_BACKEND_URL +
        `/workout/updateWorkoutDate/${moment()
          .month(month)
          .date(date)
          .format("YYYY-MM-DD")}`,
      { name: selectedWorkoutName },
      { withCredentials: true }
    );

    if (response.status == 200) {
      setEditCalDay(false);
    }
  };
  return (
    <div className="min-w-80 min-h-96 w-4/12 h-1/2 bg-second rounded-2xl absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
      <button
        className="absolute w-min right-8 top-4 hover:scale-125 transition-all"
        onClick={() => setEditCalDay(false)}
      >
        X
      </button>
      <DisplayCalendarDay
        workoutName={user.monthlyCalendar[month][date].workoutName}
        date={date.toString()}
      />
      <ListOfWorkouts
        workouts={user.workouts}
        setSelectedIndex={setSelectedIndex}
        selectedIndex={selectedIndex}
      />
      <button
        className="block mx-auto w-auto h-auto bg-main py -1 px-2 mt-8 rounded-full hover:scale-105 transition-all"
        onClick={submitUpdate}
      >
        Add Workout To Date
      </button>
    </div>
  );
};

export default EditCalendarDay;

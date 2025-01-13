import axios_instance from "../utilities/AxiosInstance";
import { NavLink } from "react-router-dom";

const SideBar = (): React.ReactElement => {
  const patchTest = async () => {
    const response = await axios_instance.patch(
      "/api/workout/updateSpecificWorkoutDate/2024-7-31",
      { name: "Test workout" },
      { withCredentials: true }
    );

    console.log(response);
  };
  return (
    <nav className="h-full w-20 bg-main fixed top-0 flex flex-col justify-between items-center z-10">
      <div className="flex justify-center bg-[rgba(255,255,255,0.95)] mt-4 p-1 rounded-lg hover:scale-110 transition-all ">
        <NavLink to="/home" className="bg-HomeImage bg-cover w-11 h-11" />
      </div>
      <div className="flex flex-col items-center justify-between h-48 w-full">
        <NavLink
          to="/workouts"
          className="bg-WorkoutImage bg-cover w-16 h-16 hover:scale-110 transition-all"
        />
        <NavLink
          to="/calendar"
          className="bg-CalendarImage bg-cover w-12 h-12 hover:scale-110 transition-all"
        />
        <button
          className="bg-SettingsImage bg-cover w-11 h-11 hover:scale-110 transition-all"
          onClick={patchTest}
        />
      </div>
    </nav>
  );
};

export default SideBar;

import { NavLink } from "react-router-dom";

const MobileSideBar = (): React.ReactElement => {
  return (
    <nav className="hidden tablet:flex mb-5 h-16 w-screen bg-main justify-center items-center z-10">
      <div className="flex justify-center bg-[rgba(255,255,255,0.95)] p-1 rounded-lg hover:scale-110 transition-all tablet:mr-2">
        <NavLink
          to="/home"
          className="bg-HomeImage bg-cover w-11 h-11 mobile:w-9 mobile:h-9"
        />
      </div>
      <div className="flex justify-around items-center w-40">
        <NavLink
          to="/workouts"
          className="bg-WorkoutImage bg-cover w-16 h-16 mobile:w-14 mobile:h-14 hover:scale-110 transition-all"
        />
        <NavLink
          to="/calendar"
          className="bg-CalendarImage bg-cover w-12 h-12 mobile:w-11 mobile:h-11 hover:scale-110 transition-all"
        />
        <button className="bg-SettingsImage bg-cover w-11 h-11 mobile:w-10 mobile:h-10 hover:scale-110 transition-all" />
      </div>
    </nav>
  );
};

export default MobileSideBar;

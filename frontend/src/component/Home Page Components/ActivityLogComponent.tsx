import UserProp from "../../interfaces/UserProp";
import { MonthlyActivityBar } from "./MonthlyActivityBarComponent";

export const ActivityLog = ({ user }: UserProp): React.ReactElement => {
  return (
    <div className="flex flex-col items-center justify-center w-auto h-80 bg-soft-2 rounded-3xl px-8 ">
      <p className="underline my-2 text-md">Activity Log</p>
      <div className="flex">
        {user.activityLog.map((val, index) => {
          return <MonthlyActivityBar user={user} index={index} />;
        })}
      </div>
    </div>
  );
};

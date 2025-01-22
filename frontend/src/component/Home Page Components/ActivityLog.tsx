import UserProp from "../../interfaces/UserProp";
import { MonthlyActivityBar } from "./MonthlyActivityBar";

export const ActivityLog = ({ user }: UserProp): React.ReactElement => {
  return (
    <div className="flex flex-col items-center justify-center w-auto h-80 bg-soft-2 rounded-3xl px-8 xs:px-2 xs:h-64">
      <p className="underline my-2 text-md">Activity Log</p>
      <div className="flex">
        {user.activityLog.map((_val, index) => {
          return <MonthlyActivityBar user={user} index={index} />;
        })}
      </div>
    </div>
  );
};

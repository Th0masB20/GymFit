import UserProp from "../../interfaces/UserProp";
import { MonthlyActivityBar } from "./MonthlyActivityBar";

export const ActivityLog = ({ user }: UserProp): React.ReactElement => {
  return (
    <div className="cardShadow flex flex-col items-center justify-center w-auto h-80 bg-third rounded-3xl px-8 lg:px-9 xs:px-5 xs:h-64 text-darkText">
      <p className="font-bold text-center text-lg mb-2 md:mb-0 md:text-base">
        Activity Log
      </p>
      <div className="flex">
        {user.activityLog.map((_val, index) => {
          return (
            <MonthlyActivityBar user={user} index={index} key={index + 1500} />
          );
        })}
      </div>
    </div>
  );
};

import IUser from "../../interfaces/IUser";

export const MonthlyActivityBar = ({
  user,
  index,
}: {
  user: IUser;
  index: number;
}): React.ReactElement => {
  function getMonthLetter(index: number) {
    switch (index) {
      case 0:
        return "J";
      case 1:
        return "F";
      case 2:
        return "M";
      case 3:
        return "A";
      case 4:
        return "M";
      case 5:
        return "J";
      case 6:
        return "J";
      case 7:
        return "A";
      case 8:
        return "S";
      case 9:
        return "O";
      case 10:
        return "N";
      case 11:
        return "D";
      default:
        break;
    }
  }

  function getFillPercentage(i: number) {
    return user.activityLog[i] / 40;
  }
  return (
    <div className="flex flex-col items-center justify-center">
      {/* This is the activity log bar */}
      <div
        className="w-7 h-60 bg-second rounded-md relative mx-3 
      lg:mx-2 
      lg:w-5 
      md:w-4 
      sm:w-3
      xs:w-2
      xs:h-40"
      >
        <div
          className={
            "w-[80%] bg-main rounded-t-md mx-auto absolute bottom-0 left-[50%] translate-x-[-50%]"
          }
          style={{ height: `${getFillPercentage(index) * 100}%` }}
        />
        <p className="lg:hidden">{user.activityLog[index]}</p>
      </div>
      <p className="font-semibold">{getMonthLetter(index)}</p>
    </div>
  );
};

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
    <div className="flex flex-col items-center justify-center mx-3">
      <div className="w-7 h-60 bg-second rounded-md">
        <div className={`w-full h-[${getFillPercentage(index)}] bg-main`} />
      </div>
      <p className="font-semibold">{getMonthLetter(index)}</p>
    </div>
  );
};

import { useEffect } from "react";
import ITimerComponent from "../../interfaces/ITimerComponent";

const TimerComponent = ({
  timerProps,
}: {
  timerProps: ITimerComponent;
}): React.ReactElement => {
  const { seconds, minutes, hours, setSeconds, setMinutes, setHour } =
    timerProps;
  function runTimer() {
    setSeconds((current) => (current += 1));

    if (seconds == 59) {
      setSeconds(0);
      setMinutes((current) => (current += 1));
    }

    if (minutes == 59) {
      setMinutes(0);
      setHour((current) => (current += 1));
    }
  }

  useEffect(() => {
    const timeI = setInterval(runTimer, 1000);
    return () => clearInterval(timeI);
  }, [seconds, minutes, hours]);

  return (
    <div className="m-auto w-24 h-10 bg-main rounded-lg flex items-center justify-center mt-5">
      <p className="text-center text-lg text-mainWhite">
        {hours < 10 ? "0" + hours : hours}:
        {minutes < 10 ? "0" + minutes : minutes}:
        {seconds < 10 ? "0" + seconds : seconds}
      </p>
    </div>
  );
};

export default TimerComponent;

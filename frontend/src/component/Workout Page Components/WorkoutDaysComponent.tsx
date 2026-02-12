import { useEffect, useState } from "react";

export const WorkoutDays = ({
  calendarDays,
}: {
  calendarDays: string[];
}): React.ReactElement => {
  interface calendarD {
    Monday: boolean;
    Tuesday: boolean;
    Wednesday: boolean;
    Thursday: boolean;
    Friday: boolean;
    Saturday: boolean;
    Sunday: boolean;
  }

  const initialCalendarState: calendarD = {
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  };
  const [calendarSetDays, setCalendarDays] =
    useState<calendarD>(initialCalendarState);

  useEffect(() => {
    setCalendarDays(initialCalendarState);
    const calendar = { ...initialCalendarState };
    for (const day of calendarDays) {
      calendar[day as keyof calendarD] = true;
    }

    setCalendarDays(calendar);
  }, []);

  return (
    <div className="w-11/12 h-9 bg-soft-1 rounded-lg flex items-center justify-center">
      <ul className="text-md text-nowrap md:text-sm">
        <li className="inline-block">
          <p
            className={
              "calendarText " +
              (calendarSetDays["Monday"] ? "calendarTextSelected" : "")
            }
          >
            M
          </p>
        </li>
        <li className="inline-block">
          <p
            className={
              "calendarText " +
              (calendarSetDays["Tuesday"] ? "calendarTextSelected" : "")
            }
          >
            T
          </p>
        </li>
        <li className="inline-block">
          <p
            className={
              "calendarText " +
              (calendarSetDays["Wednesday"] ? "calendarTextSelected" : "")
            }
          >
            W
          </p>
        </li>
        <li className="inline-block">
          <p
            className={
              "calendarText " +
              (calendarSetDays["Thursday"] ? "calendarTextSelected" : "")
            }
          >
            TH
          </p>
        </li>
        <li className="inline-block">
          <p
            className={
              "calendarText " +
              (calendarSetDays["Friday"] ? "calendarTextSelected" : "")
            }
          >
            F
          </p>
        </li>
        <li className="inline-block">
          <p
            className={
              "calendarText " +
              (calendarSetDays["Saturday"] ? "calendarTextSelected" : "")
            }
          >
            S
          </p>
        </li>
        <li className="inline-block">
          <p
            className={
              "calendarText " +
              (calendarSetDays["Sunday"] ? "calendarTextSelected" : "")
            }
          >
            S
          </p>
        </li>
      </ul>
    </div>
  );
};

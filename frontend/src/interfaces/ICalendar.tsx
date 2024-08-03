import { IWorkoutStartFinish } from "./IUser";

export interface IMonthCalendar {
  //date and workout name
  [key: number]: ICalendarWorkoutName;
}

export interface ICalendar {
  January: IMonthCalendar;
  February: IMonthCalendar;
  March: IMonthCalendar;
  April: IMonthCalendar;
  May: IMonthCalendar;
  June: IMonthCalendar;
  July: IMonthCalendar;
  August: IMonthCalendar;
  September: IMonthCalendar;
  October: IMonthCalendar;
  November: IMonthCalendar;
  December: IMonthCalendar;
}

export interface INumberedWeekCalendar {
  [key: number]: IWeeklyCalendar;
}

export interface IWeeklyCalendar {
  Monday: ICalendarWorkoutName;
  Tuesday: ICalendarWorkoutName;
  Wednesday: ICalendarWorkoutName;
  Thursday: ICalendarWorkoutName;
  Friday: ICalendarWorkoutName;
  Saturday: ICalendarWorkoutName;
  Sunday: ICalendarWorkoutName;
}

export interface IWorkoutHistry {
  [key: string]: IWorkoutStartFinish[];
}

export type IWeekDay =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";
export type IMonthName =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";
export interface ICalendarWorkoutName {
  workoutName: string;
  updated: boolean;
}
// type monthObject = { [key: string]: string };

export interface ICalendarBool {
  Monday: boolean;
  Tuesday: boolean;
  Wednesday: boolean;
  Thursday: boolean;
  Friday: boolean;
  Saturday: boolean;
  Sunday: boolean;
}

export default ICalendar;

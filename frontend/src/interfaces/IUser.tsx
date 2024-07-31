import ICalendar, {
  INumberedWeekCalendar,
  IWeeklyCalendar,
  IWorkoutHistry,
} from "./ICalendar";

export interface IExercise {
  exerciseName: string;
  exerciseDescription: string;
  numberOfSets: number;
  reps: number[];
  weights: number[];
}

export interface IWorkout {
  workoutName: string;
  exercises: IExercise[];
  calendarDay: string[];
  previousWorkout: IWorkoutStartFinish | object;
}

export interface IWorkoutStartFinish extends IWorkout {
  seconds: number;
  minutes: number;
  hours: number;
}

interface IUser {
  name: string;
  lastName: string;
  email: string;
  password: string;
  age: number | undefined;
  height: number | undefined;
  workouts: IWorkout[];
  activityLog: number[];
  generalWeeklyCalendar: IWeeklyCalendar;
  entireWeekCalendar: INumberedWeekCalendar;
  //monthName : {day:workoutName}
  monthlyCalendar: ICalendar;
  workoutHistory: IWorkoutHistry;
  previousWorkout: IWorkoutStartFinish | undefined;
}

export default IUser;

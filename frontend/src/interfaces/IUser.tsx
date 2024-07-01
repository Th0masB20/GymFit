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
  weeklyCalendar: { [key: string]: string };
  workoutHistory: { [key: string]: [IWorkout] };
  previousWorkout: IWorkoutStartFinish;
}

export interface ICalendarBool {
  Monday: boolean;
  Tuesday: boolean;
  Wednesday: boolean;
  Thursday: boolean;
  Friday: boolean;
  Saturday: boolean;
  Sunday: boolean;
}

export default IUser;

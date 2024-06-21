export interface IExercise {
  exerciseName: string;
  exerciseDescription: string;
  numberOfSets: number;
  reps: number[];
  weights: number[];
}

interface IWorkoutStartFinish extends IWorkout {
  time: number;
}

export interface IWorkout {
  workoutName: string;
  exercises: IExercise[];
  calendarDay: string[];
  previousWorkout: IWorkoutStartFinish | object;
}

interface IUser {
  name: string;
  lastName: string;
  email: string;
  password: string;
  age?: number;
  height?: number;
  workouts: IWorkout[];
  activityLog: number[];
  weeklyCalendar: { [key: string]: string };
  workoutHistory: { [key: string]: IWorkout };
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

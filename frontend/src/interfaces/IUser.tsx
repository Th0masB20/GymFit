interface IExercise {
  exerciseName: string;
  numberOfSets: number;
  reps: number[];
  weights: number[];
}

interface IWorkoutStartFinish extends IWorkout {
  time: number;
}

interface IWorkout {
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
  weeklyCalendar: Map<string, string>;
  workoutHistory: Map<string, IWorkout>;
}

export default IUser;

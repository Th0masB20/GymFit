export interface IWorkout {
    workoutName: string,
    exercises: any[],
    calanderDay: string[],
    previousWorkout: IWorkoutStartFinish
}

export interface IWorkoutStartFinish extends IWorkout
{
    time: number;
}


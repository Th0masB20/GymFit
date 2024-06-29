import { isObjectEmpty } from "../utilities/utilityFunctions";
import IExercise, { isExerciseCorrect } from "./IExercise";

export interface IWorkout {
    workoutName: string,
    exercises: IExercise[],
    calendarDay: string[],
    previousWorkout: IWorkoutStartFinish | {}
}

export interface IWorkoutStartFinish extends IWorkout {
    seconds: number;
    minutes: number;
    hours: number
}

export function isWorkoutCorrect(obj: IWorkout): boolean {
    if (isObjectEmpty(obj)) return false;
    if (!obj.workoutName) return false;
    if (!obj.calendarDay) return false;
    if (!obj.exercises) return false;
    for (let exercises of obj.exercises) {
        if (!isExerciseCorrect(exercises)) {
            return false;
        }
    }

    return true;
}

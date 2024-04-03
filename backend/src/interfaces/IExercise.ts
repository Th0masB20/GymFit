import { isObjectEmpty } from "../utilities/utilityFunctions";

interface IExercise {
    exerciseName: string,
    numberOfSets: number,
    reps: number[],
    weights?: number[],
}

export function isExerciseCorrect(obj: IExercise): boolean {
    if (isObjectEmpty(obj)) return false;
    if (!obj.exerciseName) return false;
    if (!obj.numberOfSets) return false;
    if (!obj.reps) return false;

    return true;
}

export default IExercise;
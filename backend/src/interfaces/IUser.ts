import { Document } from "mongoose";
import { IWorkout, IWorkoutStartFinish } from "./IWorkout"
import ICalendar, { IWeeklyCalendar, IWorkoutHistry, INumberedWeekCalendar } from "./ICalendar";
import IJsonExercise from "./IJsonExercise";

export interface IUser {
    name: string,
    lastName: string,
    email: string,
    password: string,
    age: number | undefined,
    height: number | undefined,
    workouts: IWorkout[],
    activityLog: number[],
    generalWeeklyCalendar: IWeeklyCalendar,
    yearWeeklyCalendar: INumberedWeekCalendar,
    monthlyCalendar: ICalendar,
    workoutHistory: IWorkoutHistry,
    previousWorkout: IWorkoutStartFinish | undefined,
    JsonExercise: IJsonExercise
}


export interface IUserAgeWeight extends Request {
    age: number,
    height: number
}

export interface IUserMongoose extends Document, IUser { }



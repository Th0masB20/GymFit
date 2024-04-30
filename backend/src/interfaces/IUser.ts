import { Document } from "mongoose";
import { IWorkout } from "./IWorkout"

export interface IUser {
    name: string,
    lastName: string,
    email: string,
    password: string,
    age: number | undefined,
    height: number | undefined,
    workouts: IWorkout[],
    activityLog: number[],
    weeklyCalendar: Map<string, string>,
    workoutHistory: Map<string, IWorkout>
}

export interface IUserAgeWeight extends Request {
    age: number,
    height: number
}

export interface IUserMongoose extends Document, IUser { }



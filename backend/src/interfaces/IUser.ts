import { Document } from "mongoose";
import { IWorkout } from "./IWorkout"

export interface IUser{
    name:string,
    lastName: string,
    email: string,
    password: string,
    age?: number,
    height?: number,
    workouts: IWorkout[],
    activityLog: Map<string, number>,
    weeklyCalendar: Map<string, IWorkout>,
    workoutHistory: Map<string, IWorkout>
}

export interface IUserMongoose extends Document, IUser{}



import { Document } from "mongoose";
import { IWorkout, IWorkoutStartFinish } from "./IWorkout"

export interface IUser {
    name: string,
    lastName: string,
    email: string,
    password: string,
    age: number | undefined,
    height: number | undefined,
    workouts: IWorkout[],
    activityLog: number[],
    weeklyCalendar: { [key: string]: string },
    workoutHistory: { [key: string]: IWorkoutStartFinish[] },
    previousWorkout: IWorkoutStartFinish | undefined
}

export interface IUserAgeWeight extends Request {
    age: number,
    height: number
}

export interface IUserMongoose extends Document, IUser { }



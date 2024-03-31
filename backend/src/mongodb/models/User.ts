import mongoose, { Document, Model, Schema } from "mongoose";
import { IWorkout } from "../../interfaces/IWorkout";

interface UserModel extends Document{
    name:string,
    lastName: string,
    email: string,
    pasword: string,
    age: number,
    height: number,
    workouts: IWorkout[],
    activityLog: Map<string, number>,
    weeklyCalendar: Map<string, IWorkout>,
    workoutHistory: Map<string, IWorkout>
}

const UserSchema:Schema = new mongoose.Schema<UserModel>(
    {
        name:{
            type: String,
            require: true,
        },
        lastName:{
            type: String,
            require:true,
        },
        email:{
            type: String,
            require: true,
            min: 5,
            unique: true
        },
        pasword:{
            type: String,
            require: true,
            min: 5,
        },
        age:{
            type: Number,
            require: true,
        },
        height:{
            type: Number,
            require: true,
        },
        workouts:{
            type:[Object],
            require: true,
        },
        activityLog:{
            type: Map,
            of: Number,
            require: true,
        },
        weeklyCalendar:{
            type: Map,
            of: Object,
            require: true,
        },
        workoutHistory:{
            type: Map,
            of: Object,
            require: true,
        }
    }   
);

UserSchema.set('toJSON', {
    transform: (_prev, current) =>
    {
        current.id = current._id;
        delete current._id;
        delete current.__v;
    }
});

const User:Model<UserModel> = mongoose.model<UserModel>("User",UserSchema);

export default User;
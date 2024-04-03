import mongoose, { Model, Schema } from "mongoose";
import { IUserMongoose } from "../../interfaces/IUser";

const UserSchema: Schema = new mongoose.Schema<IUserMongoose>(
    {
        name: {
            type: String,
            require: true,
        },
        lastName: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
            min: 5,
            unique: true
        },
        password: {
            type: String,
            require: true,
            min: 5,
        },
        age: {
            type: Number,
            require: true,
        },
        height: {
            type: Number,
            require: true,
        },
        workouts: {
            type: [Object],
            require: true,
        },
        activityLog: {
            type: [Number],
            of: Number,
            require: true,
        },
        weeklyCalendar: {
            type: Map,
            of: String,
            require: true,
        },
        workoutHistory: {
            type: Map,
            of: Object,
            require: true,
        }
    }
);

UserSchema.set('toJSON', {
    transform: (_prev, current) => {
        delete current._id;
        delete current.password;
        delete current._id;
        delete current.__v;
        delete current.email;
    }
});

const User: Model<IUserMongoose> = mongoose.model<IUserMongoose>("User", UserSchema);

export default User;
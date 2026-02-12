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
        weight: {
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
        generalWeeklyCalendar: {
            type: Object,
            require: true,
        },
        yearWeeklyCalendar: {
            type: Object,
            require: true,
        },
        monthlyCalendar: {
            type: Object,
            require: true,
        },
        workoutHistory: {
            type: Object,
            of: Array,
            require: true,
        },
        previousWorkout: {
            type: Object,
            required: true,
        },
        JsonExercise: {
            type: Object,
        }
    },
    {
        versionKey: false,
        minimize: false
    }
);

UserSchema.set('toJSON', {
    transform: (_prev, current) => {
        delete current._id;
        delete current.password;
        delete current._id;
        delete current.email;
    }
});

const User: Model<IUserMongoose> = mongoose.model<IUserMongoose>("User", UserSchema);

export default User;
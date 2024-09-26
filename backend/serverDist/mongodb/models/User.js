"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
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
}, {
    minimize: false
});
UserSchema.set('toJSON', {
    transform: (_prev, current) => {
        delete current._id;
        delete current.password;
        delete current._id;
        delete current.__v;
        delete current.email;
    }
});
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;

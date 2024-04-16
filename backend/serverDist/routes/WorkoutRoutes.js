"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../mongodb/models/User"));
const IWorkout_1 = require("../interfaces/IWorkout");
const workoutRoute = express_1.default.Router();
workoutRoute.post('/saveWorkout', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const request = req;
    const newWorkoutJson = req.body;
    try {
        const user = yield User_1.default.findById(request.token.id);
        if (!user)
            throw new Error('user DNE');
        if (!(0, IWorkout_1.isWorkoutCorrect)(newWorkoutJson)) {
            throw new Error('incorrect workout format');
        }
        for (let workouts of user.workouts) {
            if (workouts.workoutName === newWorkoutJson.workoutName) {
                throw new Error('workout exists');
            }
        }
        user.workouts.push(newWorkoutJson);
        for (let weekday of newWorkoutJson.calendarDay) {
            if (!user.weeklyCalendar.has(weekday)) {
                user.weeklyCalendar.set(weekday, newWorkoutJson.workoutName);
                continue;
            }
            else {
                throw new Error('day occupied');
            }
        }
        yield user.save();
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
}));
workoutRoute.post('/finishWorkout', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const request = req;
    const finishWorkoutJson = req.body;
    try {
        const user = yield User_1.default.findById(request.token.id);
        if (!user)
            throw new Error('user DNE');
        const d = new Date();
        //finish workout has time attribute
        user.workoutHistory.set(`${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`, finishWorkoutJson);
        user.activityLog[d.getMonth()] += 1;
        for (let i = 0; i < user.workouts.length; i++) {
            if (user.workouts[i].workoutName == finishWorkoutJson.workoutName) {
                user.workouts[i] = Object.assign(Object.assign({}, user.workouts[i]), { previousWorkout: finishWorkoutJson });
                break;
            }
        }
        yield user.save();
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
}));
workoutRoute.patch('/:name/updateWorkout', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const param = req.params;
    const request = req;
    const updatedWorkout = req.body;
    try {
        const user = yield User_1.default.findById(request.token.id);
        if (!user)
            throw new Error('user DNE');
        for (let i = 0; i < user.workouts.length; i++) {
            if (user.workouts[i].workoutName === param.name) {
                user.workouts[i] = updatedWorkout;
                break;
            }
        }
        yield user.save();
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
}));
workoutRoute.get('/:workoutName', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const request = req;
    const params = req.params;
    try {
        const user = yield User_1.default.findById(request.token.id);
        if (!user)
            throw new Error('user DNE');
        let theWorkout = null;
        for (let workout of user.workouts) {
            if (workout.workoutName == params.workoutName) {
                theWorkout = workout;
                break;
            }
        }
        res.status(200).json(theWorkout);
    }
    catch (error) {
        next(error);
    }
}));
workoutRoute.delete('/:workoutName/deleteWorkout', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const request = req;
    const params = req.params;
    try {
        const user = yield User_1.default.findById(request.token.id);
        if (!user)
            throw new Error('user DNE');
        for (let i = 0; i < user.workouts.length; i++) {
            if (user.workouts[i].workoutName == params.workoutName) {
                for (let days of user.workouts[i].calendarDay) {
                    user.weeklyCalendar.delete(days);
                }
                user.workouts.splice(i, 1);
                break;
            }
            if (i == user.workouts.length) {
                throw new Error('workout not found');
            }
        }
        yield user.save();
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = workoutRoute;

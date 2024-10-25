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
const CreateMonthlyCalendar_1 = require("../utilities/CreateMonthlyCalendar");
const moment_1 = __importDefault(require("moment"));
const workoutRoute = express_1.default.Router();
workoutRoute.get('/getJsonExercises', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const request = req;
    console.log("its going throuhg");
    try {
        const user = yield User_1.default.findById(request.token.id);
        if (!user)
            throw new Error('user DNE');
        res.status(200).json(user.JsonExercise);
    }
    catch (error) {
        next(error);
    }
}));
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
            if (!user.generalWeeklyCalendar[weekday].workoutName) {
                const calendar = Object.assign({}, user.generalWeeklyCalendar);
                calendar[weekday] = Object.assign(Object.assign({}, calendar[weekday]), { workoutName: newWorkoutJson.workoutName });
                user.generalWeeklyCalendar = calendar;
                continue;
            }
            else {
                throw new Error('day occupied');
            }
        }
        user.monthlyCalendar = (0, CreateMonthlyCalendar_1.createMonthlyCalendar)(user.generalWeeklyCalendar);
        user.yearWeeklyCalendar = (0, CreateMonthlyCalendar_1.createNumberedWeeklyCalendar)(user.generalWeeklyCalendar);
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
        for (let i = 0; i < user.workouts.length; i++) {
            if (user.workouts[i].workoutName == finishWorkoutJson.workoutName) {
                user.workouts[i] = Object.assign(Object.assign({}, user.workouts[i]), { previousWorkout: finishWorkoutJson });
                break;
            }
        }
        //finish workout has time attribute
        const history = Object.assign({}, user.workoutHistory);
        if (!history[`${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`])
            history[`${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`] = [];
        else {
            history[`${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`].push(finishWorkoutJson);
        }
        user.workoutHistory = {};
        user.workoutHistory = history;
        user.activityLog[d.getMonth()] += 1;
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
        const calendar = Object.assign({}, user.generalWeeklyCalendar);
        //add new entries
        for (let weekday of updatedWorkout.calendarDay) {
            if (!calendar[weekday].workoutName) {
                calendar[weekday] = Object.assign(Object.assign({}, calendar[weekday]), { workoutName: updatedWorkout.workoutName });
                continue;
            }
            else if (calendar[weekday].workoutName != updatedWorkout.workoutName) {
                calendar[weekday] = Object.assign(Object.assign({}, calendar[weekday]), { workoutName: updatedWorkout.workoutName });
            }
            else {
                continue;
            }
        }
        //remove days not in the new callendar
        for (let weekday in calendar) {
            if (calendar[weekday].workoutName == updatedWorkout.workoutName) {
                if (!updatedWorkout.calendarDay.includes(weekday)) {
                    calendar[weekday] = Object.assign(Object.assign({}, calendar[weekday]), { workoutName: '' });
                    continue;
                }
            }
        }
        user.generalWeeklyCalendar = calendar;
        //if you want a repeated workout routine
        user.monthlyCalendar = (0, CreateMonthlyCalendar_1.createMonthlyCalendar)(calendar);
        user.yearWeeklyCalendar = (0, CreateMonthlyCalendar_1.createNumberedWeeklyCalendar)(calendar);
        yield user.save();
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
}));
workoutRoute.patch('/updateWorkoutDate/:year-:month-:date', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const request = req;
    const params = req.params;
    const body = req.body;
    const monthIndex = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    try {
        const user = yield User_1.default.findById(request.token.id);
        if (!user)
            throw new Error('user DNE');
        const monthNumber = Number(params.month);
        const dateNumber = Number(params.date);
        const yearNumber = Number(params.year);
        if (!monthNumber || !dateNumber || !yearNumber)
            throw new Error('user DNE');
        const month = monthIndex[monthNumber - 1];
        //{name: workoutName, updated: true}
        const newWorkout = Object.assign({}, user.monthlyCalendar[month][dateNumber]);
        newWorkout.updated = true;
        newWorkout.workoutName = body.name;
        // {3: workoutObject }
        const newMonthlyObject = Object.assign({}, user.monthlyCalendar[month]);
        newMonthlyObject[dateNumber] = newWorkout;
        const newCalendar = Object.assign({}, user.monthlyCalendar);
        newCalendar[month] = newMonthlyObject;
        user.monthlyCalendar = newCalendar;
        //-1 since its a 0 based index
        const weekWhichIsUpdated = (0, moment_1.default)().year(yearNumber).month(month).date(dateNumber).week() - 1;
        const weekdayIndex = (0, moment_1.default)().year(yearNumber).month(month).date(dateNumber).day();
        const newWeek = Object.assign({}, user.yearWeeklyCalendar[weekWhichIsUpdated]);
        newWeek[days[weekdayIndex]] = newWorkout;
        const newWeeklyCalendar = Object.assign({}, user.yearWeeklyCalendar);
        newWeeklyCalendar[weekWhichIsUpdated] = newWeek;
        user.yearWeeklyCalendar = newWeeklyCalendar;
        yield user.save();
    }
    catch (error) {
        next(error);
    }
    res.status(200).json({ message: "Saved Successfully" });
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
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    try {
        const user = yield User_1.default.findById(request.token.id);
        if (!user)
            throw new Error('user DNE');
        const newCalendar = {};
        const newWorkoutPlan = [...user.workouts];
        for (const weekDay of days) {
            newCalendar[weekDay] = Object.assign({}, user.generalWeeklyCalendar[weekDay]);
        }
        for (let i = 0; i < user.workouts.length; i++) {
            if (user.workouts[i].workoutName == params.workoutName) {
                for (let days of user.workouts[i].calendarDay) {
                    newCalendar[days].workoutName = "";
                    newCalendar[days].updated = false;
                }
                newWorkoutPlan.splice(i, 1);
                break;
            }
            if (i == user.workouts.length) {
                throw new Error('workout not found');
            }
        }
        user.generalWeeklyCalendar = newCalendar;
        user.workouts = newWorkoutPlan;
        user.monthlyCalendar = (0, CreateMonthlyCalendar_1.createMonthlyCalendar)(newCalendar);
        user.yearWeeklyCalendar = (0, CreateMonthlyCalendar_1.createNumberedWeeklyCalendar)(newCalendar);
        yield user.save();
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
}));
//body is the IWorkoutStartFinish
workoutRoute.patch('/updatePreviousWorkout', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const verRequest = req;
    try {
        const user = yield User_1.default.findById(verRequest.token.id);
        if (!user)
            throw new Error('user DNE');
        const userFinishedWorkout = req.body;
        user.previousWorkout = Object.assign({}, userFinishedWorkout);
        yield user.save();
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = workoutRoute;
